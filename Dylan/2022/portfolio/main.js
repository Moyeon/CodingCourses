var webContainer = document.getElementById('webContainer');

for(var i = 0; i < projects.length; i++){
    const item = document.createElement('div');
    const title = document.createElement('h2');
    const inform = document.createElement('p');
    const link = document.createElement('h5');
    const thumbnail = document.createElement('div');
    const img = document.createElement('img');

    title.innerHTML = projects[i].title;
    link.innerHTML = "View Project";
    const l = projects[i].link;
    link.addEventListener('click', function(){
        location.href = l;
    });
    img.src = './thumbnails/' + projects[i].img;
    inform.innerHTML = projects[i].inform;

    item.classList = "item";
    inform.classList = "inform";
    title.classList = "title";
    thumbnail.classList = "thumbnail";

    item.appendChild(title);
    item.appendChild(inform);
    item.appendChild(link);
    item.appendChild(thumbnail);
    thumbnail.appendChild(img);

    webContainer.appendChild(item);
}


var banners = document.getElementsByClassName("randomStuff");
var currIdx = 0;

function nextBanner(){
    currIdx = (currIdx + 1) % banners.length;
    for(var i = 0; i<banners.length; i++){
        if(i == currIdx){
            banners[i].style.zIndex = 5;
        }else{
            banners[i].style.zIndex = 3;
        }
    }
}