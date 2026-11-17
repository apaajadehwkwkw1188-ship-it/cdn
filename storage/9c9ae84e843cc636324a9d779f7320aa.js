// utils/weeklyBonus.js
//
// 🎁 BONUS CREDIT MINGGUAN — tiap 7 hari, SEMUA USER AKTIF (pernah interaksi
// sama bot dalam 7 hari terakhir, dicek dari field `lastActive` di
// users.json — lihat db.touchUserActivity di utils/database.js & index.js)
// otomatis dapat +5 credit gratis. User yang TIDAK aktif dalam 7 hari
// terakhir DILEWATI, tidak dapat bonus.
//
// Tiap user yang kebagian bonus dikirimi DM log foto id card (gaya premium,
// generateWeeklyBonusCard) + caption rapi.
//
// Waktu terakhir bonus dibagikan disimpan di database/weeklyBonus.json biar
// tetap akurat walau bot di-restart (tidak nambah 2x, dan tetap jalan kalau
// bot sempat mati beberapa jam pas waktunya tiba).

const fs = require("fs");
const path = require("path");
const { db, addCredits } = require("./database");
const { generateWeeklyBonusCard, tmpPath } = require("./helpers");

const FILE = path.join(__dirname, "..", "database", "weeklyBonus.json");
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const CHECK_INTERVAL_MS = 60 * 60 * 1000; // cek tiap 1 jam, ringan & cukup akurat
const BONUS_CREDIT = 5;

function ensureFile() {
  const dir = path.dirname(FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  // lastRunAt di-set ke "sekarang" pas pertama kali dibuat, biar bonus
  // pertama baru jalan 7 hari SETELAH bot ini di-deploy (bukan langsung
  // nembak semua user begitu fitur ini aktif).
  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, JSON.stringify({ lastRunAt: Date.now() }, null, 2));
}

function loadState() {
  ensureFile();
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf-8"));
  } catch (_) {
    return { lastRunAt: Date.now() };
  }
}

function saveState(state) {
  ensureFile();
  fs.writeFileSync(FILE, JSON.stringify(state, null, 2));
}

function getActiveUsers() {
  const cutoff = Date.now() - WEEK_MS;
  const users = db.getAllUsers();
  return users.filter((u) => {
    if (!u.lastActive) return false;
    const t = new Date(u.lastActive).getTime();
    return !isNaN(t) && t >= cutoff;
  });
}

async function runWeeklyBonus(client) {
  const activeUsers = getActiveUsers();
  console.log(`🎁 [WeeklyBonus] Membagikan +${BONUS_CREDIT} credit ke ${activeUsers.length} user aktif...`);

  let ok = 0, fail = 0;
  const waktu = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }) + " WIB";
  const now = new Date();
  const weekLabel = `Minggu ${now.toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}`;

  for (const u of activeUsers) {
    let cardPath = null;
    try {
      const newBalance = addCredits(u.userId, BONUS_CREDIT);

      let photoBuffer = null;
      try {
        const buf = await client.downloadProfilePhoto(u.userId);
        if (buf && buf.length) photoBuffer = buf;
      } catch (_) {}

      const cardBuffer = await generateWeeklyBonusCard({
        name: u.name || "Member",
        userId: u.userId,
        username: u.username || null,
        creditAdded: BONUS_CREDIT,
        newBalance,
        weekLabel,
        timeLabel: waktu,
        photo: photoBuffer,
      });

      cardPath = tmpPath(`weekly_bonus_${u.userId}_${Date.now()}.jpg`);
      fs.writeFileSync(cardPath, cardBuffer);

      await client.sendFile(u.userId, {
        file: cardPath,
        caption: `<blockquote>
🎁 <b>BONUS CREDIT MINGGUAN!</b>
━━━━━━━━━━━━━━━━━━
Makasih udah aktif pakai bot minggu ini, ini bonus buat kamu 🎉

💳 <b>Bonus</b> : +${BONUS_CREDIT} Credit
💰 <b>Saldo Sekarang</b> : ${newBalance} Credit
━━━━━━━━━━━━━━━━━━
✨ Tetap aktif tiap minggu biar kebagian bonus lagi ya!
</blockquote>`,
        parseMode: "html",
      });

      ok++;
    } catch (err) {
      fail++;
      console.error(`[WeeklyBonus] Gagal kirim bonus ke ${u.userId}:`, err.message);
    } finally {
      if (cardPath && fs.existsSync(cardPath)) {
        try { fs.unlinkSync(cardPath); } catch (_) {}
      }
    }
    await new Promise((r) => setTimeout(r, 250));
  }

  saveState({ lastRunAt: Date.now() });
  console.log(`🎁 [WeeklyBonus] Selesai. Sukses: ${ok}, Gagal: ${fail}`);

  return { total: activeUsers.length, ok, fail };
}

function startWeeklyBonusScheduler(client) {
  ensureFile();
  console.log("🎁 Weekly bonus scheduler aktif — cek tiap 1 jam (bonus tiap 7 hari sekali)");

  setInterval(() => {
    const state = loadState();
    if (Date.now() - state.lastRunAt >= WEEK_MS) {
      runWeeklyBonus(client).catch((err) => console.error("[WeeklyBonus] Error:", err.message));
    }
  }, CHECK_INTERVAL_MS);
}

module.exports = {
  startWeeklyBonusScheduler,
  runWeeklyBonus,
  getActiveUsers,
  BONUS_CREDIT,
};
