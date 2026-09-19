import fs from 'fs';
import path from 'path';

const translationsMap = {
  // Common terms & Headings
  'UI Components': 'کامپوننت‌های رابط کاربری (UI)',
  'Real Projects': 'پروژه‌های عملی و واقعی',
  'Dynamic Updates': 'به‌روزرسانی‌های پویا و بلادرنگ',
  'Presenter Notes': 'یادداشت‌های مدرس',
  'Extension Hub': 'مرکز افزونه‌ها (Extension Hub)',
  'Integrated Tools': 'ابزارهای داخلی و یکپارچه',
  'Growth Mindset': 'طرز فکر رشد و یادگیری مداوم',
  'آموزش جامع HTML & CSSاز صفر تا ورود به بازار کار': 'آموزش جامع HTML & CSS — از صفر تا ورود به بازار کار',
  'درک ساختارو مفاهیم وب': 'درک ساختار و مفاهیم وب',
  'آشنایی بازبان‌های پایه': 'آشنایی با زبان‌های پایه وب',
  'ساخت اولینصفحه وب': 'ساخت اولین صفحه وب',
  'تفاوت فرانت‌اند و بک‌اند (فرانت‌اند (رابط کاربر) vs بک‌اند (سرور و پایگاه داده))': 'تفاوت فرانت‌اند و بک‌اند (Front-End vs Back-End)',
  'تفاوت پروتکل استاندارد (HTTP) و پروتکل استاندارد (HTTP)S: قوانین مکالمه در وب': 'تفاوت HTTP و HTTPS: قوانین مکالمه در وب',
  'PREREQUISITE: NO PRIOR EXPERIENCE REQUIRED': 'پیش‌نیاز: بدون نیاز به هیچ تجربه قبلی برنامه‌نویسی',

  // Slide 02
  'Welcome to the very first lesson of our Front-End Development journey! I want to start by reassuring everyone: you are in the right place. Even if you\'ve never written a single line of code before, today is designed for you.':
    'به اولین جلسه از مسیر یادگیری فرانت‌اند خوش آمدید! حتی اگر تا به امروز حتی یک خط کد هم ننوشته‌اید، این دوره دقیقاً برای شما از پایه صفر طراحی شده است.',
  'Our journey today has three distinct milestones. First, we’re going to demystify "the web." Instead of seeing it as magic, we’ll look at the actual infrastructure—the conversation between your computer and servers. Second, we’ll meet the "Big Three": HTML, CSS, and JavaScript. These are the languages that make everything you see online possible. Finally, we’re going to get hands-on. By the end of this hour, you will have created a real project folder and launched your very first HTML page in a browser.':
    'در این جلسه ۳ هدف اصلی داریم: اول درک ماهیت واقعی وب و ارتباط کلاینت با سرور؛ دوم شناخت سه تفنگدار وب یعنی HTML و CSS و JavaScript؛ و سوم، ساخت اولین پوشه پروژه واقعی و اجرای اولین صفحه وب.',
  'Transition: Before we dive into the technical details, let me briefly introduce myself so you know who will be guiding you through this course.':
    'پیش از ورود به مباحث فنی، مدرس دوره خود را معرفی می‌کند.',
  'The three cards fade in as a single group to maintain a clean entrance. The footer badge serves as a static anchor of reassurance.':
    'کارت‌های سه‌گانه با انیمیشن ورود آرام جهت درک بهتر مباحث.',

  // Slide 04 Card Descriptions
  'Learn the building blocks of every website, including semantic elements, forms, tables, lists,\n                    media, and best practices.':
    'یادگیری اسکلت بنیادین تمام وب‌سایت‌ها شامل تگ‌های معنایی، فرم‌ها، جداول، لیست‌ها، مالتی‌مدیا و استانداردهای سئو.',
  'Style beautiful websites using colors, typography, spacing, positioning, gradients, shadows, and\n                    animations.':
    'استایل‌دهی چشم‌نواز با پالت‌های رنگی، تایپوگرافی، فاصله‌ها، موقعیت‌یابی عناصر، گرادینت‌ها و انیمیشن‌های مدرن.',
  'Build modern page layouts with Flexbox and CSS Grid for clean, flexible, and responsive designs.':
    'پیاده‌سازی چیدمان‌های حرفه‌ای وب با فلکس‌باکس و سی‌اس‌اس گرید برای طراحی‌های کاملاً منعطف و منظم.',
  'Create websites that automatically adapt to desktop, tablet, and mobile devices.':
    'ساخت سایت‌هایی که به صورت خودکار و بدون عیب در دسکتاپ، تبلت و تلفن‌های همراه نمایش داده می‌شوند.',
  'Build professional navigation bars, buttons, cards, forms, menus, galleries, and other reusable UI\n                    components.':
    'ساخت منوهای مدرن، دکمه‌ها، کارت‌های محصول، فرم‌ها، گالری‌ها و اجزای قابل استفاده مجدد رابط کاربری.',
  'Build complete, real-world websites from scratch and build a portfolio to showcase your skills to\n                    employers.':
    'توسعه پروژه‌های واقعی صفر تا صد برای تثبیت مهارت‌ها و ساخت رزومه قدرتمند جهت ورود به بازار کار.',

  // Slide 05
  'This course takes you from zero to building professional, responsive websites.\n        The journey starts with understanding the web and tools, then HTML fundamentals, advanced HTML, CSS basics, box\n        model, چیدمان با فلکس‌باکس, Grid, responsive design, CSS animations, advanced CSS, and finally a complete final project.\n        By the end, you\'ll have a solid foundation to continue into Front-End development.':
    'این دوره شما را از صفر مطلق تا ساخت سایت‌های حرفه‌ای و ریسپانسیو هدایت می‌کند. مسیر با شناخت وب و ابزارها آغاز شده و با HTML، CSS، فلکس‌باکس، گرید، طراحی ریسپانسیو و پروژه پایانی تکمیل می‌گردد.',

  // Slide 10
  'Narrate the sequence with an example such as https://google.com. Explain that real systems involve more detail, but this is the correct beginner mental model. Step 1 is the user intent. Step 2 is the \'phonebook\' lookup. Step 3 is the \'agreement\' to talk. Step 4 and 5 are the actual conversation. Step 6 is where the code becomes a visual. Define URL as an address for a web resource.':
    'مثال ملموس تایپ google.com: گام ۱ قصد کاربر، گام ۲ دفترچه تلفن DNS، گام ۳ توافق ارتباطی TCP، گام‌های ۴ و ۵ تبادل درخواست و پاسخ، و گام ۶ تبدیل کد به صفحه تصویری.',
  'Transition: "Now that we see the journey, let\'s zoom into the actual language used in these requests and responses."':
    'انتقال به مبحث بعدی: بررسی زبان تبادل پیام‌ها بین مرورگر و سرور.',
  'Motion: Reveal each numbered step card one by one using a fade effect. The SVG animation at the top pulses to show the data movement synchronized with the explanation.':
    'نمایش مرحله به مرحله کارت‌ها همگام با انیمیشن ضربانی SVG.',

  // Slide 11
  'HyperText Transfer Protocol. The foundation of data exchange on the web.':
    'پروتکل انتقال ابرمتن (HTTP)؛ شالوده و پایه اصلی تبادل داده‌ها در وب.',
  'Defines rules for how browsers ask for files.':
    'تعریف قوانین و استانداردهای نحوه درخواست فایل توسط مرورگرها.',
  'Encryption: Scrambles data so only you can read it.':
    'رمزنگاری (Encryption): داده‌ها را کدگذاری کرده تا فقط کاربر و سرور مقصد آن را بخوانند.',
  'Identity: Proves the website is who they say they are.':
    'اصالت‌سنجی (Identity): اثبات هویت واقعی وب‌سایت با گواهینامه معتبر دیجیتال SSL.',
  'Privacy: Essential for passwords and credit cards.':
    'حفظ امنیت و حریم خصوصی (Privacy): حفاظت کامل از گذرواژه‌ها و اطلاعات کارت‌های بانکی.',
  'A typical network conversation:': 'یک مکالمه نمونه میان مرورگر و سرور در شبکه وب:',

  // Slide 12
  'The server crashed or encountered an error while trying to process your request.':
    'سرور در تلاش برای پردازش درخواست با خطا مواجه شد یا موقتاً از دسترس خارج شده است.',
  'The gold standard. "I found it, here you go."':
    'موفقیت‌آمیز. "فایل با موفقیت پیدا شد، بفرمایید."',
  'You\'ve definitely seen this. "I\'m here, but I have no idea what file you\'re talking about." This is usually a typo in the URL.':
    'حتماً این خطا را دیده‌اید. "من آنلاین هستم، اما چنین صفحه‌ای وجود ندارد." معمولاً به دلیل اشتباه تایپی در آدرس است.',
  '"Something broke on my end." The server exists but it\'s having a bad day.':
    '"مشکل از سمت من است." سرور آنلاین است ولی در پردازش برنامه با خطای داخلی مواجه شده است.',

  // Slide 16
  'Updating content and fetching new data in real-time without requiring the user to refresh the page.':
    'به‌روزرسانی محتوا و دریافت داده‌های جدید به صورت لحظه‌ای بدون نیاز به بارگذاری مجدد (رفرش) صفحه.',

  // Slide 19
  'Visual Studio Code': 'محیط کدنویسی وی‌اس‌کد (VS Code)',
  'Google Chrome': 'مرورگر گوگل کروم (Google Chrome)',

  // Slide 21
  'The #1 choice for developers at Google, Microsoft, and Meta.':
    'انتخاب شماره ۱ توسعه‌دهندگان برتر دنیا در گوگل، مایکروسافت و متا.',
  'Thousands of powerful plugins to supercharge your workflow.':
    'هزاران افزونه کارآمد برای تسریع و خودکارسازی فرآیند کدنویسی.',
  'Built-in terminal, Git support, and intelligent code completion.':
    'ترمینال یکپارچه، پشتیبانی از گیت و تکمیل هوشمند کدها (IntelliSense).',

  // Slide 22
  'Check "Add to PATH" to enable terminal commands later.':
    'حتماً گزینه "Add to PATH" را تیک بزنید تا دستورات ترمینال فعال شوند.',
  'Your digital workshop is now open for business.':
    'کارگاه دیجیتال شما آماده به کار است؛ از این پس با لذت کدنویسی کنید.',

  // Slide 23
  'Auto-fixes indentations': 'اصلاح و مرتب‌سازی خودکار فاصله‌ها و ساختار کد',
  'Visual file navigation': 'نمایش آیکون‌های رنگی و بصری برای شناسایی سریع فایل‌ها',
  'Industry-standard look': 'قالب بصری استاندارد و چشم‌نواز محیط ادیتور',
  'Pro Tip: Use Ctrl + Shift + X (Windows) or Cmd + Shift + X (Mac) to open the Extensions marketplace.':
    'نکته کلیدی: فشردن Ctrl + Shift + X در ویندوز منوی جستجوی افزونه‌ها را سریعاً باز می‌کند.',

  // Slide 24 & 25
  '// Entry point': '// نقطه ورود اصلی سایت',
  '# opens VS Code here': '# اجرای مستقیم ادیتور در این پوشه',
  '← index.html lives here next': '← فایل اصلی پروژه (index.html) در این قسمت ساخته می‌شود',

  // Slide 27
  'Browser Preview': 'پیش‌نمایش در مرورگر',
  'Represents a paragraph. Use this for regular text content and descriptions.':
    'نشان‌دهنده پاراگراف است و برای متون استاندارد، مقالات و توضیحات بدنه صفحه به کار می‌رود.',
  '- On line 2, we use . This stands for paragraph, used for normal text.':
    'در خط ۲ از تگ p استفاده شده که مخفف پاراگراف برای متن‌های معمولی است.',

  // Slide 28
  'Rendering local file content...': 'در حال بارگذاری و رندر محتوای صفحه محلی...',
  'Success! Your code is live.': 'تبریک! اولین کد شما زنده شد و در مرورگر اجرا گردید.',

  // Slide 29
  'Use kebab-case for files.': 'استفاده از حروف کوچک و خط تیره برای نام فایل‌ها (مانند about-us.html).',
  'Avoid spaces: my page.html': 'پرهیز جدی از فاصله در نام فایل‌ها (مانند my page.html).',
  'Meaningful names save time later.': 'نام‌های معنایی و دقیق در آینده ساعت‌ها در زمان شما صرفه‌جویی می‌کنند.',
  'Practice coding every single day.': 'تمرین روزانه و مستمر؛ حتی ۳۰ دقیقه کدنویسی در روز معجزه می‌کند.',
  'Embrace errors as learning opportunities.': 'خطاها را دوست بدارید: هر خطا فرصتی طلایی برای یادگیری عمیق است.',
  'Focus on concepts, not just syntax.': 'تمرکز روی مفاهیم بنیادین به جای حفظ کردن دستورات.',
  'Consistency beats intensity.': 'استمرار و پیوستگی روزانه همیشه بر تلاش‌های مقطعی پیروز است.',

  // Slide 30
  'Every opening tag needs a matching closing tag. VS Code\'s bracket pair colorizer highlights mismatches.':
    'هر تگ آغازین نیاز به یک تگ پایانی متناظر دارد. ادیتور VS Code عدم تطابق تگ‌ها را با رنگ مشخص می‌کند.',
  'Incorrect File Path': 'مسیردهی اشتباه به فایل‌ها',
  'Paths are case-sensitive on servers. Keep all folder and file names lowercase to avoid broken links.':
    'سرورها به حروف بزرگ و کوچک حساسند؛ همه نام‌ها را کوچک بنویسید تا لینک‌ها نشکنند.',
  'Pro tip:': 'نکته حرفه‌ای:',

  // Slide 32
  'دانلود و نصب نرم‌افزارهای Visual Studio Code and Google Chrome. پین کردن آن‌ها روی تسک‌بار سیستم برای دسترسی سریع.':
    'دانلود و نصب ادیتور VS Code و مرورگر کروم و پین کردن آن‌ها روی تسک‌بار سیستم برای دسترسی سریع.',
  'پوشه پروژه را در ادیتور باز کنید. فایل lesson-01 folder in VS Code. Create a new file named index.html and type <h1>Hello World</h1>.':
    'پوشه lesson-01 را در VS Code باز کنید، یک فایل بنام index.html بسازید و کد <h1>سلام دنیا!</h1> را بنویسید.',
  'روی فایل index.html کلیک راست کرده و با Google Chrome باز کنید. تأیید کنید که متن‌ها به درستی نمایش داده می‌شوند.':
    'روی فایل index.html کلیک راست کرده و در گوگل کروم باز کنید و از اجرای صحیح نوشته‌ها مطمئن شوید.'
};

console.log('Auditing and polishing all 32 slides...');

for (let i = 1; i <= 32; i++) {
  const num = String(i).padStart(2, '0');
  const filepath = `slide-${num}.html`;
  if (!fs.existsSync(filepath)) continue;

  let content = fs.readFileSync(filepath, 'utf-8');

  // 1. Ensure lang="fa" dir="rtl"
  content = content.replace(/<html[^>]*>/i, '<html lang="fa" dir="rtl">');

  // 2. Ensure projector-theme.css is linked in head
  if (!content.includes('projector-theme.css')) {
    content = content.replace('</head>', '    <link rel="stylesheet" href="projector-theme.css">\n</head>');
  }

  // 3. Fix image on slide 3
  if (num === '03') {
    content = content.replace(/images\/1\.png/g, 'images/Ramin.png');
  }

  // 4. In Slide 10: translate SVG labels & button
  if (num === '10') {
    content = content.replace('>Browser<', '>مرورگر (Browser)<');
    content = content.replace('>DNS Server<', '>سرور DNS<');
    content = content.replace('>Web Server<', '>سرور وب (Server)<');
    content = content.replace(/fa-bookmark/g, 'fa-play');
    content = content.replace('تکرار شبیه‌سازی مسیر', 'پخش مجدد شبیه‌سازی مسیر');
  }

  // 5. In Slide 07: fix direction of arrows and request/response flow for RTL
  if (num === '07') {
    // In RTL, User is on right, Server is on left.
    // Request goes from Right to Left (caret-left), Response goes from Left to Right (caret-right)
    content = content.replace(/fa-caret-right web-flow-arrow-head request/g, 'fa-caret-left web-flow-arrow-head request');
    content = content.replace(/fa-caret-right web-flow-arrow-head response/g, 'fa-caret-right web-flow-arrow-head response');
  }

  // 6. Apply all dictionary translations
  for (const [en, fa] of Object.entries(translationsMap)) {
    if (content.includes(en)) {
      content = content.replaceAll(en, fa);
    }
  }

  // 7. Clean up remaining English heading fragments
  content = content.replace(/<h3>Presenter Notes<\/h3>/gi, '<h3>یادداشت‌های مدرس</h3>');
  content = content.replace(/<h3 class="presenter-notes-title">Presenter Notes<\/h3>/gi, '<h3 class="presenter-notes-title">یادداشت‌های مدرس</h3>');

  // 8. Inject refined in-slide styling overrides for flawless light projector appearance
  const projectorStyleBlock = `
<style id="projector-contrast-tune">
    /* High contrast projector tuning */
    body, .slide-root-container, [class*="-slide-root"] {
        background-color: #ffffff !important;
        color: #0f172a !important;
        font-family: 'Vazirmatn', system-ui, sans-serif !important;
    }
    h1, h2, h3, [class*="-heading"], [class*="-title"] {
        font-family: 'Vazirmatn', system-ui, sans-serif !important;
        color: #0f172a !important;
    }
    p, span, div, li {
        font-family: 'Vazirmatn', system-ui, sans-serif;
    }
    .code-font, pre, code, .editor-content-area, .terminal-body-content, [class*="-code-strip"], [class*="-code-column"] {
        font-family: 'JetBrains Mono', monospace !important;
    }
</style>
`;

  if (!content.includes('projector-contrast-tune')) {
    content = content.replace('</head>', `${projectorStyleBlock}\n</head>`);
  }

  fs.writeFileSync(filepath, content, 'utf-8');
}

console.log('Successfully polished and perfected all 32 slides!');
