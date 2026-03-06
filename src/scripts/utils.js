
export const createCard = (stay) => {
    const superHost = stay.superHost 
        ? `<span class="border border-gray-800 text-[10px] font-bold px-2 py-1 rounded-xl uppercase text-gray-800">Super Host</span>` 
        : "";

    const bedsText = stay.beds ? `. ${stay.beds} beds` : '';

    return `
        <div class="flex flex-col gap-3">
            <div class="rounded-3xl overflow-hidden aspect-4/3">
                <img src="${stay.photo}" alt="${stay.title}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
            </div>
            
            <div class="flex justify-between items-center mt-2">
                <div class="flex items-center gap-2">
                    ${superHost}
                    <span class="text-gray-500 text-sm">${stay.type} ${bedsText}</span>
                </div>
                
                <div class="flex items-center gap-1">
                    <span class="material-icons text-[#EB5757]" style="font-size: 18px;">star</span>
                    <span class="text-gray-700 text-sm">${stay.rating}</span>
                </div>
            </div>
            
            <h3 class="font-semibold text-gray-800 text-base">${stay.title}</h3>
        </div>
    `;
};

// Función para obtener ciudades únicas de los stays
//Sirve mucho el SET para eliminar duplicados 
export const getUniqueCities = (stays) => {
    const cities = [...new Set(stays.map(stay => stay.city))];
    return cities.sort();
};