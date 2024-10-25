import { getDatas, removeData, setData } from "./storage.js";
import { hideBtn } from "./display.js";


document.addEventListener("DOMContentLoaded", () => {
  hideBtn();

    document.getElementById("load").classList.remove("loading");

    if(isCurrentPage('profile.html'))greet();

    
  const data = getDatas("score");

const $scores = document.getElementById("scores");
$scores.innerText(
  "Scores : " +
    data[1] +
    ", " +
    data[2] +
    ", " +
    data[3] +
    ", " +
    data[4] +
    ", " +
    data[5] +
    ", " +
    data[6] +
    ", " +
    data[7] +
    ", " +
    data[8] +
    ", " +
    data[9] +
    ", "
);

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
  if(redirect)
    window.location.href = "login.html";
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
    if(gridVal!=null)$grid.value=gridVal;

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
