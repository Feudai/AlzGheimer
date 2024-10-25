import { hideBtn } from "./display.js";
import { disconnect } from "./profile.js";

document.addEventListener("DOMContentLoaded", () => {
  hideBtn();
    document.getElementById("load").classList.remove("loading");
});

const $disco_button = document.getElementById("disconnect");

$disco_button.addEventListener("click", (e) => {
  disconnect();
});