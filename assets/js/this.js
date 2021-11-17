// получаю плеер
const activeImg = document.querySelector('.preview_img');
const prevBtn   = document.querySelector('.nav-prev');
const playBtn   = document.querySelector('.nav-start');
const nextBtn   = document.querySelector('.nav-next');
const bar       = document.querySelector('.player_bar');
const progress  = document.querySelector('.progress');
const info      = document.querySelector('.player_text');
const volumeCont= document.querySelector('.volume_container');
const getVolume = document.querySelector('.volume');
// получаю треки
const track     = document.querySelector('#track');



/* // чек
console.log(activeImg, prevBtn, startBtn, stopBtn, nextBtn, bar, info); */

// массив песенок

const songs = ['Redbone - DontCry', 'Jockel der Gartenteichspringbrunnen', 'Imagine Dragons - Enemy', 'Bones - Sesh', 'UnKnown - BigTown']

let songIndex = 0;

// загружаем песенки

loadSong(songs[songIndex])

// обновление инфы о песнях: название, путь в теге аудио и обложка

function loadSong(song) {
    info.innerText = song;
    track.src = `assets/audio/${song}.mp3`
    activeImg.src = `assets/images/${song}.jpg`
}

function playSong() {
    track.classList.add('play');

    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    track.play();
}

function pauseSong() {
    track.classList.remove('play');

    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    track.pause();
}

function prevSong() {
    songIndex--

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex])

    playSong();
}

function nextSong() {

    songIndex++

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex])

    playSong();

}

// шаманим с длительностью аудиофайла
function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100;

    progress.style.width = `${progressPercent}%`

    if (progressPercent > 1) { 
        progress.style.boxShadow = "0px 0px 10px 3.5px rgba(19, 19, 19, 0.82)";
    } else {
        progress.style.boxShadow = 'none';
    }

    if (progressPercent >= 100) {
        nextSong();
    }

}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = track.duration

    track.currentTime = (clickX / width) * duration
}

function setVolume() {

    track.volume = (this.value / 100);

}   

// меняем иконку плей на паузу при нажатии

playBtn.addEventListener('click', () => {

    const isPlaying = track.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }

});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
track.addEventListener('timeupdate', updateProgress);
bar.addEventListener('click', setProgress);
getVolume.addEventListener('change', setVolume);

