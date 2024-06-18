"use strict";

const submitBtn = document.getElementById("submit-btn");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
let breedArr;
let breedArr2 = [];
let data;

let a = 0;
//
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}
function getFromStorage(key) {
  return localStorage.getItem(key);
}
//

//
function del(arr) {
  if (confirm(`Are you sure?`)) {
    breedArr2.splice(arr, 1);
    saveToStorage(`breed`, JSON.stringify(breedArr2));
    breedArr = JSON.parse(getFromStorage(`breed`));

    renderBreedData();
  }
}
//
function renderBreedData() {
  //  Xóa nội dung hiển thị bởi vòng lặp trước
  document.getElementById("tbody").innerHTML = "";
  //  vòng lặp in ra kết quả mới của petArr
  for (let i = 0; i < breedArr.length; i++) {
    //
    const para = document.createElement(`tr`);
    para.innerHTML = `
    <th scope="row">${i + 1}</th>
    <td>${breedArr[i].breed}</td>
    <td>${breedArr[i].type}</td>
    <td>
      <button type="button" class="btn btn-danger" onclick="del(${i})">Delete</button>
    </td>
    `;
    document.getElementById`tbody`.appendChild(para);
  }
}
//
if (JSON.parse(getFromStorage(`breed`)) !== null) {
  breedArr = JSON.parse(getFromStorage(`breed`));
  breedArr2 = breedArr;
  renderBreedData();
}
//
submitBtn.addEventListener(`click`, function () {
  data = {
    type: typeInput.value,
    breed: breedInput.value,
  };
  for (let i = 0; i < breedArr2.length; i++) {
    if (data.type == breedArr2[i].type) {
      console.log(breedArr2);
      if (data.breed == breedArr2[i].breed) {
        alert(`data has been used`);
        a++;
        console.log(breedArr2);
      }
    }
  }
  if (data.breed === `Select Breed`) {
    alert(`breed cannot be "Select Breed"`);
    a++;
  }
  if (data.breed === ``) {
    alert(`breed cannot be empty`);
  }
  if (data.type === `Select Type`) {
    alert(`type cannot be "Select Type"`);
    a++;
  }
  if (a === 0) {
    breedArr2.push(data); //thêm pet vào dữ liệu
    saveToStorage(`breed`, JSON.stringify(breedArr2));
    breedArr = JSON.parse(getFromStorage(`breed`));
    breedInput.value = ``;
    typeInput.value = `Select Type`;
    renderBreedData();
  } else {
    a = 0;
  }
});
