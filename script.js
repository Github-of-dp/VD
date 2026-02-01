let noCount = 0;
const audio = document.getElementById('bg-music');

// MUSIC PATHS (Replace with your file names)
const musicTracks = {
    1: 'assets/song1.mp3',
    2: 'assets/song2.mp3',
    3: 'assets/song3.mp3',
    4: 'assets/song4.mp3',
    5: 'assets/song5.mp3',
    6: 'assets/song6.mp3'
};

function nextPage(pageNo) {
    const current = document.querySelector('section.active');
    current.classList.remove('active');
    
    setTimeout(() => {
        const next = document.getElementById(`page-${pageNo}`);
        next.classList.add('active');

        // Play music for that page
        if (musicTracks[pageNo]) {
            audio.src = musicTracks[pageNo];
            audio.play().catch(e => console.log("Audio needs user click first"));
        }

        // Initialize heart stars if on page 4
        if (pageNo === 4) createHeartStars();
    }, 500);
}

function createHeartStars() {
    const area = document.getElementById('star-messages-area');
    area.innerHTML = "";
    const complements = [
        "Your smile lights up my whole world",
        "You are my safest place to be",
        "I love the way you think",
        "Every day with you is a gift",
        "You're the most beautiful soul I know",
        "I'm so lucky to have you"
    ];

    const points = [
        {x: 50, y: 15}, {x: 25, y: 25}, {x: 75, y: 25},
        {x: 15, y: 50}, {x: 85, y: 50}, {x: 50, y: 85}
    ];

    points.forEach((p, i) => {
        let star = document.createElement('div');
        star.className = 'msg-star';
        star.innerHTML = "✨";
        star.style.left = p.x + "%";
        star.style.top = p.y + "%";
        
        star.onclick = () => {
            const existing = document.querySelector('.scroll-msg');
            if(existing) existing.remove();
            
            let scroll = document.createElement('div');
            scroll.className = 'scroll-msg';
            scroll.innerText = complements[i];
            area.appendChild(scroll);
            
            // Show next button after clicking a few stars
            if(i >= points.length - 2) document.getElementById('next-from-stars').style.display = "block";
        };
        area.appendChild(star);
    });
}

function dropPhotos() {
    document.getElementById('drop-btn').style.display = "none";
    const photos = document.querySelectorAll('.polaroid');
    photos.forEach((p, i) => {
        setTimeout(() => {
            p.style.transform = `translateY(0) rotate(${Math.random() * 20 - 10}deg)`;
        }, i * 500);
    });
    setTimeout(() => {
        document.getElementById('final-btn').style.display = "block";
    }, photos.length * 500 + 1000);
}

function moveNoButton() {
    noCount++;
    if (noCount < 5) {
        const x = Math.random() * (window.innerWidth - 150);
        const y = Math.random() * (window.innerHeight - 150);
        const btn = document.getElementById('no-btn');
        btn.style.position = 'fixed';
        btn.style.left = x + 'px';
        btn.style.top = y + 'px';
    } else {
        document.getElementById('no-btn').style.display = 'none';
    }
}

function celebrate(choice) {
    document.getElementById('celebration-msg').innerHTML = "<h2>Yay! You just made me the happiest person! ❤️</h2>";
    setInterval(createHeartConfetti, 300);
}

function createHeartConfetti() {
    const heart = document.createElement('div');
    heart.innerHTML = "❤️";
    heart.className = "confetti-heart";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 10 + "px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
}