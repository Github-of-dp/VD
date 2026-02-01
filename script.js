const audio = document.getElementById('bg-music');
let noCount = 0;
let musicStarted = false;

const tracks = {
    1: 'assets/song1.mp3',
    2: 'assets/song2.mp3',
    3: 'assets/song3.mp3',
    4: 'assets/song4.mp3',
    5: 'assets/song5.mp3',
    6: 'assets/song6.mp3'
};

function startMusic() {
    if (!musicStarted) {
        audio.src = tracks[1];
        audio.play();
        musicStarted = true;
    }
}

function nextPage(pageNo) {
    document.querySelector('section.active').classList.remove('active');
    setTimeout(() => {
        const next = document.getElementById(`page-${pageNo}`);
        next.classList.add('active');
        if (tracks[pageNo]) {
            audio.src = tracks[pageNo];
            audio.play().catch(() => console.log("Music blocked"));
        }
        if (pageNo === 4) createHeartShape();
    }, 100);
}

function createHeartShape() {
    const area = document.getElementById('star-messages-area');
    const display = document.getElementById('star-msg-display');
    area.innerHTML = "";
    const complements = [
        "The way you look at me makes me feel like I can do anything.",
        "Your laugh is my absolute favorite sound in the world.",
        "I love how I can be 100% myself when I'm with you.",
        "You have the kindest heart I have ever known.",
        "Thinking of you is the best part of my day.",
        "I’m so proud of the person you are becoming.",
        "You are the most beautiful person I know—inside and out.",
        "I’m so lucky that I get to walk through life with you."
    ];

    for (let i = 0; i < 10; i++) {
        const t = (i / 10) * 2 * Math.PI;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        
        const star = document.createElement('div');
        star.className = 'msg-star';
        star.innerHTML = "💖";
        star.style.left = (50 + x * 2.5) + "%";
        star.style.top = (45 + y * 2.5) + "%";
        
        star.onclick = () => {
            display.style.opacity = 0;
            setTimeout(() => {
                display.innerHTML = complements[i % complements.length];
                display.style.opacity = 1;
            }, 300);
            if(i >= 5) document.getElementById('next-from-stars').style.display = "block";
        };
        area.appendChild(star);
    }
}

function dropPhotos() {
    document.getElementById('drop-btn').style.display = "none";
    document.querySelectorAll('.polaroid').forEach((p, i) => {
        setTimeout(() => {
            p.style.transform = `translateY(0) rotate(${Math.random() * 20 - 10}deg)`;
        }, i * 600);
    });
    setTimeout(() => document.getElementById('final-btn').style.display = "block", 2500);
}

function moveNoButton() {
    noCount++;
    const btn = document.getElementById('no-btn');
    if (noCount < 6) {
        btn.style.position = 'fixed';
        btn.style.left = Math.random() * 60 + 20 + 'vw';
        btn.style.top = Math.random() * 60 + 20 + 'vh';
    } else {
        btn.innerHTML = "Yes! ❤️";
        btn.style.position = "static";
        btn.onmouseover = null;
        btn.onclick = celebrate;
    }
}

function celebrate() {
    document.getElementById('celebration-msg').innerHTML = "<h1>Yay! You've made me the happiest person! ❤️</h1>";
    setInterval(() => {
        const c = document.createElement('div');
        c.className = 'confetti';
        c.innerHTML = "❤️";
        c.style.left = Math.random() * 100 + "vw";
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 3000);
    }, 200);
}