// Input for search method
const state = document.getElementById('state');

state.addEventListener('change', (e) => {
    const target = e.target.value;
})




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
            <h4 class="morningTemp">Morning: ${result.times[0].morning}</h4>
            <h4 class="nightTemp">Night: ${result.times[0].night}</h4>
        <div>
    </div>`;
    document.querySelector('.cards').innerHTML += card;
  });

  return resultsReceived;
};

fetchData();

// Change theme
let tempVal = true;
const btnTheme = document.querySelector('.changeTheme');

const changeTempTheme = () => {
    tempVal = !tempVal;
    const morningTemp = document.querySelectorAll('.card')
    if(tempVal) {
        for(let i = 0; i < morningTemp.length; i++) {
            morningTemp[i].setAttribute('style', 'background-color: #0093E9; background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);')
        }
        btnTheme.innerText = 'Check night';
    }   else {
        for(let i = 0; i < morningTemp.length; i++) {
            morningTemp[i].setAttribute('style', 'background-color: ##29049c; background-image: linear-gradient(180deg, #29049c 35%, #7618b1 60%, #b95aa3 89%); color: white;')
        }
        btnTheme.innerText = 'Check morning';
    }
}

btnTheme.addEventListener('click', changeTempTheme)



