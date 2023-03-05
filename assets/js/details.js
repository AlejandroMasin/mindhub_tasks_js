let eventos = data.events

const queryString = location.search;

const params = new URLSearchParams(queryString);

// Filtro las tarjetas por ID que vienen de la URL
const id = params.get("id")

// Busco el primer elemento que coincida con la busqueda
const evento = eventos.find( (evento) => evento.id == id );

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