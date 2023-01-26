const screenPlay = document.getElementById('screen-play');
const listImg = ["c-sharp", "c++", "go", "java", "javascript", "php", "python", "ruby", "swift", "typescript"];
var intent = 0;
var cardsComparative = [];
var idCards = [];

const fillScreenPlay = () => { 
    let list = generateUrlRandom();
    let frame = document.createDocumentFragment();
    for(let i = 0; i < listImg.length*2; i++) {
        let item = document.createElement("div");
        let img = document.createElement("img");
        item.setAttribute("class", "item");
        item.setAttribute("onclick", `verify("id-${i}", "${listImg[i]}")`);
        img.src = `resources/${list[i]}.png`;
        img.setAttribute("id", `id-${i}`);
        img.style.visibility = "hidden";
        item.appendChild(img);
        frame.appendChild(item);
    }
    screenPlay.appendChild(frame);
}

const generateUrlRandom = () => {
    let list = [];

    while(list.length !== 20) {
        let url = listImg[Math.floor(Math.random() * 10)];
        if(list.filter(element => element === url).length < 2){ list.push(url); }
    }

    return list;
}


function verify(id, srcImg) {
    intent++;
    if(intent < 2){ 
        document.getElementById(id).style.visibility = 'visible';
        cardsComparative.push(srcImg);
        idCards.push(id);
    }
    if(intent === 0){
        (cardsComparative[0] !== cardsComparative[1]) ? window.setTimeout(hiddenCards, 500, idCards): correct(idCards);
        intent = 0;
        cardsComparative = [], idCards = [];
    }
}

function hiddenCards(idCards){
    document.getElementById(idCards[0]).style.visibility = "hidden";
    document.getElementById(idCards[1]).style.visibility = "hidden";
} 

function correct(idCards) {
    let car1 = document.getElementById(idCards[0]).parentNode;
    let car2 = document.getElementById(idCards[1]).parentNode;
    car1.setAttribute("onclick", "");
    car2.setAttribute("onclick", ""); 
    alert("Par encontrado");

}
fillScreenPlay();