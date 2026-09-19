import fs from 'fs';
import { reverseMap } from './reverse-map.js';

// Extra dictionary items to make sure all 32 slides are 100% clean English
const finalFixes = {
  'تفاوت پروتکل‌های پروتکل استاندارد (HTTP) و پروتکل استاندارد (HTTP)S - جلسه ۰۱': 'HTTP vs HTTPS Protocols - Lesson 01',
  'تفاوت پروتکل‌های HTTP و HTTPS - جلسه ۰۱': 'HTTP vs HTTPS Protocols - Lesson 01',
  'تفاوت پروتکل‌های HTTP و HTTPS': 'HTTP vs HTTPS Protocols',
  'تفاوت پروتکل‌های': 'Differences between protocols',
  'روی فایل کلیک راست کرده و Open With سپس مرورگر گوگل کروم (Google Chrome) را انتخاب کنید.': 'Right-click the file, select Open With, and choose Google Chrome.',
  'Right-click your کلیک راست کرده و Open With سپس Google Chrome را انتخاب کنید.': 'Right-click the file, select Open With, and choose Google Chrome.',
  'کلیک راست کرده و Open With سپس Google Chrome را انتخاب کنید.': 'Right-click the file, select Open With, and choose Google Chrome.',
  'روی فایل <span class="homework-code-badge">index.html</span> کلیک راست کرده و با مرورگر گوگل کروم (Google Chrome) باز کنید. تأیید کنید که متن‌ها به درستی نمایش داده می‌شوند.': 'Right-click <span class="homework-code-badge">index.html</span> and open with Google Chrome. Confirm the text displays correctly.',
  'Right-click your <span class="homework-code-badge">index.html</span> کلیک راست کرده و با Google Chrome باز کنید. تأیید کنید که متن‌ها to درستی نمایش داده می‌شوند.': 'Right-click <span class="homework-code-badge">index.html</span> and open with Google Chrome. Confirm the text displays correctly.',
  'روش سیستمی': 'System Method',
  'کلیک راست و انتخاب مرورگر': 'Right-Click & Choose Browser',
  'روش حرفه‌ای': 'Professional Method',
  'اجرا با اکستنشن Live Server': 'Launch with Live Server Extension',
  'ذخیره نشدن تغییرات فایل': 'File Changes Not Saved',
  'نشانه': 'Symptom',
  'اصلاح': 'Solution',
  'وجود دایره در کنار نام فایل در تب ادیتور نشانه ذخیره نشدن است. کلید Ctrl + S را بزنید یا Auto Save را فعال کنید.': 'A dot circle next to the filename indicates unsaved changes. Press Ctrl + S or turn on Auto Save.',
  'پسوند اشتباه در فایل': 'Wrong File Extension',
  'خطا': 'Issue',
  'سیستم‌عامل ممکن است پسوندها را مخفی کند. در تنظیمات پوشه‌ها گزینه نمایش پسوند را فعال کنید.': 'Operating systems may hide extensions. Enable "File name extensions" in your folder view settings.',
  'کش مرورگر و عدم به‌روزرسانی': 'Browser Cache Not Updating',
  'رفرش سخت (Ctrl+Shift+R) کش را دور می‌زند. استفاده از Live Server این مشکل را به کلی حل می‌کند.': 'A hard reload (Ctrl+Shift+R) bypasses cache. Using Live Server eliminates this issue entirely.',
  'پروژه‌های عملی و واقعی': 'Practical Hands-on Projects',
  'ورود آدرس': 'Enter Address',
  'تایپ آدرس سایت (مانند google.com) در مرورگر و زدن Enter.': 'Type website URL (e.g. google.com) in the browser address bar and press Enter.',
  'استعلام از DNS': 'DNS Query',
  'مرورگر از دی‌ان‌اس آدرس عددی IP سرور را استعلام می‌کند.': 'The browser queries the DNS server to find the numerical IP address.',
  'دست‌تکانی TCP': 'TCP Handshake',
  'مرورگر اتصالی امن و مطمئن با سرور مقصد برقرار می‌کند.': 'The browser establishes a reliable, secure connection with the target server.',
  'ارسال درخواست HTTP': 'Send HTTP Request',
  'مرورگر درخواست دریافت فایل‌های صفحه (HTML/CSS) را می‌فرستد.': 'The browser sends a request asking for webpage assets (HTML, CSS, images).',
  'پردازش در سرور': 'Server Processing',
  'سرور فایل‌های درخواست شده را آماده و بسته‌بندی می‌کند.': 'The web server locates, processes, and packages the requested files.',
  'رندر و نمایش': 'Render & Display',
  'مرورگر کدهای دریافتی را پردازش کرده و صفحه را رسم می‌کند.': 'The browser parses the downloaded code and renders the final visual webpage.'
};

Object.assign(reverseMap, finalFixes);

const sortedFaKeys = Object.keys(reverseMap).sort((a, b) => b.length - a.length);

console.log('Translating and converting all 32 slides to English & LTR...');

for (let i = 1; i <= 32; i++) {
  const num = String(i).padStart(2, '0');
  const filepath = `slide-${num}.html`;
  if (!fs.existsSync(filepath)) continue;

  let content = fs.readFileSync(filepath, 'utf-8');

  // 1. Convert HTML tag to English & LTR
  content = content.replace(/<html[^>]*>/i, '<html lang="en" dir="ltr">');

  // 2. Remove Vazirmatn font overrides and ensure clean Inter/Space Grotesk typography
  content = content.replace(/font-family:\s*['"]Vazirmatn['"][^;!]*(!important)?;/gi, "font-family: var(--ppt-font-body) !important;");
  content = content.replace(/['"]Vazirmatn['"],\s*/g, '');

  // 3. In Slide 07: Ensure arrow direction is LTR (Request from Client/left to Server/right)
  if (num === '07') {
    content = content.replace(/fa-caret-left web-flow-arrow-head request/g, 'fa-caret-right web-flow-arrow-head request');
    content = content.replace(/fa-caret-right web-flow-arrow-head response/g, 'fa-caret-left web-flow-arrow-head response');
  }

  // 4. In Slide 10: Replay journey button & SVG
  if (num === '10') {
    content = content.replace(/>مرورگر \(Browser\)</g, '>Browser<');
    content = content.replace(/>مرورگر</g, '>Browser<');
    content = content.replace(/>سرور DNS</g, '>DNS Server<');
    content = content.replace(/>سرور وب \(Server\)</g, '>Web Server<');
  }

  // 5. Apply all reverse translations
  for (const k of sortedFaKeys) {
    if (content.includes(k)) {
      content = content.replaceAll(k, reverseMap[k]);
    }
  }

  // 6. Update projector-contrast-tune style block inside the slide to clean LTR typography
  const projectorStyleBlock = `
<style id="projector-contrast-tune">
    /* High contrast projector tuning - English LTR */
    body, .slide-root-container, [class*="-slide-root"] {
        background-color: #ffffff !important;
        color: #0f172a !important;
        direction: ltr !important;
        text-align: left !important;
        font-family: var(--ppt-font-body) !important;
    }
    h1, h2, h3, [class*="-heading"], [class*="-title"] {
        font-family: var(--ppt-font-display) !important;
        color: #0f172a !important;
        direction: ltr !important;
        text-align: left !important;
    }
    p, span, div, li {
        font-family: var(--ppt-font-body);
        direction: ltr;
    }
    .code-font, pre, code, .editor-content-area, .terminal-body-content, [class*="-code-strip"], [class*="-code-column"] {
        font-family: var(--ppt-font-mono) !important;
        direction: ltr !important;
        text-align: left !important;
    }
</style>
`;

  if (content.includes('id="projector-contrast-tune"')) {
    content = content.replace(/<style id="projector-contrast-tune">[\s\S]*?<\/style>/i, projectorStyleBlock.trim());
  } else {
    content = content.replace('</head>', `${projectorStyleBlock}\n</head>`);
  }

  fs.writeFileSync(filepath, content, 'utf-8');
}

console.log('All 32 slides successfully converted to English and LTR!');
