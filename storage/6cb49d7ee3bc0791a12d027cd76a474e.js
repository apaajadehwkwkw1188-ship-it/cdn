/**
 * GenerateAmPremAkun - Pake Api Fongsidev Not ByFc
 * Bypass: Menggunakan FongsiDev API Gak Pake ByFc Lagi Soalnya Udah di blokir website nya
 * By Zx 
 * Sumber Kode Saluran: https://whatsapp.com/channel/0029VbDLqe7EquiSF4STU13o
 * Saluran Rest api ya: https://whatsapp.com/channel/0029VapkSr45q08hPPPVqy26
 */

const https = require('https');
const { URL, URLSearchParams } = require('url');
const crypto = require('crypto');
const zlib = require('zlib');
const fs = require('fs');

class GenerateAmPremAkun {
  constructor(config = {}) {
    this.baseUrl = config.baseUrl || 'https://amprem.irfanjawa.com';
    this.timeout = config.timeout || 30000;
    this.maxRetries = config.maxRetries || 3;
    this.retryDelay = config.retryDelay || 2000;
    this.debug = config.debug !== false;
    this.turnstileSiteKey = config.turnstileSiteKey || '0x4AAAAAADsWLA16vNVNqTCH';
    this.userAgent = 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Mobile Safari/537.36';
    this.cookies = new Map();
    this.user = null;
    this.credentials = null;
    this.lastRequestTime = 0;
    this.v2AdsMethod = { url: '/api/ads/record', payload: { source: 'generator-v2' } };
    this.firebaseApiKey = 'AIzaSyDrZ9jr_Y16ltSBqsQR5IH6I04FRga6Ki0';
    
    this.cfApiUrl = 'https://fgsi.dpdns.org/api/tools/cfclearance/turnstile-min';
    this.cfApiKey = config.cfApiKey || 'fgsiapi-34da6005-6d'; // Create Apikey nya di https://fgsi.dpdns.org/ ya cuki plan free gak usah premium 🥰
  }

  _log(...a) { if (this.debug) console.log(`[AM ${new Date().toISOString().slice(11, 19)}]`, ...a); }
  _sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
  async _rateLimit() {
    const wait = 700 - (Date.now() - this.lastRequestTime);
    if (wait > 0) await this._sleep(wait);
    this.lastRequestTime = Date.now();
  }
  _parseCookies(list) {
    (Array.isArray(list) ? list : [list]).forEach(c => {
      const [name, ...v] = c.split(';')[0].split('=');
      this.cookies.set(name.trim(), v.join('=').trim());
    });
  }
  _cookieStr() { return [...this.cookies.entries()].map(([k, v]) => `${k}=${v}`).join('; '); }
  _parseCooldown(msg) {
    const m = /(\d+)\s*detik/i.exec(msg || '');
    return m ? parseInt(m[1], 10) : null;
  }
  _randEmail() { return crypto.randomBytes(8).toString('hex') + '@zxy.com'; }
  _randPass() { return crypto.randomBytes(12).toString('base64') + 'A1!'; }

  async _request(method, path, body = null, options = {}) {
    await this._rateLimit();
    const url = new URL(path, this.baseUrl);
    const headers = {
      'User-Agent': this.userAgent,
      'Accept': 'application/json',
      'Accept-Encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
      'Referer': options.referer || `${this.baseUrl}/dashboard/generator-v2`,
      'Origin': this.baseUrl,
    };
    if (this.cookies.size > 0) headers['Cookie'] = this._cookieStr();
    let payload = null;
    if (body !== null) {
      payload = JSON.stringify(body);
      headers['Content-Length'] = Buffer.byteLength(payload);
    }

    let lastErr;
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const res = await new Promise((resolve, reject) => {
          const req = https.request(url, { method, headers, timeout: this.timeout }, (r) => {
            const chunks = [];
            r.on('data', c => chunks.push(c));
            r.on('end', () => {
              let raw = Buffer.concat(chunks);
              try {
                const enc = r.headers['content-encoding'];
                if (enc === 'gzip') raw = zlib.gunzipSync(raw);
                else if (enc === 'deflate') raw = zlib.inflateSync(raw);
                else if (enc === 'br') raw = zlib.brotliDecompressSync(raw);
              } catch {}
              resolve({ statusCode: r.statusCode, headers: r.headers, text: raw.toString('utf-8') });
            });
          });
          req.on('error', reject);
          req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
          if (payload) req.write(payload);
          req.end();
        });

        if (res.headers['set-cookie']) this._parseCookies(res.headers['set-cookie']);
        let json = null;
        try { json = JSON.parse(res.text); } catch {}
        const result = { statusCode: res.statusCode, text: res.text, json, ok: res.statusCode >= 200 && res.statusCode < 300 };
        
        if (!options.silent) {
          this._log(`${method} ${path} → ${res.statusCode} ${json?.message || json?.error || ''}`);
        }
        
        if (!result.ok && !options.allowFail && res.statusCode !== 403) {
          throw new Error(`HTTP ${res.statusCode}: ${res.text.slice(0, 120)}`);
        }
        return result;
      } catch (err) {
        lastErr = err;
        if (attempt < this.maxRetries) await this._sleep(this.retryDelay * attempt);
      }
    }
    throw lastErr;
  }
  _get(p, o = {}) { return this._request('GET', p, null, o); }
  _post(p, b, o = {}) { return this._request('POST', p, b, o); }

  async solveTurnstile() {
    this._log('🛡️ Menyelesaikan Turnstile via FongsiDev API...');
    
    const apiUrl = new URL(this.cfApiUrl);
    apiUrl.searchParams.append('apikey', this.cfApiKey);
    apiUrl.searchParams.append('url', `${this.baseUrl}/auth`);
    apiUrl.searchParams.append('sitekey', this.turnstileSiteKey);

    const res = await new Promise((resolve, reject) => {
      const req = https.request(apiUrl, { 
        method: 'GET', 
        timeout: 60000,
        headers: {
          'Accept': 'application/json',
          'User-Agent': this.userAgent
        }
      }, (r) => {
        const chunks = [];
        r.on('data', c => chunks.push(c));
        r.on('end', () => {
          let raw = Buffer.concat(chunks);
          try {
            const enc = r.headers['content-encoding'];
            if (enc === 'gzip') raw = zlib.gunzipSync(raw);
            else if (enc === 'deflate') raw = zlib.inflateSync(raw);
          } catch {}
          resolve({ statusCode: r.statusCode, text: raw.toString('utf-8') });
        });
      });
      req.on('error', reject);
      req.on('timeout', () => { req.destroy(); reject(new Error('API timeout')); });
      req.end();
    });

    if (res.statusCode >= 200 && res.statusCode < 300) {
      let json;
      try { json = JSON.parse(res.text); } catch { throw new Error(`API mengembalikan bukan JSON: ${res.text.slice(0, 100)}`); }
      
      // FIX: FongsiDev mengembalikan { status: true, data: { token: "..." } }
      let token = json.result || json.token || json.response || json.cf_turnstile_response;
      if (!token && json.data) {
        if (typeof json.data === 'string') token = json.data;
        else if (typeof json.data === 'object' && json.data.token) token = json.data.token;
      }
      
      if (!token || typeof token !== 'string' || token.length < 50) {
        throw new Error(`API gagal mendapatkan token valid. Response: ${JSON.stringify(json).slice(0, 200)}`);
      }
      
      this._log(`✓ Turnstile solved via FongsiDev (${token.length} chars)`);
      return token;
    } else {
      throw new Error(`FongsiDev API Error ${res.statusCode}: ${res.text.slice(0, 150)}`);
    }
  }

  async register() {
    this.credentials = { email: this._randEmail(), password: this._randPass() };
    this._log(`📝 Register: ${this.credentials.email}`);
    const token = await this.solveTurnstile();
    const res = await this._post('/api/auth/register', { ...this.credentials, turnstileToken: token }, { allowFail: true, referer: `${this.baseUrl}/auth` });
    if (!res.ok || res.json?.success === false) throw new Error(res.json?.error || 'Register failed');
    this._log('✓ Registered');
  }

  async login() {
    this._log(`🔑 Login: ${this.credentials.email}`);
    const token = await this.solveTurnstile();
    const res = await this._post('/api/auth/login', { ...this.credentials, turnstileToken: token }, { allowFail: true, referer: `${this.baseUrl}/auth` });
    if (!res.ok || !res.json?.success) throw new Error(res.json?.error || 'Login failed');
    this.user = res.json.user;
    this._log('✓ Logged in');
  }

  async getStatus() {
    const res = await this._get('/api/generator-v2/status', { allowFail: true });
    return res.ok ? res.json : null;
  }

  async watchV2Ads(target = 5) {
    this._log(`🎯 Menonton iklan V2 (target: ${target})...`);
    for (let i = 0; i < 60; i++) {
      const st = await this.getStatus();
      const count = st?.session?.adsCompleted || 0;
      if (count >= target) {
        this._log(`✓ Target V2 ads tercapai: ${count}/${target}`);
        return count;
      }
      const res = await this._post(this.v2AdsMethod.url, this.v2AdsMethod.payload, { allowFail: true });
      if (res.ok && res.json?.success) {
        this._log(`✓ V2 Ad recorded (Progress: ${res.json.message || ''})`);
        await this._sleep(4000);
        continue;
      }
      if (res.statusCode === 400) {
        const wait = this._parseCooldown(res.json?.error) ?? 10;
        this._log(`⏳ Cooldown: tunggu ${wait + 1}s...`);
        await this._sleep((wait + 1) * 1000);
        continue;
      }
      throw new Error(res.json?.error || `V2 record failed HTTP ${res.statusCode}`);
    }
    throw new Error('V2 Ads loop melebihi batas');
  }

  async triggerAMLogin(email) {
    this._log('🔥 Phase 3a: Trigger Firebase Auth (Alight Motion)...');
    const urlV1 = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${this.firebaseApiKey}`;
    const payload = JSON.stringify({
      email: email, requestType: "EMAIL_SIGNIN", continueUrl: "https://alightcreative.com",
      canHandleCodeInApp: true, androidPackageName: "com.alightcreative.motion",
      androidInstallApp: true, androidMinimumVersion: "12", iOSBundleId: "com.alightcreative.alightmotion"
    });
    const referers = ['https://alight-creative.firebaseapp.com/', 'https://alightcreative.com/'];
    for (const referer of referers) {
      const headers = {
        'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload),
        'User-Agent': this.userAgent, 'X-Client-Version': 'Chrome/JsCore/10.12.0/FirebaseCore-web',
        'Referer': referer, 'Origin': referer.endsWith('/') ? referer.slice(0, -1) : referer
      };
      try {
        const res = await new Promise((resolve, reject) => {
          const req = https.request(urlV1, { method: 'POST', headers, timeout: 15000 }, (r) => {
            let data = ''; r.on('data', chunk => data += chunk); r.on('end', () => resolve({ statusCode: r.statusCode, text: data }));
          });
          req.on('error', reject); req.write(payload); req.end();
        });
        if (res.statusCode === 200) {
          this._log(`✓ Email verifikasi AM berhasil dikirim! (Referer: ${referer})`);
          return true;
        } else if (res.statusCode === 403 && res.text.includes('referer')) {
          continue;
        }
      } catch (err) {}
    }
    return false;
  }

  _cleanDeepLink(u) {
    if (!u) return u;
    return u.split(/%27%3E|'%3E|'>|"%3E|">/)[0].trim();
  }

  async extractDeepLink(timeoutMs = 150000) {
    this._log('🔗 Phase 3b: menunggu server mengekstrak link2...');
    const start = Date.now();
    let lastStage = '';
    while (Date.now() - start < timeoutMs) {
      const poll = await this._get('/api/generator-v2/poll-email', { allowFail: true });
      if (poll.ok && poll.json) {
        if (poll.json.stage !== lastStage) {
          this._log(`   poll: [${poll.json.stage}] ${poll.json.message || ''}`);
          lastStage = poll.json.stage;
        }
        const early = poll.json.link2ExtractedUrl || poll.json.url || poll.json.deepLink;
        if (early) return this._cleanDeepLink(early);
      }
      const st = await this.getStatus();
      const url = st?.session?.link2ExtractedUrl;
      if (url) {
        this._log('✓ Deep link didapatkan!');
        return this._cleanDeepLink(url);
      }
      await this._sleep(5000);
    }
    return null;
  }

  _extractOobCode(deepLink) {
    try {
      const url = new URL(deepLink);
      let innerLink = url.searchParams.get('link') || deepLink;
      innerLink = decodeURIComponent(innerLink);
      const innerUrl = new URL(innerLink);
      return innerUrl.searchParams.get('oobCode');
    } catch (e) {
      const match = /oobCode(?:%3D|=)([^&%]+)/i.exec(deepLink);
      return match ? decodeURIComponent(match[1]) : null;
    }
  }

  async getFirebaseTokens(email, oobCode) {
    this._log('🔥 Phase 4: Menukar oobCode dengan Firebase Tokens...');
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithEmailLink?key=${this.firebaseApiKey}`;
    const payload = JSON.stringify({ email, oobCode });
    const headers = {
      'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload),
      'User-Agent': this.userAgent, 'X-Client-Version': 'Chrome/JsCore/10.12.0/FirebaseCore-web',
      'Referer': 'https://alight-creative.firebaseapp.com/', 'Origin': 'https://alight-creative.firebaseapp.com'
    };
    const res = await new Promise((resolve, reject) => {
      const req = https.request(url, { method: 'POST', headers, timeout: 15000 }, (r) => {
        let data = ''; r.on('data', chunk => data += chunk); r.on('end', () => resolve({ statusCode: r.statusCode, text: data }));
      });
      req.on('error', reject); req.write(payload); req.end();
    });
    if (res.statusCode === 200) {
      const json = JSON.parse(res.text);
      this._log('✓ Firebase Tokens berhasil diekstrak!');
      return { idToken: json.idToken, refreshToken: json.refreshToken, email: json.email };
    }
    this._log(`⚠️ Gagal mendapatkan tokens: ${res.statusCode} ${res.text.slice(0, 100)}`);
    return null;
  }

  _extractLinkFromText(text) {
    if (!text) return null;
    const m = /https:\/\/alight-creative\.firebaseapp\.com\/__\/auth\/links\?[^"'<>\s\\]+/i.exec(text);
    if (m) return m[0].replace(/&amp;/g, '&');
    const m2 = /https:\/\/alightcreative\.com\/auth_action\/\?[^"'<>\s\\]+/i.exec(text);
    return m2 ? m2[0].replace(/&amp;/g, '&') : null;
  }

  async _tryTempMailInbox(tempEmail, silent = false) {
    const candidates = [
      `/api/temp-mail/messages?email=${encodeURIComponent(tempEmail)}`,
      `/api/temp-mail/inbox?email=${encodeURIComponent(tempEmail)}`,
      `/api/temp-mail/messages?address=${encodeURIComponent(tempEmail)}`,
    ];
    for (const p of candidates) {
      try {
        const res = await this._get(p, { allowFail: true, silent });
        if (res.ok && res.text && /alight/i.test(res.text)) {
          const link = this._extractLinkFromText(res.text);
          if (link) return link;
        }
      } catch {}
    }
    return null;
  }

  async waitForAppLink(previousLink, tempEmail, timeoutMs = 240000) {
    this._log('📱 Phase 5: menunggu link login BARU dari aplikasi di HP Anda...');
    const prevCode = this._extractOobCode(previousLink || '');
    const start = Date.now();
    let dotCount = 0;
    
    while (Date.now() - start < timeoutMs) {
      const stRes = await this._get('/api/generator-v2/status', { allowFail: true, silent: true });
      const st = stRes?.ok ? stRes.json : null;
      const u1 = st?.session?.link2ExtractedUrl;
      if (u1 && this._extractOobCode(u1) && this._extractOobCode(u1) !== prevCode) {
        if (dotCount > 0) process.stdout.write('\n');
        return this._cleanDeepLink(u1);
      }
      
      const poll = await this._get('/api/generator-v2/poll-email', { allowFail: true, silent: true });
      const u2 = poll?.json?.link2ExtractedUrl || poll?.json?.url || poll?.json?.deepLink;
      if (u2 && this._extractOobCode(u2) && this._extractOobCode(u2) !== prevCode) {
        if (dotCount > 0) process.stdout.write('\n');
        return this._cleanDeepLink(u2);
      }
      
      const u3 = await this._tryTempMailInbox(tempEmail, true);
      if (u3 && this._extractOobCode(u3) && this._extractOobCode(u3) !== prevCode) {
        if (dotCount > 0) process.stdout.write('\n');
        return this._cleanDeepLink(u3);
      }
      
      process.stdout.write('.');
      dotCount++;
      if (dotCount % 60 === 0) process.stdout.write('\n');
      
      await this._sleep(4000);
    }
    if (dotCount > 0) process.stdout.write('\n');
    return null;
  }

  async fullAutoWorkflow() {
    console.log('═'.repeat(62));
    console.log('🚀 GenerateAmPremAkun v21 - Pake Api Fongsidev Not ByFc');
    console.log('═'.repeat(62));

    await this.register();
    await this.login();
    await this.watchV2Ads(1);

    this._log('📧 Generate Temp Mail...');
    const gen = await this._post('/api/temp-mail/generate', {}, { allowFail: true });
    if (!gen.ok || !gen.json?.success) throw new Error(gen.json?.error || 'Gagal buat temp mail');
    const tempEmail = gen.json.emailAddress;
    this._log(`✓ Temp email: ${tempEmail} (sisa poin: ${gen.json.adPoints})`);

    await this.watchV2Ads(5);

    this._log('🔗 Select Email & Trigger Magic Link...');
    const sel = await this._post('/api/generator-v2/select-email', { emailAddress: tempEmail }, { allowFail: true });
    if (!sel.ok || !sel.json?.success) throw new Error(sel.json?.error || 'select-email gagal');
    this._log(`✓ ${sel.json.message}`);

    this._log('⏳ Polling verifikasi link1 (premium)...');
    let premium = false;
    for (let i = 0; i < 40 && !premium; i++) {
      await this._sleep(3000);
      const poll = await this._get('/api/generator-v2/poll-email', { allowFail: true });
      if (poll.ok && poll.json?.message) {
        this._log(`   poll: [${poll.json.stage}] ${poll.json.message}`);
        if (/premium aktif/i.test(poll.json.message)) premium = true;
      }
      const st2 = await this.getStatus();
      if (st2?.isPremium === true) premium = true;
    }

    let deepLink = null;
    let tokens = null;
    if (premium) {
      const firebaseOk = await this.triggerAMLogin(tempEmail);
      if (firebaseOk) {
        deepLink = await this.extractDeepLink();
        if (deepLink) {
          const oobCode = this._extractOobCode(deepLink);
          if (oobCode) tokens = await this.getFirebaseTokens(tempEmail, oobCode);
        }
      }
    }

    let appLink = null;
    if (premium) {
      console.log('');
      console.log('📱 SEKARANG DI HP ANDA (script menunggu 4 menit):');
      console.log(`   1. Buka aplikasi Alight Motion.`);
      console.log(`   2. Login → pilih masuk dengan EMAIL.`);
      console.log(`   3. Ketik email: ${tempEmail}`);
      console.log(`   4. Aplikasi akan mengirim email login.`);
      console.log('   Script otomatis menyergap link loginnya...');
      appLink = await this.waitForAppLink(deepLink, tempEmail);
      if (appLink) {
        this._log('✓ Link login aplikasi BARU berhasil disergap!');
      }
    }

    const final = await this.getStatus();

    console.log('═'.repeat(62));
    console.log(premium ? '✅✅ PREMIUM SUKSES DIAKTIFKAN! ✅✅' : '⚠️ Cek status di atas');
    console.log(`   Email AM   : ${tempEmail}`);
    console.log(`   Premium    : ${premium ? 'YES' : 'NO'}`);
    if (tokens) {
      console.log('─'.repeat(62));
      console.log('🔑 (OPSIONAL - untuk Mod APK) Refresh Token:');
      console.log(`   ${tokens.refreshToken}`);
    }
    if (appLink) {
      console.log('─'.repeat(62));
      console.log('📱 LINK LOGIN APLIKASI RESMI (DEEP LINK):');
      console.log('   ⚠️  PENTING: JANGAN paste langsung di address bar Chrome!');
      console.log('   📲 CARA PAKAI:');
      console.log('   1. Copy link di bawah, kirim ke WA / Telegram / Gmail di HP.');
      console.log('   2. Buka pesan tsb, KLIK linknya dari dalam WA/Gmail.');
      console.log('   3. Pilih "Buka di Alight Motion" saat muncul pop-up.');
      console.log('─'.repeat(62));
      console.log(appLink);
      console.log('─'.repeat(62));
      fs.writeFileSync('app_login_link.txt', appLink);
    } else if (premium) {
      console.log('─'.repeat(62));
      console.log('⚠️ Script gagal menyergap link otomatis. Cara manual:');
      console.log('   Buka dashboard amprem → menu Temp Mail di HP →');
      console.log('   buka email terbaru dari Alight Motion → ketuk linknya.');
    }
    console.log('═'.repeat(62));

    return { timestamp: new Date().toISOString(), credentials: this.credentials, tempEmail, premium, tokens, deepLink, appLink };
  }
}

(async () => {
  const scraper = new GenerateAmPremAkun({ debug: true });
  try {
    const result = await scraper.fullAutoWorkflow();
    const file = `premium_${Date.now()}.json`;
    fs.writeFileSync(file, JSON.stringify(result, null, 2));
    console.log(`💾 Saved: ${file}${result.appLink ? ' + app_login_link.txt' : ''}`);
  } catch (e) {
    console.error('❌ Fatal:', e.message);
    process.exit(1);
  }
})();