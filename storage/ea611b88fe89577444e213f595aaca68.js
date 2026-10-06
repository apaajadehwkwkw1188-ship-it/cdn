/**
 * CENTRAL EMOJI ID FILE
 * Hanya berisi emoji yang benar-benar dipakai/terdeteksi di bot.js
 * Ubah ID emoji di sini sekali, otomatis berubah di semua file
 *
 * CATATAN:
 * - emoji-id di bawah masih berupa CONTOH/placeholder.
 * - Ganti value emoji-id="..." dengan custom emoji ID asli milikmu.
 * - <tg-emoji> hanya tampil sebagai custom emoji jika bot mengirim dengan
 *   parse_mode HTML dan akun penerima punya Telegram Premium. Selain itu,
 *   Telegram akan otomatis fallback menampilkan emoji unicode biasa di dalamnya.
 */

const E = {
    ROBOT: '<tg-emoji emoji-id="5355051922862653659">🤖</tg-emoji>',
    CHECK: '<tg-emoji emoji-id="5206607081334906820">✅</tg-emoji>',
    ERROR: '<tg-emoji emoji-id="5210952531676504517">❌</tg-emoji>',
    WARNING: '<tg-emoji emoji-id="5420323339723881652">⚠️</tg-emoji>',
    PACKAGE: '<tg-emoji emoji-id="5388683870432410767">📦</tg-emoji>',
    GEAR: '<tg-emoji emoji-id="5388725162247992600">⚙️</tg-emoji>',
    CROWN: '<tg-emoji emoji-id="5217822164362739968">👑</tg-emoji>',
    USER: '<tg-emoji emoji-id="5373012449597335010">👤</tg-emoji>',
    STATS: '<tg-emoji emoji-id="5231200819986047254">📊</tg-emoji>',
    QUEUE: '<tg-emoji emoji-id="5352765106180610755">📋</tg-emoji>',
    DOWNLOAD: '<tg-emoji emoji-id="5443127283898405358">📥</tg-emoji>',
    HELP: '<tg-emoji emoji-id="5373134035826534515">❓</tg-emoji>',
    CHANNEL: '<tg-emoji emoji-id="5215668805199473901">📢</tg-emoji>',
    HOURGLASS: '<tg-emoji emoji-id="5990109364956958958">⏳</tg-emoji>',
    FOLDER: '<tg-emoji emoji-id="6334367610959824701">📂</tg-emoji>',
    LINK: '<tg-emoji emoji-id="5902449142575141204">🔗</tg-emoji>',
    DART: '<tg-emoji emoji-id="5388721082029061513">🎯</tg-emoji>',
    MEMO: '<tg-emoji emoji-id="5389067196263577414">📝</tg-emoji>',
    SEARCH: '<tg-emoji emoji-id="5292019493927674004">🔍</tg-emoji>',
    GIFT: '<tg-emoji emoji-id="5203996991054432397">🎁</tg-emoji>',
    MONEY: '<tg-emoji emoji-id="5271882294947231657">💳</tg-emoji>',
    PARTY: '<tg-emoji emoji-id="5461151367559141950">🎉</tg-emoji>',
    LIGHT: '<tg-emoji emoji-id="5422439311196834318">💡</tg-emoji>',
    BOOK: '<tg-emoji emoji-id="5435982738945483816">📖</tg-emoji>',

    // ========== AUTO-DETECTED ==========
    DOCUMENT: '<tg-emoji emoji-id="5956561916573782596">📄</tg-emoji>',
    PIN: '<tg-emoji emoji-id="5397782960512444700">📌</tg-emoji>',
    NUM_ONE: '<tg-emoji emoji-id="5364046348884656428">1️⃣</tg-emoji>',
    NUM_TWO: '<tg-emoji emoji-id="5298829941964564919">2️⃣</tg-emoji>',
    NUM_THREE: '<tg-emoji emoji-id="5325623872102355919">3️⃣</tg-emoji>',
    NO_ENTRY: '<tg-emoji emoji-id="5420323339723881652">⛔</tg-emoji>',
    USERS: '<tg-emoji emoji-id="5384356403118886801">👥</tg-emoji>',
    REFRESH: '<tg-emoji emoji-id="5030872266716480568">🔄</tg-emoji>',
    UPLOAD: '<tg-emoji emoji-id="5443127283898405358">📤</tg-emoji>'
};

/**
 * Ambil versi emoji polos (tanpa tag <tg-emoji>) dari sebuah key di E.
 * WAJIB dipakai untuk teks yang TIDAK mendukung HTML, misalnya:
 * label tombol inline keyboard (button.text), notifikasi native, dsb.
 * Contoh: P('CHECK') -> '✅'
 */
function P(key) {
  const val = E[key];
  if (!val) return '';
  const m = val.match(/>([^<]*)<\/tg-emoji>/);
  return m ? m[1] : val;
}

module.exports = { E, P };
