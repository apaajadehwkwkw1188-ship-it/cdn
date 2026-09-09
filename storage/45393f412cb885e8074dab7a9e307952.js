import { MiniA2UI, sendMiniA2UI } from "../lib/a2ui.js";

function formatMs(ms = 0) {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

async function searchSong(query) {
  const url = new URL("https://itunes.apple.com/search");
  url.searchParams.set("term", query);
  url.searchParams.set("entity", "song");
  url.searchParams.set("limit", "1");

  const res = await fetch(url);
  if (!res.ok) throw new Error("Music search failed");
  const data = await res.json();
  return data.results?.[0] || null;
}

export async function handlePlay(sock, m, query) {
  const jid = m.key.remoteJid;

  if (!query) {
    return sock.sendMessage(jid, {
      text: "Contoh: .play About You The 1975"
    }, { quoted: m });
  }

  const song = await searchSong(query);

  if (!song) {
    return sock.sendMessage(jid, {
      text: `Lagu "${query}" tidak ditemukan.`
    }, { quoted: m });
  }

  const ui = new MiniA2UI();

  const playlist = ui.text("PLAYLIST", "caption");
  const playlistName = ui.text("Now Playing", "h2");
  const cover = ui.image(song.artworkUrl100?.replace("100x100", "600x600"));
  const title = ui.text(song.trackName, "h1");
  const artist = ui.text(song.artistName, "body");
  const duration = ui.text(`0:00                              ${formatMs(song.trackTimeMillis)}`, "caption");
  const divider = ui.divider();

  const prev = ui.button("⏮", "music_prev");
  const pause = ui.button("⏯", "music_toggle");
  const next = ui.button("⏭", "music_next");
  const controls = ui.row([prev, pause, next]);

  const card = ui.card(ui.column([
    playlist,
    playlistName,
    cover,
    title,
    artist,
    duration,
    divider,
    controls
  ]));

  ui.root([card]);

  await sendMiniA2UI(sock, jid, ui, {
    quoted: m,
    bodyText: ""
  });

  // Legal 30s preview from iTunes, sent as a playable WhatsApp audio.
  if (song.previewUrl) {
    await sock.sendMessage(jid, {
      audio: { url: song.previewUrl },
      mimetype: "audio/mpeg",
      ptt: false,
      fileName: `${song.trackName} - ${song.artistName}.m4a`
    }, { quoted: m });
  }
}
