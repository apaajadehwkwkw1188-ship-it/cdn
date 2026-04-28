const express = require("express");
const multer = require("multer");
const axios = require("axios");
const crypto = require("crypto");
const mime = require("mime-types");
const FormData = require("form-data");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

// =======================
const GITHUB_TOKEN = "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";
const GITHUB_OWNER = "apaajadehwkwkw1188-ship-it";
const GITHUB_REPO = "cdn";
const GITHUB_BRANCH = "main";

const JSON_PATH = "lib/proxy.json";
const UGUU_API = "https://uguu.se/upload.php";

// =======================
function randomName() {
  return crypto.randomBytes(16).toString("hex");
}

function randomToken() {
  return crypto.randomBytes(6).toString("hex");
}

function getBaseUrl(req) {
  return `${req.headers["x-forwarded-proto"] || "https"}://${req.headers.host}`;
}

// =======================
// 📥 GET JSON FROM GITHUB
// =======================
async function getProxyMap() {
  const res = await axios.get(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${JSON_PATH}`,
    {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
    }
  );

  const content = Buffer.from(res.data.content, "base64").toString();
  return {
    data: JSON.parse(content),
    sha: res.data.sha
  };
}

// =======================
// 💾 SAVE JSON TO GITHUB
// =======================
async function saveProxyMap(newData, sha) {
  const content = Buffer.from(JSON.stringify(newData, null, 2)).toString("base64");

  await axios.put(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${JSON_PATH}`,
    {
      message: "update proxy map",
      content,
      sha,
      branch: GITHUB_BRANCH
    },
    {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
    }
  );
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =======================
// 🔥 GET JSON (AUTO CREATE)
// =======================
async function getProxyMap() {
  try {
    const res = await axios.get(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${JSON_PATH}`,
      {
        headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
      }
    );

    const content = Buffer.from(res.data.content, "base64").toString();

    return {
      data: JSON.parse(content),
      sha: res.data.sha
    };

  } catch (err) {
    // kalau file belum ada → bikin baru
    return {
      data: {},
      sha: null
    };
  }
}

// =======================
// 💾 SAVE JSON (AUTO CREATE)
// =======================
async function saveProxyMap(newData, sha) {
  const content = Buffer.from(
    JSON.stringify(newData, null, 2)
  ).toString("base64");

  await axios.put(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${JSON_PATH}`,
    {
      message: "update proxy map",
      content,
      sha: sha || undefined,
      branch: GITHUB_BRANCH
    },
    {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
    }
  );
}

// =======================
// 🔥 UPLOAD (FIXED)
// =======================

// =======================
app.get("/", (req, res) => {
  res.send("OK");
});

// =======================
// 🔥 UPLOAD (UGUU + SAVE JSON)
// =======================
app.post("/api/upload.php", upload.single("file"), async (req, res) => {
  try {
    let buffer;
    let filename;

    // =========================
    // FILE
    // =========================
    if (req.file) {
      buffer = req.file.buffer;
      filename = req.file.originalname;

    // =========================
    // URL
    // =========================
    } else if (req.body.url) {
      const response = await axios.get(req.body.url, {
        responseType: "arraybuffer",
        timeout: 20000,
        headers: {
          "User-Agent": "Mozilla/5.0"
        }
      });

      buffer = response.data;

      const urlPath = new URL(req.body.url).pathname;
      filename = urlPath.split("/").pop() || "file";

    } else {
      return res.status(400).json({ error: "No file or url" });
    }

    // =========================
    // EXTENSION FIX
    // =========================
    let ext = filename.split(".").pop().toLowerCase();
    if (!ext || ext.length > 5) ext = "bin";

    const id = crypto.randomBytes(16).toString("hex");
    const finalName = `${id}.${ext}`;

    // =========================
    // BASE64
    // =========================
    const content = buffer.toString("base64");

    // =========================
    // UPLOAD KE GITHUB
    // =========================
    await axios.put(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/storage/${finalName}`,
      {
        message: `upload ${finalName}`,
        content,
        branch: GITHUB_BRANCH
      },
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`
        }
      }
    );

    const baseUrl = getBaseUrl(req);

    res.json({
      success: true,
      url: `${baseUrl}/storage/${finalName}?preview=true`
    });

  } catch (err) {
    console.log("UPLOAD ERROR:", err.response?.data || err.message);

    res.status(500).json({
      error: err.response?.data || err.message
    });
  }
});
app.get("/storage/:filename", async (req, res) => {
  try {
    const rawUrl = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/storage/${req.params.filename}`;

    const response = await axios.get(rawUrl, {
      responseType: "stream"
    });

    if (req.query.preview === "true") {
      res.setHeader(
        "Content-Type",
        mime.lookup(req.params.filename) || "application/octet-stream"
      );
    } else {
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${req.params.filename}"`
      );
    }

    response.data.pipe(res);

  } catch (err) {
    console.log("PROXY ERROR:", err.message);
    res.status(404).send("File tidak ditemukan");
  }
});

// =======================
module.exports = app;
