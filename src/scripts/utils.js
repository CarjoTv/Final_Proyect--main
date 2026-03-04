// utils.js
export const createCard = (stay) => {
    // 1. Badge de Super Host con el estilo exacto del diseño (borde negro, texto bold)
    const superHost = stay.superHost 
        ? `<span class="border border-gray-800 text-[10px] font-bold px-2 py-1 rounded-xl uppercase text-gray-800">Super Host</span>` 
        : "";

    // 2. Manejo de camas: solo mostrar si el valor existe
    const bedsText = stay.beds ? `. ${stay.beds} beds` : '';

    return `
        <div class="flex flex-col gap-3 mb-4">
            <div class="rounded-3xl overflow-hidden h-64">
                <img src="${stay.photo}" alt="${stay.title}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
            </div>
            
            <div class="flex justify-between items-center mt-1">
                <div class="flex items-center gap-2">
                    ${superHost}
                    <span class="text-gray-500 text-sm font-medium">${stay.type} ${bedsText}</span>
                </div>
                
                <div class="flex items-center gap-1">
                    <span class="material-icons text-[#EB5757]" style="font-size: 18px;">star</span>
                    <span class="text-gray-700 text-sm font-medium">${stay.rating}</span>
                </div>
            </div>
            
            <h3 class="font-bold text-gray-800 text-base leading-tight">${stay.title}</h3>
        </div>
    `;
};

export const getUniqueCities = (stays) => {
    const cities = [...new Set(stays.map(stay => stay.city))];
    return cities.sort();
};