function truncateMovieList(movieList_results) {
  const modifiedMovieList = [];

  movieList_results.forEach((el) => {
    modifiedMovieList.push({
      title: el.title,
      id: el.id,
      overview: el.overview,
      poster_path: el.poster_path,
      release_date: el.release_date,
      original_language: el.original_language,
    });
  });

  return modifiedMovieList;
}

module.exports = { truncateMovieList };
