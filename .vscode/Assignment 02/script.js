"use strict";
const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");
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
let data;
let a = 0;
let petArr;
let petArr2 = [];
//  khai báo biến
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}
function getFromStorage(key) {
  return localStorage.getItem(key);
}
//thời gian hiện tại
const time = new Date();
const date =
  time.getDate() + `/` + (time.getMonth() + 1) + `/` + time.getFullYear();
//  Hàm xóa phần tử của petArr
function del(arr) {
  if (confirm(`Are you sure?`)) {
    petArr2.splice(arr, 1);
    saveToStorage(`pet`, JSON.stringify(petArr2));
    petArr = JSON.parse(getFromStorage(`pet`));
    renderTableData();
  }
}
//  Hiển thị danh sách thú cưng
function renderTableData() {
  //  Xóa nội dung hiển thị bởi vòng lặp trước
  document.getElementById("tbody").innerHTML = "";
  //  vòng lặp in ra kết quả mới của petArr
  for (let i = 0; i < petArr.length; i++) {
    //
    const para = document.createElement(`tr`);
    if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
      para.classList.add(`healthy`);
    } else {
      para.classList.add(`unhealthy`);
    }
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
  <td>
    <button type="button" class="btn btn-danger" onclick="del(${i})">Delete</button>
  </td>
  `;
    document.getElementById(`tbody`).appendChild(para);
  }
}
//
if (JSON.parse(getFromStorage(`pet`)) !== null) {
  petArr = JSON.parse(getFromStorage(`pet`));
  petArr2 = petArr;
  renderTableData();
}
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
submitBtn.addEventListener(`click`, function () {
  //
  data = {
    id: idInput.value,
    pet_name: nameInput.value,
    age: ageInput.value,
    type: typeInput.value,
    breed: breedInput.value,
    weight: weightInput.value,
    length: lengthInput.value,
    color: colorInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };
  //yêu cầu input
  for (let i = 0; i < petArr2.length; i++) {
    if (data.id === petArr2[i].id) {
      alert(`Id has been used, Please input for id`);
      a++;
    }
  }
  if (data.id === ``) {
    alert(`Please input for id`);
    a++;
  }
  if (data.pet_name === ``) {
    alert(`Please input for pet name`);
    a++;
  }
  if (data.age > 15 || data.age < 1) {
    alert("Age must be between 1 and 15!");
    a++;
  }
  if (data.weight > 15 || data.weight < 1) {
    alert("Weight must be between 1 and 15!");
    a++;
  }
  if (data[`length`] > 100 || data[`length`] < 1) {
    alert("Length must be between 1 and 100!");
    a++;
  }
  if (data.type === `Select Type`) {
    alert("Please select Type!");
    a++;
  }
  if (data.breed === `Select Breed`) {
    alert("Please select Breed!");
    a++;
  }
  //điều kiện và reset
  if (a === 0) {
    petArr2.push(data); //thêm pet vào dữ liệu
    saveToStorage(`pet`, JSON.stringify(petArr2));
    petArr = JSON.parse(getFromStorage(`pet`));
    idInput.value = ``;
    nameInput.value = ``;
    ageInput.value = ``;
    typeInput.value = `Select Type`;
    weightInput.value = ``;
    lengthInput.value = ``;
    colorInput.value = `#000`;
    breedInput.value = `Select Breed`;
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;

    renderTableData();
  } else {
    a = 0;
  }
});
//

healthyBtn.addEventListener(`click`, function () {
  if (
    healthyBtn.textContent ===
    "\n                  Show Healthy Pet\n                "
  ) {
    for (let i = 0; i < petArr.length; i++) {
      document.querySelectorAll(`.unhealthy`)[i].classList.add(`hidden`);
    }
    healthyBtn.innerHTML = "\n                  Show All Pet\n                ";
  } else if (
    healthyBtn.textContent ===
    "\n                  Show All Pet\n                "
  ) {
    for (let i = 0; i < petArr.length; i++) {
      document.querySelectorAll(`.unhealthy`)[i].classList.remove(`hidden`);
    }
    healthyBtn.innerHTML =
      "\n                  Show Healthy Pet\n                ";
  }
});
