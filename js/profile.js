import { getDatas, removeData, setData } from "./storage.js";
import { hideBtn } from "./display.js";

document.addEventListener("DOMContentLoaded", () => {
  hideBtn();

  document.getElementById("load").classList.remove("loading");

  if (isCurrentPage("profile.html")) {
    greet();

    const user = getDatas("user");
    const users = getDatas("users");
    const data = getDatas("score");

    if (users[0] != undefined && user[0] != undefined)
      users.filter((obj) => obj.email === user.email);

    if (data[0] != undefined)
      data.filter((obj) => obj.pseudo === users[0].pseudo);

    const $scores = document.getElementById("scores");
    const scores = data[0].score;

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
      (scores[scores.length - 9] != undefined ? scores[scores.length - 9] : "");
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
