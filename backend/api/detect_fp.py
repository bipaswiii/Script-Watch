import requests
from bs4 import BeautifulSoup
import re
import hashlib
import json

fingerprinting_patterns = [
    re.compile(r"var np = navigator\.platform;", re.IGNORECASE),
    re.compile(r"var nv = navigator\.vendor;", re.IGNORECASE),
    re.compile(r"var cd = window\.screen\.colorDepth;", re.IGNORECASE),
    re.compile(r"var dpr = window\.devicePixelRatio;", re.IGNORECASE),
    re.compile(r"var cpu = navigator\.cpuClass;", re.IGNORECASE),
    re.compile(r"var hc = navigator\.hardwareConcurrency;", re.IGNORECASE),
    re.compile(r"var dm = navigator\.deviceMemory;", re.IGNORECASE),
    re.compile(r"var os = navigator\.oscpu;", re.IGNORECASE),
    re.compile(r"var dnt = navigator\.doNotTrack;", re.IGNORECASE),
    re.compile(r'colorGamuts = \["rec2020", "p3", "srgb"\]', re.IGNORECASE),
    re.compile(r'Boolean\(matchMedia\("\(prefers-reduced-motion: " \+ x \+ "\)"\)\.matches\)', re.IGNORECASE),
    re.compile(r'Boolean\(matchMedia\("\(dynamic-range: " \+ x \+ "\)"\)\.matches\)', re.IGNORECASE),
    re.compile(r'Boolean\(matchMedia\("\(prefers-contrast: " \+ x \+ "\)"\)\.matches\)', re.IGNORECASE),
    re.compile(r'resolve\(\[0, \[Number\(screen\.width\), Number\(screen\.height\)\]\.sort\(\)\.reverse\(\)\.join\("x"\)\]\)', re.IGNORECASE),
    re.compile(r'sourceBuffer'),
    re.compile(r'colorGamut'),
    re.compile(r'reducedMotion'),
    re.compile(r'hdr'),
    re.compile(r'contrast'),
    re.compile(r'invertedColors'),
    re.compile(r'forcedColors'),
    re.compile(r'monochrome'),
    re.compile(r'browserObjects'),
    re.compile(r'new Date\(\)\.getTimezoneOffset\(\)'),
    re.compile(r'Intl\.DateTimeFormat\(\)\.resolvedOptions\(\)\.timeZone'),
    re.compile(r'navigator\.language'),
    re.compile(r'performance\.memory\.jsHeapSizeLimit'),
    re.compile(r'new (window\.AudioContext|window\.webkitAudioContext)'),
    re.compile(r'gl\.getParameter\((gl\.VERSION|gl\.VENDOR)\)'),
    re.compile(r'new FontFace\('),
    re.compile(r'navigator\.plugins\.length === 0'),
    re.compile(r'Math\.random'),
    re.compile(r'Notification\.requestPermission')
]

def scrape_page(url):
    response = requests.get(url)
    script_contents = []
    if response.status_code == 200:
        page_content = response.text
        soup = BeautifulSoup(page_content, 'html.parser')
        scripts = soup.find_all('script')
        
        for script in scripts:
            if script.get('src'):
                script_src = script.get('src')
                print(f'Fetching external script: {script_src}')
                
                if script_src.startswith('http') or script_src.startswith('/'):
                    if not script_src.startswith('http'):
                        script_src = url.rsplit('/', 1)[0] + '/' + script_src.lstrip('/')
                    external_response = requests.get(script_src)
                    if external_response.status_code == 200:
                        script_contents.append(external_response.text)  
                    else:
                        print(f"Error downloading script: {script_src}")
            else:
                if script.string:
                    script_contents.append(script.string)  
    return script_contents

def detect_fingerprinting(script_content):
    detected = set()
    for pattern in fingerprinting_patterns:
        if re.search(pattern, script_content):
            detected.add(pattern.pattern)
    return detected

def generate_fingerprint_id(detected_techniques):
    fingerprint_id = hashlib.sha256(''.join(sorted(detected_techniques)).encode()).hexdigest()
    return fingerprint_id

def main():
    url = 'http://localhost:3000/'
    scripts = scrape_page(url)
    detected_techniques = set()

    for script_content in scripts:
        if script_content:  
            detected_techniques.update(detect_fingerprinting(script_content))

    try:
        with open('./backend/api/fp.js', 'r') as file:
            fp_js_content = file.read()
            detected_techniques.update(detect_fingerprinting(fp_js_content))
    except FileNotFoundError:
        pass  # Optionally log this error

    fingerprint_id = generate_fingerprint_id(detected_techniques)

    # Output the results as JSON
    result = {
        'fingerprint_id': fingerprint_id,
        'detected_techniques': list(detected_techniques)
    }

    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    main()
