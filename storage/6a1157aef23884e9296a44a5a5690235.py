import os
import logging
import httpx
from dotenv import load_dotenv
from telegram import Update
from telegram.ext import (
    ApplicationBuilder, CommandHandler, MessageHandler,
    ContextTypes, filters
)

load_dotenv()
BOT_TOKEN = os.getenv("BOT_TOKEN")
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://127.0.0.1:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.2:1b")

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO,
)
log = logging.getLogger("ollama-bot")

user_history = {}
MAX_HISTORY = 20

SYSTEM_PROMPT = (
    "Kamu adalah asisten AI pribadi yang cerdas, santai, dan membantu. "
    "Jawab dalam bahasa Indonesia yang natural. "
    "Bantu user dengan coding, penjelasan teknis, dan pertanyaan umum."
)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        f"🤖 *Ollama Bot* aktif!\n"
        f"Model: `{OLLAMA_MODEL}`\n\n"
        "Kirim pesan apa aja, gua jawab.\n"
        "/reset — hapus memory\n"
        "/model — cek model aktif\n"
        "/ping — cek status Ollama",
        parse_mode="Markdown"
    )

async def reset(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_history.pop(update.effective_user.id, None)
    await update.message.reply_text("🧹 Memory dihapus.")

async def model_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(f"🧠 Model: `{OLLAMA_MODEL}`", parse_mode="Markdown")

async def ping(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        async with httpx.AsyncClient(timeout=5) as client:
            r = await client.get(f"{OLLAMA_URL}/api/tags")
        if r.status_code == 200:
            models = [m["name"] for m in r.json().get("models", [])]
            await update.message.reply_text(
                "✅ Ollama online\nModel terpasang:\n" + "\n".join(f"• {m}" for m in models)
            )
        else:
            await update.message.reply_text(f"⚠️ Ollama respon {r.status_code}")
    except Exception as e:
        await update.message.reply_text(f"❌ Ollama offline: {e}")

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    uid = update.effective_user.id
    text = update.message.text
    if not text:
        return

    await context.bot.send_chat_action(
        chat_id=update.effective_chat.id, action="typing"
    )

    history = user_history.setdefault(uid, [])
    history.append({"role": "user", "content": text})
    if len(history) > MAX_HISTORY:
        history[:] = history[-MAX_HISTORY:]

    payload = {
        "model": OLLAMA_MODEL,
        "messages": [{"role": "system", "content": SYSTEM_PROMPT}] + history,
        "stream": False,
        "options": {"temperature": 0.7, "num_predict": 1024},
    }

    try:
        async with httpx.AsyncClient(timeout=120) as client:
            r = await client.post(f"{OLLAMA_URL}/api/chat", json=payload)
        r.raise_for_status()
        answer = r.json()["message"]["content"]
    except Exception as e:
        log.exception("Ollama error")
        await update.message.reply_text(f"❌ Error: {e}")
        return

    history.append({"role": "assistant", "content": answer})

    for i in range(0, len(answer), 4000):
        await update.message.reply_text(answer[i:i+4000])

def main():
    app = ApplicationBuilder().token(BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("reset", reset))
    app.add_handler(CommandHandler("model", model_cmd))
    app.add_handler(CommandHandler("ping", ping))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    log.info("Bot mulai polling...")
    app.run_polling()

if __name__ == "__main__":
    main()