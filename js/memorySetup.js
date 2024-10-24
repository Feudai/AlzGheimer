//Pour cacher les cartes
function hideCards(index, tab) {
  tab[index] = false;
  return tab;
}

function randomCards(tab, nb, shuffles) {
  //Carte face cachée universelle
  tab.push(0);

  //boucle de remplissage du tableau
  for (let a = 1; a <= nb / 2; a++) {
    tab.push(a);
    tab.push(a);
  }

  //shuffle du tableau x (shuffle) fois

  for (let s = 0; s < shuffles; s++) {
    tab.forEach((element, index) => {
      if (index != 0) {
        let random = Math.floor(Math.random() * nb) + 1;
        let temp = element;
        tab[index] = tab[random];
        tab[random] = temp;
      }
    });
  }
  return tab;
}

//ainsi que des balises html img
function displayCards(tab, nb, tab_2, setup) {
  if (setup) {
    //fonction reset
    const $reset = document.getElementById("memory");
    $reset.replaceChildren();
  }

  for (let a = 1; a <= nb; a++) {
    if (setup) {
      //créer les cartes de 0
      const $card = document.createElement("div");
      const $memory = document.getElementById("memory");
      $card.className = "card";

      if (tab_2[a - 1])
        $card.innerHTML = `<img class="shown" id="card_${a}" src="" alt="" sizes="(max-width:768px) 75px, 115px" srcset="assets/images/${tab[a]}.jpg 375w, assets/images/${tab[a]}.jpg 775w"/>`;
      else
        $card.innerHTML = `<img class="hidden" id="card_${a}" src="" alt="" sizes="(max-width:768px) 75px, 115px" srcset="assets/images/${tab[0]}.jpg 375w, assets/images/${tab[0]}.jpg 775w"/>`;

      $memory.appendChild($card);
    } else {
      //in case exists, just modify the state
      //card is then only srcset
      let $card = document.getElementById(`card_${a}`);

      //check si hidden ou shown
      if (tab_2[a - 1]) {
        //then show it
        $card.className = "shown";
        setTimeout(() => {
          $card.setAttribute(
            "srcset",
            `assets/images/${tab[a]}.jpg 480w, assets/images/${tab[a]}.jpg 800w")`
          );

          //Pour le reload des images updatees
          const currentSrc = $card.srcset;
          $card.srcset = "";
          $card.srcset = currentSrc;
        }, 300);
      } else {
        //idem pour les hidden
        $card.className = "hidden";
        setTimeout(() => {
          $card.setAttribute(
            "srcset",
            `assets/images/${tab[0]}.jpg 480w, assets/images/${tab[0]}.jpg 800w")`
          );
          const currentSrc = $card.srcset;
          $card.srcset = "";
          $card.srcset = currentSrc;
        }, 300);
      }
    }
  }
}

export { randomCards, displayCards, hideCards };
