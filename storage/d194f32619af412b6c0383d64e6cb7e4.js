const axios = require('axios');

function generateRandomFingerprint() {
    const cpuList = [4, 8, 12, 16];
    const ramList = [4, 8, 16, 32];
    const rendererList = [
        "ANGLE (NVIDIA, NVIDIA GeForce RTX 3060 Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "ANGLE (AMD, AMD Radeon Graphics Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "ANGLE (Intel, Intel(R) Iris(R) Xe Graphics Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "Mali-G57 MC2",
        "Adreno (TM) 610"
    ];

    const isMobile = Math.random() > 0.5;

    return {
        cpu: cpuList[Math.floor(Math.random() * cpuList.length)],
        memory: ramList[Math.floor(Math.random() * ramList.length)],
        touch: isMobile ? Math.floor(Math.random() * 5) + 1 : 0,
        platform: isMobile ? "Linux armv81" : "Win32",
        lang: "id-ID",
        vendor: "Google Inc.",
        webgl_vendor: "Google Inc. (NVIDIA)",
        webgl_renderer: rendererList[Math.floor(Math.random() * rendererList.length)],
        ua: isMobile ?
            'Mozilla/5.0 (Linux; Android 13; CPH2565) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36' :
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        backup_token: null
    };
}

const mergeCookies = (newCookieHeaders, currentCookies = '') => {
    if (!newCookieHeaders) return currentCookies;
    const newCookiesStr = newCookieHeaders.map(c => c.split(';')[0].trim()).join('; ');
    return currentCookies ? `${currentCookies}; ${newCookiesStr}` : newCookiesStr;
};

async function cekLinkAktif(url) {
    try {
        const response = await axios.get(url, {
            headers: {
                'Range': 'bytes=0-0',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            timeout: 5000
        });
        return response.status === 200 || response.status === 206;
    } catch (error) {
        return false;
    }
}

async function ambilSurl(link) {
    try {
        let url = new URL(link);
        let surl = url.searchParams.get('surl');

        if (!surl) throw new Error('SURL tidak ditemukan di link');

        return {
            status: true,
            surl: surl,
            full_link: `https://www.terabox.app/wap/share/filelist?surl=${surl}`
        };

    } catch (e) {
        return {
            status: false,
            message: e.message
        };
    }
}

async function TeraDl(targetUrl) {
    const baseUrl = 'https://flowvideoplayer.com';
    const fingerprint = generateRandomFingerprint();
    try {
        const homeResponse = await axios.get(baseUrl, {
            headers: {
                'Accept': 'text/html',
                'User-Agent': fingerprint.ua
            }
        });

        const csrfMatch = homeResponse.data.match(/<meta name="csrf-token" content="([^"]+)">/);
        if (!csrfMatch) throw new Error("CSRF token tidak ditemukan.");

        const csrfToken = csrfMatch[1];
        let cookies = mergeCookies(homeResponse.headers['set-cookie']);

        const apiHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': csrfToken,
            'Origin': baseUrl,
            'Referer': `${baseUrl}/`,
            'User-Agent': fingerprint.ua,
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty'
        };

        const initResponse = await axios.post(`${baseUrl}/device/init`, JSON.stringify(fingerprint), {
            headers: {
                ...apiHeaders,
                'Cookie': cookies
            }
        });

        if (initResponse.data.status !== true) {
            throw new Error("Gagal init device: " + (initResponse.data.message || 'Unknown error'));
        }

        cookies = mergeCookies(initResponse.headers['set-cookie'], cookies);

        const searchResponse = await axios.post(`${baseUrl}/telegram/bot/search/video`, JSON.stringify({
            url: targetUrl
        }), {
            headers: {
                ...apiHeaders,
                'Cookie': cookies
            }
        });

        const apiData = searchResponse.data;

        if (apiData && apiData.status === true && apiData.code === 200) {
            const items = apiData.response;

            if (!items || items.length === 0) {
                return {
                    status: "failed",
                    code: 400,
                    message: "Data response dari API kosong"
                };
            }

            const processedFilesPromises = items.map(async (res) => {
                let downloadUrl = res.download_url;
                let isAktif = false;
                let isFolder = false;
                if (!downloadUrl || downloadUrl.trim() === "") {
                    downloadUrl = "gagal ambil video kemungkinan video dalam folder";
                    isFolder = true;
                    isAktif = false;
                } else {
                    isAktif = await cekLinkAktif(downloadUrl);
                }

                return {
                    filename: res.file_name || "Unknown",
                    size: res.file_size_bytes || 0,
                    sizeFormatted: res.file_size || "0 B",
                    fsId: null,
                    isDir: isFolder,
                    thumbUrl: res.thumbnail || null,
                    downloadUrl: downloadUrl,
                    fast_stream_url: res.fast_stream_url || null,
                    link_status: isAktif ? "active" : "inactive"
                };
            });
            const processedFiles = await Promise.all(processedFilesPromises);

            const primaryFile = processedFiles.find(f => f.downloadUrl !== "gagal ambil video kemungkinan video dalam folder") || processedFiles[0];

            return {
                status: "success",
                code: 200,
                message: "Semua data berhasil diproses secara lengkap",
                data: {
                    Result: processedFiles
                }
            };
        } else {
            return {
                status: "failed",
                code: apiData?.code || 400,
                message: apiData?.message || "Gagal mendapatkan data valid dari API Terabox"
            };
        }
    } catch (error) {
        const errorMsg = error.response ? `HTTP ${error.response.status} - ${JSON.stringify(error.response.data)}` : error.message;
        return {
            success: false,
            message: errorMsg
        };
    }
}

module.exports = TeraDl