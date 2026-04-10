"""Post to X (Twitter) from the content queue."""

import json
import os
import sys
from datetime import datetime, timezone, timedelta
from pathlib import Path

import tweepy

JST = timezone(timedelta(hours=9))

QUEUE_FILE = Path(__file__).parent.parent / "content" / "queue.json"
POSTED_FILE = Path(__file__).parent.parent / "content" / "posted.json"


def get_client() -> tweepy.Client:
    """Create an authenticated X API v2 client."""
    return tweepy.Client(
        consumer_key=os.environ["X_API_KEY"],
        consumer_secret=os.environ["X_API_SECRET"],
        access_token=os.environ["X_ACCESS_TOKEN"],
        access_token_secret=os.environ["X_ACCESS_TOKEN_SECRET"],
    )


def load_queue() -> list[dict]:
    """Load the post queue."""
    if not QUEUE_FILE.exists():
        return []
    with open(QUEUE_FILE, encoding="utf-8") as f:
        return json.load(f)


def save_queue(queue: list[dict]) -> None:
    """Save the post queue."""
    with open(QUEUE_FILE, "w", encoding="utf-8") as f:
        json.dump(queue, f, ensure_ascii=False, indent=2)


def load_posted() -> list[dict]:
    """Load the posted archive."""
    if not POSTED_FILE.exists():
        return []
    with open(POSTED_FILE, encoding="utf-8") as f:
        return json.load(f)


def save_posted(posted: list[dict]) -> None:
    """Save the posted archive."""
    with open(POSTED_FILE, "w", encoding="utf-8") as f:
        json.dump(posted, f, ensure_ascii=False, indent=2)


def get_next_post(queue: list[dict], slot: str | None = None) -> tuple[dict | None, int]:
    """Get the next post to publish.

    Args:
        queue: The post queue.
        slot: Optional time slot filter ("morning" or "evening").

    Returns:
        Tuple of (post, index) or (None, -1) if no post is available.
    """
    now = datetime.now(JST)

    # First, look for scheduled posts whose time has come
    for i, post in enumerate(queue):
        scheduled = post.get("scheduled_at")
        if scheduled:
            scheduled_dt = datetime.fromisoformat(scheduled)
            if scheduled_dt <= now:
                return post, i

    # Then, look for posts matching the requested slot
    if slot:
        for i, post in enumerate(queue):
            if post.get("slot") == slot and not post.get("scheduled_at"):
                return post, i

    # Finally, pick the first unscheduled post
    for i, post in enumerate(queue):
        if not post.get("scheduled_at"):
            return post, i

    return None, -1


def post_tweet(client: tweepy.Client, text: str) -> str | None:
    """Post a tweet and return the tweet ID."""
    response = client.create_tweet(text=text)
    return response.data["id"]


def post_thread(client: tweepy.Client, texts: list[str]) -> list[str]:
    """Post a thread (multiple tweets in reply chain)."""
    tweet_ids = []
    reply_to = None
    for text in texts:
        if reply_to:
            response = client.create_tweet(text=text, in_reply_to_tweet_id=reply_to)
        else:
            response = client.create_tweet(text=text)
        tweet_id = response.data["id"]
        tweet_ids.append(tweet_id)
        reply_to = tweet_id
    return tweet_ids


def main():
    slot = sys.argv[1] if len(sys.argv) > 1 else None
    dry_run = "--dry-run" in sys.argv

    queue = load_queue()
    if not queue:
        print("Queue is empty. Nothing to post.")
        return

    post, index = get_next_post(queue, slot)
    if post is None:
        print(f"No suitable post found for slot: {slot}")
        return

    content = post["content"]
    is_thread = isinstance(content, list)

    if dry_run:
        print("[DRY RUN] Would post:")
        if is_thread:
            for i, tweet in enumerate(content, 1):
                print(f"  [{i}/{len(content)}] {tweet[:80]}...")
        else:
            print(f"  {content[:120]}...")
        return

    client = get_client()

    if is_thread:
        tweet_ids = post_thread(client, content)
        print(f"Thread posted: {len(tweet_ids)} tweets")
    else:
        tweet_id = post_tweet(client, content)
        tweet_ids = [tweet_id]
        print(f"Tweet posted: {tweet_id}")

    # Move from queue to posted archive
    queue.pop(index)
    save_queue(queue)

    posted = load_posted()
    posted.append({
        "content": content,
        "posted_at": datetime.now(JST).isoformat(),
        "tweet_ids": tweet_ids,
        "category": post.get("category", ""),
        "slot": post.get("slot", ""),
    })
    save_posted(posted)

    print("Queue updated and post archived.")


if __name__ == "__main__":
    main()
