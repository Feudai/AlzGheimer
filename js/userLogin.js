import { getDatas } from "./storage.js";
import { connect, disconnect} from "./profile.js";
import { hideBtn } from "./display.js";


window.onload = init;

function init() {
    disconnect(false);

document.addEventListener("DOMContentLoaded", () => {
  hideBtn();
    document.getElementById("load").classList.remove("loading");
});
  //target el
  const $signupForm = document.getElementById("login-form");

  //listen
  $signupForm.addEventListener("submit", function (event) {
    event.preventDefault(); //prevent page refresh

    //get array
    let datas = getDatas("users");

    const $inputs = this.querySelectorAll("input");

    let user = {};
    let error = false;

    for (const input of $inputs) {
      switch (input.id) {
        case "email":
          if (datas.some((obj) => obj.email === input.value))
            user.email = input.value;
          else error = true;
          break;
        case "password":
          if (
            datas.some(
              (obj) => obj.password === input.value && obj.email === user.email
            )
          ){
          
            connect(user, "profile.html");
          }
          else error = true;
          break;
        default:
          console.error("TG WSH");
          break;
      }
    }

    //reset errors display
    const $err = document.querySelectorAll(".wrong");
    $err.forEach((e) => {
      e.className = "good";
    });

    //for display of errors
    if (error) {
      const $locateInput = document.getElementById("error");
      $locateInput.className = "wrong";
      user = null;
    }

    //reset the event
    this.reset();

    //focus
    this.querySelector("#email").focus();
  });

  //    const $inputs = this.querySelectorAll("input");
}
