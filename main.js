const prevButton = document.getElementById("prev")

const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')
const playListButton = document.getElementById('playlist')

const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')

const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton = document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')

const currentProgress = document.getElementById('current-progress')

// index şarki
let index
// döngü
let loop = true
// kariştirici açık olup olmama durumu
let isShuffleActive = false

// şarkı listesi
const songsList = [
    {
        name:"Haydi Gel Benimle Ol",
        link:"müzikler/haydi-gel-benimle-ol.mp3",
        artist:"Sezen Aksu",
        image:"resimler/sezenaksu.jpg"
    },
    {
        name:"Bertaraf",
        link:"müzikler/bertaraf.mp3",
        artist:"Canbay-Heijan",
        image:"resimler/canbayheijan.jpg"
    },
    {
        name:"One Kiss",
        link:"müzikler/one-kiss.mp3",
        artist:"Dua Lipa-Calvin Harris",
        image:"resimler/dualipa.jpg"
    },
    {
        name:"NKBI X YAPAMAM",
        link:"müzikler/yapamamxnkbi.mp3",
        artist:"Güneş-LvbelC5",
        image:"resimler/güneşlvbelc5.jpg"
    },
    {
        name:"Ateşe Düştüm",
        link:"müzikler/atese-düstüm.mp3",
        artist:"Mert Demir",
        image:"resimler/mertDemir.jpg"
    },
    {
        name:"Mesafe",
        link:"müzikler/mesafe.mp3",
        artist:"Semicenk",
        image:"resimler/semicenk.jpg"
    },
    {
        name:"Farkettim",
        link:"müzikler/farkettim.mp3",
        artist:"Semicenk",
        image:"resimler/semicenk2.jpg"
    },
    {
        name:"Another Love",
        link:"müzikler/another-love.mp3",
        artist:"Tom Odell",
        image:"resimler/tomodell.jpg"
    },
    {
        name:"Seni Dert Etmeler",
        link:"müzikler/senidertetmeler.mp3",
        artist:"Madrigal",
        image:"resimler/madrigal.jpg"
    },
    {
        name:"Firuze",
        link:"müzikler/firuze.mp3",
        artist:"Sezen Aksu",
        image:"resimler/sezenaksu2.jpg"
    },
    {
        name:"Kül",
        link:"müzikler/kul.mp3",
        artist:"Cem Adrian",
        image:"resimler/cemadrian.png"
    }


]
// zaman ayarlama
 const timeFormatter = (timeInput) => {
   
    let minute = Math.floor(timeInput / 60)
    minute = minute < 10 ? "0" + minute : minute
    let second = Math.floor(timeInput % 60)
    second = second < 10 ? "0" + second : second
    return `${minute}:${second}`
 }

//  şarkıyı çalma
 const playAudio = () => {
    
    console.log("playAudio")
    audio.play()
    pauseButton.classList.remove("hide")
    playButton.classList.add("hide")
} 

//  şarkı atama
const setSong = (arrayIndex) => {
   
    if (loop == true && isShuffleActive == true) {
        arrayIndex = Math.floor(Math.random() * songsList.length);
    }
    
    let { name , link , artist , image } = songsList[arrayIndex]
    audio.src = link
    songName.innerHTML = name
    songArtist.innerHTML = artist
    songImage.src = image

    audio.onloadedmetadata = () => {

        maxDuration.innerText = timeFormatter(audio.duration)
    }
    playListContainer.classList.add("hide")
    playAudio()
    
}
// sıradaki şarkıyı çalma


const nextSong = () => {
    if (loop) {
        if (index == (songsList.length - 1)) {
            index = 0
        } else {
            index += 1
        }
        setSong(index)
    } else {
        let randIndex = Math.floor(Math.random() * songsList.length)
        setSong(randIndex)
    }
}
//playlist kısmını açma
playListButton.addEventListener('click',() =>{
    playListContainer.classList.remove('hide')
})

// playlist kısmını kapatma
closeButton.addEventListener('click',() =>{
    playListContainer.classList.add('hide')
})

 const pauseAudio = () =>{
    audio.pause()
    pauseButton.classList.add('hide')
    playButton.classList.remove('hide')
 }
 setInterval(() =>{
    if(!isNaN(audio.duration) && audio.duration > 0){
        currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
        currentProgress.style.width = (audio.currentTime / audio.duration) * 100 + "%";
    }
 }, 1000);

 
 progressBar.addEventListener("click", (event) => {
    let coordStart = progressBar.getBoundingClientRect().left
    let coordEnd = event.clientX;
    let progress = (coordEnd-coordStart) / progressBar.offsetWidth;
    currentProgress.style.width = (progress * 100).toFixed(2) + "%";
    audio.currentTime = progress * audio.duration;
    audio.play();
    pauseButton.classList.remove('hide');
    playButton.classList.add('hide');
 });
 
const previousSong = () =>{
    if(index > 0){
        index-=1
    } 
    else {
        index = songsList.length - 1
    }
    setSong(index)
    playAudio() 
}

repeatButton.addEventListener('click',() => {
    if(repeatButton.classList.contains('active')){
        repeatButton.classList.remove('active')
        audio.loop = false
        console.log('tekrar kapatıldı')
    } else{
        repeatButton.classList.add('active')
        audio.loop = true
        console.log('tekrar acıldı')
    }
} )
shuffleButton.addEventListener('click',() =>{
    if(shuffleButton.classList.contains('active')){
        isShuffleActive = false
        shuffleButton.classList.remove('active')
        audio.loop = true
        console.log('kariştirici kapatıldı')
    } else{
        isShuffleActive = true
        shuffleButton.classList.add('active')
        audio.loop = false
        console.log('kariştirici acıldı')
    }
} )
const initializePlaylist = () => {
    for(let i in songsList){
        playListSongs.innerHTML += `<li class="playlistSong"
        onclick="setSong(${i})">
        <div class="playlist-image-container">
         <img src="${songsList[i].image}"/>
         </div>
         <div class="playlist-song-details">
         <span id="playlist-song-name">
         ${songsList[i].name}
         </span>
         <span id="playlist-song-artist-album">
         ${songsList[i].artist}
         </span>
         </div>
         </li>`
    }
}

//Tiklama Yakalama
nextButton.addEventListener('click', nextSong)

pauseButton.addEventListener('click', pauseAudio)

playButton.addEventListener('click', playAudio)

prevButton.addEventListener('click', previousSong)



// şarkı bitişini yakalama
audio.onended = () => {
    nextSong()
}

audio.addEventListener("timeupdate", ()=>{
    if(!isNaN(audio.currentTime) && !isNaN(audio.duration) && audio.duration > 0){
        currentTimeRef.innerText = timeFormatter(audio.currentTime);
    }
});




//ekrana yüklenildiğinde
window.onload = () => {
    index = 0
    setSong(index)
    

    pauseAudio()
    initializePlaylist()
}