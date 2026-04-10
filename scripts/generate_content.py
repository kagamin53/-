"""Generate post content from templates and add to queue.

This script generates posts based on the templates defined in post-templates.md
and the strategy in strategy.md. It can be run manually or via GitHub Actions
with the Anthropic API for AI-powered content generation.
"""

import json
import os
import random
import sys
from datetime import datetime, timezone, timedelta
from pathlib import Path

QUEUE_FILE = Path(__file__).parent.parent / "content" / "queue.json"
TEMPLATES_FILE = Path(__file__).parent.parent / "post-templates.md"
STRATEGY_FILE = Path(__file__).parent.parent / "strategy.md"

JST = timezone(timedelta(hours=9))

CATEGORIES = [
    "news",        # AIニュース速報
    "tool",        # ツール紹介
    "comparison",  # 比較・検証
    "list",        # まとめ・リスト型
    "opinion",     # 意見・考察
    "daily",       # 日常・人間味
]

HASHTAG_SETS = {
    "news": ["#AI", "#生成AI"],
    "tool": ["#AI", "#便利ツール"],
    "comparison": ["#AI", "#比較"],
    "list": ["#AI", "#まとめ"],
    "opinion": ["#AI", "#テック"],
    "daily": ["#AI", "#エンジニア"],
}


def load_queue() -> list[dict]:
    if not QUEUE_FILE.exists():
        return []
    with open(QUEUE_FILE, encoding="utf-8") as f:
        return json.load(f)


def save_queue(queue: list[dict]) -> None:
    with open(QUEUE_FILE, "w", encoding="utf-8") as f:
        json.dump(queue, f, ensure_ascii=False, indent=2)


def generate_with_ai(category: str, slot: str) -> str | None:
    """Generate content using the Anthropic API."""
    try:
        import anthropic
    except ImportError:
        print("anthropic package not installed. Skipping AI generation.")
        return None

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("ANTHROPIC_API_KEY not set. Skipping AI generation.")
        return None

    templates = TEMPLATES_FILE.read_text(encoding="utf-8")
    strategy = STRATEGY_FILE.read_text(encoding="utf-8")

    now = datetime.now(JST)
    day_of_week = ["月", "火", "水", "木", "金", "土", "日"][now.weekday()]
    time_of_day = "朝" if slot == "morning" else "夜"

    category_names = {
        "news": "AIニュース速報",
        "tool": "ツール紹介",
        "comparison": "比較・検証",
        "list": "まとめ・リスト型",
        "opinion": "意見・考察",
        "daily": "日常・人間味",
    }

    prompt = f"""あなたはXの@Neuro__Flow アカウントの運用担当です。
AI・テクノロジーの最新トレンドを分かりやすく発信するアカウントです。

以下の戦略とテンプレートに基づいて、投稿を1つ生成してください。

## 条件
- カテゴリ: {category_names.get(category, category)}
- 曜日: {day_of_week}曜日
- 時間帯: {time_of_day}
- 日付: {now.strftime('%Y年%m月%d日')}
- 文字数: 280文字以内（Xの制限）
- ハッシュタグ: 1〜3個を含める

## 戦略
{strategy}

## テンプレート
{templates}

## 重要なルール
- テンプレートを参考にしつつ、自然で人間味のある投稿にすること
- 最新のAIトレンドに基づいた内容にすること
- 改行を適切に使い、読みやすくすること
- 投稿本文のみを出力すること（説明や前置きは不要）
"""

    client = anthropic.Anthropic(api_key=api_key)
    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}],
    )

    return message.content[0].text.strip()


def select_category_for_schedule() -> str:
    """Select a category based on the current day and strategy ratios."""
    now = datetime.now(JST)
    day = now.weekday()

    # Based on the content calendar in strategy.md
    schedule = {
        0: ["news", "news"],       # 月: ニュース
        1: ["tool", "tool"],       # 火: ツール紹介
        2: ["opinion", "opinion"], # 水: 考察
        3: ["tool", "daily"],      # 木: Tips + 日常
        4: ["list", "tool"],       # 金: まとめ + ツール
        5: ["comparison", "comparison"],  # 土: 検証
        6: ["daily", "opinion"],   # 日: 振り返り + 意見
    }

    slots = schedule.get(day, ["news", "opinion"])
    hour = now.hour
    index = 0 if hour < 12 else 1
    return slots[index]


def generate_post(category: str | None = None, slot: str | None = None,
                  use_ai: bool = True) -> dict | None:
    """Generate a single post and add it to the queue."""
    if not category:
        category = select_category_for_schedule()
    if not slot:
        now = datetime.now(JST)
        slot = "morning" if now.hour < 12 else "evening"

    content = None
    if use_ai:
        content = generate_with_ai(category, slot)

    if not content:
        print(f"Could not generate content for category={category}, slot={slot}")
        return None

    post = {
        "content": content,
        "category": category,
        "slot": slot,
    }

    queue = load_queue()
    queue.append(post)
    save_queue(queue)
    print(f"Generated post added to queue ({category}/{slot}):")
    print(f"  {content[:100]}...")
    return post


def generate_weekly_batch(use_ai: bool = True) -> None:
    """Generate a full week of content (14 posts)."""
    schedule = {
        0: [("news", "morning"), ("news", "evening")],
        1: [("tool", "morning"), ("tool", "evening")],
        2: [("opinion", "morning"), ("opinion", "evening")],
        3: [("tool", "morning"), ("daily", "evening")],
        4: [("list", "morning"), ("tool", "evening")],
        5: [("comparison", "morning"), ("comparison", "evening")],
        6: [("daily", "morning"), ("opinion", "evening")],
    }

    now = datetime.now(JST)
    generated = 0

    for day_offset in range(7):
        target_day = now + timedelta(days=day_offset)
        weekday = target_day.weekday()
        slots = schedule.get(weekday, [("news", "morning"), ("opinion", "evening")])

        for category, slot in slots:
            hour = 7 if slot == "morning" else 20
            scheduled_at = target_day.replace(
                hour=hour, minute=0, second=0, microsecond=0
            ).isoformat()

            content = None
            if use_ai:
                content = generate_with_ai(category, slot)

            if content:
                queue = load_queue()
                queue.append({
                    "content": content,
                    "category": category,
                    "slot": slot,
                    "scheduled_at": scheduled_at,
                })
                save_queue(queue)
                generated += 1
                print(f"[{generated}/14] Generated: {category}/{slot} for {target_day.strftime('%m/%d')}")

    print(f"\nGenerated {generated} posts for the week.")


def main():
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python generate_content.py single [--category CAT] [--slot morning|evening]")
        print("  python generate_content.py weekly")
        print("  python generate_content.py --no-ai single  (skip AI generation)")
        return

    use_ai = "--no-ai" not in sys.argv
    args = [a for a in sys.argv[1:] if a != "--no-ai"]

    command = args[0] if args else "single"

    if command == "weekly":
        generate_weekly_batch(use_ai=use_ai)
    elif command == "single":
        category = None
        slot = None
        i = 1
        while i < len(args):
            if args[i] == "--category" and i + 1 < len(args):
                category = args[i + 1]
                i += 2
            elif args[i] == "--slot" and i + 1 < len(args):
                slot = args[i + 1]
                i += 2
            else:
                i += 1
        generate_post(category=category, slot=slot, use_ai=use_ai)
    else:
        print(f"Unknown command: {command}")


if __name__ == "__main__":
    main()
