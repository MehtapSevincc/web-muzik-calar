document.addEventListener("DOMContentLoaded", () => {
    const playButtons = document.querySelectorAll(".dinle");
    const songCards = document.querySelectorAll(".hizli-arama-arac");
    let currentlyPlaying = null;

    playButtons.forEach((button, index) => {
        const audio = button.parentElement.querySelector("audio ");
        
        button.addEventListener("click", () => {
            if (currentlyPlaying && currentlyPlaying !== audio ) {
                currentlyPlaying.pause();
                currentlyPlaying.currentTime = 0;
            }
            if (audio.paused) {
                audio.play();
                currentlyPlaying = audio ;
                button.textContent = "Duraklat";
            } else {
                audio.pause();
                button.textContent = "Şimdi Dinle";
            }
        });

        audio.addEventListener("ended", () => {
            button.textContent = "Şimdi Dinle";
        });
    });
    songCards.forEach(card => {
        const audio  = card.querySelector("audio ");

        card.addEventListener("click", () => {
            if (currentlyPlaying && currentlyPlaying !== audio ) {
                currentlyPlaying.pause();
                currentlyPlaying.currentTime = 0;
            }

            if (audio.paused) {
                audio.play();
                currentlyPlaying = audio ;
            } else {
                audio.pause();
            }
        });

        audio.addEventListener("ended", () => {
            if (currentlyPlaying === audio ) currentlyPlaying = null;
        });
    });
});
    document.addEventListener("DOMContentLoaded", () => {
    const songCards = document.querySelectorAll(".hizli-arama-arac");
    const allAudios = Array.from(document.querySelectorAll("audio "));

    const muzikPanel = document.getElementById("muzik-panel");
    const panelBaslik = document.getElementById("panel-baslik");
    const panelSanatci = document.getElementById("panel-sanatci");

    const playPauseBtn = document.getElementById("play-pause-btn");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    let currentlyPlaying = null;
    let currentIndex = -1;

    function showPanel(audio , title, artist, index) {
        ilerlemeCubuguGuncelle(audio);

    
        if (currentlyPlaying && currentlyPlaying !== audio ) {
            currentlyPlaying.pause();
            currentlyPlaying.currentTime = 0;
        }

        currentlyPlaying = audio ;
        currentIndex = index;

        panelBaslik.textContent = title;
        panelSanatci.textContent = artist;

        audio.play();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
        muzikPanel.classList.add("show");
    }

    songCards.forEach((card, index) => {
        const audio  = card.querySelector("audio");
        const title = card.querySelector("h4").textContent;
        const artist = card.querySelector("p").textContent;

        card.addEventListener("click", () => {
            showPanel(audio , title, artist, index);
        });

        audio.addEventListener("ended", () => {
            playPauseBtn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
        });
    });

    playPauseBtn.addEventListener("click", () => {
        if (currentlyPlaying) {
            if (currentlyPlaying.paused) {
                currentlyPlaying.play();
                playPauseBtn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
            } else {
                currentlyPlaying.pause();
                playPauseBtn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
            }
        }
    });
    const ilerlemeCubugu = document.getElementById("ilerleme-cubugu");
if (currentlyPlaying) {
    currentlyPlaying.addEventListener("timeupdate", () => {
        const progress = (currentlyPlaying.currentTime / currentlyPlaying.duration) * 100;
        ilerlemeCubugu.style.width = `${progress}%`;
    });
}
    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            const prevCard = songCards[currentIndex - 1];
            prevCard.click();
        }
    });
    nextBtn.addEventListener("click", () => {
        if (currentIndex < songCards.length - 1) {
            const nextCard = songCards[currentIndex + 1];
            nextCard.click();
        }
    });
});

const ilerlemeAlan = document.getElementById("ileri"); 
const ilerlemeCubugu = document.getElementById("ilerleme-cubugu"); 

function ilerlemeCubuguGuncelle(audio){
    audio.addEventListener("timeupdate", () => {
        if (audio.duration) {
            const oran = (audio.currentTime / audio.duration) * 100;
            ilerlemeCubugu.style.width = oran + "%";
        }
    });
    
    ilerlemeAlan.addEventListener("click", (event) => {
        const alanGenislik = ilerlemeAlan.clientWidth; 
        const tiklananNokta = event.offsetX;  
        const tiklananYuzde = tiklananNokta / alanGenislik;
        
        audio.currentTime = tiklananYuzde * audio.duration;
    });
}



