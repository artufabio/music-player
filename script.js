
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
let isPlaying = false;

// Music 
const songs = [
    {
        name: 'song-1',
        songImage: 'img-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Music'
    },
    {
        name: 'song-2',
        songImage: 'img-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Music'
    },
    {
        name: 'song-3',
        songImage: 'img-3',
        displayName: 'Goognight, Disco Queen',
        artist: 'Jacinto Music'
    },
    {
        name: 'song-4',
        songImage: 'img-4',
        displayName: 'Front Row (Remix)',
        artist: 'Jacinto Music'
    }
]

// Play
const playSong = () => {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
const pauseSong = () => {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => isPlaying ? pauseSong() : playSong());

// Update DOM
const loadSong = (song) => {
    artist.textContent = song.artist;
    title.textContent = song.displayName;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.songImage}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
const prevSong = () => {
    songIndex = (songIndex === 0) ? songs.length - 1 : songIndex - 1;
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
const nextSong = () => {
    songIndex = (songIndex === songs.length - 1) ? 0 : songIndex + 1;
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Calculate song duration to display on the top of the progress bar
const displaySongDuration = durSong => {
    const durationMinutes = Math.floor(durSong / 60);  // Math.floor rounds down the given number
    let durationSeconds = Math.floor(durSong % 60);
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
        return durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
}

// Show duration first song before playing
function initialDuration() {
    const { duration } = music;
    displaySongDuration(duration);
}

// Update Progress Bar and Time
const updateProgressBar = event => {
    if (isPlaying) {
        const {duration, currentTime} = event.srcElement;
        // update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        displaySongDuration(duration);
        // Calculate display for current time
        const currentMinutes = Math.floor(currentTime / 60);  
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

function setProgressBar(event) {
    const width = this.clientWidth; //width of the progress bar
    //in an event, this refers to the element that received the event. Inside an aero function this wouldn't work as it has a different usage. 
    const clickX = event.offsetX; //point clicked on the progress bar
    const {duration} = music; //duration of the song
    music.currentTime = (clickX / width) * duration; // update the current time in seconds
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('loadedmetadata', initialDuration);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);

