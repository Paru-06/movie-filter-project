document.addEventListener("DOMContentLoaded", function () {
    const movieContainer = document.getElementById("movieContainer");
    const chips = document.querySelectorAll(".chip");

    let selectedFilters = {
        genre: null,
        rating: null,
        year: null
    };

    function displayMovies(filteredMovies) {
        movieContainer.innerHTML = "";
        filteredMovies.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            movieCard.innerHTML = `
                <h3>${movie.title}</h3>
                <p><strong>Genre:</strong> ${movie.genre}</p>
                <p><strong>Release Date:</strong> ${movie.releaseDate}</p>
                <p><strong>Rating:</strong> ${movie.rating}★</p>
            `;
            movieContainer.appendChild(movieCard);
        });
    }

    function filterMovies() {
        let filteredMovies = movies.filter(movie => {
            const genreMatch = selectedFilters.genre === null || movie.genre.includes(selectedFilters.genre);
            const ratingMatch = selectedFilters.rating === null || selectedFilters.rating === movie.rating.toString();
            const yearMatch = selectedFilters.year === null || movie.releaseDate.includes(selectedFilters.year);

            return genreMatch && ratingMatch && yearMatch;
        });

        displayMovies(filteredMovies);
    }

    chips.forEach(chip => {
        chip.addEventListener("click", function () {
            const category = this.dataset.genre ? "genre" : this.dataset.rating ? "rating" : "year";
            const value = this.dataset[category];

            // *Ensure only one Genre, Rating, or Year chip is active at a time*
            selectedFilters[category] = value;

            // Remove 'selected' class from all chips in the same category
            document.querySelectorAll(`.chip[data-${category}]`).forEach(c => c.classList.remove("selected"));

            // Add 'selected' class to the clicked chip
            this.classList.add("selected");

            filterMovies();
        });
    });

    displayMovies(movies);
});
