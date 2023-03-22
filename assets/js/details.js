let loader = document.querySelector(".loader_details");

let details = document.getElementById("details");
details.style.display = "none";

// Acá va el fetch
// fetch('./assets/js/amazing_1.json')
fetch('https://mindhub-xj03.onrender.com/api/amazing').then(response => response.json())
    .then(dataApi => {

        data = dataApi;
        eventos = data.events

        // llamo a la funcion general para crear los checkboxs y las tarjetas
        init()

    })
    .catch(error => console.error(error.message))

function init() {

    loader.style.display = "none";

    details.style.display = "flex";

    let eventos = data.events

    const queryString = location.search;

    const params = new URLSearchParams(queryString);

    // Filtro las tarjetas por ID que vienen de la URL
    const id = params.get("id")

    // Busco el primer elemento que coincida con la busqueda
    const evento = eventos.find((evento) => evento._id == id);

    // El container donde se mostrará la tarjeta buscada
    const div = document.querySelector(".container");

    // Compruebo si es assistance o estimate
    const attendance = evento.assistance || evento.estimate;

    // const attendance2 = Object.keys(evento.assistance) || Object.keys(evento.estimate);

    // Compruebo si es assistance o estimate el key
    const attendance2 = evento.assistance !== undefined ? "ASSISTANCE" : "ESTIMATE";

    // Creo la tarjeta
    div.innerHTML = `
<div class="modal__event align-middle">

<img class="modal__event__img" src="${evento.image}" alt="event">

<div class="modal__event__info">
    <h3>${evento.name}</h3> <br>
    <p><b>NAME:</b> ${evento.name}</p>
    <p><b>DATE:</b> ${evento.date}</p>
    <p><b>DESCRIPTION:</b> ${evento.description}</p>
    <p><b>CATEGORY:</b> ${evento.category}</p>
    <p><b>PLACE:</b> ${evento.place}</p>
    <p><b>CAPACITY:</b> ${evento.capacity}</p>
    <p><b>${attendance2}:</b> ${attendance}</p>
    <p><b>PRICE:</b> $${evento.price}</p><br><br>
</div>
`

    const modal__event__img = document.querySelector(".modal__event__img")
    const height = modal__event__img.clientHeight
    const width = modal__event__img.clientWidth
    let xRotation, yRotation // Definir las variables fuera de los eventos

    modal__event__img.addEventListener('mousemove', (evt) => {
        const { layerX, layerY } = evt

        yRotation = (
            (layerX - width / 2) / width
        ) * 20

        xRotation = (
            (layerY - height / 2) / height
        ) * 20

        const string = `
        perspective(500px)
        scale(1.1)
        rotateX(${xRotation}deg)
        rotateY(${yRotation}deg)
    `
        modal__event__img.style.transform = string
    })

    modal__event__img.addEventListener('mouseout', () => {
        modal__event__img.style.transform = `
        perspective(500px)
        rotateX(${xRotation}deg)
        rotateY(${yRotation}deg)
    `
    })

    let progress = document.getElementById('progressbar');
    let totalHeight = document.body.scrollHeight - window.innerHeight;

    window.onscroll = function () {
        let progressHeight = (window.pageYOffset / totalHeight) * 100;
        progress.style.height = progressHeight + "%";
    }
}