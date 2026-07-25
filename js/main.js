/* ============================================
   LackCityClient - Main JS
   ============================================ */

(function () {
    'use strict';

    /* ---- Navbar scroll effect ---- */
    var navbar = document.getElementById('navbar');
    var lastScroll = 0;

    function handleNavScroll() {
        var y = window.scrollY;
        if (y > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = y;
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    /* ---- Mobile menu toggle ---- */
    var toggle = document.getElementById('nav-toggle');
    var navLinks = document.querySelector('.nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', function () {
            toggle.classList.toggle('open');
            navLinks.classList.toggle('open');
        });

        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                toggle.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });
    }

    /* ---- Scroll reveal ---- */
    function initReveal() {
        var targets = document.querySelectorAll(
            '.feature-card, .credit-card, .version-table-wrap, .download-card, .section-header, .hero-stats, .hero-actions'
        );

        targets.forEach(function (el) {
            el.classList.add('reveal');
        });

        if (!('IntersectionObserver' in window)) {
            targets.forEach(function (el) {
                el.classList.add('visible');
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        targets.forEach(function (el) {
            observer.observe(el);
        });
    }

    /* ---- Staggered reveal for feature cards ---- */
    function initStagger() {
        var grids = document.querySelectorAll('.features-grid, .credits-grid');

        grids.forEach(function (grid) {
            var cards = grid.children;
            Array.prototype.forEach.call(cards, function (card, i) {
                card.style.transitionDelay = (i * 80) + 'ms';
            });
        });
    }

    /* ---- Smooth anchor scroll (fallback) ---- */
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
            var id = a.getAttribute('href');
            if (id === '#') return;
            var target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ---- Download button pulse ---- */
    function initDownloadPulse() {
        var btn = document.querySelector('.download .btn-primary');
        if (!btn) return;

        setInterval(function () {
            btn.style.boxShadow = '0 4px 35px rgba(179, 71, 240, 0.45)';
            setTimeout(function () {
                btn.style.boxShadow = '';
            }, 1200);
        }, 3000);
    }

    /* ---- Init ---- */
    document.addEventListener('DOMContentLoaded', function () {
        initReveal();
        initStagger();
        initDownloadPulse();
    });

})();
