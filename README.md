# 廖勇翔 & 蔡美林｜互動電子請柬

這是一個純 HTML / CSS / JavaScript 的手機版互動請柬，可直接部署到 GitHub Pages。

## 功能

- 第一頁請柬封面
- 「開啟請柬」3D 翻頁動畫
- 手機向左滑動開啟、向右滑動返回
- 第二頁完整婚約資訊
- Google Maps 導航
- 直接產生 `.ics` 日曆檔案
- 婚約倒數計時
- WhatsApp RSVP
- 可選擇加入背景音樂

## 你需要修改的地方

打開 `script.js`，找到：

```js
rsvpWhatsapp: "60123456789",
```

把它換成你真正接收 RSVP 的 WhatsApp 號碼。

例如：

```js
rsvpWhatsapp: "60123456789",
```

如果要背景音樂：

1. 把音樂檔命名成 `wedding.mp3`
2. 放進 `assets/`
3. 把：

```js
musicFile: "",
```

改成：

```js
musicFile: "assets/wedding.mp3",
```

## GitHub Pages 部署

1. 在 GitHub 建立一個新的 **Public repository**，例如：
   `wedding-invitation`

2. 把這個資料夾裡面的所有檔案上傳到 repository 根目錄。

3. GitHub：
   `Settings` → `Pages`

4. 在 `Build and deployment`：
   - Source：`Deploy from a branch`
   - Branch：`main`
   - Folder：`/ (root)`
   - Save

5. 等待部署完成。

網站網址通常會是：

`https://你的GitHub用户名.github.io/wedding-invitation/`

GitHub Pages 可以直接發布 HTML、CSS、JavaScript 等靜態檔案，因此這個專案不需要自己的伺服器。

## 注意

GitHub Free 的 GitHub Pages 專案需要使用 Public repository。

另外，GitHub Pages 上的內容是公開網站，所以不要把私人資料、密碼或 API key 放進 repository。
