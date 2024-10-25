import { getDatas, removeData, setData } from "./storage.js";
import { hideBtn } from "./display.js";

document.addEventListener("DOMContentLoaded", () => {
  hideBtn();

  document.getElementById("load").classList.remove("loading");

  if (isCurrentPage("profile.html")) {
    greet();

    const user = getDatas("user");
    let users = getDatas("users");
    let data = getDatas("score");

    //for perso scores
    if (users[0] != undefined && user[0] != undefined)
      users = users.filter((obj) => obj.email === user[0].email);

    if (data[0] != undefined) {
      data = data.filter((obj) => obj.pseudo === users[0].pseudo);
      if (data[0] != undefined) {
        const scores = data[0].score;

        const pseudoTemp = data[0].pseudo;
        removeData("score");

        for (let a = 0; a < 200; a++) {
          scores.forEach((element, index) => {
            let temp;
            if (index != 0)
              if (scores[index - 1] > element) {
                temp = element;
                scores[index] = scores[index - 1];
                scores[index - 1] = temp;
              }
          });
        }

        const obj = {};
        obj.pseudo = pseudoTemp;
        obj.score = scores;
        setData("score", obj);
      }
    }

    let bestScores = [];
    let bestPlayers = [];
    removeData("best");

    //for everyone
    users = getDatas("users");
    data = getDatas("score");

    if (users[0] != undefined && user[0] != undefined)
      users = users.filter((obj) => obj.email === user[0].email);
    if (users[0] != undefined && user[0] != undefined)
      if (data[0] != undefined) {
        data.filter((obj) => obj.pseudo === users[0].pseudo);

        const scores = data[0].score;
        
        const $scores = document.getElementById("scores");

        $scores.innerText =
          "Scores : " +
          (scores[scores.length] != undefined
            ? scores[scores.length] + " | "
            : "") +
          (scores[scores.length - 1] != undefined
            ? scores[scores.length - 1] + " | "
            : "") +
          (scores[scores.length - 2] != undefined
            ? scores[scores.length - 2] + " | "
            : "") +
          (scores[scores.length - 3] != undefined
            ? scores[scores.length - 3] + " | "
            : "") +
          (scores[scores.length - 4] != undefined
            ? scores[scores.length - 4] + " | "
            : "") +
          (scores[scores.length - 5] != undefined
            ? scores[scores.length - 5] + " | "
            : "") +
          (scores[scores.length - 6] != undefined
            ? scores[scores.length - 6] + " | "
            : "") +
          (scores[scores.length - 7] != undefined
            ? scores[scores.length - 7] + " | "
            : "") +
          (scores[scores.length - 8] != undefined
            ? scores[scores.length - 8] + " | "
            : "") +
          (scores[scores.length - 9] != undefined
            ? scores[scores.length - 9]
            : "");

        data = getDatas("score");

        users.forEach((el, i) => {
          data.filter((obj) => obj.pseudo === users[i].pseudo);
          bestScores.push(data[0].score[data[0].score.length - 1]);
          bestPlayers.push(data[0].pseudo);
        });

        for (let a = 0; a < 200; a++) {
          bestScores.forEach((element, index) => {
            let temp;
            let temp2;
            if (index != 0)
              if (bestScores[index - 1] > element) {
                temp = element;
                temp2 = bestPlayers[index];

                bestScores[index] = bestScores[index - 1];
                bestPlayers[index] = bestPlayers[index - 1];

                bestScores[index - 1] = temp;
                bestPlayers[index - 1] = temp2;
              }
          });
        }

        for (let b = 0; b < 10; b++) {
          const obj = {};
          obj.pseudo = bestPlayers[b];
          obj.score = bestScores[b];
          setData("best", obj);
        }

        const best = getDatas("best");

        const $bestScores_1 = document.getElementById("bestScore");
        const $bestScores_2 = document.getElementById("bestScore_2");
        const $bestScores_3 = document.getElementById("bestScore_3");
        const $bestScores_4 = document.getElementById("bestScore_4");
        const $bestScores_5 = document.getElementById("bestScore_5");

        $bestScores_1.innerText =
          (best[0].pseudo != undefined
            ? best[0].pseudo + " : " + best[0].score + " | "
            : "") +
          (best[1].pseudo != undefined
            ? best[1].pseudo + " : " + best[1].score + " | "
            : "");
        $bestScores_2.innerText =
          (best[2].pseudo != undefined
            ? best[2].pseudo + " : " + best[2].score + " | "
            : "") +
          (best[3].pseudo != undefined
            ? best[3].pseudo + " : " + best[3].score + " | "
            : "");
        $bestScores_3.innerText =
          (best[4].pseudo != undefined
            ? best[4].pseudo + " : " + best[4].score + " | "
            : "") +
          (best[5].pseudo != undefined
            ? best[5].pseudo + " : " + best[5].score + " | "
            : "");
        $bestScores_4.innerText =
          (best[6].pseudo != undefined
            ? best[6].pseudo + " : " + best[6].score + " | "
            : "") +
          (best[7].pseudo != undefined
            ? best[7].pseudo + " : " + best[7].score + " | "
            : "");
        $bestScores_5.innerText =
          (best[8].pseudo != undefined
            ? best[8].pseudo + " : " + best[8].score + " | "
            : "") +
          (best[9].pseudo != undefined
            ? best[9].pseudo + " : " + best[9].score
            : "");
      }
  }
});

const $disco_button = document.getElementById("disconnect");

$disco_button.addEventListener("click", (e) => {
  disconnect(true);
});

function isCurrentPage(pageName) {
  return window.location.pathname.endsWith(pageName);
}

function connect(usr, link) {
  setData("user", usr);
  hideBtn();
  window.location.href = link;
}

function disconnect(redirect) {
  removeData("user");
  if (redirect) window.location.href = "login.html";
}

function greet() {
  const user = getDatas("user");
  const data = getDatas("users");

  if (data[0] != undefined && user[0] != undefined) {
    data.filter((obj) => obj.email === user.email);

    const pseudo = data[0].pseudo;
    const email = data[0].email;

    const gridVal = data[0].grille;
    const $grid = document.getElementById("grille");
    if (gridVal != null) $grid.value = gridVal;

    if ($grid != null) {
      const choix = $grid.value;

      setData("users", choix, "grille");

      $grid.addEventListener("click", (e) => {
        const choix = $grid.value;
        setData("users", choix, "grille");
      });
    }

    const $greeting = document.getElementById("bonjour");

    $greeting.innerText = "Salam mon khoya " + pseudo + " !";

    const $displayEmail = document.getElementById("emailDisplay");
    $displayEmail.innerText =
      "Ton méga email c'est " + email + " et faut avouer que ça claque ! UwU";
  }
}

export { connect, disconnect, hideBtn };
