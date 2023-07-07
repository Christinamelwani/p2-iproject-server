const axios = require("axios");

async function searchMovies(query, page) {
  try {
    const movie = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.MOVIEDB_API_KEY}&language=en-US&page=${page}&include_adult=false`
    );

    return movie.data;
  } catch (err) {
    return err;
  }
}

async function discoverMovies(page) {
  try {
    let language = "en-US";

    const movies = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIEDB_API_KEY}&language=${language}&s}.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate
       `
    );

    return movies.data;
  } catch (err) {
    return err;
  }
}

async function getDetails(id) {
  try {
    const movie = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US`
    );

    return movie.data;
  } catch (err) {
    return err;
  }
}

async function getTrailer(movie) {
  try {
    const name = movie.original_title;
    const year = movie.release_date.slice(0, 4);
    let query = `${name} ${year} trailer`;

    const youtubeSearch = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${process.env.YOUTUBE_API_KEY}`
    );

    const embedLink = `https://www.youtube.com/embed/${youtubeSearch.data.items[0].id.videoId}?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=http://youtubeembedcode.com`;

    return embedLink;
  } catch (err) {
    return err;
  }
}

module.exports = { searchMovies, discoverMovies, getTrailer, getDetails };
