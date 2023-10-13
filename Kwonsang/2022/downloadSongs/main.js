var settingPopup = document.getElementById("settingPopup");
var body = document.getElementById('body');
var audioSrcList = document.getElementsByClassName("songSrc");
var audioList = [];
var songListDiv = document.getElementById('songList');
var selectOption = document.getElementById('select');
var isOnlyFav = false;
var isFavIcon = document.getElementById('fav');
var isPlayingSomething = false;
var searchInput = document.getElementById('search');

for(var i=0; i<audioSrcList.length; i++){
    const audio = {};
    audio.fav = false;
    audio.playing = false;
    var a = audioSrcList[i].src.split('/');
    var info = a[a.length-1];
    info = decodeURI(info);
    info = info.split(' - ');
    info[1] = info[1].split('.mp3')[0];
    audio.title = info[0];
    audio.artist = info[1];
    audio.src = audioSrcList[i].src;

    audio.duration = audioSrcList[i].duration * 1;

    var songdiv = LoadSong(audio.title, audio.artist, audio.duration);
    songListDiv.appendChild(songdiv);

    audio.songdiv = songdiv;
    audioList.push(audio);

    const songFav = audio.songdiv.getElementsByClassName('songFav')[0];
    songFav.addEventListener('click', ()=>{
        if(audio.fav == false){
            audio.fav = true;
            songFav.classList.add('songLiked');
        }else{
            audio.fav = false;
            songFav.classList.remove('songLiked');
        }
        reloadList();
    });

    const songDown = audio.songdiv.getElementsByClassName('songDown')[0];
    songDown.addEventListener('click', ()=>{/*
        var file = new File(audio.src, audio.title+'.mp3', {type: 'audio/mp3'});*/

        /*
        var blob = new Blob(audio.src, {type: 'audio/mp3'});
        a.download = 'aefe.mp3';
        var a = document.createElement('a');
        a.href = (window.webkitURL || window.URL).createObjectURL(blob);
        a.dataset.downloadurl = ['audio/mp3', a.download, a.href].join(':');
        a.click();*/
        a.setAttribute('href', audio.src);
        a.setAttribute('download', '');
        body.appendChild(a);
        a.click();
        body.removeChild(a);
    });

    const songPlay = audio.songdiv.getElementsByClassName('songPlay')[0];
    const songAudio = audioSrcList[i];
    const navNow = {};
    navNow.div = audio.songdiv.getElementsByClassName('navNow')[0];
    audio.songPlayFunc = ()=>{
        if(audio.playing == true){
            audio.playing = false;
            songPlay.classList.remove('songPause');
            songAudio.pause();
            clearInterval(navNow.interval);
            isPlayingSomething = false;
        }else{
            if (isPlayingSomething == true){
                for(var j=0; j<audioList.length; j++){
                    if(audioList[j].playing == true){
                        audioList[j].songPlayFunc();
                    }
                }
            }
            audio.playing = true;
            isPlayingSomething = true;
            songPlay.classList.add('songPause');
            songAudio.play();
            navNow.interval = setInterval(()=>{
                navNow.div.style.width = (songAudio.currentTime / audio.duration * 100) + '%';
            }, 100);
        }
    };
    
    songPlay.addEventListener('click', audio.songPlayFunc);

}

function SettingOpen(){
    settingPopup.style.visibility = 'visible';
}

function SettingClose(){
    settingPopup.style.visibility = 'hidden';
}

function ThemeBasic(){
    body.className = '';
}
function ThemeDark(){
    body.className = 'dark';
}
function ThemeColor(){
    body.className = 'colorful';
}

function LoadSong(title, artist, dur){
    var song = document.createElement('div');
    song.className = 'song';
    var playicon = document.createElement('div');
    playicon.className = 'songPlay icon';
    var songInfo = document.createElement('div');
    songInfo.className = 'songInfo';
    var favicon = document.createElement('div');
    favicon.className = 'songFav icon';
    var downicon = document.createElement('div');
    downicon.className = 'songDown icon';

    song.appendChild(playicon);
    song.appendChild(songInfo);
    song.appendChild(favicon);
    song.appendChild(downicon);

    var div1 = document.createElement('div');
    var p1 = document.createElement('p');
    var p2 = document.createElement('p');
    p1.innerHTML = title;
    p2.innerHTML = artist;

    var div2 = document.createElement('div');
    var navbar = document.createElement('div');
    navbar.className = 'navBar';
    var navnow = document.createElement('div');
    navnow.className = 'navNow';
    var duration = document.createElement('p');
    var min = Math.floor(dur / 60);
    var sec = Math.floor(dur % 60);
    if(sec < 10){
        sec = '0' + sec;
    }

    duration.innerHTML = min + ':' + sec;

    div2.appendChild(navbar);
    div2.appendChild(duration);
    songInfo.appendChild(div1);
    songInfo.appendChild(div2);


    div1.appendChild(p1);
    div1.appendChild(p2);
    navbar.appendChild(navnow);

    return song;
}

function reloadList(){
    songListDiv.innerHTML = "";
    var printedList = audioList;
    if(isOnlyFav){
        printedList = printedList.filter((a)=>{
            return a.fav == true;
        });
    }
    var search = searchInput.value;
    if(search){
        console.log('dafw');
        printedList = printedList.filter((a)=>{
            return a.title.toUpperCase().includes(search.toUpperCase());
        });
    }
    for (var i=0; i<printedList.length; i++){
        var songdiv = printedList[i].songdiv;
        songListDiv.appendChild(songdiv);
    }
}



function SortbyAZ(){
    audioList = audioList.sort((a, b)=>{
        if(a.title < b.title) {
            return -1;
        }
        else {
            return 1;
        }
    })
    reloadList();
}

function SortbyZA(){
    audioList = audioList.sort((a, b)=>{
        if(a.title > b.title) {
            return -1;
        }
        else {
            return 1;
        }
    })
    reloadList();
}

function SortbyDur(){
    audioList = audioList.sort((a, b)=>{
        if(a.duration > b.duration) {
            return -1;
        }
        else {
            return 1;
        }
    })
    reloadList();
}

function SortbyDurRev(){
    audioList = audioList.sort((a, b)=>{
        if(a.duration < b.duration) {
            return -1;
        }
        else {
            return 1;
        }
    })
    reloadList();
}

function SortSelection(event){
    var selection = selectOption.value;
    if(selection == 'alpha'){
        SortbyAZ();
    }else if(selection == 'alphaRev'){
        SortbyZA();
    }else if(selection == 'dur'){
        SortbyDur();
    }else if(selection == 'durRev'){
        SortbyDurRev();
    }
}

selectOption.addEventListener('change', SortSelection);


function onlyFav(){
    if(isOnlyFav == true){
        isOnlyFav = false;
        isFavIcon.classList.remove('songLiked');
    }else{
        isOnlyFav = true;
        isFavIcon.classList.add('songLiked');
    }
    reloadList();
}

isFavIcon.addEventListener('click', onlyFav);

searchInput.addEventListener('keyup', reloadList);