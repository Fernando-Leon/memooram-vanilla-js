const listImg = ["c-sharp", "c++", "go", "java", "javascript", "php", "python", "ruby", "swift", "typescript"]; //Lista de imagenes
var count = 0, score = 0, intents = 0;
var cardsComparative = [], idCards = [], idItems = [];

const screenPlay = document.getElementById('screen-play'); // Zona de juego
const controlScore = document.getElementById("controls-score"); // Div de botones y datos de juego
const divContp = document.getElementById("cont-p"); // Div contiene etiquetas p
const pCrdsFound = document.getElementById("cards-found"); // <p> Cartas encontradas
const pIntents = document.getElementById("p-intents"); // <p> Intentos 
const btnPlay = document.getElementById("btn-play"); // Boton de inicir juego
const btnReload = document.getElementById("btn-reload"); // Boton para reiniciar juego

btnReload.style.display = "none";
divContp.style.display = "none";
controlScore.style.gridTemplateRows = "1fr 1fr";

const generateUrlRandom = () => {//Genera una lista con los pares de cartas de manera desordenada
    let list = [];
    while(list.length !== 20) {
        let url = listImg[Math.floor(Math.random() * 10)];
        if(list.filter(element => element === url).length < 2) {
            list.push(url); 
        }
    }
    return list;
}

btnPlay.addEventListener("click", () => {
    main();
    btnPlay.style.display = "none";
    btnReload.style.display = "block";
    divContp.style.display = "grid";
    controlScore.style.gridTemplateRows = "20% 60% 20%";
});

const main = () => {//Genra la zona de juego
    let list = generateUrlRandom();
    let frame = document.createDocumentFragment();

    for(let i = 0; i < listImg.length*2; i++) {
        let item = document.createElement("div");
        let img = document.createElement("img");
        item.setAttribute("class", "item");
        item.setAttribute("id", `item-${i}`);
        img.src = `resources/${list[i]}.png`;
        img.setAttribute("id", `id-${i}`);
        img.style.visibility = "hidden";
        item.setAttribute("onclick", `verify("id-${i}", "${list[i]}", "item-${i}")`);
        item.appendChild(img);
        frame.appendChild(item);
    }

    screenPlay.appendChild(frame);
}

function verify(id, srcImg, idItem) {
    
    if(count < 2){ 
        count++
        document.getElementById(id).style.visibility = 'visible';
        document.getElementById(idItem).classList.remove("item");
        document.getElementById(idItem).setAttribute("class", "item-hidden");
        cardsComparative.push(srcImg);
        idItems.push(idItem);
        idCards.push(id);
    }

    if(count === 2){
        if(cardsComparative[0] !== cardsComparative[1]) {
            window.setTimeout(hiddenCards, 500, { idCards, idItems });
        }else {
            let car1 = document.getElementById(idCards[0]).parentNode;
            let car2 = document.getElementById(idCards[1]).parentNode;
            car1.setAttribute("onclick", "");
            car2.setAttribute("onclick", ""); 
            score++;
            pCrdsFound.innerHTML = `Cartas encontradas: ${score}`;

            if(score === listImg.length){
                alert('Ganaste');
            }
        }
        
        count = 0, intents++;
        cardsComparative = [], idCards = [], idItems = [];
        pIntents.innerHTML = `Intentos: ${intents}`;
    }
}

function hiddenCards({idCards, idItems}){
    document.getElementById(idCards[0]).style.visibility = "hidden";
    document.getElementById(idCards[1]).style.visibility = "hidden";
    document.getElementById(idItems[0]).classList.remove("item-hidden");
    document.getElementById(idItems[1]).classList.remove("item-hidden");
    document.getElementById(idItems[0]).setAttribute("class", "item");
    document.getElementById(idItems[1]).setAttribute("class", "item");
} 

btnReload.addEventListener("click", () => {
   location.reload();
});

