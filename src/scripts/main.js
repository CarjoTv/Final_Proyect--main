import { stays } from './stays.js';
import { createCard, getUniqueCities } from './utils.js';

// --- ELEMENTOS DEL DOM ---
const modal = document.querySelector('#search-modal');
const openSearch = document.querySelector('#open-search');
const closeSearch = document.querySelector('#close-search');
const cityInput = document.querySelector('#city-input');
const locationList = document.querySelector('#location-list');
const guestsDisplay = document.querySelector('#guests-display');
const container = document.querySelector('#stays-container');
const counterText = document.querySelector('#counter');

// Contadores
let adults = 0;
let children = 0;
let selectedCity = "";

// --- LÓGICA DEL MODAL ---
openSearch.addEventListener('click', () => modal.classList.remove('hidden'));
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
});
if(closeSearch) closeSearch.addEventListener('click', () => modal.classList.add('hidden'));

// --- LÓGICA DE CIUDADES ---
function setupCities() {
    const cities = getUniqueCities(stays);
    locationList.innerHTML = cities.map(city => `
        <div class="flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-gray-50 city-option" data-city="${city}">
            <span class="material-icons text-gray-600">location_on</span>
            <span class="text-gray-700 text-sm font-normal">${city}, Finland</span>
        </div>
    `).join('');

    document.querySelectorAll('.city-option').forEach(opt => {
        opt.addEventListener('click', () => {
            selectedCity = opt.dataset.city;
            cityInput.value = `${selectedCity}, Finland`;
            locationList.classList.add('hidden');
        });
    });
}

cityInput.addEventListener('click', () => locationList.classList.toggle('hidden'));

// --- LÓGICA DE HUÉSPEDES ---
function updateGuests() {
    const total = adults + children;
    document.querySelector('#adult-count').textContent = adults;
    document.querySelector('#child-count').textContent = children;
    
    const text = total > 0 ? `${total} guests` : "Add guests";
    guestsDisplay.value = text;
    document.querySelector('#display-guests-count').textContent = text;
}

document.querySelector('#adult-plus').addEventListener('click', () => { adults++; updateGuests(); });
document.querySelector('#adult-minus').addEventListener('click', () => { if(adults > 0) adults--; updateGuests(); });
document.querySelector('#child-plus').addEventListener('click', () => { children++; updateGuests(); });
document.querySelector('#child-minus').addEventListener('click', () => { if(children > 0) children--; updateGuests(); });

// --- RENDERIZADO Y BÚSQUEDA ---
function renderStays(items) {
    container.innerHTML = items.map(stay => createCard(stay)).join('');
    counterText.textContent = `${items.length} stays`;
    
    // Actualizar título de ubicación
    const titleEl = document.querySelector('#location-title');
    titleEl.textContent = selectedCity ? `Stays in ${selectedCity}` : "Stays in Finland";
}

function handleSearch() {
    const totalGuests = adults + children;

    const filtered = stays.filter(stay => {
        const matchCity = selectedCity === "" || stay.city === selectedCity;
        const matchGuests = stay.maxGuests >= totalGuests;
        return matchCity && matchGuests;
    });

    renderStays(filtered);
    modal.classList.add('hidden');
    
    // Actualizar barra principal
    document.querySelector('#display-location').textContent = selectedCity ? `${selectedCity}, Finland` : "Add location";
}

// Inicialización
setupCities();
renderStays(stays);

document.querySelector('#search-btn').addEventListener('click', handleSearch);
document.querySelector('#search-btn-mobile').addEventListener('click', handleSearch);