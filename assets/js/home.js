let eventos = data.events

for (let i = 0; i < eventos.length; i++) {
    console.log(eventos[i]);
}

// Oculto el container de  tarjetas
let cards_container = document.getElementById("cards_container")
cards_container.style.display = "none";

for (let evento in eventos) {
    //console.log(eventos[evento]);
    crearTarjetas(evento)
}

function crearTarjetas(evento) {
    // Creando los elementos
    let card = document.createElement("div");
    let details = document.createElement("div");
    let price = document.createElement("div");
    let image = document.createElement("img");
    let title = document.createElement("h3");
    let description = document.createElement("p");
    let button = document.createElement("button");

    // Agregando clases a los elementos
    card.classList.add("card");
    details.classList.add("details");

    // Agregando contenido y atributos a los elementos
    image.src = eventos[evento].image;
    image.alt = eventos[evento].name;
    title.textContent = eventos[evento].name;
    description.textContent = eventos[evento].description;
    price.textContent = `Price $${eventos[evento].price}`;

    button.textContent = "Details";
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#mi-modal");

    // Agregando elementos al DOM
    details.appendChild(price);
    details.appendChild(button);
    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(details);

    // Agregando la card al contenedor de cards
    cards_container.appendChild(card)
}

// Vuelvo a mostrar el container de  tarjetas
cards_container.style.display = "flex";
