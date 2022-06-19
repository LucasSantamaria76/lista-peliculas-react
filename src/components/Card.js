import { Link } from 'react-router-dom';

const Card = ({ movie, addOrRemoveFav }) => {
  const { id, title, poster_path, release_date } = movie;

  const favMovies = localStorage.getItem('favMovies')
    ? JSON.parse(localStorage.getItem('favMovies'))
    : [];
  const isMovieExists = favMovies.find((movie) => movie.id === id);
  const titleMovie = title.length > 20 ? `${title.substring(0, 20)}...` : title;
  return (
    <div className='col-3'>
      <div className='card mb-3'>
        {poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            className='card-img-top'
            alt='Poster'
            height={400}
          />
        )}
        <div className='card-body'>
          <h5 className='card-title'>{titleMovie}</h5>
          <p className='card-text'>{`Fecha de estreno:  ${release_date
            ?.split('-')
            .reverse()
            .join('-')}`}</p>
          <Link to={`/detalle?id=${id}`} className='btn btn-secondary'>
            Ver más...
          </Link>
          <button
            type='button'
            className='btnFav'
            onClick={addOrRemoveFav}
            data-movie={JSON.stringify({ id, title, poster_path, release_date })}>
            {isMovieExists ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
