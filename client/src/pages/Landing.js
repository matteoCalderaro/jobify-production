import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Tieni traccia delle candidature che hai inviato. Registrati ed
            effettua il login per utilizzare tutte le funzionalità oppure naviga
            in modalità demo e visualizza una serie di candidature
            preselezionte.
          </p>
          <Link
            to="/register"
            className="btn btn-hero"
            style={{ textTransform: 'none' }}
          >
            Vai al sito...
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
