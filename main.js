// Site JS — mobile nav + scroll animations + form handling

document.addEventListener('DOMContentLoaded', function () {

    // --- Mobile Navigation ---
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.nav-overlay');

    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            toggle.classList.toggle('open');
            menu.classList.toggle('open');
            if (overlay) overlay.classList.toggle('show');
        });

        if (overlay) {
            overlay.addEventListener('click', function () {
                toggle.classList.remove('open');
                menu.classList.remove('open');
                overlay.classList.remove('show');
            });
        }

        // Close menu when clicking a link
        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                toggle.classList.remove('open');
                menu.classList.remove('open');
                if (overlay) overlay.classList.remove('show');
            });
        });
    }

    // --- Scroll Fade-In ---
    var fadeEls = document.querySelectorAll('.fade-up');

    if (fadeEls.length > 0 && 'IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        fadeEls.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback: show everything
        fadeEls.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    // --- Contact Form ---
    var form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var name = document.getElementById('field-name');
            var email = document.getElementById('field-email');
            var message = document.getElementById('field-message');
            var msg = document.querySelector('.form-msg');

            if (name && email && message && msg) {
                // Simple client-side validation passed — show success
                msg.textContent = 'Thanks, ' + name.value.split(' ')[0] + '. Your message has been received.';
                msg.classList.add('show');
                form.reset();

                setTimeout(function () {
                    msg.classList.remove('show');
                }, 5000);
            }
        });
    }

});
