document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const navbar = document.getElementById('navbar');
    const productContainer = document.getElementById('products');

    themeToggle.addEventListener('change', () => {
        const isDark = themeToggle.checked;

        body.classList.toggle('dark-mode', isDark);
        navbar.classList.toggle('dark-mode', isDark);

        const cards = productContainer.querySelectorAll('.card');
        cards.forEach(card => card.classList.toggle('dark-mode', isDark));
    });

    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // Riferimenti filtri
            let monitor = document.querySelector('#monitor');
            let mouse = document.querySelector('#mouse');
            let keyboard = document.querySelector('#keyboard');
            let webcam = document.querySelector('#webcam');
            let tablet = document.querySelector('#tablet');
            let printer = document.querySelector('#printer');
            let scanner = document.querySelector('#scanner');
            let showAll = document.querySelector('#showAll');
            let minPrice = document.querySelector('#minPrice');
            let maxPrice = document.querySelector('#maxPrice');
            let search = document.querySelector('#search');
            let btnSearch = document.querySelector('#btnSearch');
            let sortAsc = document.querySelector('#sortAsc');
            let sortDesc = document.querySelector('#sortDesc');

            // Gestione checkbox ordinamento esclusivo
            sortAsc.addEventListener('change', () => {
                if (sortAsc.checked) sortDesc.checked = false;
                applyFilters();
            });

            sortDesc.addEventListener('change', () => {
                if (sortDesc.checked) sortAsc.checked = false;
                applyFilters();
            });

            function showData(arr) {
                let products = document.querySelector('#products');
                products.innerHTML = '';
                let numData = document.querySelector('#numData');
                numData.innerHTML = arr.length;

                let imgMin = 600; 
                let imgMax = 800;

                arr.forEach((datum) => {
                    let imgSize = Math.round(Math.random() * (imgMax - imgMin) + imgMin);
                    let col = document.createElement('div');
                    col.classList.add('col-6', 'col-md-4', 'col-lg-3', 'mb-4', 'd-flex', 'flex-wrap', 'justify-content-center', 'align-items-center');
                    col.innerHTML = `
                        <div class="card h-100" style="width: 18rem;">
                            <img src="https://picsum.photos/${imgSize}/${imgSize}" class="card-img-top" alt="...">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${datum.name}</h5>
                                <h6>€${datum.price}</h6>
                                <p class="card-text">${datum.description}</p>
                                <p>${datum.category}</p>
                                <a href="#" class="btn btn-outline-success mt-auto">Add to Cart</a>
                            </div>
                        </div>
                    `;
                    products.appendChild(col);
                });
            }

            function applyFilters() {
                let filteredData = [...data];

                // Filtro categorie
                const selectedCategories = [];
                if (monitor.checked) selectedCategories.push("Monitor");
                if (mouse.checked) selectedCategories.push("Mouse");
                if (keyboard.checked) selectedCategories.push("Tastiera");
                if (webcam.checked) selectedCategories.push("Webcam");
                if (tablet.checked) selectedCategories.push("Tablet");
                if (printer.checked) selectedCategories.push("Printer");
                if (scanner.checked) selectedCategories.push("Scanner");

                if (selectedCategories.length > 0) {
                    filteredData = filteredData.filter(datum => selectedCategories.includes(datum.category));
                }

                // Filtro prezzo
                const min_price = minPrice.value ? parseFloat(minPrice.value) : 0;
                const max_price = maxPrice.value ? parseFloat(maxPrice.value) : Infinity;
                filteredData = filteredData.filter(datum => datum.price >= min_price && datum.price <= max_price);

                // Filtro ricerca
                const searchTerm = search.value.toLowerCase();
                if (searchTerm) {
                    filteredData = filteredData.filter(datum =>
                        datum.name.toLowerCase().includes(searchTerm)
                    );
                }

                // Ordinamento
                if (sortAsc.checked) {
                    filteredData.sort((a, b) => a.price - b.price);
                } else if (sortDesc.checked) {
                    filteredData.sort((a, b) => b.price - a.price);
                }

                showData(filteredData);
            }

            btnSearch.addEventListener('click', (e) => {
                e.preventDefault();
                applyFilters();
            });

            showAll.addEventListener('click', () => {
                const checkboxes = [monitor, mouse, keyboard, webcam, tablet, printer, scanner];
                checkboxes.forEach(checkbox => checkbox.checked = false);

                minPrice.value = '';
                maxPrice.value = '';
                search.value = '';
                sortAsc.checked = false;
                sortDesc.checked = false;

                applyFilters();
            });

            applyFilters(); // iniziale
        });
});
