import { passwordValidator } from "./passwordValidator.js";
import { emailValidator } from "./emailValidator.js";
import { pseudoValidator } from "./pseudoValidator.js";
import { getDatas, setData } from "./storage.js";
import { hideBtn } from "./profile.js";

window.onload = init;

function init() {

  hideBtn();
  //target el
  const $signupForm = document.getElementById("signup-form");

  //listen
  $signupForm.addEventListener("submit", function (event) {
    event.preventDefault(); //prevent page refresh

    //get array
    let datas = getDatas("users");

    const $inputs = this.querySelectorAll("input");

    let user = {};
    let errors = [];
    let error = "";

    for (const input of $inputs) {
      switch (input.id) {
        case "email":
          if (emailValidator(input.value)) user.email = input.value;
          else error = "emailError";
          break;
        case "pseudo":
          if (pseudoValidator(input.value)) user.pseudo = input.value;
          else error = "pseudoError";
          break;
        case "password":
          if (passwordValidator(input.value)) user.password = input.value;
          else error = "passwordError";
          break;
        default:
          console.error("TG WSH");
          break;
      }
      //gestion erreurs

      if (error !== "") errors.push({ name: error, el: input });
    }

    const $err = document.querySelectorAll(".wrong");
    $err.forEach((e) => {
      e.className = "good";
    });

    errors.forEach((err) => {
      err.el.className = "error";
      const $locateInput = document.getElementById(err.name);
      $locateInput.className = "wrong";
    });
    //si null, pas de setData
    if (errors.length > 0) user = null;
    //already existant email
    else if (datas.some((obj) => obj.email === user.email)) {
      user = null;
      window.location.href = "login.html";
    }
    //pseudo already taken
    else if (datas.some((obj) => obj.pseudo === user.pseudo)) {
      const $duplicate = document.getElementById("pseudoTaken");
      $duplicate.className = "wrong";
      user = null;
    }
    //reussite

    //null user check goes in setData function
    setData("users", user);
    window.location.href = "login.html";

    //reset the event
    this.reset();

    //focus
    this.querySelector("#email").focus();
  });

  //    const $inputs = this.querySelectorAll("input");
}
