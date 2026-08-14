/**
 * 禁書圖書館 — Forbidden Library
 * 雪薇生誕募資企劃
 */

(function () {
    'use strict';

    const FUNDING_API_URL = 'https://script.google.com/macros/s/AKfycbylLQXE0NMkIaoDWybMwcb4Rz75z5nvOaXDpLjfCpdnJv_4_JO19ofe_moFbuic7yw4PA/exec';

    const FUNDING_DATA = {
        raised: 0,
        goal: 250000,
        supporters: 0,
        heroDaysLeft: 50,
    endDate: '2026-10-15T23:59:59+08:00'
    };

    const NAV_OFFSET = 72;
    let progressAnimated = false;

    const PERMANENT_ITEMS = [
        '感謝花籃署名',
        '高畫質電子桌布 ×1',
        '圖書館閱覽證 ×1',
        '專屬卡套 ×1'
    ];

    const PRIVILEGE_KEYWORDS = [
        'IG 摯友',
        '快通券',
        '慶生會',
        '慶功宴',
        'Cover',
        'LIVE',
        '約會',
        '親挑禮物',
        '塔羅',
        '火漆',
        '甜點',
        '底片相機',
        '每月一封',
        '單曲風格製作',
        '20 秒感謝影片',
        '手寫感謝信'
    ];

    const REWARDS_TIERS = [
        {
            id: 'reader',
            cover: 'assets/閱覽者封面.png',
            nameZh: '📜 閱覽者',
            nameEn: 'Reader',
            price: '$500',
            tagline: '初入禁書圖書館，取得第一張閱覽證的訪客。',
            items: [
                '感謝花籃署名',
                '高畫質電子桌布 ×1',
                '圖書館閱覽證 ×1',
                '專屬卡套 ×1',
                '生寫真【禁書款】／【管理員款】各3張'
            ]
        },
        {
            id: 'collector',
            cover: 'assets/藏書者封面.png',
            nameZh: '📖 藏書者',
            nameEn: 'Collector',
            price: '$1,000',
            tagline: '在架上留下名字，開始建立屬於你的禁書收藏。',
            items: [
                '感謝花籃署名',
                '高畫質電子桌布 ×1',
                '圖書館閱覽證 ×1',
                '專屬卡套 ×1',
                '藏書者署名金屬名牌（銀）×1',
                '生寫真【禁書款】／【管理員款】各3張',
                '徽章【禁書款】／【管理員款】各1個',
                '人物立牌【禁書款】／【管理員款】各1個'
            ]
        },
        {
            id: 'archivist',
            cover: 'assets/典藏者封面.png',
            nameZh: '📚 典藏者',
            nameEn: 'Archivist',
            price: '$3,000',
            tagline: '將禁書與管理員雙款完整典藏於私人書架之上。',
            items: [
                '感謝花籃署名',
                '高畫質電子桌布 ×1',
                '圖書館閱覽證 ×1',
                '專屬卡套 ×1',
                '典藏者署名金屬名牌（金）×1',
                '親簽生寫真【禁書款】／【管理員款】各6張',
                '徽章【禁書款】／【管理員款】各1個',
                '人物立牌【禁書款】／【管理員款】各1個',
                '拍立得本收納冊【禁書款】／【管理員款】各1本',
                '掛軸【禁書款】／【管理員款】各1幅',
                '雪雪浣熊卡套零錢包×1'
            ]
        },
        {
            id: 'key-bearer',
            cover: 'assets/持鑰者封面.png',
            nameZh: '🗝️ 持鑰者',
            nameEn: 'Key Bearer',
            price: '$5,000',
            tagline: '握有開啟封印之門的鑰匙，收藏亦將隨身帶走。',
            items: [
                '感謝花籃署名',
                '高畫質電子桌布 ×1',
                '圖書館閱覽證 ×1',
                '專屬卡套 ×1',
                '持鑰者署名金屬名牌（黑金）×1',
                '親簽生寫真【禁書款】／【管理員款】各6張',
                '徽章【禁書款】／【管理員款】各1個',
                '人物立牌【禁書款】／【管理員款】各1個',
                '拍立得本收納冊【禁書款】／【管理員款】各1本',
                '掛軸【禁書款】／【管理員款】各1幅',
                '雪雪浣熊卡套零錢包×1',
                '特殊色生誕 T ×1',
                '特殊造型應援手燈 ×1',
                '個人迷你專輯 ×1',
                '個人迷你專輯 NFC 隨身聽吊飾 ×1',
                '手寫感謝信 ×1',
                '20 秒感謝影片 ×1'
            ]
        },
        {
            id: 'grand-librarian',
            cover: 'assets/圖書館館長封面.png',
            nameZh: '👑 圖書館館長',
            nameEn: 'Grand Librarian',
            price: '$10,000',
            tagline: '登上館長之座，獲得封印典藏版與生誕祭最高禮遇。',
            items: [
                '感謝花籃署名',
                '高畫質電子桌布 ×1',
                '圖書館閱覽證 ×1',
                '專屬卡套 ×1',
                '圖書館館長署名金屬名牌（造型）×1',
                '親簽生寫真【禁書款】／【管理員款】各9張',
                '徽章【禁書款】／【管理員款】各1個',
                '人物立牌【禁書款】／【管理員款】各1個',
                '拍立得本收納冊【禁書款】／【管理員款】／【封印典藏版】各1本',
                '掛軸【禁書款】／【管理員款】／【封印典藏版】各1幅',
                '雪雪浣熊卡套零錢包×1',
                '拍立得立牌相框【禁書款】／【管理員款】各1個',
                '簽繪拍立得【禁書款】／【管理員款】各1張',
                '《禁書圖書館》寫真集【封印典藏版】×1（募資限定）',
                '特殊色刺繡簽名生誕 T ×1',
                '特殊造型應援手燈 ×1',
                '個人迷你專輯 ×1',
                '個人迷你專輯 NFC 隨身聽吊飾 ×1',
                '手寫感謝信 ×1',
                '20 秒感謝影片 ×1',
                'IG 摯友一個月',
                '雪薇 2027 生誕祭雪薇隊列快通券 ×1',
                '雪薇生誕祭慶生會參加資格 ×1',

                '雪薇個人 LIVE VIP 票 ×1（含 LIVE 活動特典）'
            ]
        },
        {
            id: 'warden',
            cover: 'assets/禁書守護者封面.png',
            nameZh: '🥀 禁書守護者',
            nameEn: 'Warden of the Forbidden Volume',
            price: '$30,000',
            tagline: '守護禁書最深處的秘密，與雪薇共度最私密的篇章。',
            items: [
                '感謝花籃署名',
                '高畫質電子桌布 ×1',
                '圖書館閱覽證 ×1',
                '專屬卡套 ×1',
                '禁書守護者署名金屬名牌（造型＋鏈子）×1',
                '親簽生寫真【禁書款】／【管理員款】各9張',
                '徽章【禁書款】／【管理員款】各1個',
                '人物立牌【禁書款】／【管理員款】各1個',
                '拍立得本收納冊【禁書款】／【管理員款】／【封印典藏版】各1本',
                '掛軸【禁書款】／【管理員款】／【封印典藏版】各1幅',
                '雪雪浣熊卡套零錢包×1',
                '拍立得立牌相框【禁書款】／【管理員款】各1個',
                '簽繪拍立得【禁書款】／【管理員款】各1張',
                '《禁書圖書館》寫真集【封印典藏版】×1（募資限定）',
                '特殊色刺繡簽名生誕 T ×1',
                '特殊造型應援手燈 ×1',
                '個人迷你專輯 ×1',
                '個人迷你專輯 NFC 隨身聽吊飾 ×1',
                '手寫感謝信 ×1',
                '20 秒感謝影片 ×1',
                'IG 摯友一個月',
                '雪薇 2027 生誕祭雪薇隊列快通券 ×3',
                '雪薇生誕祭慶功宴參加資格 ×1',
                '指定雪薇個人專輯其中一首單曲風格製作 ×1',
                '雪薇個人 LIVE VVIP 票 ×1（含 LIVE 活動特典）',
                '約會 6 小時',
                '雪薇親挑禮物 ×1',
                '雪薇一對一塔羅占卜 ×3',
                '雪薇同款訂製禁書代理人火漆印章 ×1',
                '雪薇手作你的 2027 生日甜點 ×1',
                '拍好拍滿的底片相機 ×1',
                '2027 年每月一封雪薇親筆手寫信（共12封）'
            ]
        }
    ];

    const progressFill = document.getElementById('progress-fill');
    const progressBar = document.querySelector('.progress__bar');
    const progressPercent = document.getElementById('progress-percent');
    const raisedAmount = document.getElementById('raised-amount');
    const supporterCount = document.getElementById('supporter-count');
    const daysLeft = document.getElementById('days-left');
    const heroDaysLeft = document.getElementById('hero-days-left');
    const progressPercentDisplay = document.getElementById('progress-percent-display');
    const scrollHint = document.getElementById('scroll-hint');
    const btnSupport = document.getElementById('btn-support');
    const canvas = document.getElementById('particles');
    const mouseGlow = document.getElementById('mouse-glow');
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    let scrollRevealObserver = null;
    let goldenDustInitialized = false;
    let mouseGlowInitialized = false;
    let customCursorInitialized = false;

    let siteLoaderInitialized = false;

    const SITE_LOADER_KEY = 'forbiddenLibraryOpened';

    function initSiteLoader() {
        if (siteLoaderInitialized) return;
        siteLoaderInitialized = true;

        const loader = document.getElementById('site-loader');
        if (!loader) return;

        const track = document.getElementById('site-loader-track');
        const fill = document.getElementById('site-loader-fill');
        const percent = document.getElementById('site-loader-percent');
        const status = document.getElementById('site-loader-status');
        const opened = document.getElementById('site-loader-opened');

        const cleanup = () => {
            document.body.classList.remove('is-site-loading');
            document.body.style.overflow = '';
            loader.remove();
        };

        if (sessionStorage.getItem(SITE_LOADER_KEY) === 'true') {
            loader.remove();
            return;
        }

        const setProgress = (value) => {
            const clamped = Math.max(0, Math.min(100, value));
            if (fill) fill.style.width = `${clamped}%`;
            if (percent) percent.textContent = `${clamped}%`;
            if (track) track.setAttribute('aria-valuenow', String(clamped));
        };

        const showOpened = () => {
            if (status) status.hidden = true;
            if (opened) {
                opened.hidden = false;
                opened.classList.add('is-visible');
            }
            setProgress(100);
        };

        const finish = () => {
            try {
                sessionStorage.setItem(SITE_LOADER_KEY, 'true');
            } catch (error) {
                /* sessionStorage unavailable */
            }

            loader.classList.add('is-hiding');
            loader.setAttribute('aria-hidden', 'true');

            window.setTimeout(cleanup, prefersReducedMotion() ? 180 : 520);
        };

        loader.hidden = false;
        loader.setAttribute('aria-hidden', 'false');
        document.body.classList.add('is-site-loading');
        document.body.style.overflow = 'hidden';

        if (prefersReducedMotion()) {
            requestAnimationFrame(() => {
                loader.classList.add('is-visible');
                setProgress(100);
                showOpened();
                window.setTimeout(finish, 220);
            });
            return;
        }

        const PROGRESS_START = 350;
        const PROGRESS_DURATION = 1600;
        const OPENED_AT = PROGRESS_START + PROGRESS_DURATION;
        const OPENED_HOLD = 300;
        const FADE_OUT_START = OPENED_AT + OPENED_HOLD;
        const TOTAL = FADE_OUT_START + 450;

        requestAnimationFrame(() => {
            loader.classList.add('is-visible');
        });

        const start = performance.now();
        let openedShown = false;

        function frame(now) {
            const elapsed = now - start;

            if (elapsed < OPENED_AT) {
                const progress = Math.min(
                    Math.max((elapsed - PROGRESS_START) / PROGRESS_DURATION, 0),
                    1
                );
                setProgress(Math.round(progress * 100));
            } else if (!openedShown) {
                openedShown = true;
                showOpened();
            }

            if (elapsed >= FADE_OUT_START) {
                loader.classList.add('is-hiding');
            }

            if (elapsed >= TOTAL) {
                finish();
                return;
            }

            requestAnimationFrame(frame);
        }

        requestAnimationFrame(frame);
    }

    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function initNav() {
        if (!nav) return;

        const setNavState = () => {
            nav.classList.toggle('nav--scrolled', window.scrollY > 24);
        };

        window.addEventListener('scroll', setNavState, { passive: true });
        setNavState();

        navToggle?.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('nav--open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        navMenu?.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav--open');
                navToggle?.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', (event) => {
            if (!nav.contains(event.target)) {
                nav.classList.remove('nav--open');
                navToggle?.setAttribute('aria-expanded', 'false');
            }
        });
    }

    function initHeroReveal() {
        const hero = document.getElementById('hero');
        if (!hero) return;

        const allPhases = [
            'is-atmosphere',
            'is-phase-title',
            'is-phase-book',
            'is-phase-metrics',
            'is-phase-cta',
            'is-ready'
        ];

        if (prefersReducedMotion()) {
            allPhases.forEach((phase) => hero.classList.add(phase));
            runProgressAnimation();
            return;
        }

        const schedule = [
            ['is-atmosphere', 0],
            ['is-phase-title', 420],
            ['is-phase-book', 900],
            ['is-phase-metrics', 1400],
            ['is-phase-cta', 1850],
            ['is-ready', 2300]
        ];

        schedule.forEach(([phase, delay]) => {
            setTimeout(() => {
                hero.classList.add(phase);
                if (phase === 'is-phase-metrics') {
                    runProgressAnimation();
                }
            }, delay);
        });
    }

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', (event) => {
                const targetId = anchor.getAttribute('href');
                if (!targetId || targetId === '#') return;

                const target = document.querySelector(targetId);
                if (!target) return;

                event.preventDefault();
                const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;

                window.scrollTo({
                    top,
                    behavior: prefersReducedMotion() ? 'auto' : 'smooth'
                });
            });
        });
    }

    function initNavSectionSpy() {
        if (!navMenu) return;

        const navLinks = [...navMenu.querySelectorAll('.nav__link[href^="#"]')];
        const sectionLinks = new Map();

        navLinks.forEach((link) => {
            const sectionId = link.getAttribute('href')?.slice(1);
            const section = sectionId ? document.getElementById(sectionId) : null;
            if (section) sectionLinks.set(section, link);
        });

        const sections = [...sectionLinks.keys()];
        if (!sections.length) return;

        const setActiveLink = (activeLink) => {
            navLinks.forEach((link) => {
                link.classList.toggle('is-active', link === activeLink);
            });
        };

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((entry) => entry.isIntersecting);
                if (!visible.length) return;

                const current = visible.reduce((best, entry) =>
                    (entry.intersectionRatio > best.intersectionRatio ? entry : best)
                );

                const activeLink = sectionLinks.get(current.target);
                if (activeLink) setActiveLink(activeLink);
            },
            {
                rootMargin: `-${NAV_OFFSET}px 0px -55% 0px`,
                threshold: [0, 0.12, 0.28, 0.45, 0.62]
            }
        );

        sections.forEach((section) => observer.observe(section));

        const initial = sections.find((section) => {
            const rect = section.getBoundingClientRect();
            return rect.top <= NAV_OFFSET + 80 && rect.bottom > NAV_OFFSET + 80;
        });

        if (initial) {
            setActiveLink(sectionLinks.get(initial));
        }
    }

    function applyRevealStaggerDelays() {
        const archiveOrder = [
            '.archive-reveal--chapter',
            '.archive-reveal--title',
            '.archive-reveal--subtitle',
            '.archive-reveal--body',
            '.archive-reveal--panel'
        ];

        archiveOrder.forEach((selector, index) => {
            document.querySelectorAll(selector).forEach((element) => {
                element.style.setProperty('--reveal-delay', `${index * 0.08}s`);
            });
        });

        document.querySelectorAll('#rewards-shelf .reward-book.reveal').forEach((element, index) => {
            element.style.setProperty('--reveal-delay', `${index * 0.08}s`);
        });

        document.querySelectorAll('#sealed-goals .sealed-goal.reveal').forEach((element, index) => {
            element.style.setProperty('--reveal-delay', `${index * 0.1}s`);
        });
    }

    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal, .archive-reveal');

        if (prefersReducedMotion()) {
            revealElements.forEach((element) => element.classList.add('reveal--visible'));
            return;
        }

        applyRevealStaggerDelays();

        if (!scrollRevealObserver) {
            scrollRevealObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;
                        entry.target.classList.add('reveal--visible');
                        scrollRevealObserver.unobserve(entry.target);
                    });
                },
                { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
            );
        }

        revealElements.forEach((element) => {
            if (element.classList.contains('reveal--visible')) return;
            scrollRevealObserver.observe(element);
        });
    }

    function refreshRevealElement(element) {
        if (!element) return;

        if (prefersReducedMotion()) {
            element.classList.add('reveal--visible');
            return;
        }

        element.classList.remove('reveal--visible');
        scrollRevealObserver?.unobserve(element);
        scrollRevealObserver?.observe(element);
    }

    function formatCurrency(amount) {
        return `NT$ ${amount.toLocaleString('zh-TW')}`;
    }

    function animateCounter(element, start, end, duration, formatter) {
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (end - start) * eased);

            element.textContent = formatter ? formatter(current) : current;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    function runProgressAnimation() {
        if (progressAnimated || !progressFill || !progressPercent) return;
        progressAnimated = true;

        const percent = Math.round((FUNDING_DATA.raised / FUNDING_DATA.goal) * 100);

        progressFill.style.setProperty('--progress-percent', `${percent}%`);
        progressFill.classList.add('animated');
        progressBar?.setAttribute('aria-valuenow', String(percent));
        progressBar?.setAttribute('aria-label', `募資進度 ${percent}%`);

        animateCounter(progressPercent, 0, percent, 2000, (value) => `${value}%`);
        if (progressPercentDisplay) {
            animateCounter(progressPercentDisplay, 0, percent, 2000, (value) => `${value}%`);
        }
        if (raisedAmount) {
            animateCounter(raisedAmount, 0, FUNDING_DATA.raised, 2000, formatCurrency);
        }
        if (supporterCount) {
            animateCounter(supporterCount, 0, FUNDING_DATA.supporters, 1500);
        }
    }

    async function loadFundingProgress() {
        try {
            const response = await fetch(
                `${FUNDING_API_URL}?action=fundingProgress`
            );
    
            const result = await response.json();
            console.log('募資 API 回傳：', result);
            if (!result.success) {
                throw new Error(result.message || '無法取得募資進度');
            }
    
            FUNDING_DATA.raised = Number(result.raised) || 0;
            FUNDING_DATA.supporters = Number(result.supporters) || 0;
            
            progressAnimated = false;
            initProgressBar();
            initSealedGoals();
            initScrollReveal();Ｇ
        } catch (error) {
            console.error('載入募資進度失敗：', error);
            initProgressBar();
        }
    }
    function initProgressBar() {
        const percent = Math.round((FUNDING_DATA.raised / FUNDING_DATA.goal) * 100);
        const endDate = new Date(FUNDING_DATA.endDate);
        const remainingDays = Math.max(0, Math.ceil((endDate - Date.now()) / 86400000));

        if (daysLeft) daysLeft.textContent = remainingDays;
        if (heroDaysLeft) heroDaysLeft.textContent = remainingDays || FUNDING_DATA.heroDaysLeft;
        progressFill.style.setProperty('--progress-percent', '0%');

        if (prefersReducedMotion()) {
            progressFill.style.setProperty('--progress-percent', `${percent}%`);
            progressFill.classList.add('animated');
            progressPercent.textContent = `${percent}%`;
        
            if (progressPercentDisplay) {
                progressPercentDisplay.textContent = `${percent}%`;
            }
        
            raisedAmount.textContent = formatCurrency(FUNDING_DATA.raised);
            supporterCount.textContent = FUNDING_DATA.supporters;
        
            if (heroDaysLeft) {
                heroDaysLeft.textContent =
                    remainingDays || FUNDING_DATA.heroDaysLeft;
            }
        
            progressBar?.setAttribute(
                'aria-valuenow',
                String(percent)
            );
        } else {
            runProgressAnimation();
        
        }
    }

    function pad(value) {
        return String(value).padStart(2, '0');
    }

    function initCountdown() {
        const daysEl = document.getElementById('cd-days');
        const hoursEl = document.getElementById('cd-hours');
        const minutesEl = document.getElementById('cd-minutes');
        const secondsEl = document.getElementById('cd-seconds');

        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

        const endDate = new Date(FUNDING_DATA.endDate);

        function tick() {
            const diff = endDate - Date.now();

            if (diff <= 0) {
                daysEl.textContent = '00';
                hoursEl.textContent = '00';
                minutesEl.textContent = '00';
                secondsEl.textContent = '00';
                if (daysLeft) daysLeft.textContent = '0';
                if (heroDaysLeft) heroDaysLeft.textContent = '0';
                return;
            }

            const totalSeconds = Math.floor(diff / 1000);
            const days = Math.floor(totalSeconds / 86400);
            const hours = Math.floor((totalSeconds % 86400) / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            daysEl.textContent = pad(days);
            hoursEl.textContent = pad(hours);
            minutesEl.textContent = pad(minutes);
            secondsEl.textContent = pad(seconds);
            if (daysLeft) daysLeft.textContent = days;
            if (heroDaysLeft) heroDaysLeft.textContent = days;
        }

        tick();
        setInterval(tick, 1000);
    }

    function initScrollHint() {
        if (!scrollHint) return;

        scrollHint.addEventListener('click', () => {
            document.getElementById('story')?.scrollIntoView({
                behavior: prefersReducedMotion() ? 'auto' : 'smooth'
            });
        });

        window.addEventListener('scroll', () => {
            scrollHint.classList.toggle('hidden', window.scrollY > 100);
        }, { passive: true });
    }

    function initButtonEffect() {
        if (!btnSupport) return;

        btnSupport.addEventListener('click', (event) => {
            const rect = btnSupport.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: rgba(212, 175, 55, 0.35);
                border-radius: 50%;
                transform: translate(-50%, -50%) scale(0);
                animation: rippleEffect 0.6s ease-out forwards;
                left: ${event.clientX - rect.left}px;
                top: ${event.clientY - rect.top}px;
                pointer-events: none;
                z-index: 2;
            `;
            btnSupport.style.position = 'relative';
            btnSupport.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    }

    function initHeroBookParticles() {
        const heroCanvas = document.getElementById('hero-particles');
        const hero = document.getElementById('hero');
        if (!heroCanvas || !hero || prefersReducedMotion()) return;

        const ctx = heroCanvas.getContext('2d');
        let particles = [];
        let width;
        let height;
        let animationId;

        function resize() {
            const focal = heroCanvas.parentElement;
            if (!focal) return;
            width = heroCanvas.width = focal.offsetWidth;
            height = heroCanvas.height = focal.offsetHeight;
        }

        class Ember {
            constructor() {
                this.reset(true);
            }

            reset(initial = false) {
                this.x = width * 0.5 + (Math.random() - 0.5) * width * 0.32;
                this.y = height * 0.48 + (Math.random() - 0.5) * height * 0.18;
                this.vx = (Math.random() - 0.5) * 0.2;
                this.vy = -(Math.random() * 0.35 + 0.12);
                this.size = Math.random() * 1.4 + 0.35;
                this.life = initial ? Math.random() : 0;
                this.maxLife = Math.random() * 0.55 + 0.35;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.life += 0.01;

                if (this.life >= this.maxLife) {
                    this.reset();
                }
            }

            draw() {
                const alpha = (1 - this.life / this.maxLife) * 0.2;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(240, 208, 96, ${alpha})`;
                ctx.fill();
            }
        }

        class Ash {
            constructor() {
                this.reset(true);
            }

            reset(initial = false) {
                this.x = Math.random() * width;
                this.y = height * 0.35 + Math.random() * height * 0.45;
                this.vx = (Math.random() - 0.5) * 0.06;
                this.vy = -(Math.random() * 0.12 + 0.04);
                this.size = Math.random() * 1 + 0.25;
                this.life = initial ? Math.random() : 0;
                this.maxLife = Math.random() * 0.8 + 0.5;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.life += 0.006;

                if (this.life >= this.maxLife || this.y < 0) {
                    this.reset();
                }
            }

            draw() {
                const alpha = (1 - this.life / this.maxLife) * 0.12;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(154, 138, 122, ${alpha})`;
                ctx.fill();
            }
        }

        function createParticles() {
            const emberCount = width < 480 ? 6 : 10;
            const ashCount = width < 480 ? 3 : 5;
            particles = [
                ...Array.from({ length: emberCount }, () => new Ember()),
                ...Array.from({ length: ashCount }, () => new Ash())
            ];
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });
            animationId = requestAnimationFrame(animate);
        }

        resize();
        createParticles();
        animationId = requestAnimationFrame(animate);

        window.addEventListener('resize', () => {
            resize();
            createParticles();
        });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                cancelAnimationFrame(animationId);
            } else {
                animationId = requestAnimationFrame(animate);
            }
        });
    }

    function initHeroMouseParallax() {
        const hero = document.getElementById('hero');
        if (!hero || prefersReducedMotion()) return;

        const layers = hero.querySelectorAll('.hero__parallax');
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;

        hero.addEventListener('mousemove', (event) => {
            const rect = hero.getBoundingClientRect();
            targetX = (event.clientX - rect.left - rect.width / 2) / rect.width;
            targetY = (event.clientY - rect.top - rect.height / 2) / rect.height;
        }, { passive: true });

        hero.addEventListener('mouseleave', () => {
            targetX = 0;
            targetY = 0;
        });

        function update() {
            currentX += (targetX - currentX) * 0.06;
            currentY += (targetY - currentY) * 0.06;

            layers.forEach((layer) => {
                const depth = parseFloat(layer.dataset.parallax) || 0.02;
                const tx = currentX * depth * -42;
                const ty = currentY * depth * -28;

                if (layer.classList.contains('hero__circles')) {
                    layer.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`;
                    return;
                }

                if (layer.classList.contains('hero__book-wrap')) {
                    const bookTx = currentX * depth * -58;
                    const bookTy = currentY * depth * -38;
                    layer.style.transform = `translate(${bookTx}px, ${bookTy}px)`;
                    return;
                }

                layer.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
            });

            requestAnimationFrame(update);
        }

        update();
    }

    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes rippleEffect {
            to {
                transform: translate(-50%, -50%) scale(30);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    function initParticles() {
        if (!canvas || goldenDustInitialized || prefersReducedMotion()) return;

        goldenDustInitialized = true;

        const ctx = canvas.getContext('2d');
        const MOBILE_BREAKPOINT = 768;
        const DESKTOP_COUNT = 24;
        const MOBILE_COUNT = 12;

        let particles = [];
        let animationId = null;
        let width = 0;
        let height = 0;

        class DustParticle {
            constructor() {
                this.reset(true);
            }

            reset(randomY = false) {
                this.x = Math.random() * width;
                this.y = randomY ? Math.random() * height : height + Math.random() * 48;
                this.size = Math.random() * 1.5 + 1;
                this.opacity = Math.random() * 0.09 + 0.03;
                this.vx = (Math.random() - 0.5) * 0.05;
                this.vy = -(Math.random() * 0.07 + 0.035);
                this.phase = Math.random() * Math.PI * 2;
                this.drift = Math.random() * 0.003 + 0.0015;
            }

            update(time) {
                this.x += this.vx + Math.sin(time * this.drift + this.phase) * 0.012;
                this.y += this.vy;

                if (this.y < -10 || this.x < -16 || this.x > width + 16) {
                    this.reset(false);
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(230, 205, 140, ${this.opacity})`;
                ctx.fill();
            }
        }

        function getParticleCount() {
            return width < MOBILE_BREAKPOINT ? MOBILE_COUNT : DESKTOP_COUNT;
        }

        function createParticles() {
            particles = Array.from({ length: getParticleCount() }, () => new DustParticle());
        }

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            createParticles();
        }

        function animate(time) {
            const elapsed = time * 0.001;

            ctx.clearRect(0, 0, width, height);
            particles.forEach((particle) => {
                particle.update(elapsed);
                particle.draw();
            });

            animationId = requestAnimationFrame(animate);
        }

        function startLoop() {
            if (animationId) return;
            animationId = requestAnimationFrame(animate);
        }

        function stopLoop() {
            if (!animationId) return;
            cancelAnimationFrame(animationId);
            animationId = null;
        }

        resize();
        startLoop();

        window.addEventListener('resize', resize, { passive: true });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopLoop();
            } else {
                startLoop();
            }
        });
    }

    function initMouseGlow() {
        if (!mouseGlow || mouseGlowInitialized || prefersReducedMotion()) return;

        const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
        if (!finePointer.matches) return;

        mouseGlowInitialized = true;

        let targetX = window.innerWidth * 0.5;
        let targetY = window.innerHeight * 0.5;
        let currentX = targetX;
        let currentY = targetY;
        let animationId = null;

        function applyPosition() {
            mouseGlow.style.transform = `translate(calc(${currentX}px - 50%), calc(${currentY}px - 50%))`;
        }

        function tick() {
            currentX += (targetX - currentX) * 0.07;
            currentY += (targetY - currentY) * 0.07;
            applyPosition();
            animationId = requestAnimationFrame(tick);
        }

        function startLoop() {
            if (animationId) return;
            animationId = requestAnimationFrame(tick);
        }

        function stopLoop() {
            if (!animationId) return;
            cancelAnimationFrame(animationId);
            animationId = null;
        }

        function enableGlow() {
            mouseGlow.classList.add('is-active');
            applyPosition();
            startLoop();
        }

        function disableGlow() {
            mouseGlow.classList.remove('is-active');
            stopLoop();
        }

        function onPointerMove(event) {
            targetX = event.clientX;
            targetY = event.clientY;
        }

        function onFinePointerChange(event) {
            if (event.matches) {
                enableGlow();
            } else {
                disableGlow();
            }
        }

        window.addEventListener('mousemove', onPointerMove, { passive: true });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopLoop();
            } else if (finePointer.matches) {
                startLoop();
            }
        });

        finePointer.addEventListener('change', onFinePointerChange);
        enableGlow();
    }

    function initCustomCursor() {
        if (customCursorInitialized || prefersReducedMotion()) return;

        const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
        if (!finePointer.matches) return;

        const root = document.getElementById('custom-cursor');
        const dot = document.getElementById('custom-cursor-dot');
        const ring = document.getElementById('custom-cursor-ring');
        const label = document.getElementById('custom-cursor-label');

        if (!root || !dot || !ring || !label) return;

        customCursorInitialized = true;

        document.documentElement.classList.add('has-custom-cursor');
        root.hidden = false;

        const INTERACTIVE_SELECTOR = [
            'a',
            'button',
            'input',
            'select',
            'textarea',
            '.reward-book',
            '.rules-scroll__toggle',
            '.archive-panel-wrap'
        ].join(', ');

        const COVER_SELECTOR = [
            '.archive-panel-wrap',
            '.archive-panel__cover-art',
            '.archive-panel__cover-image',
            '.reward-book__cover',
            '.reward-cover-wrap',
            '.reward-book__cover-img',
            '.rewards-detail__cover-wrap',
            '.rewards-detail__cover-img'
        ].join(', ');

        const JOIN_SELECTOR = '.nav__cta, .rewards-detail__cta, [data-support-tier]';

        let targetX = window.innerWidth * 0.5;
        let targetY = window.innerHeight * 0.5;
        let ringX = targetX;
        let ringY = targetY;
        let pointerInView = false;
        let isHover = false;
        let ringLabel = '';
        let animationId = null;

        function isLoaderVisible() {
            const loader = document.getElementById('site-loader');
            return Boolean(loader && !loader.hidden && !loader.classList.contains('is-hiding'));
        }

        function setVisible(visible) {
            root.classList.toggle('is-visible', visible && !isLoaderVisible());
        }

        function resolveCursorState(eventTarget) {
            if (!(eventTarget instanceof Element)) {
                return { hover: false, label: '' };
            }

            const joinTarget = eventTarget.closest(JOIN_SELECTOR);
            if (joinTarget && /立即支持/.test(joinTarget.textContent)) {
                return { hover: true, label: 'JOIN' };
            }

            if (eventTarget.closest(COVER_SELECTOR)) {
                return { hover: true, label: 'READ' };
            }

            if (eventTarget.closest(INTERACTIVE_SELECTOR)) {
                return { hover: true, label: '' };
            }

            return { hover: false, label: '' };
        }

        function applyCursorState(state) {
            isHover = state.hover;
            ringLabel = state.label;

            ring.classList.toggle('is-hover', isHover);
            ring.classList.toggle('has-label', Boolean(ringLabel));
            label.textContent = ringLabel;
        }

        function applyTransform() {
            dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        }

        function tick() {
            ringX += (targetX - ringX) * 0.14;
            ringY += (targetY - ringY) * 0.14;
            applyTransform();

            if (isLoaderVisible()) {
                setVisible(false);
            } else if (pointerInView) {
                setVisible(true);
            }

            animationId = requestAnimationFrame(tick);
        }

        function startLoop() {
            if (animationId) return;
            animationId = requestAnimationFrame(tick);
        }

        function stopLoop() {
            if (!animationId) return;
            cancelAnimationFrame(animationId);
            animationId = null;
        }

        function onPointerMove(event) {
            targetX = event.clientX;
            targetY = event.clientY;
            pointerInView = true;
            applyCursorState(resolveCursorState(event.target));
        }

        function onPointerOver(event) {
            applyCursorState(resolveCursorState(event.target));
        }

        function onDocumentLeave() {
            pointerInView = false;
            setVisible(false);
        }

        function onDocumentEnter() {
            pointerInView = true;
            if (!isLoaderVisible()) {
                setVisible(true);
            }
        }

        function onFinePointerChange(event) {
            if (!event.matches) {
                stopLoop();
                root.hidden = true;
                document.documentElement.classList.remove('has-custom-cursor');
            }
        }

        window.addEventListener('mousemove', onPointerMove, { passive: true });
        document.addEventListener('mouseover', onPointerOver, { passive: true });
        document.documentElement.addEventListener('mouseleave', onDocumentLeave);
        document.documentElement.addEventListener('mouseenter', onDocumentEnter);

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                setVisible(false);
            } else if (pointerInView) {
                setVisible(!isLoaderVisible());
            }
        });

        finePointer.addEventListener('change', onFinePointerChange);

        applyTransform();
        startLoop();
    }

    function initParallax() {
        if (prefersReducedMotion()) return;

        const layers = document.querySelectorAll('[data-parallax]');
        let ticking = false;

        function updateParallax() {
            const scrollY = window.scrollY;

            layers.forEach((layer) => {
                if (layer.closest('#hero')) return;

                const speed = parseFloat(layer.dataset.parallax) || 0.05;
                const offset = scrollY * speed;

                if (layer.classList.contains('magic-circle')) {
                    layer.style.transform = `translate(-50%, calc(-50% + ${offset}px)) rotate(${scrollY * 0.04}deg)`;
                    return;
                }

                if (layer.classList.contains('books--left') || layer.classList.contains('books--right')) {
                    const direction = layer.classList.contains('books--left') ? 1 : -1;
                    layer.style.transform = `translateY(calc(-50% + ${offset * direction}px))`;
                    return;
                }

                layer.style.transform = `translate3d(0, ${offset}px, 0)`;
            });

            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(updateParallax);
        }, { passive: true });

        updateParallax();
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function getRewardItemIcon(item) {
        if (/花籃|署名/.test(item)) return '✦';
        if (/桌布/.test(item)) return '🖼';
        if (/閱覽證|卡套/.test(item)) return '🎫';
        if (/名牌/.test(item)) return '🏷';
        if (/生寫真|拍立得|相框|寫真集/.test(item)) return '📷';
        if (/徽章/.test(item)) return '📌';
        if (/立牌/.test(item)) return '🧍';
        if (/收納冊/.test(item)) return '📔';
        if (/掛軸/.test(item)) return '🎋';
        if (/抱枕/.test(item)) return '🛏';
        if (/生誕 T|T ×/.test(item)) return '👕';
        if (/手燈/.test(item)) return '🔦';
        if (/專輯|NFC/.test(item)) return '💿';
        if (/感謝信|手寫信/.test(item)) return '✉';
        if (/感謝影片/.test(item)) return '🎬';
        if (/IG/.test(item)) return '📱';
        if (/快通券|LIVE|慶生|慶功/.test(item)) return '🎟';
        if (/Cover|單曲/.test(item)) return '🎵';
        if (/約會|禮物|塔羅|火漆|甜點|底片/.test(item)) return '🌹';
        return '✧';
    }

    function splitRewardGroups(items) {
        const permanent = items.filter((item) => PERMANENT_ITEMS.includes(item));
        const rest = items.filter((item) => !PERMANENT_ITEMS.includes(item));
        const privileges = rest.filter((item) => PRIVILEGE_KEYWORDS.some((keyword) => item.includes(keyword)));
        const additions = rest.filter((item) => !PRIVILEGE_KEYWORDS.some((keyword) => item.includes(keyword)));

        return [
            { title: '【永久館藏】', items: permanent },
            { title: '【本階級收藏】', items: additions },
            { title: '【限定特權】', items: privileges }
        ].filter((group) => group.items.length > 0);
    }

    function stripLeadingEmoji(text) {
        return text.replace(/^[\s\p{RI}\p{Emoji_Presentation}\p{Extended_Pictographic}\uFE0F\u200D]+/u, '').trim() || text;
    }

    const REWARD_CHAPTERS = {
        '【永久館藏】': { label: 'CHAPTER I', title: '永久館藏' },
        '【本階級收藏】': { label: 'CHAPTER II', title: '本階級收藏' },
        '【限定特權】': { label: 'CHAPTER III', title: '限定特權' }
    };

    function renderRewardDetailItem(item) {
        return `
            <li class="rewards-detail__item">
                <span class="rewards-detail__item-mark" aria-hidden="true"></span>
                <span class="rewards-detail__item-text">${escapeHtml(item)}</span>
            </li>
        `;
    }

    function renderRewardDetailGroups(items) {
        return splitRewardGroups(items).map((group) => {
            const chapter = REWARD_CHAPTERS[group.title] || { label: '', title: group.title };

            return `
                <section class="rewards-detail__chapter">
                    <p class="rewards-detail__chapter-label">${escapeHtml(chapter.label)}</p>
                    <h4 class="rewards-detail__chapter-title">${escapeHtml(chapter.title)}</h4>
                    <div class="rewards-detail__chapter-line" aria-hidden="true"></div>
                    <ul class="rewards-detail__list">
                        ${group.items.map(renderRewardDetailItem).join('')}
                    </ul>
                </section>
            `;
        }).join('');
    }

    function renderRewardDetailPanel(tier) {
        const nameZh = stripLeadingEmoji(tier.nameZh);

        return `
            <div class="rewards-detail__inner">
                <aside class="rewards-detail__aside">
                    <div class="rewards-detail__cover-wrap">
                        <img
                            class="rewards-detail__cover-img"
                            src="${escapeHtml(tier.cover)}"
                            alt="${escapeHtml(nameZh)} 方案封面"
                            width="160"
                            height="220"
                            loading="lazy"
                            decoding="async"
                        >
                    </div>
                    <div class="rewards-detail__info">
                        <h3 class="rewards-detail__name-zh">${escapeHtml(nameZh)}</h3>
                        <p class="rewards-detail__name-en">${escapeHtml(tier.nameEn)}</p>
                        <p class="rewards-detail__price">${escapeHtml(tier.price)}</p>
                        <p class="rewards-detail__tagline">${escapeHtml(tier.tagline)}</p>
                    </div>
                    <button type="button" class="rewards-detail__cta lib-btn-interact lib-btn-interact--gold" data-support-tier="${escapeHtml(tier.id)}">立即支持</button>
                </aside>
                <div class="rewards-detail__content">
                    ${renderRewardDetailGroups(tier.items)}
                </div>
            </div>
        `;
    }

    function renderRewardBook(tier, index) {
        return `
            <article class="reward-book reveal" data-tier="${tier.id}" style="--reveal-delay: ${(index * 0.08).toFixed(2)}s">
                <div class="reward-book__front">
                    <div class="reward-book__cover">
                        <div class="reward-book__cover-frame">
                            <div class="reward-cover-wrap">
                                <img
                                    class="reward-book__cover-img"
                                    src="${escapeHtml(tier.cover)}"
                                    alt="${escapeHtml(tier.nameZh)} 方案封面"
                                    width="120"
                                    height="168"
                                    loading="lazy"
                                    decoding="async"
                                >
                                <span class="reward-cover-shine" aria-hidden="true"></span>
                            </div>
                        </div>
                    </div>
                    <h3 class="reward-book__name-zh">${escapeHtml(tier.nameZh)}</h3>
                    <p class="reward-book__name-en">${escapeHtml(tier.nameEn)}</p>
                    <p class="reward-book__price">${escapeHtml(tier.price)}</p>
                    <p class="reward-book__tagline">${escapeHtml(tier.tagline)}</p>
                    <button
                        class="reward-book__toggle lib-btn-interact"
                        type="button"
                        aria-expanded="false"
                        aria-controls="rewards-detail"
                    >閱讀這本書</button>
                </div>
            </article>
        `;
    }

    function initRewardsSection() {
        const shelf = document.getElementById('rewards-shelf');
        const detailPanel = document.getElementById('rewards-detail');
        if (!shelf || !detailPanel) return;

        let activeTierId = null;

        shelf.innerHTML = REWARDS_TIERS.map(renderRewardBook).join('');

        const books = shelf.querySelectorAll('.reward-book');

        function updateSelection(tierId) {
            books.forEach((book) => {
                const isSelected = tierId !== null && book.dataset.tier === tierId;
                book.classList.toggle('is-selected', isSelected);

                const toggle = book.querySelector('.reward-book__toggle');
                if (!toggle) return;

                toggle.setAttribute('aria-expanded', String(isSelected));
                toggle.textContent = isSelected ? '收起這本書' : '閱讀這本書';
            });
        }

        function closeDetailPanel() {
            activeTierId = null;
            detailPanel.classList.remove('is-visible');
            detailPanel.setAttribute('aria-hidden', 'true');
            updateSelection(null);

            window.setTimeout(() => {
                if (activeTierId !== null) return;
                detailPanel.innerHTML = '';
            }, prefersReducedMotion() ? 0 : 450);
        }

        function scrollToDetailPanel() {
            const top = detailPanel.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
            window.scrollTo({
                top,
                behavior: prefersReducedMotion() ? 'auto' : 'smooth'
            });
        }

        function openDetailPanel(tier, shouldScroll) {
            const isSwitch = activeTierId !== null && activeTierId !== tier.id;
            activeTierId = tier.id;

            if (isSwitch) {
                detailPanel.classList.remove('is-visible');
                window.setTimeout(() => {
                    detailPanel.innerHTML = renderRewardDetailPanel(tier);
                    detailPanel.setAttribute('aria-hidden', 'false');
                    requestAnimationFrame(() => {
                        detailPanel.classList.add('is-visible');
                        refreshRevealElement(detailPanel);
                    });
                }, prefersReducedMotion() ? 0 : 180);
            } else {
                detailPanel.innerHTML = renderRewardDetailPanel(tier);
                detailPanel.setAttribute('aria-hidden', 'false');
                requestAnimationFrame(() => {
                    detailPanel.classList.add('is-visible');
                    refreshRevealElement(detailPanel);
                });
            }

            updateSelection(tier.id);

            if (shouldScroll) {
                window.setTimeout(() => {
                    scrollToDetailPanel();
                }, prefersReducedMotion() ? 0 : isSwitch ? 220 : 80);
            }
        }

        shelf.addEventListener('click', (event) => {
            const toggle = event.target.closest('.reward-book__toggle');
            if (!toggle) return;

            const book = toggle.closest('.reward-book');
            const tier = REWARDS_TIERS.find((entry) => entry.id === book?.dataset.tier);
            if (!tier) return;

            if (activeTierId === tier.id) {
                closeDetailPanel();
                return;
            }

            openDetailPanel(tier, true);
        });
    }

    const SEALED_GOALS = [
        {
          id: 'i',
          code: '封印 I',
          amount: 10000,
          reward: '募資花籃',
          icon: 'assets/seal-flower.png'
        },
        {
          id: 'ii',
          code: '封印 II',
          amount: 30000,
          reward: '生誕服製作',
          icon: 'assets/seal-dress.png'
        },
        {
          id: 'iii',
          code: '封印 III',
          amount: 50000,
          reward: '生誕背景佈置',
          icon: 'assets/seal-stage.png'
        },
        {
          id: 'iv',
          code: '封印 IV',
          amount: 100000,
          reward: '舉辦雪薇個人 LIVE',
          icon: 'assets/seal-live.png'
        },
        {
          id: 'v',
          code: '封印 V',
          amount: 150000,
          reward: '迷你專輯製作',
          icon: 'assets/seal-album.png'
        },
        {
          id: 'vi',
          code: '封印 VI',
          amount: 200000,
          reward: '迷你專輯簽售會',
          icon: 'assets/seal-signing.png'
        },
        {
          id: 'final',
          code: '最終封印',
          amount: 250000,
          reward: '雪薇個人單曲 MV 拍攝',
          icon: 'assets/seal-mv.png'
        }
      ];

    function getSealedGoalState(goal, index, goals, raised) {
        if (raised >= goal.amount) {
            return { status: 'unlocked', label: '✔ 已解除封印' };
        }

        const activeIndex = goals.findIndex((entry) => raised < entry.amount);

        if (index === activeIndex) {
            return {
                status: 'active',
            label: '⚡ 封印鬆動中',
gapText: `尚需 ${formatCurrency(goal.amount - raised)}`
            };
        }

        return { status: 'locked', label: '🔒 封印中' };
    }

    function renderSealedSummary(raised, finalGoal) {
        const percent = Math.min(100, Math.round((raised / finalGoal) * 100));

        return `
            <div class="sealed-summary__inner">
                <div class="sealed-summary__stats">
                    <div class="sealed-summary__stat">
                        <span class="sealed-summary__label">目前募得</span>
                        <strong class="sealed-summary__value">${escapeHtml(formatCurrency(raised))}</strong>
                    </div>
                    <div class="sealed-summary__stat">
                        <span class="sealed-summary__label">最終封印</span>
                        <strong class="sealed-summary__value">${escapeHtml(formatCurrency(finalGoal))}</strong>
                    </div>
                    <div class="sealed-summary__stat">
                        <span class="sealed-summary__label">完成百分比</span>
                        <strong class="sealed-summary__value">${percent}%</strong>
                    </div>
                </div>
                <div
                    class="sealed-summary__track"
                    role="progressbar"
                    aria-valuenow="${percent}"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-label="解鎖總進度 ${percent}%"
                >
                    <span class="sealed-summary__fill" style="--sealed-summary-progress: ${percent}%;"></span>
                </div>
            </div>
        `;
    }

    function renderSealedGoal(goal, index, goals, raised) {
        const state = getSealedGoalState(goal, index, goals, raised);
        const side = index % 2 === 0 ? 'left' : 'right';
        const gapBlock = state.gapText
            ? `<p class="sealed-goal__gap">${escapeHtml(state.gapText)}</p>`
            : '';

        const connectorGlow = state.status === 'active'
            ? '<span class="sealed-goal__connector-glow" aria-hidden="true"></span>'
            : '';

            const scroll = `
            <div class="sealed-goal__scroll">
              <p class="sealed-goal__code">${escapeHtml(goal.code)}</p>
          
              <p class="sealed-goal__amount">
                ${escapeHtml(formatCurrency(goal.amount))}
              </p>
          
            
          
              <p class="sealed-goal__reward">
                ${escapeHtml(goal.reward)}
              </p>
          
              <p class="sealed-goal__status">
                ${escapeHtml(state.label)}
              </p>
          
              ${gapBlock}
              <div class="sealed-goal__icon" aria-hidden="true">
    <img
        src="${escapeHtml(goal.icon)}"
        alt=""
        loading="lazy"
        decoding="async"
    />
</div>

</div>
        
          `;

        const node = `
            <div class="sealed-goal__node">
                <div class="sealed-goal__seal" aria-hidden="true">
                    <span class="sealed-goal__seal-inner"></span>
                </div>
                <div class="sealed-goal__connector">${connectorGlow}</div>
            </div>
        `;

        return `
            <article class="sealed-goal sealed-goal--${side} sealed-goal--${state.status} reveal">
                ${side === 'left' ? `${scroll}${node}` : `${node}${scroll}`}
            </article>
        `;
    }

    function initSealedGoals() {
        const summary = document.getElementById('sealed-summary');
        const container = document.getElementById('sealed-goals');
        const raised = FUNDING_DATA.raised;
        const finalGoal = FUNDING_DATA.goal;

        if (summary) {
            summary.innerHTML = renderSealedSummary(raised, finalGoal);
        }

        if (!container) return;

        const goalsMarkup = SEALED_GOALS.map((goal, index, goals) =>
            renderSealedGoal(goal, index, goals, raised)
        ).join('');

        container.innerHTML = `
            <div class="sealed-goals__spine" aria-hidden="true"></div>
            ${goalsMarkup}
        `;
    }

    const SUPPORT_TIER_MAP = {
        reader: { label: '閱覽者', amount: 500, shipping: 'cvs' },
        collector: { label: '藏書者', amount: 1000, shipping: 'cvs' },
        archivist: { label: '典藏者', amount: 3000, shipping: 'cvs' },
        'key-bearer': { label: '持鑰者', amount: 5000, shipping: 'cvs' },
        'grand-librarian': { label: '圖書館館長', amount: 10000, shipping: 'cvs' },
        warden: { label: '禁書守護者', amount: 30000, shipping: 'cvs' }
    };

    const SHIPPING_LABELS = {
        cvs: '7-ELEVEN 超商取貨',
    };

    const SHIPPING_HINTS = {
        cvs: '請確認門市名稱與店號正確，商品將依此資料寄送。',
    };

    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbylLQXE0NMkIaoDWybMwcb4Rz75z5nvOaXDpLjfCpdnJv_4_JO19ofe_moFbuic7yw4PA/exec';
    const GOOGLE_SCRIPT_URL_PLACEHOLDER = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
    const GOOGLE_SCRIPT_SUBMIT_TIMEOUT_MS = 15000;

    function isGoogleScriptUrlConfigured() {
        const url = GOOGLE_SCRIPT_URL.trim();
        return Boolean(url) && url !== GOOGLE_SCRIPT_URL_PLACEHOLDER;
    }

    function buildGoogleScriptPayload(formData, archiveId) {
        const isCvs = formData.shippingType === 'cvs';
        const isHome = formData.shippingType === 'home';
        const cvs = formData.cvsData || {};
        const home = formData.homeData || {};

        return {
            createdAt: new Date().toISOString(),
            archiveId,
            planName: formData.tierLabel,
            planPrice: formData.tierAmount,
            realName: formData.realName,
            email: formData.email,
            phone: formData.phone,
            instagram: formData.ig,
            publicName: formData.publicName,
            shippingMethod: formData.shippingLabel,
            recipientName: isCvs ? cvs.recipientName : (isHome ? home.recipientName : ''),
            recipientPhone: isCvs ? cvs.recipientPhone : (isHome ? home.recipientPhone : ''),
            storeName: isCvs ? cvs.storeName : '',
            storeCode: isCvs ? cvs.storeId : '',
            storeAddress: isCvs ? cvs.storeAddress : '',
            postalCode: isHome ? home.zip : '',
            city: isHome ? home.city : '',
            district: isHome ? home.district : '',
            address: isHome ? home.address : '',
            note: formData.notes,
            totalAmount: formData.total
        };
    }

    let supportFormContractSequence = 1;
    let applySupportTierSelection = null;
    let currentOrder = null;

    function getCurrentOrderForPaymentReport() {
        if (currentOrder?.archiveId) {
            return {
                archiveId: String(currentOrder.archiveId || '').trim(),
                planName: String(currentOrder.planName || '').trim(),
                planPrice: Number(currentOrder.planPrice) || 0
            };
        }

        const planNameEl = document.getElementById('contract-success-plan');
        const amountEl = document.getElementById('contract-success-amount');
        const archiveIdEl = document.getElementById('contract-success-id');
        const amountText = amountEl?.textContent || '';
        const amountDigits = amountText.replace(/[^\d]/g, '');

        return {
            archiveId: String(archiveIdEl?.textContent || '').trim(),
            planName: String(planNameEl?.textContent || '').trim(),
            planPrice: amountDigits ? Number(amountDigits) : 0
        };
    }

    function buildPaymentReportPayload(paymentData) {
        const orderContext = getCurrentOrderForPaymentReport();

        return {
            action: 'reportPayment',
            archiveId: paymentData.archiveId || orderContext.archiveId,
            planName: orderContext.planName,
            planPrice: orderContext.planPrice,
            transferDate: paymentData.paymentDate,
            transferAmount: paymentData.paymentAmount,
            lastFive: paymentData.accountLastFive,
            note: paymentData.paymentNote || ''
        };
    }

    function formatSupportCurrency(amount) {
        return `NT$ ${amount.toLocaleString('zh-TW')}`;
    }

    async function submitPaymentReport(paymentData) {
        if (!isGoogleScriptUrlConfigured()) {
            throw new Error('目前尚未設定資料接收網址。');
        }

        const payload = buildPaymentReportPayload(paymentData);
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), GOOGLE_SCRIPT_SUBMIT_TIMEOUT_MS);

        try {
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8'
                },
                body: JSON.stringify(payload),
                signal: controller.signal
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.message || '封印回報失敗，請稍後再試或聯絡主辦方。');
            }

            return result;
        } catch (error) {
            if (error instanceof Error && error.message && error.name !== 'AbortError' && !(error instanceof TypeError)) {
                throw error;
            }

            throw new Error('無法連線至訂單系統，請稍後再試。');
        } finally {
            window.clearTimeout(timeoutId);
        }
    }

    async function submitToGoogleScript(payload, options = {}) {
        const { requireArchiveId = true } = options;
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), GOOGLE_SCRIPT_SUBMIT_TIMEOUT_MS);

        try {
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8'
                },
                body: JSON.stringify(payload),
                signal: controller.signal
            });

            if (!response.ok) {
                throw new Error('Submit failed');
            }

            const responseText = await response.text();
            let result = {};

            if (responseText) {
                try {
                    result = JSON.parse(responseText);
                } catch {
                    throw new Error('Invalid response');
                }
            }

            if (result.success !== true) {
                throw new Error(result.message || 'Submit failed');
            }

            if (requireArchiveId) {
                const returnedArchiveId = typeof result.archiveId === 'string'
                    ? result.archiveId.trim()
                    : '';

                if (!returnedArchiveId) {
                    throw new Error('Missing archiveId');
                }

                return {
                    archiveId: returnedArchiveId
                };
            }

            return {
                success: true
            };
        } finally {
            window.clearTimeout(timeoutId);
        }
    }

    function initSupportForm() {
        const section = document.getElementById('support-form');
        const form = document.getElementById('contract-form');
        const workspace = document.getElementById('contract-workspace');
        const successView = document.getElementById('contract-success');
        const selectedBanner = document.getElementById('contract-selected');
        const selectedText = document.getElementById('contract-selected-text');
        const tierSelect = document.getElementById('contract-tier');
        const shippingInfo = document.getElementById('contract-shipping');
        const shippingMethod = document.getElementById('contract-shipping-method');
        const shippingHint = document.getElementById('contract-shipping-hint');
        const shippingCvs = document.getElementById('contract-shipping-cvs');
        const shippingHome = document.getElementById('contract-shipping-home');
        const modal = document.getElementById('contract-modal');
        const modalPanel = document.getElementById('contract-modal-panel');
        const modalReview = document.getElementById('contract-modal-review');
        const modalBack = document.getElementById('contract-modal-back');
        const modalConfirm = document.getElementById('contract-modal-confirm');
        const modalBackdrop = document.getElementById('contract-modal-backdrop');
        const successId = document.getElementById('contract-success-id');
        const successPlan = document.getElementById('contract-success-plan');
        const successAmount = document.getElementById('contract-success-amount');
        const successStepPayment = document.getElementById('contract-success-step-payment');
        const sealCompleteBtn = document.getElementById('contract-seal-complete-btn');
        const sealReportPanel = document.getElementById('contract-seal-report-panel');
        const paymentForm = document.getElementById('contract-payment-form');
        const paymentArchiveIdInput = document.getElementById('contract-payment-archive-id');
        const paymentDateInput = document.getElementById('contract-payment-date');
        const paymentAmountInput = document.getElementById('contract-payment-amount');
        const paymentLastFiveInput = document.getElementById('contract-payment-last-five');
        const paymentNoteInput = document.getElementById('contract-payment-note');
        const paymentAgreeInput = document.getElementById('contract-payment-agree');
        const paymentSubmitBtn = document.getElementById('contract-payment-submit');
        const paymentSubmitError = document.getElementById('contract-payment-submit-error');
        const paymentDateError = document.getElementById('contract-payment-date-error');
        const paymentAmountError = document.getElementById('contract-payment-amount-error');
        const paymentLastFiveError = document.getElementById('contract-payment-last-five-error');
        const paymentAgreeError = document.getElementById('contract-payment-agree-error');
        const sealReportSuccess = document.getElementById('contract-seal-report-success');

        if (!section || !form || form.dataset.contractBound === 'true') return;

        form.dataset.contractBound = 'true';

        const summaryTier = document.getElementById('contract-summary-tier');
        const summaryAmount = document.getElementById('contract-summary-amount');
        const summaryDelivery = document.getElementById('contract-summary-delivery');
        const summaryShipping = document.getElementById('contract-summary-shipping');
        const summaryTotal = document.getElementById('contract-summary-total');

        const cvsFieldIds = [
            'contract-cvs-recipient-name',
            'contract-cvs-recipient-phone',
            'contract-cvs-store-name',
            'contract-cvs-store-id',
            'contract-cvs-store-address'
        ];

        const homeFieldIds = [
            'contract-home-recipient-name',
            'contract-home-recipient-phone',
            'contract-store-name',
            'contract-store-code'
        ];

        const fieldConfig = {
            tier: {
                input: tierSelect,
                error: document.getElementById('contract-tier-error'),
                message: '請選擇募資方案'
            },
            realName: {
                input: document.getElementById('contract-real-name'),
                error: document.getElementById('contract-real-name-error'),
                message: '請填寫真實姓名'
            },
            email: {
                input: document.getElementById('contract-email'),
                error: document.getElementById('contract-email-error'),
                message: '請填寫 Email',
                invalidMessage: 'Email 格式不正確'
            },
            phone: {
                input: document.getElementById('contract-phone'),
                error: document.getElementById('contract-phone-error'),
                message: '請填寫手機號碼'
            },
            publicName: {
                input: document.getElementById('contract-public-name'),
                error: document.getElementById('contract-public-name-error'),
                message: '請填寫公開署名'
            },
            cvsRecipientName: {
                input: document.getElementById('contract-cvs-recipient-name'),
                error: document.getElementById('contract-cvs-recipient-name-error'),
                message: '請填寫收件人姓名'
            },
            cvsRecipientPhone: {
                input: document.getElementById('contract-cvs-recipient-phone'),
                error: document.getElementById('contract-cvs-recipient-phone-error'),
                message: '請填寫收件人手機號碼'
            },
            cvsStoreName: {
                input: document.getElementById('contract-cvs-store-name'),
                error: document.getElementById('contract-cvs-store-name-error'),
                message: '請填寫 7-ELEVEN 門市名稱'
            },
            cvsStoreId: {
                input: document.getElementById('contract-cvs-store-id'),
                error: document.getElementById('contract-cvs-store-id-error'),
                message: '請填寫 7-ELEVEN 門市店號'
            },
            homeRecipientName: {
                input: document.getElementById('contract-home-recipient-name'),
                error: document.getElementById('contract-home-recipient-name-error'),
                message: '請填寫收件人姓名'
            },
            homeRecipientPhone: {
                input: document.getElementById('contract-home-recipient-phone'),
                error: document.getElementById('contract-home-recipient-phone-error'),
                message: '請填寫收件人手機號碼'
            },
            storeName: {
                input: document.getElementById('contract-store-name'),
                error: document.getElementById('contract-store-name-error'),
                message: '請填寫 7-ELEVEN 門市名稱'
            },
            storeCode: {
                input: document.getElementById('contract-store-code'),
                error: document.getElementById('contract-store-code-error'),
                message: '請填寫 7-ELEVEN 門市店號'
            },
            agree: {
                input: document.getElementById('contract-agree'),
                error: document.getElementById('contract-agree-error'),
                message: '請勾選同意條款後再送出'
            }
        };

        let modalLastFocus = null;
        let pendingFormData = null;
        let activeShippingType = null;
        let isSubmitting = false;
        let isPaymentSubmitting = false;
        let sealedArchiveId = '';
        let sealedTotalAmount = 0;
        let sealedPlanName = '';
        const modalConfirmDefaultLabel = modalConfirm?.textContent?.trim() || '【確認送出】';
        const paymentSubmitDefaultLabel = paymentSubmitBtn?.textContent?.trim() || '【送出封印回報】';

        function getSelectedTierId() {
            return tierSelect?.value || '';
        }

        function getTierInfo(tierId) {
            return SUPPORT_TIER_MAP[tierId] || null;
        }

        function getShippingTypeForTier(tierId) {
            return getTierInfo(tierId)?.shipping || null;
        }

        function clearFieldValues(ids) {
            ids.forEach((id) => {
                const element = document.getElementById(id);
                if (element) element.value = '';
            });
        }

        function clearCvsFields() {
            clearFieldValues(cvsFieldIds);
            ['cvsRecipientName', 'cvsRecipientPhone', 'cvsStoreName', 'cvsStoreId'].forEach(clearFieldError);
        }

        function clearHomeFields() {
            clearFieldValues(homeFieldIds);
            ['homeRecipientName', 'homeRecipientPhone', 'storeName', 'storeCode'].forEach(clearFieldError);
        }

        function updateShippingUI() {
            const tierId = getSelectedTierId();
            const shippingType = getShippingTypeForTier(tierId);
            const previousType = activeShippingType;

            if (shippingType !== previousType) {
                if (previousType === 'cvs') clearCvsFields();
                if (previousType === 'home') clearHomeFields();
            }

            activeShippingType = shippingType;

            if (!shippingType) {
                shippingInfo.hidden = true;
                shippingCvs.hidden = true;
                shippingHome.hidden = true;
                clearCvsFields();
                clearHomeFields();
                if (summaryDelivery) summaryDelivery.textContent = '—';
                return;
            }

            shippingInfo.hidden = false;
            shippingMethod.textContent = `寄送方式：${SHIPPING_LABELS[shippingType]}`;
            shippingHint.textContent = SHIPPING_HINTS[shippingType];

            if (shippingType === 'cvs') {
                shippingCvs.hidden = false;
                shippingHome.hidden = true;
                if (shippingType !== previousType) clearHomeFields();
            } else {
                shippingCvs.hidden = true;
                shippingHome.hidden = false;
                if (shippingType !== previousType) clearCvsFields();
            }

            if (summaryDelivery) {
                summaryDelivery.textContent = SHIPPING_LABELS[shippingType];
            }
        }

        function updateSummary() {
            const tierId = getSelectedTierId();
            const tierInfo = getTierInfo(tierId);
            const amount = tierInfo?.amount || 0;
            const freight = 0;
            const total = amount + freight;

            if (summaryTier) summaryTier.textContent = tierInfo ? tierInfo.label : '尚未選擇';
            if (summaryAmount) summaryAmount.textContent = formatSupportCurrency(amount);
            if (summaryShipping) summaryShipping.textContent = formatSupportCurrency(freight);
            if (summaryTotal) summaryTotal.textContent = formatSupportCurrency(total);
            if (summaryDelivery) {
                summaryDelivery.textContent = tierInfo
                    ? SHIPPING_LABELS[tierInfo.shipping]
                    : '—';
            }
        }

        function updateSelectedBanner() {
            const tierId = getSelectedTierId();
            const tierInfo = getTierInfo(tierId);

            if (!selectedBanner || !selectedText) return;

            if (!tierInfo) {
                selectedBanner.hidden = true;
                return;
            }

            selectedText.textContent = `${tierInfo.label}｜${formatSupportCurrency(tierInfo.amount)}`;
            selectedBanner.hidden = false;
        }

        function scrollToSupportForm() {
            const top = section.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
            window.scrollTo({
                top,
                behavior: prefersReducedMotion() ? 'auto' : 'smooth'
            });
        }

        function selectTier(tierId, showBanner = true) {
            if (!tierSelect || !SUPPORT_TIER_MAP[tierId]) return;

            tierSelect.value = tierId;
            updateSummary();
            updateShippingUI();
            if (showBanner) updateSelectedBanner();
            clearFieldError('tier');
        }

        applySupportTierSelection = (tierId) => {
            selectTier(tierId, true);
            scrollToSupportForm();
        };

        function clearFieldError(fieldName) {
            const config = fieldConfig[fieldName];
            if (!config?.error) return;

            config.error.textContent = '';
            config.error.closest('.contract-field')?.classList.remove('contract-field--error');
        }

        function setFieldError(fieldName, message) {
            const config = fieldConfig[fieldName];
            if (!config?.error) return;

            config.error.textContent = message;
            config.error.closest('.contract-field')?.classList.add('contract-field--error');
        }

        function clearAllErrors() {
            Object.keys(fieldConfig).forEach(clearFieldError);
        }

        function isValidEmail(value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }

        function collectCvsData() {
            return {
                recipientName: fieldConfig.cvsRecipientName.input.value.trim(),
                recipientPhone: fieldConfig.cvsRecipientPhone.input.value.trim(),
                storeName: fieldConfig.cvsStoreName.input.value.trim(),
                storeId: fieldConfig.cvsStoreId.input.value.trim(),
                storeAddress: document.getElementById('contract-cvs-store-address')?.value.trim() || ''
            };
        }

        function collectHomeData() {
            return {
                recipientName: fieldConfig.homeRecipientName.input.value.trim(),
                recipientPhone: fieldConfig.homeRecipientPhone.input.value.trim(),
                storeName: fieldConfig.storeName.input.value.trim(),
                storeCode: fieldConfig.storeCode.input.value.trim()
            };
        }

        function collectFormData() {
            const tierId = getSelectedTierId();
            const tierInfo = getTierInfo(tierId);
            const shippingType = getShippingTypeForTier(tierId);
            const cvsData = shippingType === 'cvs' ? collectCvsData() : null;
            const homeData = shippingType === 'home' ? collectHomeData() : null;

            return {
                tierId,
                tierLabel: tierInfo?.label || '',
                tierAmount: tierInfo?.amount || 0,
                shippingType,
                shippingLabel: shippingType ? SHIPPING_LABELS[shippingType] : '',
                realName: fieldConfig.realName.input.value.trim(),
                email: fieldConfig.email.input.value.trim(),
                phone: fieldConfig.phone.input.value.trim(),
                ig: document.getElementById('contract-ig')?.value.trim() || '',
                publicName: fieldConfig.publicName.input.value.trim(),
                cvsData,
                homeData,
                notes: document.getElementById('contract-notes')?.value.trim() || '',
                agree: fieldConfig.agree.input.checked,
                freight: 0,
                total: tierInfo?.amount || 0
            };
        }

        function validateShippingFields(shippingType, firstInvalidRef) {
            let firstInvalid = firstInvalidRef.value;

            if (shippingType === 'cvs') {
                const cvs = collectCvsData();
                const checks = [
                    ['cvsRecipientName', cvs.recipientName],
                    ['cvsRecipientPhone', cvs.recipientPhone],
                    ['cvsStoreName', cvs.storeName],
                    ['cvsStoreId', cvs.storeId]
                ];

                checks.forEach(([fieldName, value]) => {
                    if (value) return;
                    setFieldError(fieldName, fieldConfig[fieldName].message);
                    firstInvalid = firstInvalid || fieldConfig[fieldName].input;
                });
            }

            if (shippingType === 'home') {
                const home = collectHomeData();
                const checks = [
                    ['homeRecipientName', home.recipientName],
                    ['homeRecipientPhone', home.recipientPhone],
                    ['storeName', home.storeName],
                    ['storeCode', home.storeCode]
                ];

                checks.forEach(([fieldName, value]) => {
                    if (value) return;
                    setFieldError(fieldName, fieldConfig[fieldName].message);
                    firstInvalid = firstInvalid || fieldConfig[fieldName].input;
                });
            }

            firstInvalidRef.value = firstInvalid;
        }

        function validateForm() {
            clearAllErrors();

            const tierId = getSelectedTierId();
            const shippingType = getShippingTypeForTier(tierId);
            let firstInvalid = null;

            if (!tierId) {
                setFieldError('tier', fieldConfig.tier.message);
                firstInvalid = fieldConfig.tier.input;
            }

            const realName = fieldConfig.realName.input.value.trim();
            if (!realName) {
                setFieldError('realName', fieldConfig.realName.message);
                firstInvalid = firstInvalid || fieldConfig.realName.input;
            }

            const email = fieldConfig.email.input.value.trim();
            if (!email) {
                setFieldError('email', fieldConfig.email.message);
                firstInvalid = firstInvalid || fieldConfig.email.input;
            } else if (!isValidEmail(email)) {
                setFieldError('email', fieldConfig.email.invalidMessage);
                firstInvalid = firstInvalid || fieldConfig.email.input;
            }

            const phone = fieldConfig.phone.input.value.trim();
            if (!phone) {
                setFieldError('phone', fieldConfig.phone.message);
                firstInvalid = firstInvalid || fieldConfig.phone.input;
            }

            const publicName = fieldConfig.publicName.input.value.trim();
            if (!publicName) {
                setFieldError('publicName', fieldConfig.publicName.message);
                firstInvalid = firstInvalid || fieldConfig.publicName.input;
            }

            if (shippingType) {
                const invalidRef = { value: firstInvalid };
                validateShippingFields(shippingType, invalidRef);
                firstInvalid = invalidRef.value;
            }

            if (!fieldConfig.agree.input.checked) {
                setFieldError('agree', fieldConfig.agree.message);
                firstInvalid = firstInvalid || fieldConfig.agree.input;
            }

            if (firstInvalid) {
                console.log(
                    '❌ 驗證失敗欄位：',
                    firstInvalid.id,
                    firstInvalid.name,
                    firstInvalid.value
                );
            
                firstInvalid.focus();
                return null;
            }

            return collectFormData();
        }

        function renderModalReview(data) {
            if (!modalReview) return;

            const commonRows = `
                <div><dt>所選方案</dt><dd>${escapeHtml(data.tierLabel)}</dd></div>
                <div><dt>姓名</dt><dd>${escapeHtml(data.realName)}</dd></div>
                <div><dt>Email</dt><dd>${escapeHtml(data.email)}</dd></div>
                <div><dt>電話</dt><dd>${escapeHtml(data.phone)}</dd></div>
                <div><dt>公開署名</dt><dd>${escapeHtml(data.publicName)}</dd></div>
                <div><dt>寄送方式</dt><dd>${escapeHtml(data.shippingLabel)}</dd></div>
            `;

            let shippingRows = '';

            if (data.shippingType === 'cvs' && data.cvsData) {
                const storeAddress = data.cvsData.storeAddress
                    ? `<div><dt>門市地址</dt><dd>${escapeHtml(data.cvsData.storeAddress)}</dd></div>`
                    : '';

                shippingRows = `
                    <div><dt>收件人姓名</dt><dd>${escapeHtml(data.cvsData.recipientName)}</dd></div>
                    <div><dt>手機號碼</dt><dd>${escapeHtml(data.cvsData.recipientPhone)}</dd></div>
                    <div><dt>門市名稱</dt><dd>${escapeHtml(data.cvsData.storeName)}</dd></div>
                    <div><dt>門市店號</dt><dd>${escapeHtml(data.cvsData.storeId)}</dd></div>
                    ${storeAddress}
                `;
            }

    

            modalReview.innerHTML = `
                ${commonRows}
                ${shippingRows}
                <div class="contract-modal__review-total"><dt>總金額</dt><dd>${escapeHtml(formatSupportCurrency(data.total))}</dd></div>
            `;
        }

        function getModalFocusableElements() {
            return [...modalPanel.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )].filter((element) => !element.hasAttribute('disabled'));
        }

        function ensureModalSubmitError() {
            let errorEl = document.getElementById('contract-modal-submit-error');

            if (!errorEl && modalPanel) {
                errorEl = document.createElement('p');
                errorEl.id = 'contract-modal-submit-error';
                errorEl.className = 'contract-modal__submit-error';
                errorEl.setAttribute('role', 'alert');
                errorEl.hidden = true;
                modalReview?.insertAdjacentElement('afterend', errorEl);
            }

            return errorEl;
        }

        function showModalSubmitError(message) {
            const errorEl = ensureModalSubmitError();
            if (!errorEl) return;

            errorEl.textContent = message;
            errorEl.hidden = false;
        }

        function clearModalSubmitError() {
            const errorEl = document.getElementById('contract-modal-submit-error');
            if (!errorEl) return;

            errorEl.textContent = '';
            errorEl.hidden = true;
        }

        function setModalConfirmState(isLoading) {
            if (!modalConfirm) return;

            modalConfirm.disabled = isLoading;
            modalConfirm.textContent = isLoading ? '封印建立中…' : modalConfirmDefaultLabel;
        }

        function resetContractForm() {
            form.reset();
            activeShippingType = null;
            clearCvsFields();
            clearHomeFields();
            clearAllErrors();
            clearModalSubmitError();
            updateSummary();
            updateShippingUI();
            updateSelectedBanner();
            pendingFormData = null;
        }

        function openModal(data) {
            pendingFormData = data;
            modalLastFocus = document.activeElement;
            clearModalSubmitError();
            setModalConfirmState(false);
            renderModalReview(data);
            modal.hidden = false;
            document.body.style.overflow = 'hidden';
            modalBack?.focus();
        }

        function closeModal(restoreFocus = true) {
            modal.hidden = true;
            document.body.style.overflow = '';
            pendingFormData = null;

            if (restoreFocus && modalLastFocus && typeof modalLastFocus.focus === 'function') {
                modalLastFocus.focus();
            }
        }

        function showSuccessView(archiveId, totalAmount = 0, planName = '') {
            currentOrder = {
                archiveId,
                planName: planName || '',
                planPrice: totalAmount || 0
            };
            sealedArchiveId = archiveId;
            sealedTotalAmount = totalAmount;
            sealedPlanName = planName;

            if (workspace) workspace.hidden = true;
            if (selectedBanner) selectedBanner.hidden = true;
            if (successView) successView.hidden = false;
            if (successStepPayment) successStepPayment.hidden = false;
            if (successId) successId.textContent = archiveId;
            if (successPlan) successPlan.textContent = planName || '—';
            if (successAmount) {
                successAmount.textContent = totalAmount > 0
                    ? formatSupportCurrency(totalAmount)
                    : '—';
            }

            resetSealReportPanel();

            const successTitle = document.getElementById('contract-success-title');
            successTitle?.focus();

            const top = section.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
            window.scrollTo({
                top,
                behavior: prefersReducedMotion() ? 'auto' : 'smooth'
            });
        }

        function resetSealReportPanel() {
            if (sealReportPanel) {
                sealReportPanel.hidden = true;
                sealReportPanel.classList.remove('is-open');
            }

            if (sealCompleteBtn) sealCompleteBtn.hidden = false;
            if (sealReportSuccess) sealReportSuccess.hidden = true;

            paymentForm?.reset();
            clearPaymentFormErrors();
            clearPaymentSubmitError();
            setPaymentSubmitState(false);
        }

        function prepareSealReportFormFields() {
            if (paymentArchiveIdInput) paymentArchiveIdInput.value = sealedArchiveId;
            if (paymentAmountInput && sealedTotalAmount > 0) {
                paymentAmountInput.value = String(sealedTotalAmount);
            }
        }

        function expandSealReportPanel() {
            if (!sealReportPanel || !sealedArchiveId) return;

            prepareSealReportFormFields();
            clearPaymentFormErrors();
            clearPaymentSubmitError();
            if (sealReportSuccess) sealReportSuccess.hidden = true;

            sealReportPanel.hidden = false;
            sealReportPanel.classList.remove('is-open');
            window.requestAnimationFrame(() => {
                sealReportPanel.classList.add('is-open');
            });

            if (sealCompleteBtn) sealCompleteBtn.hidden = true;

            window.setTimeout(() => {
                paymentDateInput?.focus();
            }, prefersReducedMotion() ? 0 : 120);

            const panelTop = sealReportPanel.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
            window.scrollTo({
                top: panelTop,
                behavior: prefersReducedMotion() ? 'auto' : 'smooth'
            });
        }

        function showSealReportSuccessView() {
            if (sealReportPanel) {
                sealReportPanel.hidden = true;
                sealReportPanel.classList.remove('is-open');
            }

            if (sealReportSuccess) sealReportSuccess.hidden = false;

            const successTitle = sealReportSuccess?.querySelector('.contract-seal-report-success__title');
            successTitle?.focus();

            const successTop = (sealReportSuccess || section).getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
            window.scrollTo({
                top: successTop,
                behavior: prefersReducedMotion() ? 'auto' : 'smooth'
            });
        }

        function clearPaymentFieldError(errorEl, fieldEl) {
            if (errorEl) errorEl.textContent = '';
            fieldEl?.closest('.contract-field')?.classList.remove('contract-field--error');
        }

        function setPaymentFieldError(errorEl, fieldEl, message) {
            if (errorEl) errorEl.textContent = message;
            fieldEl?.closest('.contract-field')?.classList.add('contract-field--error');
        }

        function clearPaymentFormErrors() {
            clearPaymentFieldError(paymentDateError, paymentDateInput);
            clearPaymentFieldError(paymentAmountError, paymentAmountInput);
            clearPaymentFieldError(paymentLastFiveError, paymentLastFiveInput);
            clearPaymentFieldError(paymentAgreeError, paymentAgreeInput);
        }

        function showPaymentSubmitError(message) {
            if (!paymentSubmitError) return;

            paymentSubmitError.textContent = message;
            paymentSubmitError.hidden = false;
        }

        function clearPaymentSubmitError() {
            if (!paymentSubmitError) return;

            paymentSubmitError.textContent = '';
            paymentSubmitError.hidden = true;
        }

        function setPaymentSubmitState(isLoading) {
            if (!paymentSubmitBtn) return;

            paymentSubmitBtn.disabled = isLoading;
            paymentSubmitBtn.textContent = isLoading ? '回報送出中…' : paymentSubmitDefaultLabel;
        }

        function validatePaymentForm() {
            clearPaymentFormErrors();
            clearPaymentSubmitError();

            let firstInvalid = null;
            const paymentDate = paymentDateInput?.value.trim() || '';

            if (!paymentDate) {
                setPaymentFieldError(paymentDateError, paymentDateInput, '請填寫匯款日期');
                firstInvalid = firstInvalid || paymentDateInput;
            }

            const paymentAmountRaw = paymentAmountInput?.value.trim() || '';
            const paymentAmount = Number(paymentAmountRaw);

            if (!paymentAmountRaw || !Number.isFinite(paymentAmount) || paymentAmount <= 0) {
                setPaymentFieldError(paymentAmountError, paymentAmountInput, '請填寫匯款金額');
                firstInvalid = firstInvalid || paymentAmountInput;
            }

            const accountLastFive = paymentLastFiveInput?.value.trim() || '';

            if (!accountLastFive) {
                setPaymentFieldError(paymentLastFiveError, paymentLastFiveInput, '請填寫匯款帳號末五碼');
                firstInvalid = firstInvalid || paymentLastFiveInput;
            } else if (!/^\d{5}$/.test(accountLastFive)) {
                setPaymentFieldError(paymentLastFiveError, paymentLastFiveInput, '請填寫五位數字的帳號末五碼');
                firstInvalid = firstInvalid || paymentLastFiveInput;
            }

            if (!paymentAgreeInput?.checked) {
                setPaymentFieldError(paymentAgreeError, paymentAgreeInput, '請勾選確認匯款資料正確');
                firstInvalid = firstInvalid || paymentAgreeInput;
            }

            if (firstInvalid) {
                firstInvalid.focus();
                return null;
            }

            return {
                archiveId: sealedArchiveId,
                paymentDate,
                paymentAmount,
                accountLastFive,
                paymentNote: paymentNoteInput?.value.trim() || ''
            };
        }

        function generateOrderId() {
            const id = `FL-2027-${String(supportFormContractSequence).padStart(4, '0')}`;
            supportFormContractSequence += 1;
            return id;
        }

        tierSelect?.addEventListener('change', () => {
            updateSummary();
            updateShippingUI();
            updateSelectedBanner();
            clearFieldError('tier');
        });

        Object.entries(fieldConfig).forEach(([fieldName, config]) => {
            const inputs = config.input instanceof NodeList ? [...config.input] : [config.input];

            inputs.forEach((input) => {
                if (!input) return;

                input.addEventListener('input', () => clearFieldError(fieldName));
                input.addEventListener('change', () => clearFieldError(fieldName));
            });
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const data = validateForm();
            console.log('表單驗證結果：', data);
            if (!data) return;
            openModal(data);
        });

        modalBack?.addEventListener('click', () => {
            closeModal(true);
        });

        modalBackdrop?.addEventListener('click', () => {
            closeModal(true);
        });

        modalConfirm?.addEventListener('click', async () => {
            if (!pendingFormData || isSubmitting) return;

            if (!isGoogleScriptUrlConfigured()) {
                showModalSubmitError('目前尚未設定資料接收網址。');
                return;
            }

            isSubmitting = true;
            clearModalSubmitError();
            setModalConfirmState(true);

            const archiveId = generateOrderId();
            const payload = buildGoogleScriptPayload(pendingFormData, archiveId);

            try {
                const result = await submitToGoogleScript(payload);
                const totalAmount = pendingFormData.total;
                const planName = pendingFormData.tierLabel;
                closeModal(false);
                showSuccessView(result.archiveId, totalAmount, planName);
                resetContractForm();
            } catch (error) {
                console.error('建立訂單失敗：', error);
            
                showModalSubmitError(
                    `封印契約建立失敗：${error?.message || '未知錯誤'}`
                );
            } finally {
                isSubmitting = false;
                setModalConfirmState(false);
            }
        });

        sealCompleteBtn?.addEventListener('click', () => {
            expandSealReportPanel();
        });

        paymentForm?.addEventListener('submit', async (event) => {
            event.preventDefault();

            if (isPaymentSubmitting) return;

            const paymentData = validatePaymentForm();
            if (!paymentData) return;

            isPaymentSubmitting = true;
            clearPaymentSubmitError();
            setPaymentSubmitState(true);

            try {
                if (!isGoogleScriptUrlConfigured()) {
                    showPaymentSubmitError('目前尚未設定資料接收網址。');
                    return;
                }

                await submitPaymentReport(paymentData);
                showSealReportSuccessView();
            } catch (error) {
                const message = error instanceof Error && error.message
                    ? error.message
                    : '封印回報失敗，請稍後再試或聯絡主辦方。';
                showPaymentSubmitError(message);
            } finally {
                isPaymentSubmitting = false;
                setPaymentSubmitState(false);
            }
        });

        paymentDateInput?.addEventListener('input', () => clearPaymentFieldError(paymentDateError, paymentDateInput));
        paymentAmountInput?.addEventListener('input', () => clearPaymentFieldError(paymentAmountError, paymentAmountInput));
        paymentLastFiveInput?.addEventListener('input', () => {
            if (paymentLastFiveInput) {
                paymentLastFiveInput.value = paymentLastFiveInput.value.replace(/\D/g, '').slice(0, 5);
            }
            clearPaymentFieldError(paymentLastFiveError, paymentLastFiveInput);
        });
        paymentAgreeInput?.addEventListener('change', () => clearPaymentFieldError(paymentAgreeError, paymentAgreeInput));

        modalPanel?.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                closeModal(true);
                return;
            }

            if (event.key !== 'Tab') return;

            const focusable = getModalFocusableElements();
            if (!focusable.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        });

        document.addEventListener('click', (event) => {
            const trigger = event.target.closest('[data-support-tier]');
            if (!trigger) return;

            event.preventDefault();
            applySupportTierSelection(trigger.dataset.supportTier);
        });

        updateSummary();
        updateShippingUI();
    }

    function initRulesSection() {
        const shelf = document.getElementById('rules-shelf');
        if (!shelf || shelf.dataset.rulesBound === 'true') return;

        shelf.dataset.rulesBound = 'true';

        const items = [...shelf.querySelectorAll('.rules-scroll')];
        const toggles = items
            .map((item) => item.querySelector('.rules-scroll__toggle'))
            .filter(Boolean);
        let openItem = null;

        function closeItem(item) {
            item.classList.remove('is-open');
            const toggle = item.querySelector('.rules-scroll__toggle');
            const panel = item.querySelector('.rules-scroll__panel');
            toggle?.setAttribute('aria-expanded', 'false');
            panel?.setAttribute('aria-hidden', 'true');
        }

        function openItemAt(item) {
            if (openItem && openItem !== item) {
                closeItem(openItem);
            }

            item.classList.add('is-open');
            const toggle = item.querySelector('.rules-scroll__toggle');
            const panel = item.querySelector('.rules-scroll__panel');
            toggle?.setAttribute('aria-expanded', 'true');
            panel?.setAttribute('aria-hidden', 'false');
            openItem = item;
        }

        items.forEach((item, index) => {
            const toggle = item.querySelector('.rules-scroll__toggle');
            if (!toggle) return;

            toggle.addEventListener('click', () => {
                if (item.classList.contains('is-open')) {
                    closeItem(item);
                    openItem = null;
                    return;
                }

                openItemAt(item);
            });

            toggle.addEventListener('keydown', (event) => {
                if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    toggles[(index + 1) % toggles.length]?.focus();
                    return;
                }

                if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    toggles[(index - 1 + toggles.length) % toggles.length]?.focus();
                    return;
                }

                if (event.key === 'Home') {
                    event.preventDefault();
                    toggles[0]?.focus();
                    return;
                }

                if (event.key === 'End') {
                    event.preventDefault();
                    toggles[toggles.length - 1]?.focus();
                }
            });
        });
    }

    function formatArchiveAmount(value) {
        if (value === undefined || value === null || value === '') return '—';

        const numericValue = Number(String(value).replace(/[^\d.-]/g, ''));

        if (Number.isFinite(numericValue) && numericValue > 0) {
            return formatSupportCurrency(numericValue);
        }

        return String(value);
    }

    function getPaymentStatusPresentation(status) {
        const rawStatus = String(status || '').trim();
        const statusMap = {
            待匯款: {
                label: '等待完成封印',
                en: 'AWAITING PAYMENT',
                desc: '館藏已建立，請於期限內完成匯款。'
            },
            待確認: {
                label: '館員確認中',
                en: 'ARCHIVE PENDING',
                desc: '封印回報已送出，等待館員核對款項。'
            },
            已確認: {
                label: '封印已確認',
                en: 'ARCHIVE ACCEPTED',
                desc: '款項已完成確認，館藏已正式收入禁書圖書館。'
            }
        };

        if (statusMap[rawStatus]) {
            return statusMap[rawStatus];
        }

        return {
            label: rawStatus || '—',
            en: '',
            desc: ''
        };
    }

    function formatShippingStatusDisplay(value) {
        const status = String(value || '').trim();
        return status || '尚未處理';
    }

    function formatTrackingNumberDisplay(value) {
        const trackingNumber = String(value || '').trim();
        return trackingNumber || '尚未建立';
    }

    function pickPublicArchiveData(archive) {
        return {
            archiveId: String(archive?.archiveId || '').trim(),
            publicName: String(archive?.publicName || '').trim(),
            planName: String(archive?.planName || '').trim(),
            totalAmount: archive?.totalAmount,
            paymentStatus: String(archive?.paymentStatus || '').trim(),
            shippingMethod: String(archive?.shippingMethod || '').trim(),
            shippingStatus: String(archive?.shippingStatus || '').trim(),
            trackingNumber: String(archive?.trackingNumber || '').trim()
        };
    }

    async function fetchArchiveStatus(archiveId) {
        if (!isGoogleScriptUrlConfigured()) {
            throw new Error('目前尚未設定資料接收網址。');
        }

        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), GOOGLE_SCRIPT_SUBMIT_TIMEOUT_MS);

        try {
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8'
                },
                body: JSON.stringify({
                    action: 'getArchiveStatus',
                    archiveId
                }),
                signal: controller.signal
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.message || '查詢失敗，請稍後再試。');
            }

            if (!result.archive || typeof result.archive !== 'object') {
                throw new Error('查詢失敗，請稍後再試。');
            }

            return pickPublicArchiveData(result.archive);
        } catch (error) {
            if (error instanceof Error && error.message && error.name !== 'AbortError' && !(error instanceof TypeError)) {
                throw error;
            }

            throw new Error('目前無法連線至館藏系統，請稍後再試。');
        } finally {
            window.clearTimeout(timeoutId);
        }
    }

    function initArchiveSearch() {
        const section = document.getElementById('archive-search');
        const input = document.getElementById('archive-search-input');
        const submitBtn = document.getElementById('archive-search-submit');
        const errorEl = document.getElementById('archive-search-error');
        const resultEl = document.getElementById('archive-search-result');
        const resultStatusEl = document.getElementById('archive-search-result-status');
        const resultListEl = document.getElementById('archive-search-result-list');
        const submitDefaultLabel = submitBtn?.textContent?.trim() || '【查詢館藏】';

        if (!section || !input || !submitBtn || section.dataset.archiveSearchBound === 'true') return;

        section.dataset.archiveSearchBound = 'true';

        let isSearching = false;

        function clearInputError() {
            input.classList.remove('archive-search-card__input--error');
        }

        function showSearchError(message) {
            if (!errorEl) return;

            errorEl.textContent = message;
            errorEl.hidden = false;
        }

        function clearSearchFeedback() {
            if (errorEl) {
                errorEl.textContent = '';
                errorEl.hidden = true;
            }

            clearInputError();
        }

        function clearSearchResult() {
            if (!resultEl) return;

            resultEl.hidden = true;
            resultEl.classList.remove('is-visible');

            if (resultStatusEl) resultStatusEl.innerHTML = '';
            if (resultListEl) resultListEl.innerHTML = '';
        }

        function setSearchButtonState(isLoading) {
            submitBtn.disabled = isLoading;
            submitBtn.textContent = isLoading ? '【查閱中……】' : submitDefaultLabel;
        }

        function renderArchiveResult(archive) {
            if (!resultEl || !resultStatusEl || !resultListEl) return;

            const paymentStatus = getPaymentStatusPresentation(archive.paymentStatus);
            const statusEnMarkup = paymentStatus.en
                ? `<p class="archive-search-result__status-en">${escapeHtml(paymentStatus.en)}</p>`
                : '';
            const statusDescMarkup = paymentStatus.desc
                ? `<p class="archive-search-result__status-desc">${escapeHtml(paymentStatus.desc)}</p>`
                : '';

            resultStatusEl.innerHTML = `
                <p class="archive-search-result__status-label">${escapeHtml(paymentStatus.label)}</p>
                ${statusEnMarkup}
                ${statusDescMarkup}
            `;

            const rows = [
                ['館藏編號', archive.archiveId || '—'],
                ['公開署名', archive.publicName || '—'],
                ['募資方案', archive.planName || '—'],
                ['支持金額', formatArchiveAmount(archive.totalAmount)],
                ['封印狀態', paymentStatus.label || '—'],
                ['寄送方式', archive.shippingMethod || '—'],
                ['寄送狀態', formatShippingStatusDisplay(archive.shippingStatus)],
                ['物流編號', formatTrackingNumberDisplay(archive.trackingNumber)]
            ];

            resultListEl.innerHTML = rows.map(([label, value]) => `
                <div class="archive-search-result__row">
                    <dt>${escapeHtml(label)}</dt>
                    <dd>${escapeHtml(value)}</dd>
                </div>
            `).join('');

            resultEl.hidden = false;
            resultEl.classList.remove('is-visible');
            window.requestAnimationFrame(() => {
                resultEl.classList.add('is-visible');
            });

            const resultTop = resultEl.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
            window.scrollTo({
                top: resultTop,
                behavior: prefersReducedMotion() ? 'auto' : 'smooth'
            });
        }

        async function handleSearch() {
            if (isSearching) return;

            clearSearchFeedback();
            clearSearchResult();

            const archiveId = input.value.trim().toUpperCase();
            input.value = archiveId;

            if (!archiveId) {
                input.classList.add('archive-search-card__input--error');
                showSearchError('請輸入館藏編號');
                input.focus();
                return;
            }

            isSearching = true;
            setSearchButtonState(true);

            try {
                if (!isGoogleScriptUrlConfigured()) {
                    showSearchError('目前尚未設定資料接收網址。');
                    return;
                }

                const archive = await fetchArchiveStatus(archiveId);
                renderArchiveResult(archive);
            } catch (error) {
                const message = error instanceof Error && error.message
                    ? error.message
                    : '查詢失敗，請稍後再試。';
                showSearchError(message);
            } finally {
                isSearching = false;
                setSearchButtonState(false);
            }
        }

        submitBtn.addEventListener('click', handleSearch);

        input.addEventListener('input', () => {
            clearInputError();
            if (errorEl?.textContent) {
                errorEl.textContent = '';
                errorEl.hidden = true;
            }
        });

        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                handleSearch();
            }
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        initSiteLoader();
        initNav();
        initNavSectionSpy();
        initHeroReveal();
        initSmoothScroll();
        initRewardsSection();
        initSealedGoals();
        initRulesSection();
        initArchiveSearch();
        initSupportForm();
        initScrollReveal();
        loadFundingProgress();
        initCountdown();
        initScrollHint();
        initButtonEffect();
        initParticles();
        initMouseGlow();
        initCustomCursor();
        initHeroBookParticles();
        initHeroMouseParallax();
        initParallax();
    });
})();
