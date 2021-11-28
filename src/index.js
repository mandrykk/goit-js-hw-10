// import './css/styles.css';
import { fetchCountries } from '../src/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector("input"),
    listOfElement: document.querySelector(".country-list")
}

refs.input.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
    const searchQuery = event.target.value.trim();
    console.log(searchQuery)
    
    if (searchQuery !== "") {
        fetchCountries(searchQuery)
        .then(showCountries)
        .catch(showError);
    }
}

function showError() {
    Notiflix.Notify.failure('Oops, there is no country with that name');
}

function showCountries(data){
    refs.listOfElement.innerHTML = "";

    if (data.length > 10){
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }

    if (data.length >= 2 && data.length <= 10){
        const markup = data.map(({ name, flags }) => {
            return `<li>
                <img src ="${flags.svg}" alt="flag" width="50"></img>
                <p class ="name-of-country">${name.official}</p>
            </li>`
        }).join("");
        
        refs.listOfElement.innerHTML = markup;
    }
    
    if (data.length === 1){
        const { flags, name, capital, population, languages } = data[0];

        refs.listOfElement.innerHTML = `<li>
                <div class ="country"><img src ="${flags.svg}" alt ="flag" width ="60"></img>
                <span class ="countries-name">${name.official}</span></div>
                <p><strong>Capital</strong>: ${capital}</p>
                <p><strong>Population:</strong> ${population}</p>
                <p><strong>Languages:</strong> ${Object.values(languages).map(el => {return el}).join(", ")}</p>
            </li>`;
    }
}

