var container = document.getElementById('container');
var searchInput = document.getElementById('searchInput');

function addItemtoContainer(item){
    // item.link, item.title
    const div = document.createElement('div');
    div.classList = "item";
    div.innerHTML = `
        <div><a href="${item.link}">
            <div class="item-top">
                <div class="circle">
                    <img src="${item.imgUrl}">
                </div>
                <div>
                    <p class="short-link">${item.shortLink}</p>
                    <p class="link">${item.link}</p>
                </div>
            </div>
            <h3 class="title">${item.title}</h3>
        </a></div>
        <p class="description">
            <span>${item.date} — </span>
            ${item.description}
        </p>
    `;
    container.appendChild(div);
}

for (var i = 0; i < data.length; i++){
    addItemtoContainer(data[i]);
}

function searchItem(){
    var key = searchInput.value.toUpperCase();
    container.innerHTML = '';

    for(var i = 0; i< data.length; i++){
        var toSearch = data[i].title.toUpperCase();
        if(toSearch.includes(key)){
            addItemtoContainer(data[i]);
        }
    }
}

searchInput.addEventListener('keyup', (event)=>{
    if(event.keyCode == 13){
        searchItem();
    }
});