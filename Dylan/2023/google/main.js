var container = document.getElementById("container");
var searchKey = document.getElementById("searchKey");

function createItem(item){
    var div = document.createElement('div');
    div.classList = 'item';
    div.innerHTML = `
            <div class="header"><a href="${item.link}">
                <div class="links">
                    <div class="circle"></div>
                    <div>
                        <span>${item.link_short}</span>
                        <p>${item.link}</p>
                    </div>
                </div>
                <h3>${item.title}</h3>
            </a></div>
            <p><span>${item.date} — </span>${item.description}</p>
        `;
    container.appendChild(div);

}

for (var i = 0; i < data.length; i++){
    createItem(data[i]);
}

function searchUp(){
    container.innerHTML = '';
    var keyword = searchKey.value.toUpperCase();

    for (var i = 0; i < data.length; i++){
        if(data[i].title.toUpperCase().includes(keyword)){
            createItem(data[i]);
        }
    }
}

searchKey.addEventListener('keyup', (event)=>{
    // console.log(event.keyCode);
    if(event.keyCode == 13){
        searchUp();
    }
});
