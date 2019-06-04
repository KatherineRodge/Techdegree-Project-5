//Variables
const allKeyboardKeysRegex = /^[a-zA-Z0-9~`!@#\$%\^&\*\(\)_\-\+={\[\}\]\|\\:;"'<,>\.\?\/  ]*$/;
const searchDiv = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');
let body = document.getElementsByTagName('body');
body = body[0];
let info = null;
let cardData = [];
let num = 0;
let emptyCard = [];
let searchCards = [];
let searchCardLength = 0;
let searchCardElement = null;
let nextNum = 0;

//functions
function returnNum(number){
  return number;
}

//https://plainjs.com/javascript/manipulation/insert-an-element-after-or-before-another-32/
function insertAfter(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}

//calls all aspects of the modal data
function returnModalData(numData) {
  return modalHTML =  modalInfo(
    (cardData[0].results[numData].picture.thumbnail),
    (cardData[0].results[numData].name.first),
    (cardData[0].results[numData].name.last),
    (cardData[0].results[numData].email),
    (cardData[0].results[numData].location.city),
    (cardData[0].results[numData].location.state),
    (cardData[0].results[numData].cell),
    (cardData[0].results[numData].location.street),
    (cardData[0].results[numData].location.postcode));
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

//input form
inputSubmit.addEventListener("click", function(){
searchCards = [];
let cardName = document.querySelectorAll("#name");
let inputValue = document.querySelector("#search-input").value;
inputValue = inputValue.toLowerCase();

//check input
for(let k = 0; k < cardName.length; k++){
var regExInput = new RegExp(inputValue);
var regExArray = (cardName[k].textContent.match(regExInput));
  if(regExArray === null) {
    card[k].style.display = 'none';
  } else {
    card[k].style.display = 'flex';
    searchCards.push(k);
  }
}
})

//creates 12 cards
for(let a = 0; a < 12; a++) {
    gallery.innerHTML += `<div class = "card">`
};

let card = document.querySelectorAll(".card");

//function to create fetch API request to gather data
//also only returns employees with names with english caracters to work with the search bar
function getData(){
  fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(response => response.json())
    .then(data => { for (num = 0; num < card.length; num++){
                             info =  getInfo((data.results[num].picture.thumbnail),
                             (data.results[num].name.first),
                             (data.results[num].name.last),
                             (data.results[num].email),
                             (data.results[num].location.city),
                             (data.results[num].location.state));
                           let currentInfo = card[num];
                           currentInfo.innerHTML += info;
                           searchCards.push(num);
                           };
    cardData.push(data);
});
};

getData();

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
function modalInfo(src, first, last, email, city, state, phone, street, postcode) {
const containerInfo = `
    <img class="modal-img" src=${src} alt="profile picture">
    <h3 id="name" class="modal-name cap">${first} ${last}</h3>
    <p class="modal-text">${email}</p>
    <p class="modal-text cap">${city}, ${state}</p>
    <hr>
    <p class="modal-text">${phone}</p>
    <p class="modal-text">${street}, ${city} ${state}, ${postcode}</p>
    `;
return containerInfo;
}

//click card to bring up more information on employee
for (let h = 0; h < 12; h++) {
    card[h].addEventListener("click", function() {
      num = returnNum(h);
      modalContainer.style.display = "flex";

//function to fetch modal data on click event
      modalHTML = returnModalData(num);
      modal.appendChild(modalInfoContainer);
      modalInfoContainer.innerHTML = modalHTML;
      modal.appendChild(modalButtonContainer);

      if (searchCards.length === 12){
        nextNum = 1;
      } else {
      nextNum = searchCards.indexOf(num);
      }
});
};

//next button functionality on modal
nextButton.addEventListener("click", function(){
searchCardLength = searchCards.length;
if (num === 11 || nextNum === (searchCardLength - 1)) {
  this.disabled = true;
  prevButton.disabled = false;
} else if (searchCards.length < 12) {
  nextNum++;
  searchCardElement = searchCards[nextNum]
  this.disabled = false;
  prevButton.disabled = false;
  modalHTML = returnModalData(searchCardElement);
  modalInfoContainer.innerHTML = modalHTML;
} else {
  num++;
  this.disabled = false;
  prevButton.disabled = false;
  modalHTML = returnModalData(num);
  modalInfoContainer.innerHTML = modalHTML;
}
});

//previous button functionality on modal
prevButton.addEventListener("click", function() {
if (num === 0 || nextNum === 0) {
    this.disabled = true;
    nextButton.disabled = false;
} else if (searchCards.length < 12) {
    nextNum--;
    searchCardElement = searchCards[nextNum]
    this.disabled = false;
    nextButton.disabled = false;
    modalHTML = returnModalData(searchCardElement);
    modalInfoContainer.innerHTML = modalHTML;
} else {
    num--;
    this.disabled = false;
    nextButton.disabled = false;
    modalHTML = returnModalData(num);
    modalInfoContainer.innerHTML = modalHTML;
  }
});

//close modal
modalX.addEventListener("click", function() {
    modalContainer.style.display = "none";
    modalInfoContainer = document.querySelector(".modal-info-container");
    modalInfoContainer.remove();
    num = 0;
    nextButton.disabled = false;
    prevButton.disabled = false;
})
