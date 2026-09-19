import fs from 'fs';

const englishTitles = [
  'Comprehensive HTML & CSS Course - Welcome & Overview',
  'Welcome: Your First Step in the Web Development World',
  'Meet Your Instructor: Ramin Joshaghani',
  'Core Skills You Will Master in This Course',
  'Complete HTML & CSS Learning Roadmap',
  'Front-End vs Back-End: Understanding the Architecture',
  'How the Web Works: High-Level System Overview',
  'The Internet: Global Network of Interconnected Systems',
  'Three Core Web Roles: Client, Browser, and Server',
  'When You Type a URL: Anatomy of a Web Request',
  'HTTP vs HTTPS: Secure Communication Protocols',
  'HTTP Architecture: Client Request & Server Response',
  'Core Web Triad: Domain, Hosting, and DNS Resolution',
  'HTML: The Semantic Skeleton and Structural Bones of the Web',
  'CSS: The Visual Skin, Layout, and Design of the Web',
  'JavaScript: Dynamic Behavior, Interactivity, and Logic',
  'Modern Web Developer Ecosystem & Tooling',
  'Real-World Production Front-End Case Studies',
  'Essential Front-End Developer Toolbelt',
  'Google Chrome & DevTools: The Professional Web Workbench',
  'Visual Studio Code: The Modern Industry-Standard Editor',
  'VS Code Installation & Environment Setup Guide',
  'Essential VS Code Extensions for High Productivity',
  'Standard Project Directory & File Hierarchy',
  'Hands-on Lab: Creating Your First Project Folder',
  'Hands-on Lab: Creating the index.html Entry File',
  'Writing Your Very First HTML Code: Headings & Paragraphs',
  'Launching and Previewing Your Webpage in Chrome',
  'Professional Developer Habits & Clean Code Best Practices',
  'Common Beginner Pitfalls & Step-by-Step Solutions',
  'Lesson 01 Summary: Milestones & Key Takeaways',
  'Homework Assignment & Preparation for Lesson 02'
];

const englishNotes = [
  'Warm welcome to students. Introduce course vision: taking students from absolute zero to job-ready front-end web developers with modern industry practices.',
  'Break down the 3 core pillars of Lesson 01: understanding fundamental web concepts, mastering the 3 primary web languages, and writing your first lines of code.',
  'Instructor background and real-world software engineering experience. Emphasize project-driven learning, practical problem solving, and confidence building.',
  'Review the 6 fundamental competencies students gain: semantic HTML5, modern CSS3 layouts, Flexbox & Grid, responsive mobile-first design, interactive CSS, and clean architecture.',
  'Walk through the 11 sequential course milestones; explain that every concept is reinforced with hands-on labs and real portfolio projects.',
  'The restaurant dining room vs kitchen analogy: Front-End is what users experience visually and interact with, while Back-End handles databases, servers, and business logic securely.',
  'Explain the 3-stage web cycle: 1. Client initiates request -> 2. Server processes and responds -> 3. Browser parses assets and renders the visual page.',
  'Demystify the physical internet: submarine fiber optic cables, global data centers, routers, and IP packet transmission via TCP/IP protocols.',
  'Define the 3 core pillars: Client (requesting device), Browser (client engine interpreting code into pixels), and Server (24/7 cloud host serving assets).',
  'Walk through the 6 micro-steps of entering a URL: URL entry, DNS lookup, TCP/SSL handshake, HTTP request, file payload delivery, and DOM rendering.',
  'Security contrast between plaintext HTTP (port 80) and encrypted HTTPS (port 443). Analogy of public postcards versus sealed tamper-evident letters with SSL/TLS.',
  'HTTP transaction cycle and HTTP status codes: 200 OK (success), 301/302 Redirect, 404 Not Found (missing asset), and 500 Internal Server Error.',
  'Analogy of Domain (street address / home name), DNS (phonebook translating name to IP), and Web Hosting (the physical house containing files).',
  'Introduce HTML as the structural skeleton and bones of web documents; reinforce that HTML is a declarative markup language, not a procedural programming language.',
  'CSS as styling, typography, color theory, and spatial layout; showcase visual before-and-after comparison of raw unstyled HTML vs styled presentation.',
  'JavaScript as the dynamic brain and muscles: handling user clicks, state changes, asynchronous API communication, and interactive animations.',
  'Auxiliary tooling in modern engineering: Git & GitHub for version control, REST/GraphQL APIs for data flow, and modern web frameworks.',
  'Highlighting prominent front-end applications: Apple store showcasing typography and product design, Slack web app, and Netflix streaming UI.',
  'The developer workspace: Visual Studio Code as the primary coding workshop and Google Chrome DevTools as the inspection and debugging suite.',
  'Chrome DevTools deep dive: Elements inspector for live DOM/CSS manipulation, Console for runtime errors and logs, and Network tab for asset waterfalls.',
  'Why VS Code dominates web development: ultra-fast startup, rich extension marketplace, built-in terminal, Git integration, and robust IntelliSense.',
  'Step-by-step setup for Windows/Mac/Linux: downloading from official site, installer steps, and making sure to enable "Add to PATH" and context menu actions.',
  'Essential extension suite: Live Server for instant auto-reload on file save, Prettier for code formatting, Auto Rename Tag, and Material Icon Theme.',
  'Project organization guidelines: dedicated project root folder, lowercase kebab-case naming without spaces or special characters, and index.html entry point.',
  'Hands-on lab: Guided practice where all students create the my-first-project directory and open it directly inside VS Code.',
  'Hands-on lab: Creating the index.html file in VS Code explorer; explain why web servers automatically look for index.html as the default homepage.',
  'First code writing session: crafting <h1> heading and <p> paragraph; demonstrating Emmet shortcut expansions and the Tab key for maximum efficiency.',
  'Three ways to test web files in Chrome: Drag & Drop into browser, Right-click Open With Chrome, and clicking Go Live with the Live Server extension.',
  'Best programming habits: consistent indentation, meaningful code comments, standard semantic tags, and understanding code before adopting it.',
  'Troubleshooting beginner mistakes: syntax typos in tags, missing closing tags, unsaved files (Ctrl+S), accidental .txt extension, and browser cache clearing.',
  'Lesson 01 milestone celebration: congratulating students on building and rendering their very first live web page.',
  'Homework task: verify development environment setup, build a personal introductory webpage with biographical content, and preview Lesson 02 (semantic tags).'
];

// 1. Update audience.html
let aud = fs.readFileSync('audience.html', 'utf-8');

// Replace slideTitles in audience.html
const audTitlesRegex = /const slideTitles = \[[\s\S]*?\];/;
aud = aud.replace(audTitlesRegex, `const slideTitles = ${JSON.stringify(englishTitles, null, 12)};`);

// Update HTML tag
aud = aud.replace(/<html[^>]*>/i, '<html lang="en" dir="ltr">');

// Update document title & meta description
aud = aud.replace(/<title>.*?<\/title>/i, '<title>Complete HTML & CSS Course - Interactive Presentation</title>');
aud = aud.replace(/<meta name="description".*?>/i, '<meta name="description" content="Comprehensive interactive Front-End Web Development slides optimized for high-contrast projector display.">');

// Update body direction
aud = aud.replace(/direction:\s*rtl;/g, 'direction: ltr;');

// Update progressBar style in audience.html
aud = aud.replace(/#progressBar\s*\{[\s\S]*?top:\s*0;\s*right:\s*0;/, `#progressBar {
            position: fixed;
            top: 0;
            left: 0;`);

// Update nav zones in audience.html: LTR next is RIGHT, prev is LEFT
aud = aud.replace(/\.nav-zone\.next\s*\{\s*left:\s*0;\s*\}/, `.nav-zone.next {
            right: 0;
        }`);
aud = aud.replace(/\.nav-zone\.prev\s*\{\s*right:\s*0;\s*\}/, `.nav-zone.prev {
            left: 0;
        }`);

// Update nav-zone HTML tags
const nextZoneHtmlOld = `<div class="nav-zone next" id="nextZone" title="اسلاید بعدی (کلید چپ / فاصله)">
        <i class="fas fa-chevron-left"></i>
    </div>
    <div class="nav-zone prev" id="prevZone" title="اسلاید قبلی (کلید راست)">
        <i class="fas fa-chevron-right"></i>
    </div>`;

const nextZoneHtmlNew = `<div class="nav-zone prev" id="prevZone" title="Previous Slide (Left Arrow / PageUp)">
        <i class="fas fa-chevron-left"></i>
    </div>
    <div class="nav-zone next" id="nextZone" title="Next Slide (Right Arrow / Space / PageDown)">
        <i class="fas fa-chevron-right"></i>
    </div>`;

aud = aud.replace(nextZoneHtmlOld, nextZoneHtmlNew);

// Update projectorBar HTML buttons to English and correct LTR order (Prev then Slide X of Y then Next)
const projectorBarOldRegex = /<!-- Projector Smart Floating Toolbar -->[\s\S]*?<!-- Slide Overview & Quick Jump Drawer -->/;
const projectorBarNew = `<!-- Projector Smart Floating Toolbar -->
    <div id="projectorBar">
        <button class="bar-btn" id="btnPrev" title="Previous Slide (Left Arrow / P)">
            <i class="fas fa-arrow-left"></i>
            <span>Prev</span>
        </button>

        <button id="slideCounterBtn" title="Slide Directory & Quick Jump (Key G)">
            <span id="counterText">Slide 1 of 32</span>
        </button>

        <button class="bar-btn primary" id="btnNext" title="Next Slide (Right Arrow / Space / N)">
            <span>Next</span>
            <i class="fas fa-arrow-right"></i>
        </button>

        <div class="bar-divider"></div>

        <!-- Laser Pointer Toggle -->
        <button class="bar-btn" id="btnLaser" title="Laser Pointer for Presentation (Key L)">
            <i class="fas fa-wand-magic-sparkles text-red-500"></i>
            <span>Laser</span>
        </button>

        <!-- Slide Drawer Toggle -->
        <button class="bar-btn" id="btnDrawer" title="Slide Catalog Overview (Key G)">
            <i class="fas fa-th-large"></i>
            <span>Slides</span>
        </button>

        <!-- Timer Button -->
        <button class="bar-btn" id="btnTimer" title="Presentation Stopwatch (Key T)">
            <i class="fas fa-stopwatch"></i>
            <span id="timerDisplay">00:00</span>
        </button>

        <div class="bar-divider"></div>

        <!-- Fullscreen Button -->
        <button class="bar-btn" id="btnFullscreen" title="Fullscreen Mode (Key F)">
            <i class="fas fa-expand"></i>
        </button>

        <!-- Blackout / Pause Button -->
        <button class="bar-btn" id="btnBlackout" title="Black Screen for Q&A (Key B)">
            <i class="fas fa-moon"></i>
        </button>

        <!-- Presenter View Button -->
        <a href="presenter.html" target="_blank" class="bar-btn" title="Open Presenter Console">
            <i class="fas fa-microphone"></i>
            <span>Presenter</span>
        </a>

        <!-- Help Shortcuts Button -->
        <button class="bar-btn" id="btnHelp" title="Keyboard Shortcuts Guide (Key ?)">
            <i class="fas fa-keyboard"></i>
        </button>
    </div>

    <!-- Slide Overview & Quick Jump Drawer -->`;

aud = aud.replace(projectorBarOldRegex, projectorBarNew);

// Update Drawer header & search
aud = aud.replace(/فهرست کامل اسلایدهای دوره/g, 'Complete Course Slide Directory');
aud = aud.replace(/جستجوی عنوان یا شماره اسلاید\.\.\./g, 'Search slide title or number...');
aud = aud.replace(/اسلاید \${toPersianDigits\(idx \+ 1\)}/g, 'Slide ${idx + 1}');

// Update Help Modal content
const helpModalOldRegex = /<!-- Help Shortcuts Modal -->[\s\S]*?<\/div>\s*<\/div>/;
const helpModalNew = `<!-- Help Shortcuts Modal -->
    <div id="helpModal">
        <div class="modal-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <h3 style="margin: 0; font-size: 18px; font-weight: 700; color: var(--ppt-text-1);">Projector Keyboard Shortcuts</h3>
                <button class="bar-btn" id="closeHelpBtn"><i class="fas fa-times"></i></button>
            </div>
            <div class="shortcut-row">
                <span style="font-size: 14px; color: var(--ppt-text-2);">Next Slide</span>
                <span class="key-badge">Right Arrow → / Space / Enter / N / PageDown</span>
            </div>
            <div class="shortcut-row">
                <span style="font-size: 14px; color: var(--ppt-text-2);">Previous Slide</span>
                <span class="key-badge">Left Arrow ← / PageUp / P</span>
            </div>
            <div class="shortcut-row">
                <span style="font-size: 14px; color: var(--ppt-text-2);">Toggle Laser Pointer</span>
                <span class="key-badge">L</span>
            </div>
            <div class="shortcut-row">
                <span style="font-size: 14px; color: var(--ppt-text-2);">Slide Overview & Jump</span>
                <span class="key-badge">G</span>
            </div>
            <div class="shortcut-row">
                <span style="font-size: 14px; color: var(--ppt-text-2);">Toggle Fullscreen</span>
                <span class="key-badge">F</span>
            </div>
            <div class="shortcut-row">
                <span style="font-size: 14px; color: var(--ppt-text-2);">Black Screen (Pause / Discussion)</span>
                <span class="key-badge">B</span>
            </div>
            <div class="shortcut-row">
                <span style="font-size: 14px; color: var(--ppt-text-2);">White Screen (Whiteboard Mode)</span>
                <span class="key-badge">W</span>
            </div>
            <div class="shortcut-row">
                <span style="font-size: 14px; color: var(--ppt-text-2);">Start / Pause Timer</span>
                <span class="key-badge">T</span>
            </div>
        </div>
    </div>`;

aud = aud.replace(helpModalOldRegex, helpModalNew);

// Update counterText and document.title in loadSlide
aud = aud.replace(/counterText\.textContent\s*=\s*`اسلاید \${toPersianDigits\(num\)} از \${toPersianDigits\(totalSlides\)}`;/, 'counterText.textContent = `Slide ${num} of ${totalSlides}`;');
aud = aud.replace(/document\.title\s*=\s*`\${slideTitles\[index\]}\s*\|\s*آموزش HTML & CSS`;/, 'document.title = `${slideTitles[index]} | Front-End Course`;');

// Fix Laser Pointer: attach listener to window AND check if pointerEvents or offset, plus bind mousemove properly
const laserLogicOld = `window.addEventListener('mousemove', (e) => {
            if (!isLaserActive) return;
            const rect = container.getBoundingClientRect();
            const scale = rect.width / 1280;
            mouseX = (e.clientX - rect.left) / scale;
            mouseY = (e.clientY - rect.top) / scale;
            drawLaser();
        });`;

const laserLogicNew = `// Accurate laser pointer calculation matching 16:9 scaled stage coordinates
        function handleLaserPointerMove(e) {
            if (!isLaserActive) return;
            const rect = container.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;
            const scaleX = rect.width / 1280;
            const scaleY = rect.height / 720;
            mouseX = (e.clientX - rect.left) / scaleX;
            mouseY = (e.clientY - rect.top) / scaleY;
            drawLaser();
        }

        window.addEventListener('mousemove', handleLaserPointerMove);

        // When laser is active, ensure iframe doesn't trap mouse events in center
        function setLaserIframeInteractivity(laserOn) {
            const iframes = container.querySelectorAll('iframe');
            iframes.forEach(f => {
                f.style.pointerEvents = laserOn ? 'none' : 'auto';
            });
        }`;

aud = aud.replace(laserLogicOld, laserLogicNew);

// In toggleLaser, invoke setLaserIframeInteractivity
aud = aud.replace(/laserCanvas\.classList\.toggle\('active', isLaserActive\);/, `laserCanvas.classList.toggle('active', isLaserActive);
            setLaserIframeInteractivity(isLaserActive);`);

// In loadSlide, when currentIframe is created, ensure pointerEvents matches laser state
aud = aud.replace(/newFrame\.setAttribute\('allow', 'fullscreen'\);/, `newFrame.setAttribute('allow', 'fullscreen');
            if (isLaserActive) newFrame.style.pointerEvents = 'none';`);

// Update timer display to standard English digits
aud = aud.replace(/timerDisplay\.textContent = `\${toPersianDigits\(String\(mins\)\.padStart\(2, '0'\)\)}:\${toPersianDigits\(String\(secs\)\.padStart\(2, '0'\)\)}`;/, `timerDisplay.textContent = \`\${String(mins).padStart(2, '0')}:\${String(secs).padStart(2, '0')}\`;`);

// Update keyboard navigation to standard LTR:
// Right Arrow / Space / PageDown / N -> Next slide
// Left Arrow / PageUp / P -> Previous slide
const keyNavOld = `// In RTL: ArrowLeft = Next, ArrowRight = Previous
            if (e.key === 'ArrowLeft' || e.key === ' ' || e.key === 'PageDown' || e.key.toLowerCase() === 'n') {
                e.preventDefault();
                nextSlide();
            } else if (e.key === 'ArrowRight' || e.key === 'PageUp' || e.key.toLowerCase() === 'p') {
                e.preventDefault();
                prevSlide();
            }`;

const keyNavNew = `// Standard LTR: Right Arrow / Space / PageDown / N = Next slide; Left Arrow / PageUp / P = Prev slide
            if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown' || e.key.toLowerCase() === 'n') {
                e.preventDefault();
                nextSlide();
            } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key.toLowerCase() === 'p') {
                e.preventDefault();
                prevSlide();
            }`;

aud = aud.replace(keyNavOld, keyNavNew);

// Update touch swipe for LTR: swipe left = Next, swipe right = Prev
const touchOld = `// In RTL: Swipe left = Next slide
                if (diff < 0) nextSlide();
                else prevSlide();`;
const touchNew = `// LTR: Swipe left = Next slide, swipe right = Prev slide
                if (diff < 0) nextSlide();
                else prevSlide();`;
aud = aud.replace(touchOld, touchNew);

fs.writeFileSync('audience.html', aud, 'utf-8');
console.log('audience.html successfully updated to English and LTR with laser pointer fix!');

// 2. Update presenter.html
let pres = fs.readFileSync('presenter.html', 'utf-8');

// Replace slideTitles in presenter.html
const presTitlesRegex = /const slideTitles = \[[\s\S]*?\];/;
pres = pres.replace(presTitlesRegex, `const slideTitles = ${JSON.stringify(englishTitles, null, 12)};`);

// Replace slidesNotes in presenter.html
const presNotesRegex = /const slidesNotes = \[[\s\S]*?\];/;
pres = pres.replace(presNotesRegex, `const slidesNotes = ${JSON.stringify(englishNotes, null, 12)};`);

// Update presenter.html HTML tag, direction and title
pres = pres.replace(/<html[^>]*>/i, '<html lang="en" dir="ltr">');
pres = pres.replace(/<title>.*?<\/title>/i, '<title>Presenter Console - Comprehensive HTML & CSS Course</title>');

// Body style direction
pres = pres.replace(/direction:\s*rtl;/g, 'direction: ltr;');

// Top Header
pres = pres.replace(/<span>کنسول مدرس<\/span>/, '<span>Presenter Console</span>');
pres = pres.replace(/اسلاید ۱ از ۳۲/, 'Slide 1 of 32');
pres = pres.replace(/عنوان اسلاید/, 'Slide Title');
pres = pres.replace(/<span>نمایشگر پروژکتور<\/span>/, '<span>Audience View</span>');
pres = pres.replace(/مشاهده صفحه پروژکتور/, 'Open Audience View');
pres = pres.replace(/title="اسلاید قبلی \(راست\)"/, 'title="Previous Slide (Left Arrow)"');
pres = pres.replace(/title="اسلاید بعدی \(چپ\)"/, 'title="Next Slide (Right Arrow)"');
pres = pres.replace(/title="تمام‌صفحه"/, 'title="Fullscreen Mode"');

// Chevron directions in presenter top buttons:
// In LTR: Previous is Left chevron, Next is Right chevron
pres = pres.replace(/<button id="btnPrevTop" class="[^"]*" title="[^"]*">\s*<i class="fas fa-chevron-right"><\/i>\s*<\/button>\s*<button id="btnNextTop" class="[^"]*" title="[^"]*">\s*<i class="fas fa-chevron-left"><\/i>\s*<\/button>/, `<button id="btnPrevTop" class="bg-slate-800 hover:bg-slate-700 border border-slate-600 px-3 py-2 rounded-full text-sm" title="Previous Slide (Left Arrow)">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button id="btnNextTop" class="bg-slate-800 hover:bg-slate-700 border border-slate-600 px-3 py-2 rounded-full text-sm" title="Next Slide (Right Arrow)">
                <i class="fas fa-chevron-right"></i>
            </button>`);

// Speaker notes heading
pres = pres.replace(/<span>یادداشت‌ها و راهنمای تدریس این اسلاید:<\/span>/, '<span>Speaker Notes & Teaching Guide:</span>');
pres = pres.replace(/برای مشاهده مخاطبان نمایش داده نمی‌شود/, 'Private (Not visible to audience)');
pres = pres.replace(/در حال بارگذاری یادداشت‌ها\.\.\./, 'Loading speaker notes...');

// Right side card: Next slide
pres = pres.replace(/<span>اسلاید بعدی:<\/span>/, '<span>Next Slide:</span>');
pres = pres.replace(/<span id="nextSlideNum" class="font-mono text-cyan-400">اسلاید ۲<\/span>/, '<span id="nextSlideNum" class="font-mono text-cyan-400">Slide 2</span>');
pres = pres.replace(/عنوان اسلاید بعدی/, 'Next Slide Title');

// Timer
pres = pres.replace(/<span>مدت زمان ارائه<\/span>/, '<span>Presentation Timer</span>');
pres = pres.replace(/▶ شروع/, '▶ Start');
pres = pres.replace(/⏸ توقف/, '⏸ Pause');
pres = pres.replace(/↺ بازنشانی/, '↺ Reset');

// Jump to slide
pres = pres.replace(/🔢 پرش مستقیم به اسلاید:/, '🔢 Jump directly to slide:');
pres = pres.replace(/انتقال/, 'Go');

// Autoplay
pres = pres.replace(/🎬 تعویض خودکار اسلاید/, '🎬 Auto-Advance Slides');
pres = pres.replace(/فاصله \(ثانیه\):/, 'Interval (sec):');

// JavaScript updateMainView labels
pres = pres.replace(/currentSlideInfo\.textContent = `اسلاید \${toPersianDigits\(currentSlide \+ 1\)} از \${toPersianDigits\(totalSlides\)}`;/, 'currentSlideInfo.textContent = `Slide ${currentSlide + 1} of ${totalSlides}`;');
pres = pres.replace(/nextSlideNum\.textContent = `اسلاید \${toPersianDigits\(currentSlide \+ 2\)}`;/, 'nextSlideNum.textContent = `Slide ${currentSlide + 2}`;');
pres = pres.replace(/nextSlideNum\.textContent = 'پایان اسلایدها';/, "nextSlideNum.textContent = 'End of Slides';");
pres = pres.replace(/nextSlideTitle\.textContent = 'ارائه به پایان رسید';/, "nextSlideTitle.textContent = 'Presentation Complete';");

// Thumbnail numbering
pres = pres.replace(/numBadge\.textContent = toPersianDigits\(idx \+ 1\);/, 'numBadge.textContent = idx + 1;');

// Timer format
pres = pres.replace(/timerEl\.textContent = `\${toPersianDigits\(String\(mins\)\.padStart\(2, '0'\)\)}:\${toPersianDigits\(String\(secs\)\.padStart\(2, '0'\)\)}`;/, `timerEl.textContent = \`\${String(mins).padStart(2, '0')}:\${String(secs).padStart(2, '0')}\`;`);
pres = pres.replace(/this\.textContent = '▶ شروع';/g, "this.textContent = '▶ Start';");
pres = pres.replace(/this\.textContent = '⏸ توقف';/g, "this.textContent = '⏸ Pause';");

// Keyboard navigation in presenter:
const presKeyOld = `// Keyboard Navigation (In RTL: Left Arrow = Next, Right Arrow = Prev)
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT') return;
            if (e.key === 'ArrowLeft' || e.key === ' ' || e.key === 'PageDown') {
                e.preventDefault();
                nextSlide();
            } else if (e.key === 'ArrowRight' || e.key === 'PageUp') {
                e.preventDefault();
                prevSlide();
            }
        });`;

const presKeyNew = `// Standard Keyboard Navigation (Right Arrow = Next, Left Arrow = Prev)
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT') return;
            if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown' || e.key.toLowerCase() === 'n') {
                e.preventDefault();
                nextSlide();
            } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key.toLowerCase() === 'p') {
                e.preventDefault();
                prevSlide();
            }
        });`;

pres = pres.replace(presKeyOld, presKeyNew);

fs.writeFileSync('presenter.html', pres, 'utf-8');
console.log('presenter.html successfully updated to English and LTR!');
