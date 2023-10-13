var mapList = document.getElementById('mapList');
var previewImg = document.getElementById('previewImg');

var mapInfoList = [
    {
        folderName : "dreamSpace",
        title : "Dream Space",
        artist : "DVRST",
        starRate : 3.11
    },{
        folderName : "murderInMyMind",
        title : "Murder In My Mind",
        artist : "Kordhell",
        starRate : 3.28
    }
];

function createMap(idx){
    var map = document.createElement('div');
    map.classList = 'map';
    
    var h3 = document.createElement('h3');
    var h4 = document.createElement('h4');
    var h5 = document.createElement('h5');

    map.appendChild(h4);
    map.appendChild(h5);
    map.appendChild(h3);

    h3.innerHTML = mapInfoList[idx].starRate;
    h4.innerHTML = mapInfoList[idx].title;
    h5.innerHTML = mapInfoList[idx].artist;

    mapList.appendChild(map);
    map.addEventListener('mouseover', () => {
        previewImg.style.backgroundImage = 'url(./' + mapInfoList[idx].folderName + '/background.jpg)';
    });
    map.addEventListener('click', () => {
        location.href = './' + mapInfoList[idx].folderName + '/index.html';
    });
}

createMap(0);
createMap(1);