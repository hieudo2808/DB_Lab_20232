"use strict";

const findBtn = document.getElementById("find-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
//
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}
function getFromStorage(key) {
  return localStorage.getItem(key);
}
//  khai báo biếnlet data;
let a = 0;
let data;
let petArr;
let petArr2 = JSON.parse(getFromStorage(`pet`));
let searchArr;

//thời gian hiện tại
const time = new Date();
const date =
  time.getDate() + `/` + (time.getMonth() + 1) + `/` + time.getFullYear();
//  Hàm xóa phần tử của petArr
function edit(arr) {
  document.getElementById(`container-form`).classList.remove(`hide`);
  idInput.value = `${petArr[arr].id}`;
  nameInput.value = `${petArr[arr].pet_name}`;
  ageInput.value = `${petArr[arr].age}`;
  weightInput.value = `${petArr[arr].weight}`;
  lengthInput.value = `${petArr[arr].length}`;
  vaccinatedInput.checked = petArr[arr].vaccinated;
  dewormedInput.checked = petArr[arr].dewormed;
  sterilizedInput.checked = petArr[arr].sterilized;
  //
} //  Hiển thị danh sách thú cưng
function renderTableData() {
  //  Xóa nội dung hiển thị bởi vòng lặp trước
  document.getElementById("tbody").innerHTML = "";
  //  vòng lặp in ra kết quả mới của petArr
  for (let i = 0; i < petArr.length; i++) {
    //
    const para = document.createElement(`tr`);
    para.innerHTML = `
  <th scope="row">${petArr[i].id}</th>
  <td>${petArr[i].pet_name}</td>
  <td>${petArr[i].age}</td> 
  <td>${petArr[i].type}</td>
  <td>${petArr[i].weight} kg</td>
  <td>${petArr[i].length} cm</td>
  <td>${petArr[i].breed}</td>
  <td>
    <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
  </td>
  <td><i class="bi ${
    petArr[i].vaccinated ? `bi-check-circle-fill` : `bi-x-circle-fill`
  }"></i></td>
  <td><i class="bi ${
    petArr[i].dewormed ? `bi-check-circle-fill` : `bi-x-circle-fill`
  }"></i></td>
  <td><i class="bi ${
    petArr[i].sterilized ? `bi-check-circle-fill` : `bi-x-circle-fill`
  }"></i></td>
  <td>${date}</td>
  `;
    document.getElementById(`tbody`).appendChild(para);
  }
}
//
//hiện breed
//
function breedForType() {
  let x = document.getElementById(`input-type`).value;
  let breedI = JSON.parse(getFromStorage(`breed`));
  if (x === `Cat`) {
    //
    const filterCat = breedI.filter(function (type) {
      return type.type === `Cat`;
    });
    document.getElementById("input-breed").innerHTML = ``;
    //
    const select = document.createElement(`option`);
    select.innerHTML = `Select Breed`;
    document.getElementById(`input-breed`).appendChild(select);
    //
    for (let i = 0; i < filterCat.length; i++) {
      const brInput = document.createElement(`option`);
      brInput.innerHTML = `
  ${filterCat[i].breed}`;
      document.getElementById(`input-breed`).appendChild(brInput);
    }
  }
  //
  else if (x === `Dog`) {
    //
    const filterDog = breedI.filter(function (type) {
      console.log(type.type);
      return type.type === `Dog`;
    });
    document.getElementById("input-breed").innerHTML = ``;
    //
    const select = document.createElement(`option`);
    select.innerHTML = `Select Breed`;
    document.getElementById(`input-breed`).appendChild(select);
    //
    for (let i = 0; i < filterDog.length; i++) {
      const brInput = document.createElement(`option`);
      brInput.innerHTML = `
  ${filterDog[i].breed}`;
      document.getElementById(`input-breed`).appendChild(brInput);
    }
  } else if (x === `Select Type`) {
    document.getElementById("input-breed").innerHTML = ``;
    //
    const select = document.createElement(`option`);
    select.innerHTML = `Please select type before choosing breed`;
    document.getElementById(`input-breed`).appendChild(select);
  }
}
//
//
findBtn.addEventListener(`click`, function () {
  //
  data = {
    id: idInput.value,
    pet_name: nameInput.value,
    type: typeInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };
  petArr = petArr2.filter(function (mov) {
    return (
      (mov.id.includes(data.id), mov.pet_name.includes(data.pet_name)) &&
      (data.type === `Select Type` ? true : mov.type.includes(data.type)) &&
      (data.breed === `Select Breed` ? true : mov.breed.includes(data.breed)) &&
      (data.vaccinated === false ? true : mov.vaccinated === true) &&
      (data.dewormed === false ? true : mov.dewormed === true) &&
      (data.sterilized === false ? true : mov.sterilized === true)
    );
  });
  renderTableData();
});
