const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'b01eea9d05d74526619780df930a7ed3';

async function fetchQuery(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}


export function fetchTrendingFilms(){
return  fetchQuery(`${BASE_URL}/trending/movie/week?page=1&api_key=${API_KEY}`)
};

export function fetchSearchingFilms(query){
return  fetchQuery(`${BASE_URL}/search/movie?page=1&api_key=${API_KEY}&query=${query}`)
};

export function fetchFilmDetails(movieId){
return  fetchQuery(`${BASE_URL}/movie/${movieId}?page=1&api_key=${API_KEY}`)
};

export function fetchFilmCast(movieId){
return  fetchQuery(`${BASE_URL}/movie/${movieId}/credits?page=1&api_key=${API_KEY}`)
};

export function fetchFilmReview(movieId){
return  fetchQuery(`${BASE_URL}/movie/${movieId}/reviews?page=1&api_key=${API_KEY}`)
};