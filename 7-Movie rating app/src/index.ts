// ==========================================================================

// project 7 ===> movie rating app

// ==========================================================================

enum Genre {
    Action = "action",
    Comedy = "comedy",
    Drama = "drama",
    Horror = "horror",
    SciFi = "sciFi",
    Documentary = "documentary"
}

type Rating = 1 | 2 | 3 | 4 | 5

type MovieSummary = [string, number]

type Movie = {
    title: string
    year: number
    genre: Genre
    director: string
    rating: Rating
}

function filterByGenre(movies: Movie[], genre: Genre): Movie[] {
    const filteredMovies = movies.filter((m) => {
        return m.genre === genre
    })

    return filteredMovies
}

// TODO: implement getTopRated — rating 4 or 5 only
function getTopRated(movies: Movie[]): Movie[] {
    const filteredRating = movies.filter((m) => {
        return m.rating >= 4
    })

    return filteredRating
}

function getSummary(movie: Movie): MovieSummary {
    const summary: MovieSummary = [movie.title, movie.year]

    return summary
}


const movies: Movie[] = [
    { title: "Inception", year: 2010, genre: Genre.SciFi, director: "Nolan", rating: 5 },
    { title: "The Mask", year: 1994, genre: Genre.Comedy, director: "Russell", rating: 4 },
    { title: "It", year: 2017, genre: Genre.Horror, director: "Muschietti", rating: 3 },
]

const filterResult = filterByGenre(movies, Genre.SciFi)
console.log(filterResult)
// [{ title: "Inception", ... }]

const topRatedResult = getTopRated(movies)
console.log(topRatedResult)
// [{ title: "Inception", rating: 5 }, { title: "The Mask", rating: 4 }]

const summaryResult = getSummary(movies[0]!)
console.log(summaryResult)
// ["Inception", 2010]