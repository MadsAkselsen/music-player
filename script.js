const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
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

// Go to next song Event listener
nextBtn.addEventListener('click', () => {
  nextSong();
});
// Go to prev song Event listener
prevBtn.addEventListener('click', () => {
  prevSong();
});

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
