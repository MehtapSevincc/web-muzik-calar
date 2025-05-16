  document.addEventListener("DOMContentLoaded", () => {
  
  const songs = [
 
    {
      title: "Kafa",
      artist: "Sıla",
      img: "assets/images/sila.jpg",
      src: "assets/songs/SilaKafa.mp3",
      duration: "3.00"
    },
    {
      title: "Bi' Tık",
      artist: "Ajda Pekkan",
      img: "assets/images/ajdapekkan.jpg",
      src: "assets/songs/AjdaPekkanBiTik.mp3",
      duration: "4.35"
    },
    {
      title: "Dalgalandım Da Duruldum",
      artist: "Gripin",
      img: "assets/images/gripin.jpg",
      src: "assets/songs/GripinDalgalandimDaDuruldum.mp3",
      duration: "4.20"
    },
    {
      title: "Bu Böyle",
      artist: "Sertab Erener",
      img: "assets/images/sertap.jpg",
      src: "assets/songs/SertabErenerBuBoyle.mp3",
      duration: "4.30"
    },
    {
      title: "Büklüm Büklüm",
      artist: "Tülay Özer",
      img: "assets/images/tulayozer.jpg",
      src: "assets/songs/TulayOzerBuklumBuklum.mp3",
      duration: "5.18"
    },
     {
      title:"Bu Gece ",
      artist:"Sezen Aksu",
      img:"assets/images/sezenaksu.jpg",
      src:"assets/songs/SezenAksuBuGece.mp3",
      duration:"2.58"

   },
     {
      title:"Bir De Bana Sor",
      artist:"Erol Evgin",
      img:"assets/images/erolevgin.jpg",
      src:"assets/songs/ErolEvginBirDeBanaSor.mp3",
      duration:"3.59"

   },
     {
      title:"Uzaktan",
      artist:"Göksel",
      img:"assets/images/goksel.jpg",
      src:"assets/songs/GökselUzaktan.mp3",
      duration:"4.06"

   },
     {
      title:"Gidiyorum",
      artist:"Kıraç",
      img:"assets/images/kirac.jpg",
      src:"assets/songs/KiracGidiyorum.mp3",
      duration:"4.06"

   }

  ];
  const dinleButton = document.querySelector(".dinle");
  const songListContainer = document.getElementById("song-list");
  const muzikPanel = document.getElementById("muzik-panel");
  const panelBaslik = document.getElementById("panel-baslik");
  const panelSanatci = document.getElementById("panel-sanatci");
  const playPauseBtn = document.getElementById("play-pause-btn");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const ilerlemeAlan = document.getElementById("ileri");
  const ilerlemeCubugu = document.getElementById("ilerleme-cubugu");

  let currentlyPlaying = null;
  let currentIndex = -1;

 
  songs.forEach((song, index) => {
    const card = document.createElement("div");
    card.className = "hizli-arama-arac";
    card.innerHTML = `
      <img src="${song.img}" alt="${song.title}">
      <audio src="${song.src}"></audio>
      <div class="info">
        <h4>${song.title}</h4>
        <p>${song.artist}</p>
        <div class="time"><p>${song.duration}</p></div>
      </div>`
    ;
    songListContainer.appendChild(card);

    card.addEventListener("click", () => {
      showPanel(card.querySelector("audio"), song.title, song.artist, index);
    });
  });



  let audio = document.querySelector(".audio"); 

  dinleButton.addEventListener("click", () => {
    const audio = new Audio("assets/songs/MaviisiklarAnkaraRuzgari.mp3");
    panelBaslik.textContent = "Ankara Rüzgarı";
    panelSanatci.textContent ="Mavi Işıklar";
   
    muzikPanel.classList.add("show");

     if (currentlyPlaying && currentlyPlaying !== audio) {
      currentlyPlaying.pause();  
      currentlyPlaying.currentTime = 0;  
    }

    
   currentlyPlaying = audio;
    audio.play();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>'; 
     setupProgressBar(audio);
     });

    ilerlemeAlan.addEventListener("click", (e) => {
      const width = ilerlemeAlan.clientWidth;
      const clickX = e.offsetX;
      audio.currentTime = (clickX / width) * audio.duration;
    });
  
  function showPanel(audio, title, artist, index) {
    if (currentlyPlaying && currentlyPlaying !== audio) {
      currentlyPlaying.pause();
      currentlyPlaying.currentTime = 0;
    }

    currentlyPlaying = audio;
    currentIndex = index;

    panelBaslik.textContent = title;
    panelSanatci.textContent = artist;
    muzikPanel.classList.add("show");
    audio.play();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
    
    setupProgressBar(audio);
  }

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

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      const prevCard = document.querySelectorAll(".hizli-arama-arac")[currentIndex - 1];
      prevCard.click();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < songs.length - 1) {
      const nextCard = document.querySelectorAll(".hizli-arama-arac")[currentIndex + 1];
      nextCard.click();
    }
  });

  function setupProgressBar(audio) {
    audio.addEventListener("timeupdate", () => {
      const oran = (audio.currentTime / audio.duration) * 100;
      ilerlemeCubugu.style.width = `${oran}%`;
    });

    ilerlemeAlan.addEventListener("click", (e) => {
      const width = ilerlemeAlan.clientWidth;
      const clickX = e.offsetX;
      audio.currentTime = (clickX / width) * audio.duration;
    });
  }
}); 


  




