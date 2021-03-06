import { Link, NavLink } from 'react-router-dom';
import Buscador from './Buscador';
import { useNavigate } from 'react-router-dom';

const menu = ['Listado', 'Favoritos'];

const Header = ({ favoritos }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className='toolbar'></div>
      <header>
        <nav className='navbar navbar-expand navbar-dark bg-dark'>
          <div className='container-fluid'>
            <Link to='/' className='navbar-brand'>
              LuSoft
            </Link>
            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
              <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                {menu.map((item) => (
                  <li key={item} className='nav-item'>
                    <NavLink
                      to={`/${item.toLowerCase()}`}
                      className={({ isActive }) => `nav-link ${isActive && 'active'}`}>
                      {item}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {favoritos.length > 0 && (
              <button
                type='button'
                className='btnFav btnNav'
                onClick={() => navigate('/favoritos')}>
                ❤️
                <span className='position-absolute start-100 translate-middle badge rounded-circle bg-info'>
                  {favoritos.length}
                </span>
              </button>
            )}
            <Buscador />
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
