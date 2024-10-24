import { getDatas, removeData, setData } from "./storage.js";

hideBtn();

const $disco_button = document.getElementById("disconnect");
const user = getDatas('user');
const data = getDatas('users');
data.filter((obj)=>obj.email===user.email);

const pseudo=data[0].pseudo;
const email = data[0].email;

const $greeting = document.getElementById("bonjour");
$greeting.innerText = "Salam mon khoya "+pseudo+" !";

const $displayEmail = document.getElementById("email");
$displayEmail.innerText = "Ton méga email c'est " + email + " et faut avouer que ça claque ! UwU";






$disco_button.addEventListener("click", (e) => {
  disconnect();
});





function connect(usr, link) {
  setData("user", usr);
  window.location.href = link;
}

function disconnect() {
  removeData("user");
}

function hideBtn() {
  let connected;
  const user = getDatas("user");

  if (user == '') connected = false;
  else connected = true;

  if (!connected) {
    const $login = document.getElementById("login");
    const $register = document.getElementById("register");
    $login.className = "";
    $register.className = "";

    const $profile = document.getElementById("profile");
    const $disconnect = document.getElementById("disconnect");
    $profile.className = "obsolete";
    $disconnect.className = "obsolete";
  } else {
    const $login = document.getElementById("login");
    const $register = document.getElementById("register");
    $login.className = "obsolete";
    $register.className = "obsolete";

    const $profile = document.getElementById("profile");
    const $disconnect = document.getElementById("disconnect");
    $profile.className = "";
    $disconnect.className = "";
  }
}

export { connect, disconnect, hideBtn };
