// Input for search method
const state = document.getElementById("state");

state.addEventListener("change", (e) => {
  const target = e.target.value;
});

// Fetch the data to send to showUI function
const fetchData = () => {
  fetch("jsonFiles/weather.json")
    .then((res) => res.json())
    .then((data) => showUI(data));
};

// Create the UI using fetched data
const showUI = (result) => {
  const resultsReceived = result.map((result) => {
    let card = `<div class="card">
        <h1>${result.name}</h1>
        <div class="temps">
            <h4 class="morningTemp">${result.times[0].morning}<sup>o</sup></h4>
            <h4 class="nightTemp">${result.times[0].night}<sup>o</sup></h4>
        <div>
    </div>`;
    document.querySelector(".cards").innerHTML += card;
  });

  return resultsReceived;
};

fetchData();

// Change theme
let tempVal = true;
const btnTheme = document.querySelector(".changeTheme");

// ChangeTempTheme function
const changeTempTheme = () => {
  // change tempVal boolean to the opposite
  tempVal = !tempVal;
  // Variable for card class
  const themeTemp = document.querySelectorAll(".card");
  let nightCss =
    "background-color: #1f2a65; background-image: linear-gradient(180deg, #1f2a65 35%, #664e91 75%, #9461a1 89%); color: white;";
  let morningCss =
    "background-color: #0093E9; background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%); color: #333;";
  let morningTempHTML = document.querySelectorAll('.morningTemp');
  let nightTempHTML = document.querySelectorAll('.nightTemp');

  // if tempVal is true then display morning, else display night
  if (tempVal) {
    for (let i = 0; i < themeTemp.length; i++) {
        themeTemp[i].setAttribute("style", morningCss);
        nightTempHTML[i].style.display = 'none';
        morningTempHTML[i].style.display = 'block';

    }
    btnTheme.innerText = "Check night temp";
    btnTheme.setAttribute("style", nightCss);
  } else {
    for (let i = 0; i < themeTemp.length; i++) {
        themeTemp[i].setAttribute("style", nightCss);
        nightTempHTML[i].style.display = 'block';
        morningTempHTML[i].style.display = 'none';
    }
    btnTheme.innerText = "Check morning temp";
    btnTheme.setAttribute("style", morningCss);
  }
};

// Call event on click
btnTheme.addEventListener("click", changeTempTheme);
