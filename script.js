function buscarRecetas() {
    const input = document.getElementById("recipe-query").value;

    // Realiza una solicitud a la API de Edamam
    const apiUrl = "https://api.edamam.com/search";
    const appId = "48df38a3"; // Tu ID
    const appKey = "71ac8247772363bf40fb046add3db7e2"; // Tu clave
    const url = `${apiUrl}?q=${input}&app_id=${appId}&app_key=${appKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            mostrarRecetas(data.hits);
        })
        .catch(error => {
            console.error("Error en la solicitud a la API", error);
        });
}

// Escucha el evento de envío del formulario con el ID "recipe-search-form".

document.getElementById("recipe-search-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que el formulario se envíe por defecto
    buscarRecetas();
});

// Muestra las recetas en la página.
function mostrarRecetas(recetas) {
    const recetasDiv = document.getElementById("recetas");
    recetasDiv.innerHTML = "";//Limpia el contenedor de recetas.

    //Recorre cada receta y crea un elemento HTML para mostrarla.
    recetas.forEach(receta => {
        const nombre = receta.recipe.label;//Nombre de la receta
        const imagen = receta.recipe.image;//Imagen de la receta
        const enlace = `receta.html?nombre=${encodeURIComponent(nombre)}`;//Enlace a la página de detalles

        //Crea un elemento HTML para mostrar la receta.
        const recetaCard = document.createElement("article");
        recetaCard.className = "receta-card";//Agrega la clase "receta-card" al elemento.
        recetaCard.innerHTML = `
            <a href="${enlace}"> <!-- Enlace a la página de detalles -->
                <img src="${imagen}" alt="${nombre}">
                <h2>${nombre}</h2>
            </a>
        `;

        recetasDiv.appendChild(recetaCard);
    });
}
