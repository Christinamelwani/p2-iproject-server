const { truncateMovieList } = require("../helpers/truncateMovieList");
const {
  searchMovies,
  getDetails,
  discoverMovies,
  getTrailer,
} = require("../helpers/apiHelper");

class movieController {
  static async getMainFeed(req, res, next) {
    try {
      let movieList = [];

      let { page, query } = req.query;

      if (!page) {
        page = 1;
      }

      if (query) {
        movieList = await searchMovies(query, page);
      } else {
        movieList = await discoverMovies(page);
      }

      movieList.results = truncateMovieList(movieList.results);

      res.status(200).json(movieList);
    } catch (err) {
      next(err);
    }
  }

  static async getDetails(req, res, next) {
    try {
      let { id } = req.params;

      const movie = await getDetails(id);

      if (movie.response) {
        throw { name: "not found", message: "Movie not found" };
      }

      movie.trailer = await getTrailer(movie);

      res.status(200).json(movie);
    } catch (err) {
      next(err);
    }
  }

  static async searchMovies(req, res, next) {
    try {
      let { query } = req.params;
      let { page } = req.body;

      if (!page) {
        page = 1;
      }

      const movieList = await searchMovies(query, page);

      movieList.results = truncateMovieList(movieList.results);

      res.status(200).json(movieList);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = movieController;
