document.getElementById('searchButton').addEventListener('click', searchMovies);
// => para escribir el nombre de la pelicula y mandarlo

let api_key = '';  // Api key generada en nuestro registro
let urlBase = ''; // Url para acceder a las peliculas
let urlImg = ''  // Url pára permitirnos visualizar la imagen de cada pelicula en la lista


let resultContainer = document.getElementById('results')
// Resultados de de busqueda

function searchMovies() {

    resultContainer.innerHTML = 'Cargando...' // Mostrar mensaje  cuandos se este generando los resultados

    let searchInput = document.getElementById('searchInput').value // Recibimos el nombre de entrada del peli

    fetch(`${urlBase}?api_key=${api_key}&query=${searchInput}`)
        .then(response => response.json())
        .then(response => displayMovies(response.results))
    // Peticion de los datos a la Url, agregando la api y el nombre de la pelicula
    // para realizar la busqueda

}

function displayMovies(movies) {

    resultContainer.innerHTML = ''

    if (movies.length === 0) {
        resultContainer.innerHTML = '<p>No hay resultados de tu búsqueda</p>'
        return  // Si no se escribe el nombre de la pelicula y se presiona buscar , 
        //  se notifica que no hay resultados, asi como tambien no se encuentren estos
    }

    movies.forEach(movie => {
        let movieDiv = document.createElement('div') // Div para cada resultado, mostrando inf de la pelicula
        movieDiv.classList.add('movie')

        let title = document.createElement('h2')
        title.textContent = movie.title

        let releaseDate = document.createElement('p')
        releaseDate.textContent = 'Fecha de lanzamiento: ' + movie.release_date

        let overview = document.createElement('p')
        overview.textContent = 'Sinopsis: ' + movie.overview


        let posterPath = urlImg + movie.poster_path
        let poster = document.createElement('img')
        poster.src = posterPath

        movieDiv.appendChild(poster)
        movieDiv.appendChild(title)
        movieDiv.appendChild(releaseDate)
        movieDiv.appendChild(overview)

        resultContainer.appendChild(movieDiv)
        // Agregando la lista con la información de cada película

    });


}