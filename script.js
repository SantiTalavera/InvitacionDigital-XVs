document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const eventDate = new Date('March 13, 2026 21:00:00').getTime();

    // WhatsApp Configuration - REEMPLAZAR CON TU NUMERO REAL
    const phoneNumber = "542215528267";

    // Logic for Entrance Overlay & Music
    const entranceOverlay = document.getElementById('entrance-overlay');
    const enterBtn = document.getElementById('enter-btn');
    const musicControl = document.getElementById('music-control');
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');

    enterBtn.addEventListener('click', () => {
        entranceOverlay.style.opacity = '0';
        setTimeout(() => {
            entranceOverlay.classList.add('hidden');
        }, 500);

        // Play Music
        musicControl.classList.remove('hidden');
        bgMusic.play().catch(e => console.log("Audio autoplay prevented"));
    });

    let isPlaying = true;
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            bgMusic.play();
            musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
        isPlaying = !isPlaying;
    });

    // Countdown Logic
    const countdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = eventDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdown);
            document.getElementById('countdown').innerHTML = "¡HOY ES EL DÍA!";
        }
    }, 1000);

    // RSVP Form Logic (WhatsApp)
    const rsvpForm = document.getElementById('rsvp-form-modal');
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = rsvpForm.querySelector('input[name="name"]').value;
        const attendance = rsvpForm.querySelector('select[name="attendance"]').value;
        const food = rsvpForm.querySelector('input[name="food"]').value;

        const attendanceText = attendance === 'yes' ? 'Sí, asistiré' : 'No podré asistir';
        const message = `¡Hola! Soy *${name}*.\n\nQuiero confirmar mi asistencia: *${attendanceText}*.\nRestricciones alimentarias: ${food || 'Ninguna'}`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        rsvpForm.reset();
        document.getElementById('rsvp-modal').classList.add('hidden');
    });

    // Song Form Logic (WhatsApp)
    const songForm = document.getElementById('song-form');
    if (songForm) {
        songForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const songName = songForm.querySelector('input').value;

            if (songName.trim()) {
                const message = `¡Hola! Me gustaría sugerir esta canción para la fiesta: *${songName}*`;
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
                songForm.reset();
            }
        });
    }

    // Intersection Observer for Reveal on Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    });

    document.querySelectorAll('.reveal, .fade-in').forEach((el) => {
        observer.observe(el);
    });

    // Slider Dot Logic
    const sliders = document.querySelectorAll('.photo-slider');
    sliders.forEach(slider => {
        slider.addEventListener('scroll', () => {
            const index = Math.round(slider.scrollLeft / slider.offsetWidth);
            const dots = slider.parentElement.querySelectorAll('.dot');

            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[index]) {
                dots[index].classList.add('active');
            }

            // Hide hint on interaction
            const hint = slider.parentElement.querySelector('.swipe-hint');
            if (hint) hint.style.display = 'none';
        });
    });

    document.querySelectorAll('.reveal, .fade-in').forEach((el) => {
        observer.observe(el);
    });
});
