/*
  ===========================
  請柬設定區
  ===========================
*/
const CONFIG = {
  // RSVP 會開啟 WhatsApp。
  // 請把這裡改成新人的 WhatsApp 號碼：
  // 例如：60123456789（不要 +、空格或 -）
  rsvpWhatsapp: "60123456789",

  // 如果需要音樂，把 wedding.mp3 放進 assets/，
  // 然後將 musicFile 改成 "assets/wedding.mp3"。
  musicFile: "",

  // 活動時間：2026-10-01 11:00（馬來西亞時間 UTC+8）
  eventDate: "2026-10-01T11:00:00+08:00",

  // 地圖搜尋關鍵字
  venue: "古來德教會紫霞閣, Johor, Malaysia"
};

const book = document.querySelector(".book");
const openBtn = document.getElementById("openBtn");
const backBtn = document.getElementById("backBtn");
const toast = document.getElementById("toast");

function openInvitation() {
  book.classList.add("open");
  // 音樂只在使用者點擊後嘗試播放，符合多數手機瀏覽器限制。
  playMusicIfConfigured();
}

function closeInvitation() {
  book.classList.remove("open");
}

openBtn.addEventListener("click", openInvitation);
backBtn.addEventListener("click", closeInvitation);

/* Swipe support */
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener("touchend", (e) => {
  const x = e.changedTouches[0].screenX;
  const y = e.changedTouches[0].screenY;
  const dx = x - touchStartX;
  const dy = y - touchStartY;

  if (Math.abs(dx) < 55 || Math.abs(dx) < Math.abs(dy) * 1.2) return;

  if (dx < 0 && !book.classList.contains("open")) openInvitation();
  if (dx > 0 && book.classList.contains("open")) closeInvitation();
}, { passive: true });

/* Countdown */
const eventTime = new Date(CONFIG.eventDate).getTime();

function updateCountdown() {
  const diff = eventTime - Date.now();

  if (diff <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return;
  }

  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* Map */
document.getElementById("mapBtn").addEventListener("click", () => {
  const url = "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(CONFIG.venue);
  window.open(url, "_blank", "noopener,noreferrer");
});

/* Calendar: create an .ics file directly in the browser */
document.getElementById("calendarBtn").addEventListener("click", () => {
  const start = "20261001T030000Z"; // 11:00 MYT = 03:00 UTC
  const end = "20261001T050000Z";   // default 2-hour event

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//EN",
    "BEGIN:VEVENT",
    `DTSTART:${start}`,
    `DTEND:${end}`,
    "SUMMARY:廖勇翔 & 蔡美林 訂立婚約",
    "LOCATION:古來德教會紫霞閣, Johor, Malaysia",
    "DESCRIPTION:廖勇翔 & 蔡美林的訂立婚約",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "wedding-invitation-2026-10-01.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);

  showToast("已產生日曆檔案 ❤️");
});

/* RSVP */
function sendRsvp(answer) {
  if (!CONFIG.rsvpWhatsapp || CONFIG.rsvpWhatsapp === "60123456789") {
    showToast("請先在 script.js 填入 WhatsApp 號碼");
    return;
  }

  const message =
    `您好！我是受邀參加廖勇翔 & 蔡美林訂立婚約的賓客。%0A%0A` +
    `日期：2026年10月1日（星期四）%0A` +
    `時間：11:00 AM%0A` +
    `出席狀態：${answer}`;

  const url = `https://wa.me/${CONFIG.rsvpWhatsapp}?text=${message}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

document.getElementById("yesBtn").addEventListener("click", () => {
  sendRsvp("❤️ 我會出席");
});

document.getElementById("noBtn").addEventListener("click", () => {
  sendRsvp("很遺憾，我無法出席");
});

/* Optional music */
let audio = null;

function playMusicIfConfigured() {
  if (!CONFIG.musicFile) return;

  if (!audio) {
    audio = new Audio(CONFIG.musicFile);
    audio.loop = true;
    audio.volume = 0.35;
  }

  audio.play().catch(() => {
    // Some browsers may still block playback.
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}
