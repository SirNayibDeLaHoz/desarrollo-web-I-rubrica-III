/*document.addEventListener('DOMContentLoaded', async () => {
    const productContainer = document.getElementById('product-container');

    try {
        // Consumir API
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();

        // Mostrar las 15 primeras cards
        products.slice(0, 15).forEach(product => {
            // Crear la card
            const card = document.createElement('div');
            card.classList.add('col-12', 'col-md-4', 'd-flex', 'justify-content-center');

            card.innerHTML = `
            <div class="card product-card shadow mb-4" style="width: 18rem;">
                <img src="${product.image}" class="img-fluid" alt="${product.title}" style="max-height: 100%;>
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.price}</p>
                </div>
            </div>
        `;

            productContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        productContainer.innerHTML = '<p>Error al cargar los productos</p>';
    }
});*/
document.addEventListener("DOMContentLoaded", () => {
    const fetchData = async () => {
        // Mostrar el GIF de espera
        document.getElementById('loading').style.display = 'flex';
        const productContainer = document.getElementById('product-container');
        const productFilter = document.getElementById('product-filter');

        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();

            // Mostrar las 15 primeras cards
            data.slice(0, 15).forEach(product => {
                // Crear la card
                const card = document.createElement('div');
                card.classList.add('col-12', 'col-md-4', 'd-flex', 'justify-content-center');
                card.setAttribute('data-title', product.title); // Establecer un atributo data para el filtro

                card.innerHTML = `
                    <div class="card product-card shadow mb-4"">
                        <img src="${product.image}" class="img-fluid" alt="${product.title}" style="max-height: 100%;">
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">${product.price}</p>
                        </div>
                    </div>
                `;

                productContainer.appendChild(card);

                // Agregar opciones al filtro
                const option = document.createElement('option');
                option.value = product.title;
                option.textContent = product.title;
                productFilter.appendChild(option);
            });
            // Agregar la opción "Mostrar todos"
            const allOption = document.createElement('option');
            allOption.value = 'all';
            allOption.textContent = 'Todos los productos';
            allOption.selected = true;
            productFilter.prepend(allOption);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            // Ocultar el GIF de espera
            document.getElementById('loading').style.display = 'none';
        }
    };

    const filterProducts = () => {
        const selectedValue = document.getElementById('product-filter').value;
        const cards = document.querySelectorAll('.product-card');

        cards.forEach(card => {
            const productTitle = card.querySelector('.card-title').textContent;
            // Mostrar la card si el título coincide o si se selecciona "Todos"
            if (selectedValue === 'all' || productTitle === selectedValue) {
                card.parentElement.classList.add('d-flex');
                card.parentElement.style.display = 'block'; // Mostrar
            } else {
                card.parentElement.classList.remove('d-flex');
                card.parentElement.style.display = 'none'; // Ocultar
            }
        });
    };

    // Llamar a la función para obtener datos
    fetchData();

    // Agregar evento al select para filtrar productos
    document.getElementById('product-filter').addEventListener('change', filterProducts);
});