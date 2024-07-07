document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const countriesContainer = document.getElementById('countriesContainer');
    let countriesData = [];

    fetch("https://restcountries.com/v3.1/all")
        .then(res => res.json())
        .then(data => {
            countriesData = data;
            displayCountries(countriesData);
        })
        .catch(error => console.error('Error fetching countries:', error));

    function displayCountries(countries) {
        countriesContainer.innerHTML = '';
        countries.forEach(element => {
            const officialName = element.name.official || 'N/A';
            const capital = element.capital ? element.capital[0] : 'N/A';
            const region = element.region || 'N/A';
            const subregion = element.subregion || 'N/A';
            const population = element.population.toLocaleString() || 'N/A';
            const area = element.area ? element.area.toLocaleString() : 'N/A';
            const languages = element.languages ? Object.values(element.languages).join(', ') : 'N/A';
            const currencies = element.currencies ? Object.values(element.currencies).map(c => `${c.name} (${c.symbol})`).join(', ') : 'N/A';
            const capitalLocation = element.capitalInfo && element.capitalInfo.latlng 
                ? `<a href="https://www.google.com/maps/search/?api=1&query=${element.capitalInfo.latlng[0]},${element.capitalInfo.latlng[1]}" target="_blank">View on Map</a>`
                : 'N/A';

            const card = `<div class="col-md-4">
                            <div class="card country-card">
                                <img src="${element.flags.png}" class="card-img-top country-flag" alt="Flag of ${element.name.common}">
                                <div class="card-body">
                                    <h5 class="card-title">${element.name.common}</h5>
                                    <p class="card-text"><strong>Official Name:</strong> ${officialName}</p>
                                    <p class="card-text"><strong>Capital:</strong> ${capital}</p>
                                    <p class="card-text"><strong>Region:</strong> ${region}</p>
                                    <p class="card-text"><strong>Subregion:</strong> ${subregion}</p>
                                    <p class="card-text"><strong>Population:</strong> ${population}</p>
                                    <p class="card-text"><strong>Area (sq km):</strong> ${area}</p>
                                    <p class="card-text"><strong>Languages:</strong> ${languages}</p>
                                    <p class="card-text"><strong>Currency:</strong> ${currencies}</p>
                                    <p class="card-text"><strong>Location:</strong> ${capitalLocation}</p>
                                </div>
                            </div>
                          </div>`;

            countriesContainer.innerHTML += card;
        });
    }

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredCountries = countriesData.filter(country => 
            country.name.common.toLowerCase().includes(searchTerm) || 
            (country.capital && country.capital[0].toLowerCase().includes(searchTerm))
        );
        displayCountries(filteredCountries);
    });
});
