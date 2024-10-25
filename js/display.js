import { getDatas  } from "./storage.js";


function hideBtn() {
  let connected;
  const user = getDatas("user");

  if (user == "") connected = false;
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



export {hideBtn};