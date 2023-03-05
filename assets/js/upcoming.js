let eventos = data.events
let fechaActual = data.currentDate

// Creo un array vacío donde guardar las categorías que vienen de la data
let categories = [];

// Creo un array vacío donde guardar los checkboxes que están checked
let checked = [];

// Creo un array vacío donde guardar la data filtrada con los checkboxes
let filteredData = [];

// Creo una variable donde almacenar todas las tarjetas antes de incorporarlas
let cardsHTML = "";

// Obtengo el container de los checkboxes
let left_section = document.getElementById('left_section');

// Obtengo el container de las cards
let cards_container = document.getElementById("cards_container")

// Obtengo el input de búsqueda
const searchInput = document.querySelector('#search-input');

// Muestro un mensaje de "sin resultados" cuando no haya coincidencia
const noResultsMessage = document.querySelector('#no-results-message');
noResultsMessage.style.display = 'none';

// Creo un array vacío donde guardar el nodo de checkboxes
let checkboxes = [];

// Al iniciar, recorro todas las tarjetas y agrego las tarjetas al contenedor de tarjetas
updateCards(eventos);

// ***********************************************************
// *************** Categorias --> checkboxs ******************
// ***********************************************************

// Filtrando categorias que vienen de la data
eventos.map(event => {

    if (!categories.includes(event.category.toUpperCase())) {
        categories.push(event.category.toUpperCase());
    }

});

// Funcion para crear y mostrar las categorias
function crearCategorias(categoria, id) {
    let input = document.createElement('input');
    let label = document.createElement('label');

    input.type = "checkbox";
    input.id = `category${id + 1}`;
    input.name = categoria;
    label.htmlFor = `category${id + 1}`;
    label.textContent = categoria;

    left_section.append(input, label);
}

//Creando los checkboxes con sus labels
categories.forEach((categoria, index) => {
    crearCategorias(categoria, index)
});

//Obtengo un nodelist de los checkboxes
checkboxes = document.querySelectorAll("input[type=checkbox]");

//Recorro los checkboxes y agrego un escuchador
for (let checkbox of checkboxes) {

    checkbox.addEventListener("change", (e) => {
        cardsHTML = "";

        const itsChecked = e.target.checked;
        const name = e.target.name;

        //Si itsChecked es true
        if (itsChecked) {

            //confirmo que no exista y lo agrego al array
            if (!checked.includes(name)) {
                checked.push(name);
            }

        } else { // Si el checkbox NO está checked

            // Remuevo el nombre del array "checked" si ya estaba ahí
            checked = checked.filter(categoria => categoria !== name);
        }

        //La nueva data filtrada con los checkboxes (lo paso a mayus para que no haya incoherencias)
        filteredData = eventos.filter((item) => checked.includes(item.category.toUpperCase()))

        // Si el array de checked está vacio muestro todas las tarjetas
        if (checked.length === 0) {
            updateCards(eventos)
            noResultsMessage.style.display = 'none';
        // Si el array de checked es mayor a 0 muestro las categorias filtradas
        } else {
            updateCards(filteredData)
        }
        console.clear();
        //mostrar las categorias seleccionadas por consola
        console.log(checked);
    });
}

// ***********************************************************
// *************** Fin filtrando y mostrando categorias ******
// ***********************************************************

// Funcion para actualizar las tarjetas segun sea filtrada por categoria, por input o la totalidad
function updateCards(arrayDatos) {

    // Oculto el contenedor de tarjetas
    cards_container.style.display = "none";

    // Generar las tarjetas HTML a partir de los datos filtrados
    cardsHTML = "";

    for (let evento in arrayDatos) {

        if (arrayDatos[evento].date > fechaActual) {
            cardsHTML += createCards(arrayDatos, evento)
        }

    }

    cards_container.innerHTML = cardsHTML;

    // Vuelvo a mostrar el container de  tarjetas
    cards_container.style.display = "flex";
  }

// ***********************************************************
// *************** Input de busqueda *************************
// ***********************************************************

// Agrego un escuchador al input
searchInput.addEventListener('input', (event) => {
    // Paso el termino de busqueda a minuscula para evitar incoherencias
    const searchTerm = event.target.value.toLowerCase();
    // Filtro los datos comparando el input con el name de la data
    const filteredDataInput = eventos.filter( (item) => {
        const name = item.name.toLowerCase();

        return name.includes(searchTerm);
    });

    console.clear();
    console.log(searchTerm);
    // Actualizo las tarjetas con la data filtrada por el input
    updateCards(filteredDataInput);

    // Si no hay coincidencia muestra un mensaje de "sin resultados"
    if (filteredDataInput.length === 0) {
        noResultsMessage.style.display = 'block';
        cards_container.style.display = 'none';
    } else {
        noResultsMessage.style.display = 'none';
        cards_container.style.display = 'flex';
    }

    //Si el input está vacio pero tengo un checkbox marcado
    if (searchInput.value === "" && filteredData.length > 0) {
        updateCards(filteredData)
    }

});

// ***********************************************************
// *************** Fin input de busqueda *********************
// ***********************************************************


// ***********************************************************
// *************** Creando las tarjetas **********************
// ***********************************************************

// Creando las tarjetas
function createCards(arrayDatos, evento) {
    // Creando los elementos
    let card = document.createElement("div");
    let details = document.createElement("div");
    let price = document.createElement("div");
    let image = document.createElement("img");
    let title = document.createElement("h3");
    let description = document.createElement("p");
    let date = document.createElement("h5");
    let button = document.createElement("a");

    // Agregando clases a los elementos
    card.classList.add("card");
    details.classList.add("details");

    // Agregando contenido y atributos a los elementos
    image.src = arrayDatos[evento].image;
    image.alt = arrayDatos[evento].name;
    title.textContent = arrayDatos[evento].name;
    description.textContent = arrayDatos[evento].description;
    date.textContent = "Date: " + arrayDatos[evento].date;
    price.textContent = `Price $${arrayDatos[evento].price}`;

    //Redirecciona al ID seleccionado con los detalles
    button.textContent = "Details";
    button.href = `./details.html?id=${arrayDatos[evento].id}`;

    // Agregando elementos al DOM
    details.appendChild(price);
    details.appendChild(button);
    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(date);
    card.appendChild(details);

    return card.outerHTML
}

// ***********************************************************
// *************** Fin creacion de las tarjetas **************
// ***********************************************************