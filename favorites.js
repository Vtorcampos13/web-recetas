// Objeto para almacenar recetas favoritas
let favoritas = {};

// Al comienzo del código, define una función para cargar las recetas favoritas desde el almacenamiento local.
function cargarRecetasFavoritas() {
    const favoritasJSON = localStorage.getItem('recetasFavoritas');
    return JSON.parse(favoritasJSON) || {}; // Si no hay favoritas guardadas, devuelve un objeto vacío.
}

// Cargar las recetas favoritas existentes desde el almacenamiento local.
favoritas = cargarRecetasFavoritas();

// Modifica la función toggleFavorita para agregar o eliminar recetas de las favoritas y actualizar el almacenamiento local.
export function toggleFavorita(nombreReceta) {
    const boton = document.querySelector(`button#favorito-button`);
    if (favoritas[nombreReceta]) {
        delete favoritas[nombreReceta];
        boton.classList.add("active");
    } else {
        favoritas[nombreReceta] = true;
        boton.classList.remove("active");
    }

    // Guarda las recetas favoritas actualizadas en el almacenamiento local.
    localStorage.setItem('recetasFavoritas', JSON.stringify(favoritas));
}

// Función para mostrar recetas favoritas en la página de favoritos
export function mostrarRecetasFavoritas() {
    const recetasFavoritasDiv = document.getElementById("recetas");
    recetasFavoritasDiv.innerHTML = "";

    const recetasFavoritas = Object.keys(favoritas);

    if (recetasFavoritas.length > 0) {
        recetasFavoritasDiv.innerHTML = "";
        recetasFavoritas.forEach(nombre => {
            const apiUrl = "https://api.edamam.com/search";
            const appId = "48df38a3"; // Tu ID
            const appKey = "71ac8247772363bf40fb046add3db7e2"; // Tu clave
            const url = `${apiUrl}?q=${nombre}&app_id=${appId}&app_key=${appKey}`;

            //Realiza una solicitud a la API de Edamam
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const receta = data.hits[0].recipe;
                    const recetaElement = document.createElement("article");
                    recetaElement.className = "receta-card";
                    recetaElement.innerHTML = `
                        <a href="receta.html?nombre=${encodeURIComponent(nombre)}">
                            <img src="${receta.image}" alt="${receta.label}">
                            <h2>${receta.label}</h2>
                        </a>
                    `;
                    recetasFavoritasDiv.appendChild(recetaElement);
                })
                .catch(error => {
                    console.error("Error en la solicitud a la API", error);
                });
        });
    }
}
//Espera a que la página se cargue para mostrar las recetas favoritas.
document.addEventListener("DOMContentLoaded", function () {
    mostrarRecetasFavoritas();
});
