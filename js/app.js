// VARIABLES

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventos();
function cargarEventos(){
    listaCursos.addEventListener('click', agregarCurso);

    carrito.addEventListener('click', borrarCurso);

    vaciarCarrito.addEventListener('click', () =>{
        articulosCarrito = [];
        carritoHTML();
    })
}

// FUNCIONES

function agregarCurso (e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        leerDatosDelCurso(e.target.parentElement.parentElement);
    }
}

function borrarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')){
        const cursoID = e.target.parentElement.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoID);
    }
    carritoHTML();
}

function leerDatosDelCurso(curso){
    const infoDelCurso = {
        id: curso.querySelector('a').getAttribute('data-id'),
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('.info-card h4').textContent,
        precio: curso.querySelector('.info-card .precio span').textContent,
        cantidad: 1
    }
    if(articulosCarrito.some(elementoDelArray => infoDelCurso.id === elementoDelArray.id)){
        // busca el elemento que ya existe, le agrega uno a la cantidad
        articulosCarrito.map(valorActual => {
            if(valorActual.id === infoDelCurso.id) valorActual.cantidad++;
        })
    } else {
        articulosCarrito = [...articulosCarrito, infoDelCurso];
    }
    carritoHTML();
}

function carritoHTML(){
    //contenedorCarrito.innerHTML = "";

    // Limpia el codigo previo en el carrito
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

    // Crea el carrito
    articulosCarrito.forEach( curso => {
        const {id, imagen, titulo, precio, cantidad} = curso;
        let row = document.createElement('tr');
        row.innerHTML= `
            <td><img src='${imagen}' width='100'></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href='#' data-id='${id}'><img src='img/window-close-solid.svg' class='borrar-curso' width='32px'></i></a>
            </td>
        `;
        contenedorCarrito.appendChild(row);
    })
}