// variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];



CargarEventListeners()
function CargarEventListeners() {
    // cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Muestra los cursos de local Storage
    document.addEventListener('DOMContentLoaded', () =>{
          articulosCarrito = JSON.parse( localStorage.getItem('carrito')) || [];
          carritoHTML();
    })
  

    // vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // vaciando el array

        limpiarHTML(); // Eliminamos todo el HTML
    })
}




// Funciones
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement

        leerDatosCurso(cursoSeleccionado);
    }
}
// Elimina curso del carrito 
function eliminarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {
      const cursoId = e.target.getAttribute('data-id');

      // Eliminar del arreglo articulosCarrito por el data-id
      articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
      carritoHTML(); // volvemos a iterar sobre el carrito y mostrar su HTML
    }
}

// lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {
    // console.log(curso);

// crear objeto con el contenido del curso
const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
}

// Revisa si un elemento existe en el carrito // .some permite revisar si se repiten los objetos en un array, recorriendolo
const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
if (existe) {
    // Actualizamos la cantidad
    const cursos = articulosCarrito.map(curso => {
        if (curso.id === infoCurso.id) {
            curso.cantidad++;
            return curso; // retorna el objeto actualizado
        }else{
            return curso; // retorna los objetos que no son los duplicados 
        }
    });
    articulosCarrito = [...cursos];
}else{
    // agregamos el curso al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
}


carritoHTML()
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {
     // Limpiar el HTML 
        limpiarHTML();
    // Recorre el Carrito e imprime el HTML
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        
        <td><img src='${imagen}' width= '100'></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href='#' class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;

        // Agrega el HTML de carrito en tbody
        contenedorCarrito.appendChild(row);
    });

    // Sincronizar con storage
    sincronizarStorage();
};

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

// Elimina los cursos del tbody 
function limpiarHTML() {
    // contenedorCarrito.innerHTML = '';


    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}