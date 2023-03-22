let mainTables = document.getElementById('mainTables');
mainTables.style.display = "none"

let loaderStats = document.querySelector(".loaderStats");


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

// init()

function init() {
    // let eventos = data.events;
    let fechaActual = data.currentDate;

    loaderStats.style.display = "none"
    mainTables.style.display = "flex"

    // ******************************************************************************************
    // *************************    && Events statistics &&    **********************************
    // ******************************************************************************************

    //              *********************************************************
    //              *** Events with the hightest percentage of attendance ***
    //              *********************************************************

    function calculateAttendance(arrayDatos, evento) {
        const assistance = arrayDatos[evento].assistance || arrayDatos[evento].estimate;
        const capacity = arrayDatos[evento].capacity;
        const attendancePercentage = (assistance / capacity) * 100;
        arrayDatos[evento].attendancePercentage = attendancePercentage;
    }

    // Calcula el porcentaje de asistencia para cada evento
    for (const evento in eventos) {
        calculateAttendance(eventos, evento);
    }

    // Filtro los eventos pasados a la fecha actual
    let pastEvents = eventos.filter((event) => event.date < fechaActual);

    // Ordena los eventos por asistencia descendente
    const eventosOrdenadosMax = pastEvents.slice().sort((a, b) => b.attendancePercentage - a.attendancePercentage);

    //              *************************************************************
    //              *** End Events with the hightest percentage of attendance ***
    //              *************************************************************

    //              *********************************************************
    //              *** Events with the lowest percentage of attendance *****
    //              *********************************************************

    // Ordena los eventos por asistencia ascendente
    const eventosOrdenadosMin = pastEvents.slice().sort((a, b) => a.attendancePercentage - b.attendancePercentage);

    //              ***********************************************************
    //              *** End Events with the lowest percentage of attendance ***
    //              ***********************************************************


    //              ************************************
    //              **** Event with larger capacity ****
    //              ************************************

    let maxCapacity = 0;
    let maxEvent = "";

    for (let i = 0; i < data.events.length; i++) {

        if (data.events[i].capacity > maxCapacity) {
            maxCapacity = data.events[i].capacity;
            maxEvent = data.events[i];
        }

    }

    //              ****************************************
    //              **** End Event with larger capacity ****
    //              ****************************************

    // Modifico la primer tabla para agregar los datos

    // Obtengo la primera tabla por su id
    const table = document.getElementById("miTabla");

    // Obtenengo la primera fila
    const firstRowStatistics = table.rows[2];
    firstRowStatistics.style.textAlign = "center";

    // Obtengo la tercera celda (columna) de la primera fila
    const firstCellStatistics = firstRowStatistics.cells[0];
    const secondCellStatistics = firstRowStatistics.cells[1];
    const thirdCellStatistics = firstRowStatistics.cells[2];

    // Ingreso los valores en la primera fila
    firstCellStatistics.textContent = `${eventosOrdenadosMax[0].name} with ${eventosOrdenadosMax[0].attendancePercentage.toFixed(2)}%`
    secondCellStatistics.textContent = `${eventosOrdenadosMin[0].name} with ${eventosOrdenadosMin[0].attendancePercentage}%`
    thirdCellStatistics.textContent = `${maxEvent.name} with ${maxEvent.capacity} capacity`;

    // **********************************************************************************************
    // *************************    && End Events statistics &&    **********************************
    // **********************************************************************************************


    //************************************************************************************************
    // ************************* && Upcoming events statistic by category && *************************
    //************************************************************************************************

    // ***********************************************
    // **** Revenues and Percentage of attendance ****
    // ***********************************************

    // Filtrar eventos con fecha superior a la actual
    let eventosFiltrados = eventos.filter(evento => evento.date > fechaActual)

    // Filtrando las categorias
    let categorias = [];

    eventos.map(event => {

        if (!categorias.includes(event.category)) {
            categorias.push(event.category);
        }

    });

    const table2 = document.getElementById("miTabla2");

    function eventosFiltradosCategory(arrayDatos, nroTabla) {

        for (const categoria of categorias) {

            const eventosUpoPast = arrayDatos.filter(evento => evento.category === categoria);
            const ganancias = eventosUpoPast.reduce((total, evento) => total + evento.price * (evento.assistance ? evento.assistance : evento.estimate), 0);
            const asistenciaTotal = eventosUpoPast.reduce((total, evento) => total + (evento.assistance ? evento.assistance : evento.estimate), 0);
            const capacidadTotal = eventosUpoPast.reduce((total, evento) => total + evento.capacity, 0)

            let porcentajeAsistencia = (asistenciaTotal / capacidadTotal) * 100;

            if (isNaN(porcentajeAsistencia)) {
                porcentajeAsistencia = 0
            }

            // Crear una nueva fila
            const newRow2 = nroTabla.insertRow();
            newRow2.style.textAlign = "center";

            // Crear celdas para la fila
            const firstCell2 = newRow2.insertCell(0);
            const secondCell2 = newRow2.insertCell(1);
            const thirdCell2 = newRow2.insertCell(2);

            // Agregar contenido a las celdas de la nueva fila
            firstCell2.innerHTML = categoria;
            secondCell2.innerHTML = `$${ganancias}`;
            thirdCell2.innerHTML = `${porcentajeAsistencia.toFixed(2)}%`;

        }
    }

    eventosFiltradosCategory(eventosFiltrados, table2);

    // ***************************************************
    // **** End Revenues and Percentage of attendance ****
    // ***************************************************

    //************************************************************************************************
    // ************************* && Past events statistic by category && *****************************
    //************************************************************************************************

    // ***********************************************
    // **** Revenues and Percentage of attendance ****
    // ***********************************************

    // Filtrar eventos con fecha inferior a la actual
    let eventosFiltradosPast = eventos.filter(evento => evento.date < fechaActual)

    const table3 = document.getElementById("miTabla3");

    eventosFiltradosCategory(eventosFiltradosPast, table3);

    // ***************************************************
    // **** End Revenues and Percentage of attendance ****
    // ***************************************************

    let progress = document.getElementById('progressbar');
    let totalHeight = document.body.scrollHeight - window.innerHeight;

    window.onscroll = function () {
        let progressHeight = (window.pageYOffset / totalHeight) * 100;
        progress.style.height = progressHeight + "%";
    }

}//fin funcion init()