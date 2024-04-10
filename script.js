console.log("Welcome to Melody Music System");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let searchInput = document.getElementById('searchInput'); // Add this line

let songs = [
    {songName: "Channa Mere ya", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Mere Rashaqke Kamar", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Iktara", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Aankho Me Teri", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Nashe shi Chadh Gyi", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Aae dil mushkil", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Kal ho na ho", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "inna sona", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tum hi ho", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Genda Phool", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
    {songName: "Buleya", filePath: "songs/4.mp3", coverPath: "covers/11.jpg"},
];





songItems.forEach((element, i) => { 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
    element.setAttribute('data-search', songs[i].songName.toLowerCase()); // Add this line
});

// Function to toggle play/pause
const togglePlayPause = () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
};

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    togglePlayPause();
});

// Add an event listener for the space key
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        togglePlayPause();
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => { 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); 
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Add the function to filter songs based on search input
const filterSongs = () => {
    const searchTerm = searchInput.value.toLowerCase();

    songItems.forEach((element, i) => {
        const songName = element.getAttribute('data-search');
        if (songName.includes(searchTerm)) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
};

// Call the function on input change
searchInput.addEventListener('input', filterSongs);

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => { 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

