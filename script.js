// 1. Music Configuration
// Update these paths to your MP3 files in the /assets/ folder
const musicTracks = {
    1: 'assets/song1.mp3', 
    2: 'assets/song2.mp3',
    3: 'assets/song3.mp3',
    4: 'assets/song4.mp3',
    5: 'assets/song5.mp3',
    6: 'assets/song6.mp3'
};

const audio = document.getElementById('bg-music');

function nextPage(pageNo) {
    document.querySelector('section.active').classList.remove('active');
    document.getElementById(`page-${pageNo}`).classList.add('active');
    
    // Update Music
    if (musicTracks[pageNo]) {
        audio.src = musicTracks[pageNo];
        audio.play();
    }

    if (pageNo === 4) { createMessageStars(); }
}

// 2. Create Background Twinkle Stars
const starContainer = document.getElementById('star-container');
for (let i = 0; i < 150; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 3 + 'px';
    star.style.width = size;
    star.style.height = size;
    star.style.top = Math.random() * 100 + '%';
    star.style.left = Math.random() * 100 + '%';
    star.style.setProperty('--duration', Math.random() * 3 + 2 + 's');
    starContainer.appendChild(star);
}

// 3. Star Messages (Page 4)
const messages = ["You make me smile", "You feel like home", "I love your laugh", "My favorite person"];
function createMessageStars() {
    const area = document.getElementById('star-messages-area');
    if (area.children.length > 0) return; 

    messages.forEach((msg, i) => {
        let btn = document.createElement('button');
        btn.innerHTML = "✨";
        btn.onclick = () => {
            alert(msg);
            if (i === messages.length - 1) {
                document.getElementById('next-from-stars').style.display = "inline-block";
            }
        };
        area.appendChild(btn);
    });
}

// 4. Photo Drop (Page 5)
function dropPhotos() {
    const photos = document.querySelectorAll('.polaroid');
    photos.forEach((photo, i) => {
        setTimeout(() => {
            photo.style.setProperty('--angle', (Math.random() * 20 - 10) + 'deg');
            photo.classList.add('dropped');
        }, i * 500);
    });
    setTimeout(() => {
        document.getElementById('final-btn').style.display = "inline-block";
    }, photos.length * 500 + 1000);
}

// 5. Final Celebration
function celebrate() {
    document.getElementById('celebration-msg').innerHTML = "<h2>You just made me the happiest person! ❤️</h2>";
    // Optional: Add confetti logic here
}