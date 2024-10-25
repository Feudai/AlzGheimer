import { displayCards, hideCards, randomCards } from "./memorySetup.js";
import { hideBtn } from "./display.js";
import { disconnect } from "./profile.js";
import { getDatas, setData } from "./storage.js";

let nb_cards = 24;
let cards = [];
let shown = new Array(nb_cards);
let flipped = [];
let times_shuffled = 100;
let score = 0;
let enableClick = true;

const user = getDatas("user");
const data = getDatas("users");

if (data[0] != undefined && user[0] != undefined) {
  data.filter((obj) => obj.email === user.email);

  const grid = data[0].grille;
  const $grille = document.getElementById("memory");

  if (grid == "6x4") {
    nb_cards = 24;
    $grille.className = "grid-6x4";
  } else if (grid == "5x4") {
    nb_cards = 20;
    $grille.className = "grid-5x4";
    console.log($grille);
  } else if (grid == "4x4") {
    nb_cards = 16;
    $grille.className = "grid-4x4";
  } else {
    nb_cards = 12;
    $grille.className = "grid-4x3";
  }
}

//filling hidden cards
for (let a = 0; a < nb_cards; a++) shown = hideCards(a, shown);

//Shuffling
cards = randomCards(cards, nb_cards, times_shuffled);

//first display
displayCards(cards, nb_cards, shown, true);

clickCards();

spaceReset();

const $score = document.getElementsByClassName("score");
$score.innerText = "Sacre d'sacre !";

//Fonctions

//écoute clicks
function clickCards() {
  let $images = document.querySelectorAll(".grid-6x4 div");
  if ($images.length == 0) $images = document.querySelectorAll(".grid-5x4 div");

  if ($images.length == 0) $images = document.querySelectorAll(".grid-4x4 div");
  if ($images.length == 0) $images = document.querySelectorAll(".grid-4x3 div");

  $images.forEach((img, index) => {
    img.addEventListener("click", () => {
      if (enableClick) {
        shown = flip(index, shown);
        displayCards(cards, nb_cards, shown, false);
      }
    });
  });
}

//Fonction de flip des cartes

function flip(index, tab) {
  //Pas plus que 2 cartes retournées
  if (!tab[index] && flipped.length < 2) {
    tab[index] = true;
    flipped.push(index + 1); //+1 because of the card 0 being default pic
  }

  //si 2 cartes retournées
  if (flipped.length == 2) {
    tab[index] = true;
    //On regarde si elles sont idedntiques
    enableClick = false;
    checkSame(flipped, tab);
    flipped = [];

    //Incrementation du nombre de tours
    score++;
  }
  return tab;
}

//Reset par le barre espace
function spaceReset() {
  document.addEventListener("keypress", (e) => {
    if (e.code === "Space") {
      //empeche le defilement
      e.preventDefault();
      resetGame();
    }
  });
}

//vérification de l'identicité des cartes
function checkSame(tab, tab_2) {
  if (cards[tab[0]] === cards[tab[1]]) {
    //Decrementation = meilleur score final
    score--;
    checkWin();
    enableClick = true;
  } else {
    //Timer pour affichage des cartes synchronise avec la rotation
    setTimeout(() => {
      hideCards(tab[0] - 1, tab_2);
      hideCards(tab[1] - 1, tab_2);
      displayCards(cards, nb_cards, shown, false);
      enableClick = true;
    }, 1000);
  }
}

function resetGame() {
  score = 0;
  shown.fill(false);
  cards = [];
  cards = randomCards(cards, nb_cards, times_shuffled);
  displayCards(cards, nb_cards, shown, true);
  clickCards();
}

function checkWin() {
  if (!shown.includes(false)) {
    let final_score = 100 - score * 3;
    if (final_score < 0) final_score = 0;
    console.log("gagné ! Score: " + final_score);
    $score.innerText = "Score : " + final_score;

    const user = getDatas("user");
    const data = getDatas("users");
    let entry = {};

    if (data[0] != undefined && user[0] != undefined) {
      data.filter((obj) => obj.email === user.email);
    }
    const past = getDatas("score");
    if (past[0] == undefined) {
      entry.pseudo = data[0].pseudo;
      entry.score = [];
      entry.score.push(final_score);
    } else {
      past.filter((obj) => obj.pseudo === data[0].pseudo);

      past.push(final_score);
    }
    setData("score", past);
  }
}

//transition fenetre de jeu

document.addEventListener("DOMContentLoaded", () => {
  const $disco_button = document.getElementById("disconnect");

  const $banner = document.querySelector(".banner");
  $banner.classList.add("transition");

  const $frame = document.querySelector(".frame");
  $frame.classList.add("transition");

  if ($disco_button) {
    const newButton = $disco_button.cloneNode(true);
    $disco_button.parentNode.replaceChild(newButton, $disco_button);

    // nouveau listener car sinon conflit
    newButton.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      console.log("Début déconnexion");
      // on desactive le boutton
      newButton.disabled = true;

      if ($banner.classList.contains("transition"))
        $banner.classList.remove("transition");
      else $banner.classList.add("transition");

      if ($frame.classList.contains("transition"))
        $frame.classList.remove("transition");
      else $frame.classList.add("transition");

      setTimeout(() => {
        console.log("Déconnexion...");
        disconnect(true);
      }, 500);
    });
  }

  hideBtn();
  document.getElementById("load").classList.remove("loading");

  document.querySelectorAll("a:not(#disconnect)").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      //Condition de non sortie de la page game vers la page game
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
