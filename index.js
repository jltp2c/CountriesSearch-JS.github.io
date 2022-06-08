// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all) ok 

// 2 - Créer une fonction pour "fetcher" les données, afficher les données dans la console. ok

// 3 - Passer les données à une variable ok

// 4 - Créer une fonction d'affichage, et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP

// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données
//country.name.includes(inputSearch.value);

// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays
const countriesContainer = document.querySelector(".countries-container");
const inputRange= document.getElementById("inputRange");
const inputSearch= document.getElementById("inputSearch");
const range = document.getElementById("inputRange");
const rangeDisplay = document.getElementById("rangeValue");
const btnS = document.querySelectorAll(".btnSort")
let countriesData = [];
let btnSort = "";


async function fetchCountries(){
    await fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => countriesData = data);
    countriesDisplay();
};

function countriesDisplay(){
    countriesContainer.innerHTML = countriesData
    .slice(0, range.value)
    .filter((country) => country.translations.fra.common.includes(inputSearch.value))
    .sort((a,b) =>{
    if (btnSort === "maxToMin"){
        return b.population-a.population
    } else if (btnSort === "minToMax"){
        return a.population-b.population
    } else if (btnSort === "alpha")
    return a.translations.fra.common-b.translations.fra.common;
    })
    .map((country)=>
        `
        <div class="card">
            <img src ="${country.flags.svg}" alt= Country = ${country.name.common}">
            <p>Pays : ${country.translations.fra.common}</p>
            <p>Capitale : ${country.capital}</p>
            <p>Nombre : ${country.population.toLocaleString()} habitants</p>
        </div>
        `
    ).join("")
};


btnS.forEach((btn) =>{
    btn.addEventListener('click' , (e)=>{
        btnSort = e.target.id;
        countriesDisplay()
    });
})


inputSearch.addEventListener("input", (e)=>{
fetchCountries(e.target.value)
});

range.addEventListener('input', () =>{
    rangeDisplay.innerHTML = `${inputRange.value}`;
    countriesDisplay()
})

window.addEventListener("load", fetchCountries)