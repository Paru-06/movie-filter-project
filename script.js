document.addEventListener("DOMContentLoaded", () => {
    const movieList = document.getElementById("movie-list");
    const genreFilters = document.getElementById("genre-filters");
    const ratingFilters = document.getElementById("rating-filters");
    const yearFilters = document.getElementById("year-filters");

    let selectedFilters = { genre: null, rating: null, year: null };

    function renderMovies() {
        movieList.innerHTML = "";
        let filteredMovies = movies.filter(movie => {
            return (!selectedFilters.genre || movie.genre.includes(selectedFilters.genre)) &&
                   (!selectedFilters.rating || movie.rating === selectedFilters.rating) &&
                   (!selectedFilters.year || movie.year === selectedFilters.year);
        });

        filteredMovies.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            movieCard.innerHTML = `<h2>${movie.title}</h2><p>${movie.genre}</p><p>Year: ${movie.year}</p><p>Rating: ${movie.rating}</p>`;
            movieList.appendChild(movieCard);
        });
    }

    function createFilterButtons(data, container, type) {
        container.innerHTML = "";
        const uniqueFilters = [...new Set(movies.map(movie => movie[type]))];
        
        uniqueFilters.forEach(filter => {
            const button = document.createElement("button");
            button.classList.add("chip");
            button.innerText = filter;
            button.addEventListener("click", () => {
                if (selectedFilters[type] === filter) {
                    selectedFilters[type] = null;
                    button.classList.remove("active");
                } else {
                    selectedFilters[type] = filter;
                    resetActiveButtons(container);
                    button.classList.add("active");
                }
                renderMovies();
            });
            container.appendChild(button);
        });
    }

    function resetFilters() {
        selectedFilters = { genre: null, rating: null, year: null };
        document.querySelectorAll(".chip").forEach(btn => btn.classList.remove("active"));
        document.getElementById("all").classList.add("active");
        renderMovies();
    }

    function resetActiveButtons(container) {
        container.querySelectorAll(".chip").forEach(btn => btn.classList.remove("active"));
    }

    document.getElementById("all").addEventListener("click", resetFilters);

    createFilterButtons(movies, genreFilters, "genre");
    createFilterButtons(movies, ratingFilters, "rating");
    createFilterButtons(movies, yearFilters, "year");

    renderMovies();
});
