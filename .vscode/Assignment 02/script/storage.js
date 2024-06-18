"use strict";
let i = 1;
document.querySelector(`#sidebar`).addEventListener(`click`, function () {
  if (i === 1) {
    document.querySelector(`.active`).classList.add(`non-active`);
    document.querySelector(`.active`).classList.remove(`active`);
    i++;
  } else {
    document.querySelector(`.non-active`).classList.add(`active`);
    document.querySelector(`.non-active`).classList.remove(`non-active`);
    i--;
  }
});
