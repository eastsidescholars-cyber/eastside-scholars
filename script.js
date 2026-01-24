document.addEventListener('DOMContentLoaded', () => {
    // 1. Security Gateway Logic
    const loadingBar = document.getElementById('loading-bar');
    const statusText = document.getElementById('status-text');
    const enterBtn = document.getElementById('enter-btn');
    const gateway = document.getElementById('security-gateway');

    // Simulate loading process
    setTimeout(() => {
        loadingBar.style.width = '100%';

        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            if (progress === 30) statusText.innerText = 'Bypassing firewalls...';
            if (progress === 60) statusText.innerText = 'Decrypting curriculum assets...';
            if (progress === 90) statusText.innerText = 'Verification complete.';

            if (progress >= 100) {
                clearInterval(interval);
                enterBtn.style.display = 'block';
                enterBtn.style.opacity = '0';
                setTimeout(() => {
                    enterBtn.style.transition = 'opacity 0.5s';
                    enterBtn.style.opacity = '1';
                }, 100);
            }
        }, 100);
    }, 500);

    enterBtn.addEventListener('click', () => {
        gateway.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Re-enable scroll
    });

    // Disable scroll during gateway
    document.body.style.overflow = 'hidden';

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Simple Intersection Observer for Fade-in effects
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animateElements = document.querySelectorAll('.process-card, .curr-card, .leader-card, .contact-info, .contact-form-glass');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
        observer.observe(el);
    });

    // 4. Form Submission Handling (Mailto + Fallback)
    const form = document.querySelector('form');
    const fallbackContainer = document.getElementById('fallback-container');
    const copyBtn = document.getElementById('copy-btn');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('contact-message').value;
            const recipient = 'eastsidescholars@gmail.com';
            const subject = `Eastside Scholars Inquiry - ${name}`;
            const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

            // 1. Attempt mailto
            const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoUrl;

            // 2. Update UI
            const btn = form.querySelector('button[type="submit"]');
            btn.innerText = 'Creating Email...';
            btn.style.background = '#27c93f';

            // Show fallback after a short delay
            setTimeout(() => {
                fallbackContainer.style.display = 'block';
                btn.innerText = 'Email App Triggered';
            }, 1000);
        });
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('contact-message').value;
            const textToCopy = `To: eastsidescholars@gmail.com\nSubject: Eastside Scholars Inquiry - ${name}\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = copyBtn.innerText;
                copyBtn.innerText = 'Copied to Clipboard!';
                copyBtn.style.borderColor = '#27c93f';
                copyBtn.style.color = '#27c93f';
                setTimeout(() => {
                    copyBtn.innerText = originalText;
                    copyBtn.style.borderColor = '';
                    copyBtn.style.color = '';
                }, 3000);
            });
        });
    }
});
