const axios = require("axios");

async function searchMovies(query, page) {
  try {
    const baseImgUrl = "https://image.tmdb.org/t/p/w1280/";
    const api_key = "b9d4f31633d3e1a560efbacde8f4ef60";
    const findMovie = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${api_key}&language=en-US&page=${page}&include_adult=false`
    );
    return findMovie.data;
  } catch (err) {
    return err;
  }
}

async function discoverMovies(page) {
  try {
    const baseImgUrl = "https://image.tmdb.org/t/p/w1280/";
    const api_key = "b9d4f31633d3e1a560efbacde8f4ef60";
    let language = "en-US";
    const findMovie = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=${language}&s}.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate
       `
    );

    return findMovie.data;
  } catch (err) {
    return err;
  }
}

async function getDetails(id) {
  try {
    const baseImgUrl = "https://image.tmdb.org/t/p/w1280/";
    const api_key = "b9d4f31633d3e1a560efbacde8f4ef60";
    const sort = "popularity";
    const page = 1;
    let language = "id-ID";
    const findMovie = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`
    );

    return findMovie.data;
  } catch (err) {
    return err;
  }
}

async function getTrailer(movie) {
  try {
    const name = movie.original_title;
    const year = movie.release_date.slice(0, 4);
    let query = `${name} ${year} trailer`;
    const api_key = "AIzaSyBr4nk0Yd7jwIbGu3g_NSYAsbMI59L-_SU";
    const getTrailer = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${api_key}`
    );

    return `https://www.youtube.com/embed/${getTrailer.data.items[0].id.videoId}?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=http://youtubeembedcode.com`;
  } catch (err) {
    return err;
  }
}

module.exports = { searchMovies, discoverMovies, getTrailer, getDetails };
