let info = null;
let cardData = [];
const searchDiv = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');
let body = document.getElementsByTagName('body');
body = body[0];
let num = 0;

function returnNum(number){
  return number;
}

//https://plainjs.com/javascript/manipulation/insert-an-element-after-or-before-another-32/
function insertAfter(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}

//Search Form
const searchForm = document.createElement("form");
searchForm.setAttribute("action", "#");
searchForm.setAttribute("method", "get");
searchDiv.appendChild(searchForm);
const inputText = document.createElement("input");
inputText.setAttribute("type", "search");
inputText.setAttribute("id", "search-input");
inputText.setAttribute("class", "search-input");
inputText.setAttribute("placeholder", "Search...");
const inputSubmit = document.createElement("input");
inputSubmit.setAttribute("type", "submit");
inputSubmit.setAttribute("value", "submit");
inputSubmit.setAttribute("class", "search-submit");
inputSubmit.setAttribute("id", "search-submit");
searchForm.appendChild(inputText);
searchForm.appendChild(inputSubmit);




for(let i= 0; i<12; i++) {

gallery.innerHTML += `<div class = "card">`
//send request to API to get user information
fetch('https://randomuser.me/api/')
  .then(response => response.json())
  .then(data => { info = getInfo((data.results[0].picture.thumbnail),
                         (data.results[0].name.first),
                         (data.results[0].name.last),
                         (data.results[0].email),
                         (data.results[0].location.city),
                         (data.results[0].location.state));
                  let infoDiv = document.querySelectorAll('.card');
                  console.log(data);
                  let currentInfo = infoDiv[i];
                  currentInfo.innerHTML += info;
                  cardData.push(data);
                  });

};

//creates card for each employee
//image, name, email, location
function getInfo(src, first, last, email, city, state) {
  const employeeInfo = `<div class = "card-img-container">
                        <img class="card-img" src="${src}" alt="profile picture">
                        </div>
                        <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${first} ${last}</h3>
                        <p class="card-text">${email}</p>
                        <p class="card-text cap">${city}, ${state}</p>
                        </div>`
  return employeeInfo;
}

//modal markup
const modalContainer = document.createElement("div");
  modalContainer.className = "modal-container";
const modal = document.createElement("div");
  modal.className = "modal"
let modalInfoContainer = document.createElement("div");
  modalInfoContainer.className = "modal-info-container";

//exit button
const modalX = document.createElement("button");
  modalX.setAttribute("type", "button");
  modalX.setAttribute("class", "modal-close-btn");
  modalX.setAttribute("id", "modal-close-btn");
  modalX.innerHTML = '<strong>X</strong>';

//prev and next buttons
const modalButtonContainer = document.createElement("div");
  modalButtonContainer.className = "modal-btn-container";
const prevButton = document.createElement("button");
  prevButton.setAttribute("type", "button");
  prevButton.setAttribute("class", "modal-prev btn");
  prevButton.setAttribute("id", "modal-prev");
  prevButton.innerHTML = 'Prev';
const nextButton = document.createElement("button");
  nextButton.setAttribute("type", "button");
  nextButton.setAttribute("class", "modal-prev btn");
  nextButton.setAttribute("id", "modal-prev");
  nextButton.innerHTML = 'Next';

insertAfter(modalContainer, gallery);
modalContainer.appendChild(modal);
modal.appendChild(modalX);
modalButtonContainer.appendChild(prevButton);
modalButtonContainer.appendChild(nextButton);
modalContainer.style.display = "none";

//function to call modal information
function modalInfo(src, first, last, email, city, state, phone, street, postcode, birthday) {
const containerInfo = `
    <img class="modal-img" src=${src} alt="profile picture">
    <h3 id="name" class="modal-name cap">${first} ${last}</h3>
    <p class="modal-text">${email}</p>
    <p class="modal-text cap">${city}, ${state}</p>
    <hr>
    <p class="modal-text">${phone}</p>
    <p class="modal-text">${street}, ${city} ${state}, ${postcode}</p>
    <p class="modal-text">${birthday}</p>
    `;
return containerInfo;
}

let cards = document.querySelectorAll('.card');
for (let h = 0; h < 12; h++) {

  cards[h].addEventListener("click", function() {
    num = returnNum(h);
    modalContainer.style.display = "block";
//function to fetch modal data on click event
    let modalHTML =  modalInfo(
      (cardData[num].results[0].picture.thumbnail),
      (cardData[num].results[0].name.first),
      (cardData[num].results[0].name.last),
      (cardData[num].results[0].email),
      (cardData[num].results[0].location.city),
      (cardData[num].results[0].location.state),
      (cardData[num].results[0].cell),
      (cardData[num].results[0].location.street),
      (cardData[num].results[0].location.postcode),
      (cardData[num].results[0].dob.date));
    modal.appendChild(modalInfoContainer);
    modalInfoContainer.innerHTML = modalHTML;
    modal.appendChild(modalButtonContainer);
});

nextButton.onclick = function() {
console.log(num);
num += 1;

if (num > 11) {
  this.disabled = true;
  prevButton.disabled = false;
  num = num;
} else {
this.disabled = false;
let modalHTML =  modalInfo(
    (cardData[num].results[0].picture.thumbnail),
    (cardData[num].results[0].name.first),
    (cardData[num].results[0].name.last),
    (cardData[num].results[0].email),
    (cardData[num].results[0].location.city),
    (cardData[num].results[0].location.state),
    (cardData[num].results[0].cell),
    (cardData[num].results[0].location.street),
    (cardData[num].results[0].location.postcode),
    (cardData[num].results[0].dob.date));
modalInfoContainer.innerHTML = modalHTML;
}

}

prevButton.onclick = function() {
  console.log(num);
  num--;
if (num < 0) {
  this.disabled = true;
  nextButton.disabled = false;
} else {
this.disabled = false;
let modalHTML =  modalInfo(
    (cardData[num].results[0].picture.thumbnail),
    (cardData[num].results[0].name.first),
    (cardData[num].results[0].name.last),
    (cardData[num].results[0].email),
    (cardData[num].results[0].location.city),
    (cardData[num].results[0].location.state),
    (cardData[num].results[0].cell),
    (cardData[num].results[0].location.street),
    (cardData[num].results[0].location.postcode),
    (cardData[num].results[0].dob.date));
modalInfoContainer.innerHTML = modalHTML;
}
}
};

modalX.addEventListener("click", function() {
  modalContainer.style.display = "none";
  modalInfoContainer = document.querySelector(".modal-info-container");
  modalInfoContainer.remove();
})
