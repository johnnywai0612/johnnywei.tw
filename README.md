# 上騰個人品牌網站 v1

## 檔案結構

```
個人品牌網站/
├── index.html      主檔（所有文案在這裡）
├── styles.css      視覺樣式（沉穩黑金設計 token）
├── script.js       動畫（scroll reveal + 數字計數）
├── assets/         照片放這裡
└── README.md       本說明
```

## 本機預覽

用瀏覽器直接打開 `index.html` 即可，不用 server。

## 部署到 Zeabur（拿免費子網域）

1. 建立 GitHub repo：`personal-website`
2. 把 3 個檔案 + assets 資料夾 push 上去
3. Zeabur 新增 project → connect GitHub repo → Deploy
4. 拿到網址：`shengteng.zeabur.app`

## 未來綁自訂網域

買到網域後（例：shengteng.tw）：
1. DNS 加一筆 CNAME 指到 Zeabur
2. Zeabur 設定 → Domains → 加入 shengteng.tw
3. 10 分鐘生效

## 內容替換位置（都在 index.html）

| 區塊 | 位置 | 待補 |
|------|------|------|
| Hero 姓名 | `<span class="hero__name-zh">` | 若不是「上騰」請改 |
| 三段頭銜 | `<div class="hero__titles">` | 3 行 |
| 引言 | `<div class="hero__quote">` | 一句話定位 |
| Hero 照片 | `<div class="hero__portrait-placeholder">` | 換成 `<img src="assets/hero.jpg">` |
| About 文案 | `<div class="about__text">` | 3 段自介 |
| About 照片 | `<div class="about__photo-placeholder">` | 換成 `<img src="assets/about.jpg">` |
| 數字 3 | `data-count="500"` | 服務家庭數確切值 |
| 認證 4 | `class="credential credential--muted"` | 其他證照 |
| 核心信念 | `<p class="belief__text">` | 個人核心價值宣言 |
| 服務 4 項 | `<article class="service">` × 4 | 每項的 3 個 bullet |
| 英雄旅程 5 幕 | `<div class="journey__chapter">` × 5 | 每幕的 body 段落 |
| 演講/媒體 | `<div class="media__item">` | 補具名場次 |
| 聯絡資訊 | `<a class="contact__card">` × 4 | LINE / Email / 手機 / 社群 |

## 照片建議規格

| 位置 | 比例 | 建議尺寸 |
|------|------|---------|
| Hero portrait | 3:4 直式 | 1200 × 1600 |
| About photo | 4:5 直式 | 1000 × 1250 |

拍照時避免純白背景（會蓋掉黑金氛圍），深色/自然環境背景較搭。

## 設計 Token

| Token | 用途 | 值 |
|-------|------|-----|
| `--black` | 主背景 | #0A0A0A |
| `--charcoal` | 次背景 | #1A1A1A |
| `--gold` | 主金色 | #C9A876 |
| `--gold-bright` | 高亮金 | #D4B78F |
| `--pearl` | 內文白 | #F5F2ED |
| `--mist` | 次要文字 | #B8B8B8 |

要調整整體氛圍，改 `styles.css` 開頭 `:root` 區塊即可全站生效。
