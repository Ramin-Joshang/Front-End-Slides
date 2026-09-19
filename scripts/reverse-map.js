import fs from 'fs';

const pm = fs.readFileSync('scripts/perfect-all-slides.js', 'utf-8');
const bp = fs.readFileSync('scripts/build-persian-slides.js', 'utf-8');

export const reverseMap = {};

const repRegex = /\[\s*'([^']*)'\s*,\s*'([^']*)'\s*\]/g;
let rm;
while ((rm = repRegex.exec(bp)) !== null) {
  let en = rm[1], fa = rm[2];
  if (fa && en && fa !== en) reverseMap[fa.trim()] = en.trim();
}

const tRegex = /'([^']+)':\s*'([^']+)'/g;
let m;
while ((m = tRegex.exec(pm)) !== null) {
  let en = m[1], fa = m[2];
  if (fa && en && fa !== en) reverseMap[fa.trim()] = en.trim();
}

// Extra mappings for any titles, headings, and specific Persian fragments
const manualFixes = {
  'آموزش جامع HTML & CSS - جلد و شروع دوره': 'HTML & CSS Masterclass - Course Introduction',
  'آموزش جامع HTML & CSS - جلسه ۰۱': 'HTML & CSS Masterclass - Lesson 01',
  'خوش‌آمدید: اولین گام شما در دنیای وب': 'Welcome: Your First Step into the Web',
  'خوش‌آمدید: اولین گام در دنیای وب - جلسه ۰۱': 'Welcome: Your First Step into the Web - Lesson 01',
  'آشنایی با مدرس دوره: رامین جوشقانی - جلسه ۰۱': 'Meet Your Instructor: Ramin Joshang - Lesson 01',
  'سرفصل‌های آموزشی دوره HTML & CSS - جلسه ۰۱': 'HTML & CSS Course Curriculum - Lesson 01',
  'در این دوره چه مهارت‌هایی یاد می‌گیرید؟': 'What You Will Learn in This Course',
  'نقشه راه یادگیری دوره HTML & CSS - جلسه ۰۱': 'HTML & CSS Learning Roadmap - Lesson 01',
  'نقشه‌ی راه یادگیری HTML & CSS': 'HTML & CSS Learning Roadmap',
  'مقایسه فرانت‌اند و بک‌اند - جلسه ۰۱': 'Front-End vs Back-End - Lesson 01',
  'تفاوت فرانت‌اند و بک‌اند (Front-End vs Back-End)': 'Front-End vs Back-End',
  'وب چطور کار می‌کند؟ نمای کلی سیستم - جلسه ۰۱': 'How Websites Work: The Big Picture - Lesson 01',
  'اینترنت: شبکه‌ای از شبکه‌ها - جلسه ۰۱': 'The Internet: A Network of Networks - Lesson 01',
  'اینترنت: شبکه‌ای به هم پیوسته از شبکه‌ها': 'The Internet: A Network of Networks',
  'کلاینت، مرورگر و سرور - جلسه ۰۱': 'Client, Browser, and Server - Lesson 01',
  'کلاینت، Browser و سرور - جلسه ۰۱': 'Client, Browser, and Server - Lesson 01',
  'وقتی یک آدرس (URL) را تایپ می‌کنید چه می‌شود؟ - جلسه ۰۱': 'What Happens When You Type a URL? - Lesson 01',
  'وقتی یک آدرس (URL) را تایپ می‌کنید، چه می‌شود؟': 'What Happens When You Type a URL?',
  'وقتی یک آدرس (URL) را تایپ می‌کنید، چه اتفاقی می‌افتد؟': 'What Happens When You Type a URL?',
  'تفاوت پروتکل‌های HTTP و HTTPS - جلسه ۰۱': 'HTTP vs HTTPS Protocols - Lesson 01',
  'درخواست و پاسخ در HTTP - جلسه ۰۱': 'HTTP Request & Response - Lesson 01',
  'دامنه، هاست و DNS - جلسه ۰۱': 'Domain, Hosting, and DNS - Lesson 01',
  'زبان HTML: اسکلت وب - جلسه ۰۱': 'HTML: The Skeleton of the Web - Lesson 01',
  'زبان CSS: پوست و زیبایی وب - جلسه ۰۱': 'CSS: The Skin and Style - Lesson 01',
  'جاوااسکریپت: عضلات و منطق وب - جلسه ۰۱': 'JavaScript: The Muscles and Logic - Lesson 01',
  'تکنولوژی‌های مکمل در نقشه راه - جلسه ۰۱': 'Technologies Throughout the Roadmap - Lesson 01',
  'نمونه‌های واقعی فرانت‌اند در جهان - جلسه ۰۱': 'Real-World Front-End Examples - Lesson 01',
  'جعبه‌ابزار توسعه‌دهنده فرانت‌اند - جلسه ۰۱': 'Your Developer Toolbelt - Lesson 01',
  'جعبه‌ابزار ضروری یک توسعه‌دهنده فرانت‌اند': 'Your Developer Toolbelt',
  'جعthe web to‌ابزار توسعه‌دهنده فرانت‌اند - Lesson ۰۱': 'Your Developer Toolbelt - Lesson 01',
  'گوگل کروم: میز کار توسعه‌دهنده - جلسه ۰۱': 'Google Chrome: The Workbench - Lesson 01',
  'ویژوال استودیو کد: کارگاه شما - جلسه ۰۱': 'Visual Studio Code: The Workshop - Lesson 01',
  'راهنمای نصب و راه‌اندازی VS Code - جلسه ۰۱': 'Setting Up: Installing VS Code - Lesson 01',
  'افزونه‌های پیشنهادی برای VS Code - جلسه ۰۱': 'Recommended VS Code Extensions - Lesson 01',
  'ساختار اصولی فایل‌ها و پوشه‌های پروژه - جلسه ۰۱': 'Organizing Your Work: Folder Structure - Lesson 01',
  'کارگاه عملی: ساخت پوشه پروژه - جلسه ۰۱': 'Hands-on: Creating Your Project Folder - Lesson 01',
  'کارگاه عملی: ساخت فایل index.html - جلسه ۰۱': 'Hands-on: Creating index.html - Lesson 01',
  'نوشتن اولین خط کد HTML - جلسه ۰۱': 'Writing Your First Line of HTML Code - Lesson 01',
  'اجرای اولین صفحه وب در مرورگر - جلسه ۰۱': 'Running Your First Web Page in Browser - Lesson 01',
  'اجرای اولین صفحه وب در Browser - جلسه ۰۱': 'Running Your First Web Page in Browser - Lesson 01',
  'بهترین الگوها و عادات برنامه‌نویسی - جلسه ۰۱': 'Beginner Best Practices - Lesson 01',
  'the web toترین الگوها و عادات برنامه‌نویسی - Lesson ۰۱': 'Beginner Best Practices - Lesson 01',
  'خطاهای رایج مبتدیان و عیب‌یابی - جلسه ۰۱': 'Troubleshooting Common Issues - Lesson 01',
  'Problemهای رایج مبتدیان و عیب‌یابی - Lesson ۰۱': 'Troubleshooting Common Issues - Lesson 01',
  'جمع‌بندی و دستاوردهای درس اول - جلسه ۰۱': 'Lesson Summary and Key Takeaways - Lesson 01',
  'تمرین خانگی و آمادگی برای جلسه دوم - جلسه ۰۱': 'Homework and Next Steps - Lesson 01',
  'پیاده‌سازی تمام آموخته‌ها با ساخت پروژه‌های کامل و واکنش‌گرا از صفر در سناریوهای واقعی دنیای کار.': 'Build complete, real-world, and responsive websites from scratch to showcase in your portfolio.',
  'سرور DNS': 'DNS Server',
  'سرور وب (Server)': 'Web Server',
  'پخش مجدد شبیه‌سازی مسیر': 'Replay Journey Simulation',
  'تکرار شبیه‌سازی مسیر': 'Replay Journey Simulation',
  'Browser از دی‌ان‌اس آدرس عددی IP سرور را استعلام می‌کند.': 'The browser asks DNS for the server\'s numerical IP address.',
  'مرورگر از دی‌ان‌اس آدرس عددی IP سرور را استعلام می‌کند.': 'The browser asks DNS for the server\'s numerical IP address.',
  'تفاوت HTTP و HTTPS: قوانین مکالمه در وب': 'HTTP vs HTTPS: The Web\'s Conversation Rules',
  'سرور در دسترس است اما فایل یا صفحه مورد نظر شما را پیدا نکرد.': 'The server is active, but it could not find the specific file or page you requested.',
  'اجرای محاسبات، بررسی شروط، پردازش فرم‌ها و تصمیم‌گیری مستقیم در Browser کاربر.': 'Executing calculations, evaluating conditions, and handling dynamic logic directly in the browser.',
  'اجرای محاسبات، بررسی شروط، پردازش فرم‌ها و تصمیم‌گیری مستقیم در مرورگر کاربر.': 'Executing calculations, evaluating conditions, and handling dynamic logic directly in the browser.',
  'Right-click your کلیک راست کرده و Open With سپس Google Chrome را انتخاب کنید.': 'Right-click file → Open With → Google Chrome.',
  'کلیک راست کرده و Open With سپس Google Chrome را انتخاب کنید.': 'Right-click file → Open With → Google Chrome.',
  'نام تگ‌ها باید دقیق تایپ شود. the web to رنگ تگ در VS Code دقت کنید؛ تگ‌های اشتباه رنگ متفاوتی دارند.': 'HTML tags must be spelled exactly. Check VS Code\'s syntax highlighting — unknown tags appear unstyled.',
  'نام تگ‌ها باید دقیق تایپ شود. به رنگ تگ در VS Code دقت کنید؛ تگ‌های اشتباه رنگ متفاوتی دارند.': 'HTML tags must be spelled exactly. Check VS Code\'s syntax highlighting — unknown tags appear unstyled.',
  'عدم نمایش تغییرات جدید در Browser': 'Changes not showing in browser',
  'عدم نمایش تغییرات جدید در مرورگر': 'Changes not showing in browser',
  'نمایش نسخه قدیمی the web to دلیل کش Browser': 'Viewing cached old version',
  'نمایش نسخه قدیمی به دلیل کش مرورگر': 'Viewing cached old version',
  'کلیک راست کرده و با Google Chrome باز کنید. تأیید کنید که متن‌ها به درستی نمایش داده می‌شوند.': 'Right-click file and select "Open with Google Chrome." Confirm that you see the content displayed correctly.',
  'پوشه lesson-01 را در VS Code باز کنید، یک فایل بنام index.html بسازید و کد <h1>سلام دنیا!</h1> را بنویسید.': 'Open the lesson-01 folder in VS Code. Create a new file named index.html and type <h1>Hello World</h1>.',
  'دانلود و نصب ادیتور VS Code و مرورگر کروم و پین کردن آن‌ها روی تسک‌بار سیستم برای دسترسی سریع.': 'Download and install VS Code and Google Chrome. Pin them to your taskbar for quick access.',
  'سلام دنیا!': 'Hello World!',
  'من در حال یادگیری فرانت‌اند هستم.': 'I am learning to code Front-End!',
  'جلسه ۰۱ // ': 'Lesson 01 // ',
  'جلسه ۰۱': 'Lesson 01',
  'جلسه': 'Lesson',
  'مدرس دوره': 'Instructor',
  'عنوان دوره': 'Course',
  'رامین جوشقانی': 'Ramin Joshang',
  'دوره جامع برنامه‌نویسی وب': 'HTML & CSS Masterclass',
  'آموزش جامع HTML & CSS': 'HTML & CSS Masterclass',
  'از صفر تا ورود به بازار کار': 'From Zero to Professional',
  '۰۱ • مبانی وب و فرانت‌اند': '01 • Introduction',
  '۰۱': '01',
  '۰۲': '02',
  '۰۳': '03',
  '۰۴': '04',
  '۰۵': '05',
  '۰۶': '06',
  '۰۷': '07',
  '۰۸': '08',
  '۰۹': '09',
  '۱۰': '10',
  'مرورگر (Browser)': 'Browser',
  'مرورگر': 'Browser',
  'یادداشت‌های مدرس': 'Presenter Notes'
};

Object.assign(reverseMap, manualFixes);
