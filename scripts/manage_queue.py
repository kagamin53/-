"""Manage the content queue - add, list, remove posts."""

import json
import sys
from pathlib import Path

QUEUE_FILE = Path(__file__).parent.parent / "content" / "queue.json"


def load_queue() -> list[dict]:
    if not QUEUE_FILE.exists():
        return []
    with open(QUEUE_FILE, encoding="utf-8") as f:
        return json.load(f)


def save_queue(queue: list[dict]) -> None:
    with open(QUEUE_FILE, "w", encoding="utf-8") as f:
        json.dump(queue, f, ensure_ascii=False, indent=2)


def add_post(content: str | list[str], category: str = "", slot: str = "",
             scheduled_at: str = "") -> None:
    """Add a post to the queue."""
    queue = load_queue()
    entry = {"content": content, "category": category}
    if slot:
        entry["slot"] = slot
    if scheduled_at:
        entry["scheduled_at"] = scheduled_at
    queue.append(entry)
    save_queue(queue)
    print(f"Post added to queue. Queue size: {len(queue)}")


def list_posts() -> None:
    """List all posts in the queue."""
    queue = load_queue()
    if not queue:
        print("Queue is empty.")
        return
    print(f"Queue ({len(queue)} posts):")
    print("-" * 60)
    for i, post in enumerate(queue):
        content = post["content"]
        if isinstance(content, list):
            preview = f"[Thread: {len(content)} tweets] {content[0][:60]}..."
        else:
            preview = content[:80] + ("..." if len(content) > 80 else "")
        category = post.get("category", "")
        slot = post.get("slot", "")
        scheduled = post.get("scheduled_at", "")
        meta = " | ".join(filter(None, [category, slot, scheduled]))
        print(f"  [{i}] {preview}")
        if meta:
            print(f"       ({meta})")
        print()


def remove_post(index: int) -> None:
    """Remove a post from the queue by index."""
    queue = load_queue()
    if 0 <= index < len(queue):
        removed = queue.pop(index)
        save_queue(queue)
        content = removed["content"]
        if isinstance(content, list):
            print(f"Removed thread ({len(content)} tweets) from queue.")
        else:
            print(f"Removed: {content[:60]}...")
    else:
        print(f"Invalid index: {index}. Queue size: {len(queue)}")


def main():
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python manage_queue.py list")
        print("  python manage_queue.py add <content> [--category CAT] [--slot morning|evening] [--scheduled-at ISO]")
        print("  python manage_queue.py remove <index>")
        return

    command = sys.argv[1]

    if command == "list":
        list_posts()
    elif command == "add":
        if len(sys.argv) < 3:
            print("Error: content is required")
            return
        content = sys.argv[2]
        category = ""
        slot = ""
        scheduled_at = ""
        i = 3
        while i < len(sys.argv):
            if sys.argv[i] == "--category" and i + 1 < len(sys.argv):
                category = sys.argv[i + 1]
                i += 2
            elif sys.argv[i] == "--slot" and i + 1 < len(sys.argv):
                slot = sys.argv[i + 1]
                i += 2
            elif sys.argv[i] == "--scheduled-at" and i + 1 < len(sys.argv):
                scheduled_at = sys.argv[i + 1]
                i += 2
            else:
                i += 1
        add_post(content, category, slot, scheduled_at)
    elif command == "remove":
        if len(sys.argv) < 3:
            print("Error: index is required")
            return
        remove_post(int(sys.argv[2]))
    else:
        print(f"Unknown command: {command}")


if __name__ == "__main__":
    main()
