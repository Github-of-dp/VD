let noCount = 0;

// 1. Heart-Shaped Star Layout
function createHeartStars() {
    const area = document.getElementById('star-messages-area');
    area.innerHTML = "";
    const complements = [
        "Your smile lights up my whole world",
        "You are my safest place to be",
        "I love the way you think",
        "Every day with you is a gift",
        "You're the most beautiful soul I know"
    ];

    // Heart shape coordinates (x, y)
    const points = [
        {x: 50, y: 15}, {x: 20, y: 25}, {x: 80, y: 25},
        {x: 10, y: 50}, {x: 90, y: 50}, {x: 50, y: 90}
    ];

    points.forEach((p, i) => {
        let star = document.createElement('div');
        star.className = 'msg-star';
        star.innerHTML = "✨";
        star.style.left = p.x + "%";
        star.style.top = p.y + "%";
        
        star.onclick = (e) => {
            const existing = document.querySelector('.scroll-msg');
            if(existing) existing.remove();
            
            let scroll = document.createElement('div');
            scroll.className = 'scroll-msg';
            scroll.innerText = complements[i % complements.length];
            area.appendChild(scroll);
            
            if(i === points.length - 1) document.getElementById('next-from-stars').style.display = "block";
        };
        area.appendChild(star);
    });
}

// 2. The Escaping No Button
function moveNoButton() {
    noCount++;
    if (noCount < 4) {
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 100);
        const btn = document.getElementById('no-btn');
        btn.style.position = 'fixed';
        btn.style.left = x + 'px';
        btn.style.top = y + 'px';
    } else {
        alert("Okay, okay... fine! But I know you want to say yes 😉");
        celebrate("No (but I forced her)");
    }
}

// 3. Confetti Effect
function celebrate(choice) {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) { return Math.random() * (max - min) + min; }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        const particleCount = 50 * (timeLeft / duration);
        // Using a simple heart emoji confetti trick
        createHeartConfetti();
    }, 250);

    document.getElementById('celebration-msg').innerHTML = "<h2>Yay! You're my Valentine! ❤️</h2>";
    // Send to Formspree/WhatsApp here...
}

function createHeartConfetti() {
    const heart = document.createElement('div');
    heart.innerHTML = "❤️";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "-10vh";
    heart.style.fontSize = Math.random() * 20 + 10 + "px";
    heart.style.transition = "transform 3s linear, opacity 3s";
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.style.transform = `translateY(110vh) rotate(${Math.random() * 360}deg)`;
        heart.style.opacity = "0";
    }, 100);
}