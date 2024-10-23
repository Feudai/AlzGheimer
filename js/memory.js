
import { displayCards, hideCards, randomCards } from "./memory_setup.js";

let nb_cards = 24;
let cards = [];
let shown = new Array(nb_cards);
let flipped = [];
let times_shuffled = 100;

for(let a=0;a<nb_cards;a++)
shown = hideCards(a,shown);

cards = randomCards(cards, nb_cards, times_shuffled);

displayCards(cards, nb_cards, shown,true);

//écoute clicks
const $images = document.querySelectorAll('.grid div');

$images.forEach((img,index) => {
    img.addEventListener('click',()=>{
      shown = flip(index ,shown);

       displayCards(cards, nb_cards, shown,false);
       
    })
});




function flip(index,tab){
  
  //Pas plus que 2 cartes retournées
  if (!tab[index] && flipped.length < 2) {
    tab[index] = true;
    flipped.push(index); //+1 because of the card 0 being default pic
  }

  //si 2 cartes retournées
  if(flipped.length==2){
    checkSame(flipped,tab);
    flipped = [];
  }

  return tab;
}

//vérification de l'identicité des cartes
function checkSame(tab,tab_2){
  if(cards[tab[0]]===cards[tab[1]]){
    console.log("gagné " + cards[tab[0]] + "  " + cards[tab[1]]);
    
  }
  else {//tab_2[tab[0]]=false;
    //tab_2[tab[1 ]] = false;
    hideCards(tab[0],tab_2);
    hideCards(tab[1], tab_2);
  }
  
}

//transition fenetre de jeu


document.addEventListener("DOMContentLoaded", () => {
  const $banner = document.querySelector(".banner");
  $banner.classList.add("transition");

  const $frame = document.querySelector(".frame");
  $frame.classList.add("transition");

  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      if (
        !document.URL.includes("game.html") ||
        !link.href.includes("game.html")
      ) {
        // animation de sortie
        if ($banner.classList.contains("transition"))
          $banner.classList.remove("transition");
        else $banner.classList.add("transition");

        if ($frame.classList.contains("transition"))
          $frame.classList.remove("transition");
        else $frame.classList.add("transition");
        //timer pour animer avant le changement de page

        setTimeout(() => {
          window.location.href = link.href;
        }, 500);
      }
    });
  });
});



//Tests sur des img aléatoires d'un stockage online

//import { checkAllImages } from "./storage.js";

//const maxCases=30;

//console.log(checkAllImages("assets/images/"));

//let alt = alt_ != null ? alt_ : null; // mettre par défaut des images d'une seule banque

//adapt the src string for responsive

//   const $images = document.querySelectorAll(".pic");
//   for(let i of $images){

//     src=path+counter+".jpg";

//     if(!checkImageExists(src))break;

//     let srcset = src + " 480px, " + src + " 800px";
//     let jso = new Image();
//     jso.src=src;
//     console.log(JSON.stringify(jso));

//   i.setAttribute('srcset',srcset);
//   counter++;
//   }

//   function showImage(src){
//      let newDiv = document.createElement("div");
//     let newImg = document.createElement("img");

//     newDiv.setAttribute("class", "card");

//     newImg.setAttribute("class", "pic");
//     newImg.setAttribute("sizes", "(max-width:768px) 50px, 100px");
//     newImg.setAttribute("alt", "");
//     newImg.setAttribute("src", "");
//     newImg.setAttribute("srcset", src + " 480px, " + src + " 800px");

//   }

// export {maxCases,showImage};