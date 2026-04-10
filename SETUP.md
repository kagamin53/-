# X 自動運用システム セットアップガイド

@Neuro__Flow のX(Twitter)アカウントを GitHub Actions で自動運用するシステムです。

---

## 仕組み

```
┌─────────────────────────────────────────────────────┐
│                  GitHub Actions                      │
│                                                      │
│  ┌──────────────┐    ┌──────────────┐               │
│  │ Generate      │    │ Auto Post    │               │
│  │ Content       │    │ to X         │               │
│  │ (毎週日曜)    │───▶│ (毎日2回)    │───▶ X API     │
│  └──────────────┘    └──────────────┘               │
│         │                    │                        │
│         ▼                    ▼                        │
│  ┌──────────────────────────────────┐               │
│  │     content/queue.json           │               │
│  │     (投稿キュー)                  │               │
│  └──────────────────────────────────┘               │
│                      │                               │
│                      ▼                               │
│  ┌──────────────────────────────────┐               │
│  │     content/posted.json          │               │
│  │     (投稿履歴)                    │               │
│  └──────────────────────────────────┘               │
└─────────────────────────────────────────────────────┘
```

### ワークフロー

| ワークフロー | スケジュール | 機能 |
|------------|------------|------|
| **Auto Post** | 毎日 7:00 / 20:00 JST | キューから投稿を取り出してXに投稿 |
| **Generate Content** | 毎週日曜 00:00 JST | AIで1週間分の投稿を自動生成 |
| **Add to Queue** | 手動実行 | GitHub UIから手動で投稿をキューに追加 |

---

## セットアップ手順

### 1. X API の認証情報を取得

1. [X Developer Portal](https://developer.x.com/en/portal/dashboard) にアクセス
2. プロジェクトとアプリを作成
3. **User authentication settings** で以下を設定:
   - App permissions: **Read and write**
   - Type of App: **Web App**
4. **Keys and tokens** から以下を取得:
   - API Key
   - API Key Secret
   - Access Token
   - Access Token Secret

### 2. Anthropic API キーを取得

1. [Anthropic Console](https://console.anthropic.com/) にアクセス
2. API キーを作成

### 3. GitHub Secrets を設定

リポジトリの **Settings > Secrets and variables > Actions** で以下を追加:

| Secret 名 | 説明 |
|-----------|------|
| `X_API_KEY` | X API Key |
| `X_API_SECRET` | X API Key Secret |
| `X_ACCESS_TOKEN` | X Access Token |
| `X_ACCESS_TOKEN_SECRET` | X Access Token Secret |
| `ANTHROPIC_API_KEY` | Anthropic API Key |

### 4. GitHub Actions を有効化

リポジトリの **Actions** タブで GitHub Actions が有効になっていることを確認します。

---

## 使い方

### 自動運用（何もしなくてOK）

セットアップ完了後は自動で動きます:

1. **毎週日曜**: AIが1週間分（14投稿）のコンテンツを自動生成してキューに追加
2. **毎日朝7時**: キューから朝用の投稿を取り出してXに投稿
3. **毎日夜8時**: キューから夜用の投稿を取り出してXに投稿

### 手動で投稿を追加

**GitHub Actions UI から:**
1. **Actions** タブ → **Add Post to Queue** → **Run workflow**
2. 投稿内容、カテゴリ、時間帯を入力して実行

**ローカルから:**
```bash
python scripts/manage_queue.py add "投稿内容" --category news --slot morning
```

### 手動でコンテンツを生成

**GitHub Actions UI から:**
1. **Actions** タブ → **Generate Content** → **Run workflow**
2. single（1投稿）または weekly（1週間分）を選択

**ローカルから:**
```bash
# 1投稿生成
python scripts/generate_content.py single --category news --slot morning

# 1週間分を一括生成
python scripts/generate_content.py weekly
```

### キューの管理

```bash
# キューの確認
python scripts/manage_queue.py list

# 投稿を削除
python scripts/manage_queue.py remove 0
```

### テスト投稿（dry-run）

**GitHub Actions UI から:**
1. **Actions** タブ → **Auto Post to X** → **Run workflow**
2. `dry_run` にチェックを入れて実行

---

## ファイル構成

```
.
├── .github/workflows/
│   ├── auto-post.yml          # 自動投稿ワークフロー
│   ├── generate-content.yml   # コンテンツ生成ワークフロー
│   └── add-to-queue.yml       # 手動キュー追加ワークフロー
├── scripts/
│   ├── post_to_x.py           # X API投稿スクリプト
│   ├── generate_content.py    # AI コンテンツ生成スクリプト
│   └── manage_queue.py        # キュー管理スクリプト
├── content/
│   ├── queue.json             # 投稿キュー
│   └── posted.json            # 投稿履歴
├── strategy.md                # 運用戦略
├── post-templates.md          # 投稿テンプレート
├── requirements.txt           # Python依存パッケージ
├── .env.example               # 環境変数テンプレート
└── SETUP.md                   # このファイル
```
