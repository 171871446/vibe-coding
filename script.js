/* =====================================================
   光影志 - 交互脚本
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化预加载器
    initPreloader();

    // 初始化自定义光标
    initCursor();

    // 初始化导航栏
    initNavbar();

    // 初始化移动端导航
    initMobileNav();

    // 初始化作品筛选
    initWorksFilter();

    // 初始化滚动动画
    initScrollAnimations();

    // 初始化数字动画
    initCountUp();

    // 初始化视差效果
    initParallax();
});

/* 预加载器 */
function initPreloader() {
    const preloader = document.querySelector('.preloader');

    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
        }, 1800);
    });
}

/* 自定义光标 */
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        // 光标跟随
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // 跟随器
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        requestAnimationFrame(animate);
    }

    animate();

    // 隐藏默认光标
    document.body.style.cursor = 'none';
}

/* 导航栏滚动效果 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* 移动端导航 */
function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        toggle.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // 点击链接后关闭菜单
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            toggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* 作品筛选 */
function initWorksFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 更新按钮状态
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;

            // 筛选作品
            workItems.forEach((item, index) => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400);
                }
            });
        });
    });
}

/* 滚动动画 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 观察作品项
    document.querySelectorAll('.work-item').forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // 观察其他元素
    document.querySelectorAll('.about-image, .about-content, .contact-content, .about-header, .works-header, .contact-header').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

/* 数字递增动画 */
function initCountUp() {
    const stats = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.dataset.count);
                animateNumber(target, count);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

function animateNumber(element, target) {
    let current = 0;
    const duration = 2000;
    const step = target / (duration / 16);

    function update() {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }

    update();
}

/* 视差效果 */
function initParallax() {
    const heroImage = document.querySelector('.hero-image');

    if (!heroImage) return;

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;

        if (scrolled < window.innerHeight) {
            heroImage.style.transform = `scale(1) translateY(${rate}px)`;
        }
    });
}

/* 图片懒加载 */
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

/* 滚动进度指示器 */
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);

    const bar = progressBar.querySelector('.scroll-progress-bar');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        bar.style.width = scrollPercent + '%';
    });
}

// 添加滚动进度条样式
const progressStyle = document.createElement('style');
progressStyle.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: transparent;
        z-index: 10000;
    }
    .scroll-progress-bar {
        height: 100%;
        background: var(--color-accent);
        width: 0;
        transition: width 0.1s ease;
    }
`;
document.head.appendChild(progressStyle);

// 初始化滚动进度
document.addEventListener('DOMContentLoaded', initScrollProgress);
