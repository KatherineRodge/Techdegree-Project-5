let imageHTML = null;
let info = null;
const gallery = document.getElementById('gallery');
//const imageContainer = document.querySelector(".card-img-container");
//const cardInfoContainer = document.querySelector(".card-info-container");

for(let i= 0; i<12; i++) {
//create card
gallery.innerHTML +=
  '<div class = "card">'
  + '<div class = "card-img-container">'

//send request to API for user Image
fetch('https://randomuser.me/api/')
  .then(response => response.json())
  .then(image => { imageHTML = getImageSource(image.results[0].picture.thumbnail)
                  let imageDiv = document.querySelectorAll('.card-img-container');
                  let currentImageDiv = imageDiv[i];
                  currentImageDiv.innerHTML = imageHTML;
  });

let cards = document.querySelectorAll('.card');
let currentCard = cards[i]
currentCard.innerHTML += '<div class="card-info-container">'

//send request to API to get user information
fetch('https://randomuser.me/api/')
  .then(response => response.json())
  .then(data => { info = getInfo((data.results[0].name.first),
                         (data.results[0].name.last),
                         (data.results[0].email),
                         (data.results[0].location.city),
                         (data.results[0].location.state));
                  let infoDiv = document.querySelectorAll('.card-info-container');
                  let currentInfo = infoDiv[i];
                  currentInfo.innerHTML = info;
   });
}

//image
function getImageSource(src) {
  const image = `<img class="card-img" src="${src}" alt="profile picture">`;
  return image;
}

//name, email, location
function getInfo(first, last, email, city, state) {
  const employeeInfo = `<h3 id="name" class="card-name cap">${first} ${last}</h3>
                        <p class="card-text">${email}</p>
                        <p class="card-text cap">${city}, ${state}</p>`;
  return employeeInfo;
}
