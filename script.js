/* =========================================
   ELEMENTS
========================================= */

const opening = document.getElementById("opening");
const envelope = document.getElementById("envelope");
const openButton = document.getElementById("openButton");

const letter = document.getElementById("letter");

const music = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");

const reasons = document.querySelectorAll(".reason");

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

const particles = document.getElementById("particles");


/* =========================================
   OPEN LETTER
========================================= */

let opened = false;

function openLetter() {

    if (opened) return;

    opened = true;

    /*
        Open envelope animation
    */

    envelope.classList.add("open");

    /*
        Wait for envelope animation
        before showing the actual letter
    */

    setTimeout(() => {

        opening.classList.add("hide");

    }, 800);


    setTimeout(() => {

        opening.style.display = "none";

        letter.classList.remove("hidden");

        musicButton.classList.remove("hidden");

        /*
            Start music only after
            user clicks the letter.
        */

        music.volume = 0.45;

        music.play()
            .then(() => {

                musicButton.classList.remove("paused");

            })
            .catch(() => {

                musicButton.classList.add("paused");

            });


        /*
            Scroll to top
        */

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

        /*
            Start reason animations
        */

        observeReasons();

    }, 1450);
}


/* Click button */

openButton.addEventListener(
    "click",
    openLetter
);


/* Click envelope */

envelope.addEventListener(
    "click",
    openLetter
);


/* =========================================
   MUSIC BUTTON
========================================= */

musicButton.addEventListener(
    "click",
    () => {

        if (music.paused) {

            music.play();

            musicButton.classList.remove("paused");

        } else {

            music.pause();

            musicButton.classList.add("paused");

        }

    }
);


/* =========================================
   REASON SCROLL ANIMATION
========================================= */

function observeReasons() {

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("show");

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    reasons.forEach(
        (reason) => {

            observer.observe(reason);

        }
    );
}


/* =========================================
   PROGRESS COUNTER
========================================= */

function updateProgress() {

    if (!opened) return;

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    let percentage =
        (scrollTop / documentHeight) * 100;

    percentage =
        Math.max(
            0,
            Math.min(
                100,
                percentage
            )
        );

    progressFill.style.width =
        percentage + "%";


    let current =
        Math.round(
            (percentage / 100) * 143
        );

    current =
        Math.max(
            0,
            Math.min(
                143,
                current
            )
        );


    progressText.textContent =
        `${current} / 143`;
}


window.addEventListener(
    "scroll",
    updateProgress
);


/* =========================================
   FLOATING HEARTS
========================================= */

const particleSymbols = [
    "♡",
    "♥",
    "✦",
    "✧",
    "💜",
    "✨"
];


function createParticle() {

    const particle =
        document.createElement("div");

    particle.classList.add(
        "particle"
    );


    particle.textContent =
        particleSymbols[
            Math.floor(
                Math.random() *
                particleSymbols.length
            )
        ];


    particle.style.left =
        Math.random() * 100 + "%";


    particle.style.fontSize =
        (10 + Math.random() * 15) + "px";


    particle.style.animationDuration =
        (5 + Math.random() * 5) + "s";


    particles.appendChild(
        particle
    );


    setTimeout(
        () => {

            particle.remove();

        },
        10000
    );
}


/*
    Don't create particles
    too aggressively.
*/

setInterval(
    createParticle,
    900
);


/* =========================================
   PREVENT DOUBLE TAP ZOOM
========================================= */

let lastTouchEnd = 0;

document.addEventListener(
    "touchend",
    function (event) {

        const now =
            Date.now();

        if (
            now - lastTouchEnd <= 300
        ) {

            event.preventDefault();

        }

        lastTouchEnd = now;

    },
    false
);
