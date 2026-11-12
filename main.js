/* ============================================================
   四川文旅网站 · 交互脚本（原生 JS，无依赖）
   功能：导航高亮 / 移动端菜单 / 返回顶部 / 图片灯箱 / 滚动淡入
   ============================================================ */
(function () {
    'use strict';

    /* ---------- 1. 当前页导航高亮 ---------- */
    var current = location.pathname.split('/').pop() || 'WYSXSJ.html';
    var links = document.querySelectorAll('.nav > ul > li > a');
    for (var i = 0; i < links.length; i++) {
        var href = (links[i].getAttribute('href') || '').split('#')[0];
        if (href && href === current) {
            links[i].style.color = '#ffd166';
            links[i].style.fontWeight = 'bold';
            links[i].style.borderBottom = '2px solid #ffd166';
            links[i].style.paddingBottom = '4px';
        }
    }

    /* ---------- 2. 移动端菜单按钮 ---------- */
    var nav = document.querySelector('.nav');
    if (nav) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'nav-toggle';
        btn.textContent = '☰  栏目菜单';
        nav.insertBefore(btn, nav.firstChild);
        btn.addEventListener('click', function () {
            nav.classList.toggle('open');
        });
    }

    /* ---------- 3. 返回顶部 ---------- */
    var top = document.createElement('button');
    top.type = 'button';
    top.id = 'backTop';
    top.textContent = '↑';
    top.setAttribute('aria-label', '返回顶部');
    document.body.appendChild(top);

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            top.classList.add('show');
        } else {
            top.classList.remove('show');
        }
    }, { passive: true });

    top.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ---------- 4. 图片灯箱 ---------- */
    var box = document.createElement('div');
    box.id = 'lightbox';
    var bigImg = document.createElement('img');
    bigImg.alt = '查看大图';
    box.appendChild(bigImg);
    document.body.appendChild(box);

    var contentImgs = document.querySelectorAll('.continer img');
    for (var k = 0; k < contentImgs.length; k++) {
        contentImgs[k].style.cursor = 'zoom-in';
        contentImgs[k].addEventListener('click', function () {
            bigImg.src = this.src;
            box.classList.add('show');
        });
    }

    box.addEventListener('click', function () {
        box.classList.remove('show');
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            box.classList.remove('show');
        }
    });

    /* ---------- 5. 滚动淡入 ---------- */
    var targets = document.querySelectorAll('.continer > div, .continer > p, .continer > h1, .continer > h2');
    if ('IntersectionObserver' in window && targets.length) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05 });

        // fallback：2 秒后仍未触发的元素直接显示，避免内容不可见
        setTimeout(function () {
            for (var n = 0; n < targets.length; n++) {
                targets[n].classList.add('in');
            }
        }, 2000);

        for (var m = 0; m < targets.length; m++) {
            targets[m].classList.add('reveal');
            io.observe(targets[m]);
        }
    }
})();

