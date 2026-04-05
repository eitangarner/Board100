const eras = {
    "Debut": {
        colors: ["#AEC6CF", "#77DD77"],
        cover: "https://upload.wikimedia.org/wikipedia/en/1/1f/Taylor_Swift_-_Taylor_Swift.png"
    },
    "Fearless": {
        colors: ["#F1C27D", "#E0A96D"],
        cover: "https://upload.wikimedia.org/wikipedia/en/5/5b/Fearless_%28Taylor%27s_Version%29_%282021_album_cover%29_by_Taylor_Swift.png"
    },
    "Speak Now": {
        colors: ["#CBAACB", "#9B72AA"],
        cover: "https://upload.wikimedia.org/wikipedia/en/5/5b/Taylor_Swift_-_Speak_Now_%28Taylor%27s_Version%29.png"
    },
    "Red": {
        colors: ["#8A3324", "#C21807"],
        cover: "https://upload.wikimedia.org/wikipedia/en/4/47/Taylor_Swift_-_Red_%28Taylor%27s_Version%29.png"
    },
    "1989": {
        colors: ["#ADD8E6", "#F5F5DC"],
        cover: "https://upload.wikimedia.org/wikipedia/en/d/d5/Taylor_Swift_-_1989_%28Taylor%27s_Version%29.png"
    },
    "reputation": {
        colors: ["#2C2C2C", "#707070"],
        cover: "https://upload.wikimedia.org/wikipedia/en/f/f2/Taylor_Swift_-_Reputation.png"
    },
    "Lover": {
        colors: ["#FFB7B2", "#B5EAD7"],
        cover: "https://upload.wikimedia.org/wikipedia/en/c/cd/Taylor_Swift_-_Lover.png"
    },
    "folklore": {
        colors: ["#D3D3D3", "#A9A9A9"],
        cover: "https://upload.wikimedia.org/wikipedia/en/f/f8/Taylor_Swift_-_Folklore.png"
    },
    "evermore": {
        colors: ["#C98463", "#B45E3B"],
        cover: "https://upload.wikimedia.org/wikipedia/en/0/0a/Taylor_Swift_-_Evermore.png"
    },
    "Midnights": {
        colors: ["#1A2466", "#545D8C"],
        cover: "https://upload.wikimedia.org/wikipedia/en/9/9f/Midnights_-_Taylor_Swift.png"
    },
    "TTPD": {
        colors: ["#D9D3C1", "#A6A297"],
        cover: "https://upload.wikimedia.org/wikipedia/en/6/6e/Taylor_Swift_%E2%80%93_The_Tortured_Poets_Department_%28album_cover%29.png"
    }
};

// Simple integer LCG PRNG for exact mathematical parity across iOS/Android/Windows CPUS
function seededRandomLCG(seed) {
    let m = 0x80000000;
    let a = 1103515245;
    let c = 12345;
    let state = seed;
    return function() {
        state = (a * state + c) % m;
        return state / (m - 1);
    }
}

const songsList = [
    "Our Song", "Picture to Burn", "Should've Said No", "Teardrops On My Guitar",
    "Love Story (Taylor’s Version)", "The Way I Loved You (Taylor’s Version)", "Mr. Perfectly Fine (Taylor’s Version) [From The Vault]", "You Belong With Me (Taylor’s Version)",
    "I Did Something Bad", "Don’t Blame Me", "Delicate", "Look What You Made Me Do", "Gorgeous", "Call It What You Want", "Getaway Car", "...Ready For It?", "King of My Heart", "Dress", "This Is Why We Can’t Have Nice Things",
    "I Forgot That You Existed", "Lover", "The Man", "Paper Rings", "Cruel Summer",
    "the 1", "mirrorball", "seven", "this is me trying", "the last great american dynasty", "the lakes (bonus track)", "willow", "right where you left me (bonus track)", "champagne problems", "gold rush",
    "All Too Well (10 Minute Version) [Taylor's Version]",
    "Anti-Hero", "Midnight Rain", "Maroon", "Mastermind", "Karma", "You're On Your Own, Kid", "Question...?", "Bejeweled", "Lavender Haze", "The Great War",
    "End Game (feat. Ed Sheeran & Future)", "Dear Reader",
    "no body, no crime (feat. HAIM)", "illicit affairs",
    "Death By A Thousand Cuts", "exile (feat. Bon Iver)", "London Boy", "Miss Americana & The Heartbreak Prince", "False God", "The Archer", "Daylight", "Cornelia Street",
    "tolerate it", "happiness",
    "Stay Stay Stay (Taylor's Version)", "I Bet You Think About Me (Taylor's Version)", "I Knew You Were Trouble (Taylor's Version)", "22 (Taylor's Version)", "Red (Taylor's Version)",
    "I Think He Knows",
    "Sparks Fly (Taylor's Version)", "The Story Of Us (Taylor's Version)",
    "'tis the damn season",
    "mad woman", "invisible string", "betty",
    "The Very First Night (Taylor's Version)",
    "Welcome To New York (Taylor's Version)", "Blank Space (Taylor's Version)", "Style (Taylor's Version)", "Out Of The Woods (Taylor's Version)", "All You Had To Do Was Stay (Taylor's Version)", "Shake It Off (Taylor's Version)", "Bad Blood (Taylor's Version)", "Wildest Dreams (Taylor's Version)", "This Love (Taylor’s Version)", "I Know Places (Taylor's Version)", "Clean (Taylor's Version)", "Say Don't Go (Taylor's Version) [From The Vault]", "Now That We Don't Talk (Taylor's Version) [From The Vault]", "Is It Over Now? (Taylor's Version) [From The Vault]", "\"Slut!\" (Taylor's Version) [From The Vault]",
    "coney island (feat. The National)", "evermore (feat. Bon Iver)", "ivy",
    "Fortnight (feat. Post Malone)", "The Tortured Poets Department", "My Boy Only Breaks His Favorite Toys", "Down Bad", "So Long, London", "But Daddy I Love Him", "Fresh Out The Slammer", "Florida!!! (feat. Florence + the Machine)", "Guilty as Sin?", "Who’s Afraid of Little Old Me?"
];

// Provide a fixed random order for the 100 standard songs 
let randGen = seededRandomLCG(42);
const mapped = songsList.map(song => ({ song: song, sortVal: randGen() }));
mapped.sort((a, b) => a.sortVal - b.sortVal);
songsList.length = 0;
mapped.forEach(x => songsList.push(x.song));

// Add 'Long Live' exactly at the 101st position, corresponding to index 100 for "Day 0".
songsList.push("Long Live (Taylor's Version)");

function getEraForSong(title) {
    const t = title.toLowerCase();

    // Fearless
    if (["love story", "the way i loved you", "mr. perfectly fine", "you belong with me"].some(kw => t.includes(kw))) return eras["Fearless"];
    // Speak Now
    if (["sparks fly", "the story of us", "long live"].some(kw => t.includes(kw))) return eras["Speak Now"];
    // Red
    if (["all too well", "stay stay stay", "i bet you think about me", "i knew you were trouble", "22", "red", "the very first night"].some(kw => t.includes(kw))) return eras["Red"];
    // 1989
    if (["welcome to new york", "blank space", "style", "out of the woods", "all you had to do was stay", "shake it off", "bad blood", "wildest dreams", "this love", "i know places", "clean", "say don't go", "now that we don't talk", "is it over now", "slut"].some(kw => t.includes(kw))) return eras["1989"];
    // reputation
    if (["did something bad", "don’t blame me", "delicate", "look what you made me do", "gorgeous", "call it what you want", "getaway car", "ready for it", "king of my heart", "dress", "nice things", "end game"].some(kw => t.includes(kw))) return eras["reputation"];
    // Lover
    if (["forgot that you existed", "lover", "the man", "paper rings", "death by a thousand cuts", "london boy", "miss americana", "false god", "the archer", "daylight", "cornelia street", "i think he knows", "cruel summer"].some(kw => t.includes(kw))) return eras["Lover"];
    // folklore
    if (["the 1", "mirrorball", "seven", "this is me trying", "american dynasty", "the lakes", "exile", "illicit affairs", "mad woman", "invisible string", "betty"].some(kw => t.includes(kw))) return eras["folklore"];
    // evermore
    if (["willow", "right where you left me", "champagne problems", "gold rush", "no body, no crime", "tolerate it", "happiness", "tis the damn season", "coney island", "evermore", "ivy"].some(kw => t.includes(kw))) return eras["evermore"];
    // Midnights
    if (["anti-hero", "midnight rain", "maroon", "mastermind", "karma", "you're on your own", "question", "bejeweled", "lavender haze", "great war", "dear reader"].some(kw => t.includes(kw))) return eras["Midnights"];
    // TTPD
    if (["fortnight", "tortured poets", "favorite toys", "down bad", "so long, london", "daddy i love him", "fresh out the slammer", "florida", "guilty as sin", "afraid of little old me"].some(kw => t.includes(kw))) return eras["TTPD"];
    // Debut
    if (["our song", "picture to burn", "should've said no", "teardrops on my guitar"].some(kw => t.includes(kw))) return eras["Debut"];

    // Default fallback
    return eras["TTPD"];
}

// Exactly 101 songs for indexing 0-100 mapped to Day 100 to Day 0
const finalSongs = songsList;

document.addEventListener("DOMContentLoaded", () => {
    const targetDate = new Date("2026-07-02T00:00:00+03:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate days remaining
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Clamp actual days to valid range 0-100
    const actualDaysLeft = Math.max(0, Math.min(100, diffDays));

    const slider = document.getElementById("daySlider");
    const daysLabelVal = document.getElementById("days-left-val");
    const circle = document.getElementById("progress-circle");
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;

    const root = document.documentElement;
    const songTitleEl = document.getElementById("song-title");
    const albumCoverEl = document.getElementById("album-cover");

    const audioPlayer = document.getElementById("audio-player");
    const playBtn = document.getElementById("play-btn");
    const playIconPath = document.getElementById("play-icon-path");
    let audioFetchTimeout;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;

    // Audio Player interactions
    playBtn.addEventListener("click", () => {
        if (!audioPlayer.src || !audioPlayer.src.includes('http')) return;
        if (audioPlayer.paused) {
            audioPlayer.play().then(() => {
                playIconPath.setAttribute("d", "M6 19h4V5H6v14zm8-14v14h4V5h-4z"); // Pause icon
            }).catch(e => console.error("Playback failed", e));
        } else {
            audioPlayer.pause();
            playIconPath.setAttribute("d", "M8 5v14l11-7z"); // Play icon
        }
    });

    audioPlayer.addEventListener("ended", () => {
        playIconPath.setAttribute("d", "M8 5v14l11-7z");
    });

    // Configure slider
    // The min value on slider is the "current" days left. Max is 100 (past).
    slider.min = actualDaysLeft;
    slider.max = 100;
    // Set to current day initially
    slider.value = actualDaysLeft;

    function updateUI(days) {
        // Update number
        daysLabelVal.textContent = days;

        // Update circle progress (percentage out of 100)
        // If days=88, we want it 88% full
        const offset = circumference - (days / 100) * circumference;
        circle.style.strokeDashoffset = offset;

        // Get song mapped to this specific "days left" index
        // Array index 0 is Day 100, index 99 is Day 1 (or Day 0).
        // If days=100, we want song index 0. Reversing mapping: index = 100 - days.
        const songIndex = 100 - days;
        // fallback in case of out of bounds
        const safeIndex = Math.max(0, Math.min(100, songIndex));

        const songTitle = finalSongs[safeIndex];
        const era = getEraForSong(songTitle);

        songTitleEl.classList.remove('marquee');
        songTitleEl.textContent = songTitle;
        albumCoverEl.src = era.cover;

        // Setup dynamic marquee if the title is too long
        setTimeout(() => {
            const parentW = songTitleEl.parentElement.clientWidth;
            if (songTitleEl.scrollWidth > parentW) {
                const dist = songTitleEl.scrollWidth - parentW;
                root.style.setProperty('--marquee-dist', `-${dist}px`);
                songTitleEl.classList.add('marquee');
            }
        }, 50);

        // Setup audio element default state
        audioPlayer.pause();
        audioPlayer.src = "";
        playIconPath.setAttribute("d", "M8 5v14l11-7z");
        // Opacity left at default so it never fades!

        const amBtn = document.getElementById('apple-music-btn');

        // Clean title aggressively to ensure iTunes search doesn't fail on rare songs
        let searchTitle = songTitle
            .replace(/\[.*?\]/g, "")
            .replace(/\(.*?\)/g, "")
            .replace(/['’"]/g, "")
            .trim();

        // Dynamically link button to Apple Music search
        if (amBtn) {
            amBtn.href = `https://music.apple.com/search?term=${encodeURIComponent("Taylor Swift " + searchTitle)}`;
        }

        // --- FETCH APPLE MUSIC API FOR 30s PREVIEW ---
        const finalSearchQuery = `Taylor Swift ${searchTitle}`;
        fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(finalSearchQuery)}&entity=song&media=music&limit=1`)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                return res.json();
            })
            .then(data => {
                if (data.results && data.results.length > 0 && data.results[0].previewUrl) {
                    audioPlayer.src = data.results[0].previewUrl;
                }
            })
            .catch(e => console.error('Failed to fetch preview url from Apple Music:', e));

        // Setup Day 0 Confetti Animation
        if (days == 0 && !window.confettiFired) {
            window.confettiFired = true;
            document.querySelector('.app-container').classList.add('celebration');

            var duration = 2 * 1000;
            var end = Date.now() + duration;

            (function frame() {
                if (window.confetti) {
                    window.confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: era.colors, zIndex: 100 });
                    window.confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: era.colors, zIndex: 100 });
                }
                if (Date.now() < end) requestAnimationFrame(frame);
            }());
        } else if (days != 0) {
            window.confettiFired = false;
            document.querySelector('.app-container').classList.remove('celebration');
        }

        // Update background gradient colors smoothly
        root.style.setProperty('--bg-color-1', era.colors[0]);
        root.style.setProperty('--bg-color-2', era.colors[1]);

        // Match progress circle color to era for a nicer effect
        circle.style.stroke = era.colors[1];
    }

    slider.addEventListener("input", (e) => {
        updateUI(e.target.value);
    });

    // Initial call
    updateUI(slider.value);
});