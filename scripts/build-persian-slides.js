import fs from 'fs';
import path from 'path';

console.log('Starting translation and projector light styling for all 32 slides...');

// Helper to inject projector theme & Vazirmatn font link into <head>
function enhanceHead(content, title) {
    // Replace lang="en" with lang="fa" dir="rtl"
    let updated = content.replace(/<html[^>]*>/i, '<html lang="fa" dir="rtl">');
    
    // Update title
    if (title) {
        updated = updated.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
    }

    // Ensure link to projector-theme.css exists
    if (!updated.includes('projector-theme.css')) {
        updated = updated.replace(/<\/head>/i, '    <link rel="stylesheet" href="projector-theme.css">\n</head>');
    }

    // Ensure Vazirmatn font is loaded
    if (!updated.includes('Vazirmatn')) {
        updated = updated.replace(/@import url\(['"]https:\/\/fonts\.googleapis\.com[^'"]+['"]\);/i, 
            "@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');");
    }

    return updated;
}

// Map of slide modifications
const slidesData = {
    1: {
        title: 'آموزش جامع HTML & CSS - جلسه ۰۱',
        replacements: [
            ['HTML & CSS Masterclass', 'دوره جامع برنامه‌نویسی وب'],
            ['HTML & CSS<br>\n                    From Zero to Professional', 'آموزش جامع HTML & CSS<br>از صفر تا ورود به بازار کار'],
            ['Instructor', 'مدرس دوره'],
            ['Ramin Joshang', 'رامین جوشقانی'],
            ['Course', 'عنوان دوره'],
            ['Lesson', 'جلسه'],
            ['01 • Introduction', '۰۱ • مبانی وب و فرانت‌اند']
        ]
    },
    2: {
        title: 'خوش‌آمدید: اولین گام در دنیای وب - جلسه ۰۱',
        replacements: [
            ['Lesson 01 // Introduction', 'جلسه ۰۱ // خوش‌آمدگویی'],
            ['Welcome: Your First Step into the Web', 'خوش‌آمدید: اولین گام شما در دنیای وب'],
            ['Phase 01', 'گام اول'],
            ['Understand<br>the Web', 'درک ساختار<br>و مفاهیم وب'],
            ['Phase 02', 'گام دوم'],
            ['Meet the Core<br>Languages', 'آشنایی با<br>زبان‌های پایه'],
            ['Phase 03', 'گام سوم'],
            ['Build Your<br>First Page', 'ساخت اولین<br>صفحه وب'],
            ['Step-by-step &amp; Project-based', 'آموزش گام‌به‌گام و پروژه‌محور'],
            ['Step-by-step & Project-based', 'آموزش گام‌به‌گام و پروژه‌محور']
        ]
    },
    3: {
        title: 'آشنایی با مدرس دوره: رامین جوشقانی - جلسه ۰۱',
        replacements: [
            ['images/1.png', 'images/Ramin.png'],
            ['Lesson 01 // Meet Your Instructor', 'جلسه ۰۱ // معرفی مدرس'],
            ['Meet Your Instructor', 'آشنایی با مدرس دوره'],
            ['Course Instructor', 'مدرس دوره'],
            ['FRONT-END ENGINEER • INSTRUCTOR', 'مهندس فرانت‌اند • مدرس برنامه‌نویسی وب'],
            ['Ramin Joshang', 'رامین جوشقانی'],
            ['Expertise', 'تخصص اصلی'],
            ['Full-Stack Web Development', 'توسعه تخصصی وب و فرانت‌اند مدرن'],
            ['Experience', 'سوابق کاری'],
            ['Front-End, Back-End & Real-World Projects', 'اجرای پروژه‌های واقعی تجاری و سازمانی'],
            ['Teaching Method', 'شیوه تدریس'],
            ['Step-by-Step Learning with Practical Projects', 'یادگیری گام‌به‌گام همراه با پروژه‌های عملی'],
            ['Course Goal', 'هدف دوره'],
            ['Build a Strong HTML & CSS Foundation', 'ساخت پایه‌ای مستحکم در HTML & CSS برای بازار کار']
        ]
    },
    4: {
        title: 'سرفصل‌های آموزشی دوره HTML & CSS - جلسه ۰۱',
        replacements: [
            ['Lesson 01 // Introduction', 'جلسه ۰۱ // سرفصل‌ها'],
            ["What You'll Learn in This HTML & CSS Course", 'در این دوره چه مهارت‌هایی یاد می‌گیرید؟'],
            ["What You'll Learn in This HTML &amp; CSS Course", 'در این دوره چه مهارت‌هایی یاد می‌گیرید؟'],
            ['HTML5 Fundamentals', 'اصول و استانداردهای HTML5'],
            ['Learn the building blocks of every website, including semantic elements, forms, tables, lists, media, and best practices.', 'یادگیری سنگ‌بنای وب: تگ‌های معنایی مدرن، فرم‌ها، جداول، صوت و ویدیو و ساختار استاندارد صفحه.'],
            ['Modern CSS', 'استایل‌دهی مدرن با CSS3'],
            ['Style beautiful websites using colors, typography, spacing, positioning, gradients, shadows, and modern properties.', 'زیباسازی سایت با رنگ‌ها، تایپوگرافی حرفه‌ای، فاصله‌ها، پوزیشنینگ، گرادینت‌ها و سایه‌ها.'],
            ['Flexbox & Grid', 'چیدمان با فلکس‌باکس و گرید'],
            ['Flexbox &amp; Grid', 'چیدمان با فلکس‌باکس و گرید'],
            ['Master one-dimensional and two-dimensional layouts to build complex, professional website structures.', 'تسلط کامل بر چیدمان‌های یک‌بعدی و دوبعدی برای خلق لی‌اوت‌های پیشرفته و منعطف وب.'],
            ['Responsive Design', 'طراحی کاملاً ریسپانسیو'],
            ['Make websites look perfect on desktops, tablets, and phones using media queries and responsive units.', 'سازگاری کامل صفحات با موبایل، تبلت و دسکتاپ به کمک Media Queryها و واحدهای شناور.'],
            ['CSS Animation', 'انیمیشن‌ها و ترنزیشن‌ها'],
            ['Bring websites to life with smooth transitions, keyframe animations, and engaging hover effects.', 'جان بخشیدن به صفحات وب با ترنزیشن‌های روان، انیمیشن‌های Keyframes و افکت‌های تعاملی.'],
            ['Best Practices', 'اصول حرفه‌ای و کدنویسی تمیز'],
            ['Write clean, maintainable, accessible code following industry standards and developer workflows.', 'نوشتن کدهای تمیز، ساختاریافته، رعایت دسترسی‌پذیری و اصول بهینه‌سازی مطابق بازار کار.']
        ]
    },
    5: {
        title: 'نقشه راه یادگیری دوره HTML & CSS - جلسه ۰۱',
        replacements: [
            ['Lesson 01 // Course Structure', 'جلسه ۰۱ // نقشه راه'],
            ['HTML & CSS Course Roadmap', 'نقشه‌ی راه یادگیری HTML & CSS'],
            ['HTML &amp; CSS Course Roadmap', 'نقشه‌ی راه یادگیری HTML & CSS'],
            ['Front-End Start', 'شروع مسیر فرانت‌اند'],
            ['HTML Basics', 'مبانی و تگ‌های HTML'],
            ['Advanced HTML', 'تگ‌های پیشرفته و فرم‌ها'],
            ['CSS Basics', 'مبانی و استایل‌دهی CSS'],
            ['Box Model', 'مدل جعبه‌ای (Box Model)'],
            ['Flexbox', 'چیدمان با فلکس‌باکس'],
            ['CSS Grid', 'سیستم شبکه‌ای (CSS Grid)'],
            ['Responsive Design', 'طراحی واکنش‌گرا (ریسپانسیو)'],
            ['CSS Animation', 'انیمیشن و ترنزیشن'],
            ['Advanced CSS', 'تکنیک‌های پیشرفته CSS'],
            ['Final Project', 'پروژه نهایی و لندینگ پیج'],
            ['START', 'شروع']
        ]
    },
    6: {
        title: 'مقایسه فرانت‌اند و بک‌اند - جلسه ۰۱',
        replacements: [
            ['Lesson 01 // Introduction', 'جلسه ۰۱ // مفاهیم پایه'],
            ['Front-End vs Back-End', 'تفاوت فرانت‌اند و بک‌اند (Front-End vs Back-End)'],
            ['THE DINING ROOM', 'سالن رستوران (جلوی صحنه)'],
            ['Front-End', 'فرانت‌اند (رابط کاربر)'],
            ['The visual user interface', 'رابط کاربری و ظاهر بصری'],
            ['Animations &amp; interactions', 'انیمیشن‌ها و تعامل با کاربر'],
            ['Animations & interactions', 'انیمیشن‌ها و تعامل با کاربر'],
            ['Browser-based execution', 'اجرای کامل درون مرورگر'],
            ['THE KITCHEN', 'آشپزخانه (پشت صحنه)'],
            ['Back-End', 'بک‌اند (سرور و پایگاه داده)'],
            ['Data storage &amp; security', 'ذخیره‌سازی داده‌ها و امنیت'],
            ['Data storage & security', 'ذخیره‌سازی داده‌ها و امنیت'],
            ['Business logic &amp; rules', 'منطق تجاری و قوانین سیستم'],
            ['Business logic & rules', 'منطق تجاری و قوانین سیستم'],
            ['Server-side processing', 'پردازش و محاسبات سمت سرور'],
            ['REQUEST', 'درخواست (Request)'],
            ['RESPONSE', 'پاسخ (Response)']
        ]
    },
    7: {
        title: 'وب چطور کار می‌کند؟ نمای کلی سیستم - جلسه ۰۱',
        replacements: [
            ['Lesson 01 // Introduction', 'جلسه ۰۱ // مفاهیم پایه'],
            ['How Websites Work: The Big Picture', 'وب چطور کار می‌کند؟ نمای کلی سیستم'],
            ['You Ask', 'درخواست شما'],
            ['See', 'مشاهده صفحه'],
            ['Browser', 'مرورگر'],
            ['Request', 'درخواست (Request)'],
            ['Response', 'پاسخ (Response)'],
            ['Internet', 'شبکه اینترنت'],
            ['Route', 'مسیر انتقال'],
            ['Server', 'سرور وب'],
            ['Ask for a resource', 'ارسال درخواست فایل به سرور'],
            ['Receive a response', 'دریافت پاسخ و کدهای سایت'],
            ['Render the result', 'رندر و نمایش بصری در مرورگر']
        ]
    },
    8: {
        title: 'اینترنت: شبکه‌ای از شبکه‌ها - جلسه ۰۱',
        replacements: [
            ['Lesson 01 // Introduction', 'جلسه ۰۱ // مفاهیم پایه'],
            ['The Internet: A Network of Networks', 'اینترنت: شبکه‌ای از شبکه‌ها'],
            ['Your Device', 'دستگاه شما (کاربر)'],
            ['Client requesting<br>information', 'کلاینت درخواست‌کننده<br>اطلاعات'],
            ['The Backbone', 'ستون فقرات شبکه'],
            ['Routers, ISPs &amp;<br>Undersea Cables', 'روترها، سرویس‌دهنده‌ها و<br>کابل‌های زیردریایی'],
            ['Routers, ISPs &<br>Undersea Cables', 'روترها، سرویس‌دهنده‌ها و<br>کابل‌های زیردریایی'],
            ['Data Center', 'مراکز داده (دیتاسنتر)'],
            ['Servers storing<br>web resources', 'سرورهای قدرتمند ذخیره<br>فایل‌های وب'],
            ['Data Packets', 'بسته‌های داده (Packets)'],
            ['Information is broken into small chunks that travel independently across the network.', 'داده‌ها به بسته‌های کوچک تقسیم شده و به صورت مستقل در سراسر شبکه ارسال می‌شوند.'],
            ['Smart Routing', 'مسیریابی هوشمند (Routing)'],
            ['Routers act like traffic controllers, finding the fastest path for each packet.', 'روترها همانند کنترل‌کننده ترافیک، سریع‌ترین و امن‌ترین مسیر را برای هر بسته می‌یابند.'],
            ['Global Web', 'وب جهانی (Global Web)'],
            ['The Web is just one service (like an app) that runs on top of the Internet infrastructure.', 'وب تنها یکی از سرویس‌ها (مشابه یک اپلیکیشن) است که بر روی بستر فیزیکی اینترنت اجرا می‌شود.']
        ]
    },
    9: {
        title: 'کلاینت، مرورگر و سرور - جلسه ۰۱',
        replacements: [
            ['Lesson 01 // Introduction', 'جلسه ۰۱ // ارکان وب'],
            ['Client, Browser, and Server', 'سه بازیگر اصلی وب: کلاینت، مرورگر و سرور'],
            ['Client', 'کلاینت (Client)'],
            ['The requester. This is your physical device (laptop, phone, or tablet) and the application you are using.', 'درخواست‌کننده؛ دستگاه فیزیکی شما (لپ‌تاپ، موبایل یا تبلت) که با آن به وب متصل می‌شوید.'],
            ['End-User Device', 'دستگاه کاربر نهایی'],
            ['Browser', 'مرورگر (Browser)'],
            ['The specialized software client that handles the "handshake" and turns code into a visual page.', 'نرم‌افزار متخصصی که کدها را دریافت کرده و به یک صفحه گرافیکی و زیبا تبدیل می‌کند.'],
            ['Parse HTML Structure', 'تحلیل و ساخت درخت تگ‌های HTML'],
            ['Apply CSS Styling', 'اعمال استایل و زیبایی‌های CSS'],
            ['Run JavaScript Logic', 'اجرای دستورات و منطق جاوااسکریپت'],
            ['Server', 'سرور (Server)'],
            ['The powerhouse computer that stores, creates, and provides resources when asked.', 'کامپیوتر قدرتمند و همیشه بیداری که فایل‌ها را ذخیره کرده و به درخواست‌ها پاسخ می‌دهد.'],
            ['Resource Provider', 'ارائه‌دهنده منابع و داده‌ها']
        ]
    },
    10: {
        title: 'وقتی یک آدرس (URL) را تایپ می‌کنید چه می‌شود؟ - جلسه ۰۱',
        replacements: [
            ['Lesson 01 // Web Architecture', 'جلسه ۰۱ // معماری وب'],
            ['What Happens When You Type a URL?', 'وقتی یک آدرس (URL) را تایپ می‌کنید، چه اتفاقی می‌افتد؟'],
            ['Replay Journey', 'تکرار شبیه‌سازی مسیر'],
            ['Enter URL', 'ورود آدرس'],
            ['You type "google.com" into the address bar and press Enter.', 'تایپ آدرس سایت (مانند google.com) در مرورگر و زدن Enter.'],
            ['DNS Lookup', 'استعلام از DNS'],
            ["The browser asks the DNS for the server's IP address (142.250...).", 'مرورگر از دی‌ان‌اس آدرس عددی IP سرور را استعلام می‌کند.'],
            ['TCP Handshake', 'دست‌تکانی TCP'],
            ['Browser establishes a secure, reliable connection with the server.', 'مرورگر اتصالی امن و مطمئن با سرور مقصد برقرار می‌کند.'],
            ['Send Request', 'ارسال درخواست'],
            ['Browser sends an HTTP request: "Please send me index.html."', 'مرورگر درخواست فایل صفحه را به سرور ارسال می‌کند.'],
            ['Receive Files', 'دریافت فایل‌ها'],
            ['Server sends back the HTML, CSS, and JS files for the page.', 'سرور فایل‌های HTML، CSS و جاوااسکریپت را می‌فرستد.'],
            ['Render Page', 'رندر و نمایش'],
            ['Browser builds the website visual from the received code.', 'مرورگر کدها را ترجمه کرده و صفحه را به کاربر نشان می‌دهد.']
        ]
    },
    11: {
        title: 'تفاوت پروتکل‌های HTTP و HTTPS - جلسه ۰۱',
        replacements: [
            ['Lesson 01 // Introduction', 'جلسه ۰۱ // پروتکل‌های وب'],
            ["HTTP &amp; HTTPS: The Web's Conversation Rules", 'تفاوت HTTP و HTTPS: قوانین مکالمه در وب'],
            ["HTTP & HTTPS: The Web's Conversation Rules", 'تفاوت HTTP و HTTPS: قوانین مکالمه در وب'],
            ['HTTP', 'پروتکل استاندارد (HTTP)'],
            ['Standard', 'استاندارد وب'],
            ['HyperText Transfer Protocol. The foundation of data exchange on the web. Defines rules for how browsers ask for files.', 'پروتکل انتقال ابرمتن؛ پایه ارتباطات وب برای درخواست و تبادل فایل بین مرورگر و سرور.'],
            ['Data is sent in "Plain Text" (visible to anyone).', 'داده‌ها به صورت متن ساده (Plain Text) و خوانا برای دیگران ارسال می‌شوند.'],
            ['No verification of who the server actually is.', 'هویت واقعی سرور اعتبارسنجی قطعی نمی‌شود.'],
            ['Vulnerable to interception and eavesdropping.', 'در برابر شنود و رهگیری اطلاعات آسیب‌پذیر است.'],
            ['HTTPS', 'پروتکل امن (HTTPS)'],
            ['Secure', 'رمزنگاری‌شده و امن'],
            ['The secure version of HTTP. Encrypts all data between browser and server using SSL/TLS encryption.', 'نسخه امن HTTP؛ تمام تبادل اطلاعات میان کاربر و سرور با گواهی SSL/TLS رمزنگاری می‌شود.'],
            ['All data is scrambled into unreadable cipher.', 'تمام داده‌ها، رمزها و اطلاعات به صورت کدهای غیرقابل خواندن درمی‌آیند.'],
            ['Server identity is cryptographically verified.', 'هویت و اصالت سرور مقصد به شکل دیجیتالی تأیید می‌شود.'],
            ['Industry standard for all modern web applications.', 'استاندارد الزامی برای تمام وب‌سایت‌ها و اپلیکیشن‌های امروزی.']
        ]
    },
    12: {
        title: 'درخواست و پاسخ در HTTP - جلسه ۰۱',
        replacements: [
            ['Lesson 01 // Web Architecture', 'جلسه ۰۱ // معماری وب'],
            ['HTTP Request &amp; Response', 'درخواست و پاسخ در HTTP (Request & Response)'],
            ['HTTP Request & Response', 'درخواست و پاسخ در HTTP (Request & Response)'],
            ['Browser', 'مرورگر (کلاینت)'],
            ['The Client', 'درخواست‌کننده'],
            ['Server', 'سرور (میزبان)'],
            ['The Host', 'پاسخ‌دهنده'],
            ['200', 'کد ۲۰۰'],
            ['Success', 'موفقیت‌آمیز (OK)'],
            ['Everything worked as expected. The server found the file and sent it back to you.', 'همه چیز درست کار کرد؛ سرور فایل را یافت و با موفقیت به مرورگر ارسال کرد.'],
            ['404', 'کد ۴۰۴'],
            ['Not Found', 'یافت نشد (Not Found)'],
            ["The server is active, but it couldn't find the specific file or page you requested.", 'سرور در دسترس است اما فایل یا صفحه مورد نظر شما را پیدا نکرد.'],
            ['500', 'کد ۵۰۰'],
            ['Server Error', 'خطای سرور (Server Error)'],
            ['The server encountered an internal crash or configuration problem while responding.', 'سرور هنگام پردازش درخواست با خطای داخلی یا مشکل نرم‌افزاری مواجه شد.']
        ]
    },
    13: {
        title: 'دامنه، هاست و DNS - جلسه ۰۱',
        replacements: [
            ['Lesson 01 // Introduction', 'جلسه ۰۱ // مفاهیم پایه'],
            ['Domain, Hosting, and DNS', 'دامنه (Domain)، هاست (Host) و دی‌ان‌اس (DNS)'],
            ['The Domain', 'دامنه (Domain)'],
            ['A human-readable address for users to remember.', 'نشانی متنی و خوانا برای به خاطر سپردن انسان‌ها.'],
            ['Analogy', 'تشبیه ملموس'],
            ['Like a home address (123 Maple St)', 'مشابه آدرس پستی و پلاک یک خانه'],
            ['The DNS', 'سامانه دی‌ان‌اس (DNS)'],
            ['The "Phonebook" that translates names to numbers.', 'دفترچه تلفن اینترنت که نام را به آی‌پی تبدیل می‌کند.'],
            ['Looking up a name in a phone contact list', 'جستجوی نام یک شخص در لیست مخاطبان گوشی'],
            ['The Hosting', 'فضای هاست (Hosting)'],
            ['The physical computer (IP) where files are stored.', 'کامپیوتر فیزیکی متصل به شبکه که فایل‌ها در آن قرار دارند.'],
            ['The actual house where you live', 'مشابه ساختمان خودِ خانه که وسایل در آن قرار دارد']
        ]
    },
    14: {
        title: 'زبان HTML: اسکلت وب - جلسه ۰۱',
        replacements: [
            ['Lesson 01 // Introduction', 'جلسه ۰۱ // زبان‌های وب'],
            ['HTML: The Skeleton of the Web', 'زبان HTML: اسکلت و استخوان‌بندی وب'],
            ['Structure', 'ساختار و پیکربندی'],
            ['Defines every element on the page — headings, paragraphs, images, links — using nested tags that form a logical document tree.', 'تعریف تمام اجزای صفحه اعم از تیترها، پاراگراف‌ها، تصاویر و پیوندها به صورت تگ‌های درختی منسجم.'],
            ['Markup Language', 'زبان نشانه‌گذاری (نه برنامه‌نویسی)'],
            ['Not a programming language — no logic or calculations. HTML <em>describes</em> content using opening and closing tags read top to bottom by the browser.', 'یک زبان برنامه‌نویسی محاسباتی نیست؛ بلکه معنا و ساختار متن و محتوا را با تگ‌های باز و بسته توصیف می‌کند.'],
            ['Foundation Layer', 'لایه زیربنایی و اساسی'],
            ['Every website starts here. CSS adds style; JavaScript adds behavior. Without HTML, there is nothing for them to act on.', 'سنگ بنای تمام وب‌سایت‌های دنیا؛ بدون HTML، کدهای CSS و جاوااسکریپت چیزی برای استایل یا متحرک‌سازی ندارند.'],
            ['Example', 'نمونه کد']
        ]
    },
    15: {
        title: 'زبان CSS: پوست و زیبایی وب - جلسه ۰۱',
        replacements: [
            ['Lesson 01 // Introduction', 'جلسه ۰۱ // زبان‌های وب'],
            ['CSS: The Skin and Style', 'زبان CSS: پوست، رنگ و زیبایی صفحه'],
            ['HTML (The Skeleton)', 'کد HTML (اسکلت خام)'],
            ['CSS (The Style)', 'کد CSS (استایل و زیبایی)'],
            ['Colors &amp; Atmosphere', 'رنگ‌ها و اتمسفر بصری'],
            ['Colors & Atmosphere', 'رنگ‌ها و اتمسفر بصری'],
            ['Sets the mood using brand colors, gradients, backgrounds, and shadows.', 'خلق حس و حال سایت با استفاده از رنگ‌های برند، گرادینت‌ها، پس‌زمینه‌ها و سایه‌ها.'],
            ['Typography &amp; Text', 'تایپوگرافی و خوانایی'],
            ['Typography & Text', 'تایپوگرافی و خوانایی'],
            ['Defines readability through font families, sizing, weight, and spacing.', 'افزایش خوانایی با تنظیم دقیق فونت، اندازه متن، وزن کلمات و فاصله بین خطوط.'],
            ['Layout &amp; Spacing', 'چیدمان و فاصله‌گذاری'],
            ['Layout & Spacing', 'چیدمان و فاصله‌گذاری'],
            ['Controls the position of elements, whitespace, and responsive grids.', 'مدیریت دقیق جایگاه عناصر، فاصله‌های درونی و بیرونی و شبکه‌بندی واکنش‌گرا.']
        ]
    },
    16: {
        title: 'جاوااسکریپت: عضلات و منطق وب - جلسه ۰۱',
        replacements: [
            ['Lesson 01 // Introduction', 'جلسه ۰۱ // زبان‌های وب'],
            ['JavaScript: The Muscles and Logic', 'جاوااسکریپت: عضلات، تعامل و منطق وب'],
            ['Scripting Language', 'زبان برنامه‌نویسی وب'],
            ['Interactivity', 'تعامل‌پذیری با کاربر'],
            ['Reacting to user actions like clicks, scrolls, and typing to make pages feel alive and responsive.', 'پاسخ زنده به کلیک‌ها، اسکرول، تایپ و رویدادهای کاربر برای جان بخشیدن به صفحه.'],
            ['Behavior &amp; Logic', 'منطق و محاسبات هوشمند'],
            ['Behavior & Logic', 'منطق و محاسبات هوشمند'],
            ["Executing calculations, conditional rules, and data processing directly within the user's browser.", 'اجرای محاسبات، بررسی شروط، پردازش فرم‌ها و تصمیم‌گیری مستقیم در مرورگر کاربر.'],
            ['Dynamic Content', 'محتوای پویا و زنده'],
            ['Updating page elements, fetching live data from servers, and building apps without page reloads.', 'به‌روزرسانی المان‌ها، دریافت داده‌های زنده از سرور بدون رفرش مجدد صفحه (AJAX/Fetch).']
        ]
    },
    17: {
        title: 'تکنولوژی‌های مکمل در نقشه راه - جلسه ۰۱',
        replacements: [
            ['Lesson 01 // Ecosystem', 'جلسه ۰۱ // ابزارهای مکمل'],
            ['Technologies Throughout the Roadmap', 'تکنولوژی‌ها و ابزارهای همراه در مسیر یادگیری'],
            ['Version Control', 'سیستم کنترل نسخه (Git & GitHub)'],
            ['Save progress and collaborate with others using Git and GitHub.', 'ثبت تاریخچه تغییرات کدها، بازگشت به نسخه‌های قبل و همکاری تیمی در گیت‌هاب.'],
            ['History', 'تاریخچه'],
            ['APIs &amp; Data', 'وب‌سرویس‌ها و داده‌های زنده'],
            ['APIs & Data', 'وب‌سرویس‌ها و داده‌های زنده'],
            ['Connect your interface to real-world services and live data.', 'اتصال صفحه به پایگاه داده و وب‌سرویس‌های آنلاین برای دریافت اطلاعات لحظه‌ای.'],
            ['Modern Frameworks', 'فریم‌ورک‌های مدرن وب'],
            ['Build complex, scalable applications using engines like React or Vue.', 'ساخت وب‌سایت‌های فوق پیشرفته و مقیاس‌پذیر با کتابخانه‌هایی مانند React و Vue.']
        ]
    },
    18: {
        title: 'نمونه‌های واقعی فرانت‌اند در جهان - جلسه ۰۱',
        replacements: [
            ['Lesson 01 // Introduction', 'جلسه ۰۱ // نمونه‌های کاربردی'],
            ['Real-World Front-End Examples', 'نمونه‌های عملی فرانت‌اند در دنیای واقعی'],
            ['E-Commerce', 'فروشگاه آنلاین (E-Commerce)'],
            ['Product catalog and pricing data', 'کاتالوگ و لیست مشخصات و قیمت محصولات'],
            ['High-end branding and image galleries', 'نمایش خیره‌کننده برند، گالری و تایپوگرافی'],
            ['Dynamic cart updates and animations', 'سبد خرید پویا و انیمیشن‌های تعاملی خرید'],
            ['Productivity', 'ابزارهای سازمانی و پیام‌رسان'],
            ['Message structures and user profiles', 'ساختار پیام‌ها، کانال‌ها و پروفایل کاربری'],
            ['Complex sidebar layouts and dark mode', 'چیدمان چندستونه سایدبار و تم دارک/لایت'],
            ['Real-time chat sync without refreshing', 'تبادل آنی پیام‌ها بدون نیاز به رفرش صفحه'],
            ['Streaming', 'پلتفرم پخش آنلاین و ویدیو'],
            ['Movie metadata and category lists', 'اطلاعات فیلم‌ها، دسته‌بندی و پوسترها'],
            ['Responsive posters and hover effects', 'پوسترهای ریسپانسیو و افکت‌های هاور'],
            ['Video player logic and search filtering', 'کنترل پلیر ویدیو و فیلتر جستجوی آنی']
        ]
    },
    19: {
        title: 'جعبه‌ابزار توسعه‌دهنده فرانت‌اند - جلسه ۰۱',
        replacements: [
            ['Lesson 01 // Introduction', 'جلسه ۰۱ // ابزارهای کار'],
            ['Your Developer Toolbelt', 'جعبه‌ابزار ضروری یک توسعه‌دهنده فرانت‌اند'],
            ['The Workshop', 'کارگاه تخصصی کدنویسی'],
            ['The primary environment where you write, organize, and manage your source code files.', 'محیط اصلی و پیشرفته شما برای نوشتن، پوشه‌بندی و مدیریت کدهای پروژه.'],
            ['Intelligent code completion', 'تکمیل خودکار و هوشمند کدها (IntelliSense)'],
            ['Extension ecosystem', 'هزاران افزونه کاربردی برای تسهیل کدنویسی'],
            ['Built-in terminal access', 'دسترسی سریع به ترمینال در داخل برنامه'],
            ['The Workbench', 'میز کار و آزمایشگاه توسعه'],
            ['The platform where you preview your creation and use professional tools to debug code.', 'بستری که خروجی کار خود را در آن می‌بینید و با ابزارهای تخصصی خطاها را رفع می‌کنید.'],
            ['Chrome Developer Tools', 'مجموعه تخصصی Chrome DevTools برای عیب‌یابی'],
            ['V8 JavaScript engine', 'موتور پرسرعت V8 برای اجرای بهینه کدها'],
            ['Live rendering inspection', 'بازرسی زنده و لحظه‌ای ظاهر و کدهای صفحه'],
            ['COMPLETE FRONT-END DEVELOPMENT COURSE', 'دوره جامع آموزش فرانت‌اند']
        ]
    },
    20: {
        title: 'گوگل کروم: میز کار توسعه‌دهنده - جلسه ۰۱',
        replacements: [
            ['Lesson 01 // Introduction', 'جلسه ۰۱ // ابزارهای وب'],
            ['Google Chrome: The Workbench', 'گوگل کروم: میز کار و آزمایشگاه شما'],
            ['Industry Standard', 'استاندارد جهانی صنعت وب'],
            ['Powered by the high-performance V8 engine, it is the most used browser by developers and users worldwide.', 'مجهز به موتور قدرتمند V8 و محبوب‌ترین مرورگر مورد استفاده برنامه‌نویسان در دنیا.'],
            ['Built-in DevTools', 'مجموعه ابزارهای Chrome DevTools'],
            ['A professional suite for inspecting HTML structure, styling with CSS, and debugging JavaScript in real-time.', 'ابزار تخصصی برای بررسی زنده ساختار HTML، تغییرات لحظه‌ای CSS و خطایابی جاوااسکریپت.'],
            ['Extension Ecosystem', 'اکوسیستم غنی اکستنشن‌ها'],
            ['Access to thousands of developer-specific tools like React Developer Tools, Lighthouse, and Accessibility checkers.', 'دسترسی به هزاران ابزار توسعه مانند React DevTools، آنالیز Lighthouse و تست‌های دسترسی‌پذیری.']
        ]
    },
    21: {
        title: 'ویژوال استودیو کد: کارگاه شما - جلسه ۰۱',
        replacements: [
            ['Lesson 01 // Introduction', 'جلسه ۰۱ // ابزارهای وب'],
            ['Visual Studio Code: The Workshop', 'ویژوال استودیو کد (VS Code): کارگاه حرفه‌ای شما'],
            ['Industry Standard', 'ویرایشگر شماره ۱ جهان'],
            ['The #1 choice for developers at Google, Microsoft, and top tech companies.', 'محبوب‌ترین انتخاب برنامه‌نویسان در گوگل، مایکروسافت و برترین شرکت‌های فناوری دنیا.'],
            ['IntelliSense', 'تکمیل خودکار هوشمند (IntelliSense)'],
            ['Smart autocompletion for HTML tags, CSS properties, and JavaScript syntax.', 'پیشنهاد و تکمیل سریع تگ‌های HTML، ویژگی‌های CSS و دستورات جاوااسکریپت.'],
            ['Built-in Terminal', 'ترمینال یکپارچه داخلی'],
            ['Run commands, manage Git, and launch dev servers without leaving the editor.', 'اجرای دستورات، مدیریت گیت و اجرای سرورها مستقیماً در درون محیط ادیتور.'],
            ['Free & Open Ecosystem', 'رایگان و با هزاران افزونه'],
            ['Free &amp; Open Ecosystem', 'رایگان و با هزاران افزونه'],
            ['Completely free with thousands of extensions for themes, formatters, and tools.', 'کاملاً رایگان همراه با دسترسی نامحدود به تم‌ها، ابزارهای فرمت کد و امکانات جانبی.']
        ]
    },
    22: {
        title: 'راهنمای نصب و راه‌اندازی VS Code - جلسه ۰۱',
        replacements: [
            ['Lesson 01 // Introduction', 'جلسه ۰۱ // نصب نرم‌افزار'],
            ['Setting Up: Installing VS Code', 'راهنمای گام‌به‌گام نصب و راه‌اندازی VS Code'],
            ['Download', 'گام اول: دانلود'],
            ['Visit code.visualstudio.com . The site will automatically detect your Operating System.', 'مراجعه به وب‌سایت رسمی code.visualstudio.com که سیستم‌عامل شما را خودکار شناسایی می‌کند.'],
            ['Install', 'گام دوم: نصب'],
            ['Run the installer. Follow the prompts to set up the application on your local hard drive.', 'فایل نصبی را اجرا کرده و مراحل را تا پایان پیش ببرید.'],
            ['Windows User?', 'کاربران ویندوز:'],
            ['Check "Add to PATH" to enable terminal integration.', 'حتماً تیک گزینه Add to PATH را بزنید تا ترمینال به درستی متصل شود.'],
            ['Launch &amp; Pin', 'گام سوم: اجرا و پین'],
            ['Launch & Pin', 'گام سوم: اجرا و پین'],
            ['Open VS Code for the first time. Pin it to your taskbar or dock for quick access.', 'برنامه را اجرا کنید و آن را روی Taskbar یا Dock پین کنید تا همیشه دم دست باشد.'],
            ['Ready for Code', 'آماده برای اولین پروژه کدنویسی']
        ]
    },
    23: {
        title: 'افزونه‌های پیشنهادی برای VS Code - جلسه ۰۱',
        replacements: [
            ['Lesson 01 // Introduction', 'جلسه ۰۱ // اکستنشن‌های ضروری'],
            ['Recommended VS Code Extensions', 'افزونه‌های پیشنهادی و ضروری برای VS Code'],
            ['Productivity', 'بهره‌وری بالا'],
            ['Launches a local development server with a live reload feature for static pages.', 'اجرای سرور محلی با قابلیت رفرش خودکار صفحات هنگام ذخیره فایل‌ها.'],
            ['Instant browser updates', 'مشاهده آنی تغییرات بدون نیاز به رفرش دستی'],
            ['No manual refreshing', 'صرفه‌جویی چشم‌گیر در زمان توسعه'],
            ['Code Quality', 'زیبایی و نظم کد'],
            ['An opinionated code formatter that enforces a consistent style across your files.', 'ابزار استاندارد مرتب‌سازی و زیباسازی خودکار کدها بر اساس الگوهای تمیز.'],
            ['Cleaner, readable code', 'کدهایی بسیار تمیز، منظم و خوانا'],
            ['Auto-format on save', 'مرتب‌سازی خودکار کلمات هنگام زدن کلید Ctrl + S'],
            ['HTML Helper', 'دستیار تگ‌های HTML'],
            ['Automatically renames the paired closing HTML tag when you modify the opening tag.', 'تغییر خودکار تگ پایانی هنگام ویرایش یا تغییر تگ ابتدایی در HTML.'],
            ['Prevents mismatched tags', 'جلوگیری از ناهماهنگی تگ‌های باز و بسته'],
            ['Saves typing effort', 'افزایش سرعت و راحتی کدنویسی'],
            ['File Icons', 'آیکون‌های زیبا'],
            ['Adds clean, beautiful file-type icons to the VS Code sidebar for easy navigation.', 'نمایش آیکون‌های رنگی و جذاب برای انواع فایل‌ها در سایدبار اکسپلورر.'],
            ['Spot files at a glance', 'تشخیص سریع انواع فایل‌ها با یک نگاه'],
            ['Professional look', 'ظاهری حرفه‌ای و لذت‌بخش در محیط کار']
        ]
    },
    24: {
        title: 'ساختار اصولی فایل‌ها و پوشه‌های پروژه - جلسه ۰۱',
        replacements: [
            ['Lesson 01 // Introduction', 'جلسه ۰۱ // سازمان‌دهی پروژه'],
            ['Organizing Your Work: Folder Structure', 'ساختار استاندارد پوشه‌ها و فایل‌های پروژه'],
            ['One Root Folder', 'یک پوشه ریشه اختصاصی'],
            ['Keep every project in its own self-contained directory. Never build directly on your desktop.', 'هر پروژه را در پوشه‌ای مستقل ذخیره کنید؛ هرگز فایل‌ها را روی دسکتاپ رها نکنید.'],
            ['Lowercase Naming', 'نام‌گذاری با حروف کوچک'],
            ['Use lowercase letters and hyphens. Avoid spaces and special characters to prevent broken links.', 'از حروف کوچک انگلیسی و خط فاصله (-) استفاده کنید؛ فاصله باعث خرابی لینک‌ها می‌شود.'],
            ['Logical Subfolders', 'پوشه‌های فرعی دسته‌بندی‌شده'],
            ['Group files by type (CSS, JS, Images) to keep the project scalable as it grows.', 'فایل‌ها را بر حسب نوع (استایل، جاوااسکریپت و تصاویر) در پوشه‌های منظم تفکیک کنید.'],
            ['Tip: Your main page must always be named index.html', 'نکته طلایی: فایل صفحه اصلی پروژه همواره باید index.html نامیده شود.']
        ]
    },
    25: {
        title: 'کارگاه عملی: ساخت پوشه پروژه - جلسه ۰۱',
        replacements: [
            ['Lesson 01 // Introduction', 'جلسه ۰۱ // کارگاه عملی'],
            ['Hands-on: Creating Your Project Folder', 'کارگاه عملی: ایجاد پوشه اولین پروژه وب'],
            ['Follow along — 3 steps', 'مراحل گام‌به‌گام'],
            ['Open VS Code', '۱. باز کردن نرم‌افزار'],
            ['File → Open Folder…', 'منوی File سپس انتخاب Open Folder…'],
            ['Create a new folder', '۲. ایجاد پوشه جدید'],
            ['Name it:', 'نام‌گذاری پوشه:'],
            ['Select that folder', '۳. انتخاب پوشه'],
            ['VS Code opens it as your workspace', 'پوشه به عنوان فضای کاری فعال شما باز می‌شود'],
            ['Verify in Explorer panel', '۴. بررسی پنل Explorer'],
            ['You should see', 'نام پوشه را در بالای سایدبار ببینید'],
            ['at the top', ''],
            ['Terminal — Alternative: command line', 'روش دوم: از طریق خط فرمان و ترمینال'],
            ['Result — Explorer Panel', 'نتیجه کار در پنل Explorer'],
            ['Keep all projects inside a single', 'توصیه حرفه‌ای: تمام پروژه‌های وب را درون یک پوشه مادر مشخص نگه دارید.']
        ]
    },
    26: {
        title: 'کارگاه عملی: ساخت فایل index.html - جلسه ۰۱',
        replacements: [
            ['Lesson 01 // Introduction', 'جلسه ۰۱ // کارگاه عملی'],
            ['Hands-on: Creating index.html', 'کارگاه عملی: ایجاد فایل index.html'],
            ['Open Your Project Folder', '۱. بررسی فعال بودن پوشه'],
            ['Make sure your "web-basics" folder is active in the VS Code Sidebar.', 'مطمئن شوید پوشه پروژه در پنل سایدبار ادیتور باز است.'],
            ['Trigger "New File"', '۲. ایجاد فایل جدید'],
            ['Click the', 'کلیک روی آیکون'],
            ['icon in the Explorer or press', 'یا فشردن کلید میانبر'],
            ['Save and Name', '۳. نام‌گذاری دقیق'],
            ['Type the filename exactly and press Enter to save it to disk.', 'نام index.html را به دقت تایپ کرده و کلید Enter را بزنید.'],
            ['The "index" Rule', 'قانون نام‌گذاری index'],
            ['Web servers automatically look for a file named <strong>index</strong> to serve as the homepage.', 'سرورهای وب به صورت خودکار فایل index را به عنوان صفحه نخست و اصلی باز می‌کنند.'],
            ['The <span class="extension-badge">.html</span> extension tells the computer: "This is a web document."', 'پسوند html به سیستم‌عامل و مرورگر اعلام می‌کند که این یک سند استاندارد وب است.']
        ]
    },
    27: {
        title: 'نوشتن اولین خط کد HTML - جلسه ۰۱',
        replacements: [
            ['Lesson 01 // Introduction', 'جلسه ۰۱ // اولین کدنویسی'],
            ['Writing Your First Line of Code', 'نوشتن اولین خطوط کد HTML در زندگی شما!'],
            ['Hello World', 'سلام دنیا!'],
            ['I am learning to code!', 'من در حال یادگیری فرانت‌اند هستم.'],
            ['&lt;h1&gt; Tag', 'تگ تیتر اصلی (&lt;h1&gt;)'],
            ['Represents the main heading. Use this for the most important title on your page.', 'نشان‌دهنده تیتر اصلی و مهم‌ترین عنوان در صفحه وب است.'],
            ['&lt;p&gt; Tag', 'تگ پاراگراف (&lt;p&gt;)'],
            ['Represents a paragraph. Use this for regular text blocks and descriptions.', 'برای نوشتن متن‌های معمولی، توضیحات و پاراگراف‌ها به کار می‌رود.'],
            ['Opening and Closing', 'تگ‌های باز و بسته'],
            ['Tags come in pairs. The forward slash (/) tells the browser: "The element ends here."', 'تگ‌ها جفتی هستند؛ کاراکتر اسلش (/) پایان محدوده المان را مشخص می‌کند.'],
            ['Pro tip: Type h1 and press Tab in VS Code — Emmet generates the full tag automatically!', 'نکته سرعتی: در VS Code کافیست h1 را تایپ کنید و کلید Tab را بزنید تا کل تگ خودکار ساخته شود!']
        ]
    },
    28: {
        title: 'اجرای اولین صفحه وب در مرورگر - جلسه ۰۱',
        replacements: [
            ['Lesson 01 // Execution', 'جلسه ۰۱ // اجرای پروژه'],
            ['Running Your First Web Page', 'اجرای صفحه وب و مشاهده نتیجه در مرورگر'],
            ['BASIC', 'روش ساده'],
            ['Drag &amp; Drop', 'کشیدن و رها کردن فایل'],
            ['Drag & Drop', 'کشیدن و رها کردن فایل'],
            ['Drag your index.html file directly into a Chrome tab.', 'فایل index.html را مستقیماً با موس کشیده و در تب مرورگر کروم رها کنید.'],
            ['SYSTEM', 'روش سیستمی'],
            ['Right-Click Open', 'کلیک راست و انتخاب مرورگر'],
            ['Right-click file → Open With → Google Chrome.', 'روی فایل کلیک راست کرده و Open With سپس Google Chrome را انتخاب کنید.'],
            ['PRO TIP', 'روش حرفه‌ای'],
            ['VS Code Live Server', 'اجرا با اکستنشن Live Server'],
            ['Click "Go Live" to see changes instantly as you save.', 'روی دکمه Go Live کلیک کنید تا با هر ذخیره فایل، صفحه خودکار آپدیت شود.'],
            ['Hello World', 'سلام دنیا!'],
            ['I am learning to code!', 'من در حال یادگیری فرانت‌اند هستم.']
        ]
    },
    29: {
        title: 'بهترین الگوها و عادات برنامه‌نویسی - جلسه ۰۱',
        replacements: [
            ['Lesson 01 // Introduction', 'جلسه ۰۱ // نکات کلیدی'],
            ['Beginner Best Practices', 'بهترین الگوها و عادات یک برنامه‌نویس حرفه‌ای'],
            ['Clean Structure', 'ساختار مرتب و استاندارد'],
            ['Use consistent indentation for readability.', 'رعایت فاصله‌گذاری و ایندنت منظم برای خوانایی کدها.'],
            ['Add comments to explain complex logic.', 'استفاده از کامنت برای یادداشت‌گذاری بخش‌های مهم.'],
            ['Keep code simple and avoid over-engineering.', 'پرهیز از پیچیدگی‌های غیرضروری در نوشتن کد.'],
            ['"Write code for humans first."', '«کد را طوری بنویسید که ابتدا برای انسان‌ها خوانا باشد.»'],
            ['Naming Habits', 'عادات اصولی نام‌گذاری'],
            ['Use kebab-case for files.', 'نام‌گذاری فایل‌ها با حروف کوچک و سبک kebab-case.'],
            ['Avoid spaces: my page.html', 'پرهیز از فاصله در نام فایل‌ها (مثلاً my-page.html)'],
            ['Be descriptive: about-us.html', 'انتخاب نام‌های مشخص و معنادار (مثل about-us.html)'],
            ['Always check extensions.', 'همیشه پسوند صحیح فایل‌ها را کنترل کنید.'],
            ['Daily Practice', 'تمرین مستمر روزانه'],
            ['Write code every day, even 30 minutes.', 'کدنویسی مستمر روزانه، حتی در حد ۳۰ دقیقه.'],
            ['Type code manually — avoid copy-pasting.', 'کدها را دستی تایپ کنید و از کپی-پیست کورکورانه بپرهیزید.'],
            ['Build small projects to reinforce learning.', 'ساخت پروژه‌های کوچک تجربی برای تثبیت آموخته‌ها.'],
            ['Embrace bugs as learning opportunities.', 'مشکلات و باگ‌ها را به چشم فرصتی عالی برای یادگیری ببینید.']
        ]
    },
    30: {
        title: 'خطاهای رایج مبتدیان و عیب‌یابی - جلسه ۰۱',
        replacements: [
            ['Lesson 01 // Introduction', 'جلسه ۰۱ // عیب‌یابی'],
            ['Troubleshooting Common Issues', 'خطاهای رایج مبتدیان و راهکار برطرف کردن آن‌ها'],
            ['Typo in HTML Tag', 'غلط املایی در نام تگ‌ها'],
            ['Problem', 'خطا'],
            ['Fix', 'اصلاح'],
            ["HTML tags must be spelled exactly. Check VS Code's syntax highlighting — unknown tags appear unstyled.", 'نام تگ‌ها باید دقیق تایپ شود. به رنگ تگ در VS Code دقت کنید؛ تگ‌های اشتباه رنگ متفاوتی دارند.'],
            ['Missing Closing Tag', 'فراموش کردن بستن تگ'],
            ['Unclosed tags leak styles to other elements. Always close pairs: &lt;/h1&gt;, &lt;/p&gt;, &lt;/div&gt;.', 'تگ بسته نشده باعث اعمال ناخواسته استایل به المان‌های بعدی می‌شود. تگ‌های جفتی را حتماً ببندید.'],
            ['File Not Saved', 'ذخیره نشدن تغییرات فایل'],
            ['Symptom', 'نشانه'],
            ['A dot on the VS Code tab means unsaved changes. Enable Auto Save under File → Auto Save.', 'وجود دایره در کنار نام فایل در تب ادیتور نشانه ذخیره نشدن است. کلید Ctrl + S را بزنید یا Auto Save را فعال کنید.'],
            ['Wrong File Extension', 'پسوند اشتباه در فایل'],
            ['OS may hide extensions. Check "Show file extensions" in Explorer settings to confirm the real name.', 'سیستم‌عامل ممکن است پسوندها را مخفی کند. در تنظیمات پوشه‌ها گزینه نمایش پسوند را فعال کنید.'],
            ['Browser Cache / No Refresh', 'کش مرورگر و عدم به‌روزرسانی'],
            ['Hard reload bypasses the cache. Live Server refreshes automatically — install it to avoid this issue.', 'رفرش سخت (Ctrl+Shift+R) کش را دور می‌زند. استفاده از Live Server این مشکل را به کلی حل می‌کند.'],
            ['When nothing works, open DevTools (F12) → Console tab. Red errors point directly to the problem.', 'نکته طلایی: هر جا به بن‌بست رسیدید، کلید F12 را بزنید و تب Console را باز کنید؛ ارورهای قرمز دقیقاً علت را می‌گویند.']
        ]
    },
    31: {
        title: 'جمع‌بندی و دستاوردهای درس اول - جلسه ۰۱',
        replacements: [
            ['Lesson 01 // Introduction', 'جلسه ۰۱ // جمع‌بندی'],
            ['Lesson Summary', 'جمع‌بندی و دستاوردهای جلسه اول'],
            ['You have successfully moved from', 'شما با موفقیت از'],
            ['consuming', '«مصرف‌کننده وب»'],
            ['the web to', 'به'],
            ['building', '«خالق و توسعه‌دهنده وب»'],
            ['it—laying the foundation for your career.', 'تبدیل شدید و سنگ بنای مسیر حرفه‌ای‌تان را بنا نهادید.'],
            ['Architecture', 'معماری و شبکه وب'],
            ['Understood the Client-Server model, DNS lookups, and how HTTP/S protocols facilitate global communication.', 'شناخت مدل کلاینت-سرور، سامانه DNS و نحوه تبادل داده‌ها در وب با پروتکل‌های HTTP و HTTPS.'],
            ['The Stack', 'مثلث فرانت‌اند'],
            ['Defined the roles of HTML (Structure), CSS (Style), and JavaScript (Logic) in the modern browser environment.', 'تثبیت نقش استخوان‌بندی (HTML)، پوست و زیبایی (CSS) و هوشمندی و تعامل (جاوااسکریپت).'],
            ['Tooling', 'تجهیز محیط کار'],
            ['Configured a professional developer environment using Google Chrome and Visual Studio Code.', 'نصب و پیکربندی تخصصی گوگل کروم و ویژوال استودیو کد به همراه اکستنشن‌های کاربردی.'],
            ['Milestone', 'اولین دستاورد عملی'],
            ['Created your first project structure and successfully rendered a local HTML file in the browser.', 'ایجاد ساختار اصولی پروژه، نوشتن اولین خطوط کد HTML و اجرای موفقیت‌آمیز در مرورگر.']
        ]
    },
    32: {
        title: 'تمرین خانگی و آمادگی برای جلسه دوم - جلسه ۰۱',
        replacements: [
            ['Lesson 01 // Introduction', 'جلسه ۰۱ // تمرین و گام بعدی'],
            ['Homework and Next Steps', 'تمرین خانگی و آمادگی برای جلسه دوم'],
            ['Install Your Development Tools', '۱. نصب و راه‌اندازی ابزارهای توسعه'],
            ['Download and install', 'دانلود و نصب نرم‌افزارهای'],
            ['Ensure they are pinned to your taskbar for quick access.', 'پین کردن آن‌ها روی تسک‌بار سیستم برای دسترسی سریع.'],
            ['Setup Your Project Workspace', '۲. ساخت فضای کاری منظم'],
            ['Create a new folder on your computer named', 'یک پوشه روی سیستم خود به نام'],
            ['Inside it, create a sub-folder called', 'و درون آن یک زیرپوشه به نام'],
            ['Create Your First HTML File', '۳. نوشتن اولین فایل HTML'],
            ['Open your', 'پوشه پروژه را در ادیتور باز کنید. فایل'],
            ['Verify the Execution', '۴. اجرای نتیجه در مرورگر'],
            ['Right-click your', 'روی فایل'],
            ['file and select "Open with Google Chrome." Confirm that you see "Hello World" displayed in the browser.', 'کلیک راست کرده و با Google Chrome باز کنید. تأیید کنید که متن‌ها به درستی نمایش داده می‌شوند.'],
            ['Successful completion of these steps is required before our next lesson on Semantic HTML structure.', 'انجام کامل این ۴ مرحله، پیش‌نیاز ضروری برای ورود به جلسه بعدی و یادگیری ساختار معنایی HTML است.']
        ]
    }
};

let modifiedCount = 0;

for (let i = 1; i <= 32; i++) {
    const num = String(i).padStart(2, '0');
    const filePath = `slide-${num}.html`;
    if (!fs.existsSync(filePath)) {
        console.warn(`File ${filePath} not found, skipping.`);
        continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    const data = slidesData[i];

    // Enhance head with theme & Vazirmatn font
    content = enhanceHead(content, data ? data.title : null);

    // Apply replacements if available
    if (data && data.replacements) {
        for (const [search, replace] of data.replacements) {
            content = content.replaceAll(search, replace);
        }
    }

    // Ensure direction is set on root elements
    if (!content.includes('dir="rtl"')) {
        content = content.replace(/<html[^>]*>/i, '<html lang="fa" dir="rtl">');
    }

    fs.writeFileSync(filePath, content, 'utf8');
    modifiedCount++;
}

console.log(`Successfully updated ${modifiedCount} slides!`);
