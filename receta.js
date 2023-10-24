import { toggleFavorita } from "./favorites.js";

// Base de datos simulada para calificaciones con estrellas
const recetaCalificaciones = {};

document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const nombreReceta = params.get("nombre");

    if (nombreReceta) {
        const apiUrl = "https://api.edamam.com/search";
        const appId = "48df38a3"; // Tu ID
        const appKey = "71ac8247772363bf40fb046add3db7e2"; // Tu clave
        const url = `${apiUrl}?q=${nombreReceta}&app_id=${appId}&app_key=${appKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const detalleRecetaDiv = document.getElementById("detalle-receta");
                const receta = data.hits[0].recipe;

                // Mostrar los detalles de la receta en la página de detalles
                detalleRecetaDiv.innerHTML = `
                    <h2>${receta.label}</h2>
                    <img src="${receta.image}" alt="${receta.label}">
                    <h3>Ingredientes:</h3>
                    <ul>
                        ${receta.ingredientLines.map(ingrediente => `<li>${ingrediente}</li>`).join('')}
                    </ul>
                    <div id="star-rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <button id="favorito-button" class="toggle-button">
                        &#10084; <!-- Corazón -->
                    </button>
                `;

                // Botón para agregar a favoritos
                const favoritoButton = document.getElementById("favorito-button");
                favoritoButton.addEventListener("click", function () {
                    // Agrega la receta actual a tus favoritos
                    toggleFavorita(nombreReceta);
                    favoritoButton.classList.toggle("active");
                });

                // Función para calificar la receta con estrellas
                function calificarReceta() {
                    const estrellas = document.querySelectorAll("#star-rating i");

                    estrellas.forEach((estrella, index) => {
                        estrella.addEventListener("click", () => {
                            const calificacion = index + 1;
                            recetaCalificaciones[nombreReceta] = calificacion;

                            // Cambia el color de las estrellas seleccionadas a amarillo
                            estrellas.forEach((estrella, i) => {
                                if (i <= index) {
                                    estrella.classList.add("rated");
                                } else {
                                    estrella.classList.remove("rated");
                                }
                            });
                        });
                    });

                    // Mostrar la calificación guardada
                    const calificacion = recetaCalificaciones[nombreReceta];
                    if (calificacion) {
                        estrellas[calificacion - 1].click();
                    }
                }

                // Llamar a la función para calificar la receta
                calificarReceta();
            })
            .catch(error => {
                console.error("Error en la solicitud a la API", error);
            });
    }
});