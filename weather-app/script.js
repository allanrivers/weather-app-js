// Input for search method
const state = document.getElementById("state");
let tempVal = true;
let cards = document.querySelectorAll('.cards');

// Fetch the data to send to showUI function
const fetchData = () => {
  fetch("jsonFiles/weather.json")
    .then((res) => res.json())
    .then((data) => showUI(data));
};

// Create the UI using fetched data
const showUI = (result) => {
  const resultsReceived = result.map((result) => {
    const outputTemp = () => {
      let morningTemp = Number(result.times[0].morning);
      let nightTemp = Number(result.times[0].night);

      if (tempVal) {
        if (morningTemp >= 60 && morningTemp < 80) {
          return `./partlycloudy.png`;
        } else if (morningTemp >= 80) {
          return `./sunny.png`;
        } else if (morningTemp < 60) {
          return `./windy.png`;
        }
      } else {
        if (nightTemp >= 60 && nightTemp < 80) {
          console.log("hello world");
          return `./partlycloudy.png`;
        } else if (nightTemp > 80) {
          return `./sunny.png`;
        } else if (nightTemp < 60) {
          return `./whitewind.png`;
        }
      }
    };
    outputTemp();
    let card = `<div class="card">
        <h1>${result.name}</h1>
        <img class="img" src=${outputTemp()} >
        <div class="temps">
            <h4 class="morningTemp">${result.times[0].morning}<sup>o</sup></h4>
            <h4 class="nightTemp">${result.times[0].night}<sup>o</sup></h4>
        <div>
    </div>`;
    document.querySelector(".cards").innerHTML += card;


    
});

        state.addEventListener("keyup", (e) => {
            const target = e.target.value.toLowerCase();
            let card = document.querySelectorAll('.card');
    
            for(let i = 0; i < card.length; i++) {
                if(card[i].firstElementChild.innerText.toLowerCase().indexOf(target) !== -1) {
                    card[i].style.display = 'block';
                }   else {
                    card[i].style.display = 'none';
                }
            }
    
            // if(document.querySelector(".cards").indexOf(target) !== -1) {
            //     console.log('hello world')
            // }
          });

  return resultsReceived;
};

fetchData();

// Change theme
const btnTheme = document.querySelector(".changeTheme");

// ChangeTempTheme function
const changeTempTheme = () => {
  // change tempVal boolean to the opposite
  tempVal = !tempVal;

  // Variable for card class
  const themeTemp = document.querySelectorAll(".card");
  // Morning CSS
  let morningCss =
    "background-color: #0093E9; background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%); color: #333; ";
  //Night CSS
  let nightCss =
    "background-color: #1f2a65; background-image: linear-gradient(180deg, #1f2a65 35%, #664e91 75%, #9461a1 89%); color: rgba(255,255,255,0.85); box-shadow: 1px 1px 2px 2px rgba(255, 255, 255, 0.5);";
  // Call temp variables
  let morningTempHTML = document.querySelectorAll(".morningTemp");
  let nightTempHTML = document.querySelectorAll(".nightTemp");

  // if tempVal is true then display morning, else display night
  if (tempVal) {
    for (let i = 0; i < themeTemp.length; i++) {
      themeTemp[i].setAttribute("style", morningCss);
      nightTempHTML[i].style.display = "none";
      morningTempHTML[i].style.display = "block";
    }
    document.getElementById("title").style.color = "black";
    document.body.style.backgroundImage = "url('../../morning.jpg')";
    btnTheme.innerText = "Check night temp";
    btnTheme.setAttribute("style", nightCss);
  } else {
    for (let i = 0; i < themeTemp.length; i++) {
      themeTemp[i].setAttribute("style", nightCss);
      nightTempHTML[i].style.display = "block";
      morningTempHTML[i].style.display = "none";
    }
    document.body.style.background =
      "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url('../../night.jpg')";
    document.getElementById("title").style.color = "white";
    btnTheme.innerText = "Check morning temp";
    btnTheme.setAttribute("style", morningCss);
  }
};

// Call event on click
btnTheme.addEventListener("click", changeTempTheme);
