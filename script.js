const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Electric',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-3',
    displayName: 'Jacinto 3',
    artist: 'Jacinto Design',
  },
  {
    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Jacinto Design',
  },
];

// Check if playing
let isPlaying = false;
let currentSongIndex = 0;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Go to next song
function nextSong(index) {
  if (currentSongIndex < songs.length - 1) {
    currentSongIndex++;
    currentSongIndex === 1 ? prevBtn.classList.remove('disabled') : null; // Remove disabled status from prevSong button
    currentSongIndex === songs.length - 1
      ? nextBtn.classList.add('disabled')
      : null; // Add disabled status to nextButton
    loadSong(songs[currentSongIndex]);
    playSong();
  } else {
    return;
  }
}

// Go to prev song
function prevSong() {
  if (currentSongIndex > 0) {
    currentSongIndex--;
    currentSongIndex === songs.length - 2
      ? nextBtn.classList.remove('disabled')
      : null; // Remove disabled status from nextSong button
    currentSongIndex === 0 ? prevBtn.classList.add('disabled') : null; // Add disabled status to prevButton
    loadSong(songs[currentSongIndex]);
    playSong();
  } else {
    return;
  }
}

// Update progress bar and time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    //calculate display for duration
    const durationMinutes = Math.floor(duration / 60); // Minutes
    let durationSeconds = Math.floor(duration % 60); // Seconds
    // if below 10 add a "0" to the seconds. E.g. 8 becomes 08
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // need to check if currentTime has been set, otherwise "NaN" is displayed for a moment
    if (currentTime) {
      durationElement.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    //calculate display for currentTimeElement
    const currentTimeMinutes = Math.floor(currentTime / 60); // Minutes
    let currentTimeSeconds = Math.floor(currentTime % 60); // Seconds

    if (currentTimeSeconds < 10) {
      currentTimeSeconds = `0${currentTimeSeconds}`;
    }
    if (currentTime) {
      currentTimeElement.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;
    }
  }
}

// Event listeners
nextBtn.addEventListener('click', () => {
  nextSong();
});
prevBtn.addEventListener('click', () => {
  prevSong();
});
music.addEventListener('timeupdate', (e) => updateProgressBar(e));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

function InitialLoadSong(song) {
  loadSong(song);
  currentSongIndex === 0 ? prevBtn.classList.add('disabled') : null; // Add disabled status to prevButton
}

// On Load - Select First Song
InitialLoadSong(songs[currentSongIndex]);
