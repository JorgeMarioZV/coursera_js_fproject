console.log(document.getElementById('destination-input').value)
const destination_input = document.getElementById('destination-input');
const search_btn = document.getElementById('search-btn');
const clear_btn = document.getElementById('clear-btn');
const book_btn = document.getElementById('book-btn');
const submit_btn = document.getElementById('submit-btn');
const place_types = [['countries','country'],
                     ['australia'],
                     ['brazil'],
                     ['japan'],
                     ['temples','temple'],
                     ['beaches','beach']];
// const destination_data = null;


search_btn.addEventListener("keypress", searchDestination(event));
search_btn.addEventListener('click', searchDestination);
clear_btn.addEventListener('click', clearInput);
// book_btn.addEventListener('click', bookReservation);
// submit_btn.addEventListener('click', sendContactInfo);


function searchDestination() {
    fetch('./travel_recommendation_api.json', {
        method: 'GET'
    })
        .then(response => // Note que no se coloca los parentesis para response. Es opcional para un parametro.
            response.json() // Note que no se coloca ni return ni (;). Es opcional es una sola línea y su retorno es el de la función
        )
        .then ((data) => {
            const destination_data = data;
            let mydestination, places;
            // const place_types = Object.keys(destination_data);
            console.log(data);
            for (let index = 0; index < place_types.length; index++) {
                // place_types.forEach((place_type,index) => { // Not used cause return doesnt work with forEach
                    // if (destination_input.value.trim().toLocaleLowerCase() === place_type[0] || destination_input.value.trim().toLocaleLowerCase() === place_type[1]) {
                mydestination = destination_input.value.trim().toLocaleLowerCase();
                if ( mydestination === place_types[index][0] || mydestination === place_types[index][1]) {
                    // if ('/^(country|countries|temple|temples|beach|beaches)$/i'.test(place)) {}
                    // /^(country|countries)$/.test(" coUnTry     ".trim().toLocaleLowerCase())
                    // if (/^(country|countries)$/.test(input.trim().toLocaleLowerCase()))
                    // if (/^(country|countries)$/.test(destination_input.trim().toLocaleLowerCase())) {
                    // /^countr(y|ies)$/
                    // if (destination_input.trim().toLocaleLowerCase() ==='country' || destination_input.trim().toLocaleLowerCase() ==='countries') {
                    // if (mydestination === 'australia' || mydestination === 'japan' || mydestination === 'brazil') {
                        // places = destination_data.countries;
                    if (mydestination === 'australia') {
                        places = destination_data.countries[0];
                    } else if (mydestination === 'japan') {
                        places = destination_data.countries[1];
                    } else if (mydestination === 'brazil') {
                        places = destination_data.countries[2];
                    } else {
                        places = destination_data[place_types[index][0]];
                    }
                    showDestinations(places);
                    return;
                }
            }
        })
        .catch ((error) => {
            console.error('Error al leer la información: ', error);
        });
}

function clearInput() {
    document.getElementById('destination-input').value = "";
    document.getElementById('post-results').innerHTML = "";
}

function showDestinations(place_data) {
    new_post = "";
    if (!Object.hasOwn(place_data,'cities')) {
        place_data.forEach(place => {
            new_post += 
                `<div class="post transition-post">
                    <figure class="post-figure"><img class="post-img" src="${place.imageUrl}"></figure>
                    <figcaption class="post-text">
                        <h6 class="post-title">${place.name}</h6>
                        <p class="post-description">${place.description}</p>
                        <button class="search-btn">Visit</button>
                    </figcaption>
                </div>`;
            document.getElementById("post-results").innerHTML = new_post;
        }); 
    } else {
        place_data.cities.forEach(city_place => {
                new_post += 
                    `<div class="post transition-post">
                        <figure class="post-figure"><img class="post-img" src="${city_place.imageUrl}"></figure>
                        <figcaption class="post-text">
                            <h6 class="post-title">${city_place.name}</h6>
                            <p class="post-description">${city_place.description}</p>
                            <button class="search-btn">Visit</button>
                        </figcaption>
                    </div>`;
                    // city_place.cities[0].description
                document.getElementById("post-results").innerHTML = new_post;
        });

        // Este codigo mostraria todos los post de todos los paises
        //  ************************************************************************
        // place_data.forEach(in_country_places => {
        //     in_country_places.cities.forEach(city_place => {
        //         new_post += 
        //             `<div class="post transition-post">
        //                 <figure class="post-figure"><img class="post-img" src="${city_place.imageUrl}"></figure>
        //                 <figcaption class="post-text">
        //                     <h6 class="post-title">${city_place.name}</h6>
        //                     <p class="post-description">${city_place.description}</p>
        //                     <button class="search-btn">Visit</button>
        //                 </figcaption>
        //             </div>`;
        //             // city_place.cities[0].description
        //         document.getElementById("post-results").innerHTML = new_post;
        //     })
        // });
    }
}

// function bookReservation() {
    
// }

// function sendContactInfo() {
    
// }