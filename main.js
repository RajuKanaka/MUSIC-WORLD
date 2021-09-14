let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement("audio");

// Define the tracks that have to be played
let track_list = [
  {
    name: "Salaam Rocky Bhai",
    artist: "Vijay Prakash,Santosh Venki",
    image: "./Photos/KGF.jpeg",
    path: "./Audio/[iSongs.info] 01 - Salaam Rocky Bhai.mp3",
  },
  {
    name: "Yenammi Yenami",
    artist: "Vijay prakash",
    image: "./Photos/ayogya.jpg",
    path: "./Audio/[iSongs.info] 01 - Yenammi Yenammi.mp3",
  },
  {
    name: "Sidila Bharava",
    artist: "Ananya Bhat,Santosh Venki",
    image: "./Photos/KGF.jpeg",
    path: "./Audio/[iSongs.info] 03 - Sidila Bharava.mp3",
  },
  {
    name: "Karabu bossu karabu",
    artist: "Chandan Shetty",
    image: "./Photos/Pogaru.jpg",
    path: "./Audio/[iSongs.info] 02 - Karabuu.mp3",
  },
  {
    name: "Chutu-chutu",
    artist: "Ravindra Soragavi",
    image: "./Photos/Ramboo-2.jpg",
    path: "./Audio/[iSongs.info] 03 - Chuttu Chuttu.mp3",
  },
  {
    name: "Jokae",
    artist: "Ananya Bhat,Santosh Venki",
    image: "./Photos/KGF.jpeg",
    path: "./Audio/[iSongs.info] 04 - Jokae.mp3",
  },
  {
    name: "Ennunu Bekagide",
    artist: "Vasuki Vaibhav",
    image: "./Photos/Mundina-nildhana.jpg",
    path: "./Audio/[iSongs.info] 03 - Innunu Bekagide.mp3",
  },
  {
    name: "Dheera Dheera",
    artist: "Airaa Udupi",
    image: "./Photos/KGF.jpeg",
    path: "./Audio/[iSongs.info] 05 - Dheera Dheera.mp3",
  },
  {
    name: "Anisuthide",
    artist: "sonu nigam",
    image: "./Photos/Mungaru-male.jpg",
    path: "./Audio/Anisuthide.mp3",
  },
  {
    name: "Kunidu kunidhu",
    artist: "Sonu Nigam",
    image: "./Photos/Mungaru male.jpg",
    path: "./Audio/Kunidu Kunidu Bare.mp3",
  },
  {
    name: "Marili Manasagidhe",
    artist: "Sanjith Hegde",
    image: "./Photos/Gentalman.webp",
    path: "./Audio/Marali Manasaagide Mp3 Song From Gentleman Movie.mp3",
  },
  {
    name: "Nannavale Nannavale",
    artist: "Sonu Nigam",
    image: "./Photos/vikram.webp",
    path: "./Audio/Nannavale Nannavale Mp3 Song From Inspector Vikram Movie.mp3",
  },
  {
    name: "Ondu Male billu",
    artist: "Armaan Malik,shreya ghoshal",
    image: "./Photos/chakravarthy.jpg",
    path: "./Audio/[iSongs.info] 02 - Ondu Malebillu.mp3",
  },
  {
    name: "Jai sri Ram",
    artist: "Divya Kumar",
    image: "./Photos/Robert.png",
    path: "./Audio/[iSongs.info] 02 - Jai Sriram.mp3",
  },
  {
    name: "Kannavadiyaka",
    artist: "Shreya Ghoshal",
    image: "./Photos/Robert.png",
    path: "./Audio/[iSongs.info] 06 - Kannau Hodiyaka.mp3",
  },
];
var songslist = document.querySelector("#classlist");
console.log(songslist, track_list.length);
for (let i = 0; i < track_list.length; i++) {
  // const path = String.raw`${track_list[i].path}`;d
  songslist.innerHTML += `<li onclick="playSong('${i}')"> ${track_list[i].name} </li>`;
}

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

const playSong = (index) => {
  track_index = +index;
  loadTrack(track_index);
  playTrack();
};

function loadTrack(track_index) {
  track_index = track_index;
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage =
    "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent =
    "TOP KANNADA SONGS PLAYING " +
    (+track_index + 1) +
    " OF " +
    track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  if (track_index < track_list.length - 1) track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0) track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
