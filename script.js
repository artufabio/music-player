
const music = document.querySelector('audio');
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

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
