import './MovieDetails.css';
import Lists from '../Lists/Lists'

function MovieDetails( { movieDetails, className }) {
    const classes = `MovieDetails ${className}`
    const extraInfo = [
      movieDetails.original_language,
      movieDetails.popularity,
      movieDetails.release_date
    ]
  return (
    <section className={classes}>
      <img src={movieDetails.backdrop_path} alt={movieDetails.title}></img>
      <h1>{movieDetails.title}</h1>
      <Lists list_info={movieDetails.genre_ids}/>
      <p>{movieDetails.overview}</p>
      <Lists list_info={extraInfo} />
    </section>
  );
}

export default MovieDetails;
