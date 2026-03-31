var Genre;
(function (Genre) {
    Genre["Action"] = "action";
    Genre["Comedy"] = "comedy";
    Genre["Drama"] = "drama";
    Genre["Horror"] = "horror";
    Genre["SciFi"] = "sciFi";
    Genre["Documentary"] = "documentary";
})(Genre || (Genre = {}));
function filterByGenre(movies, genre) {
    const filteredMovies = movies.filter((m) => {
        return m.genre === genre;
    });
    return filteredMovies;
}
function getTopRated(movies) {
    const filteredRating = movies.filter((m) => {
        return m.rating >= 4;
    });
    return filteredRating;
}
function getSummary(movie) {
    const summary = [movie.title, movie.year];
    return summary;
}
const movies = [
    { title: "Inception", year: 2010, genre: Genre.SciFi, director: "Nolan", rating: 5 },
    { title: "The Mask", year: 1994, genre: Genre.Comedy, director: "Russell", rating: 4 },
    { title: "It", year: 2017, genre: Genre.Horror, director: "Muschietti", rating: 3 },
];
const filterResult = filterByGenre(movies, Genre.SciFi);
console.log(filterResult);
const topRatedResult = getTopRated(movies);
console.log(topRatedResult);
const summaryResult = getSummary(movies[0]);
console.log(summaryResult);
export {};
//# sourceMappingURL=index.js.map