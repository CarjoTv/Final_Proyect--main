import { stays } from './stays.js';
import { createCard, getUniqueCities } from './utils.js';

// ELEMENTOS DEL DOM 
const modal = document.querySelector('#search-modal');
const openSearch = document.querySelector('#open-search');
const cityInput = document.querySelector('#city-input');
const locationList = document.querySelector('#location-list');
const guestsDisplay = document.querySelector('#guests-display');
const container = document.querySelector('#stays-container');
const counterText = document.querySelector('#counter');
const closeSearch = document.querySelector('#close-search');

// Boton de cerrar modal en movil (X)

if (closeSearch) {
    closeSearch.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
}

// Variables de estado
let adults = 0;
let children = 0;
let selectedCity = "";

// LÓGICA DEL MODAL
openSearch.addEventListener('click', () => modal.classList.remove('hidden'));

// Cerrar si haces clic fuera del contenido blanco
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
});

// LÓGICA DE CIUDADES
function setupCities() {
    const cities = getUniqueCities(stays);
    locationList.innerHTML = cities.map(city => `
        <div class="flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-gray-100 city-option" data-city="${city}">
            <span class="material-icons text-gray-600">location_on</span>
            <span class="text-gray-700">${city}, Finland</span>
        </div>
    `).join('');

    document.querySelectorAll('.city-option').forEach(opt => {
        opt.addEventListener('click', () => {
            selectedCity = opt.dataset.city;
            cityInput.value = `${selectedCity}, Finland`;
            locationList.classList.add('hidden');
            
            // ACTUALIZACIÓN EN TIEMPO REAL YA LO AGREGUE 
            handleSearch(); 
        });
    });
}

cityInput.addEventListener('click', () => locationList.classList.toggle('hidden'));

// LÓGICA DE HUÉSPEDES 
function updateGuests() {
    const total = adults + children;
    
    // Actualizar números en el modal
    document.querySelector('#adult-count').textContent = adults;
    document.querySelector('#child-count').textContent = children;
    
    // Actualizar el texto del input
    const text = total > 0 ? `${total} guests` : "Add guests";
    guestsDisplay.value = text;
    document.querySelector('#display-guests-count').textContent = text;

    // ACTUALIZACIÓN EN TIEMPO REAL
    handleSearch();
}

// Botones de suma y resta
document.querySelector('#adult-plus').addEventListener('click', () => { adults++; updateGuests(); });
document.querySelector('#adult-minus').addEventListener('click', () => { if(adults > 0) adults--; updateGuests(); });
document.querySelector('#child-plus').addEventListener('click', () => { children++; updateGuests(); });
document.querySelector('#child-minus').addEventListener('click', () => { if(children > 0) children--; updateGuests(); });

// RENDERIZADO Y FILTRADO
function renderStays(items) {
    // Dibujar las cards
    container.innerHTML = items.map(stay => createCard(stay)).join('');
    
    // Actualizar el contador (ej: "12 stays")
    counterText.textContent = `${items.length} stays`;
    
    // Cambiar el título de la página
    const titleEl = document.querySelector('#location-title');
    titleEl.textContent = selectedCity ? `Stays in ${selectedCity}` : "Stays in Finland";
}

function handleSearch() {
    const totalGuests = adults + children;

    // Filtrar el array original
    const filtered = stays.filter(stay => {
        const matchCity = selectedCity === "" || stay.city === selectedCity;
        const matchGuests = stay.maxGuests >= totalGuests;
        return matchCity && matchGuests;
    });

    renderStays(filtered);
    
    // Actualizar el texto de la barra de búsqueda principal (fuera del modal)
    document.querySelector('#display-location').textContent = selectedCity ? `${selectedCity}, Finland` : "Add location";
}

// INICIO 
setupCities();
renderStays(stays); // Carga inicial con todos los datos

// Botón de buscar (aunque ya es tiempo real, se deja por si el usuario quiere cerrar el modal)
const searchBtn = document.querySelector('#search-btn');
if(searchBtn) {
    searchBtn.addEventListener('click', () => {
        handleSearch();
        modal.classList.add('hidden');
    });
}

//Si ocurre un error en mostrar las cartas, la verdad no se porque ocurre pero son cosas del VITE. 