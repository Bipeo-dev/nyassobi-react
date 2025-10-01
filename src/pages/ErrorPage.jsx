import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

import styles from './ErrorPage.module.scss';

import NyassoGamer from "../assets/Nyasso_Gamer.png";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className={styles['errorPage']} id="error-page">
        <div className={styles['errorComponent']}>
            <h1 className={styles['errorComponentTitle']}>Oops!</h1>
            <p>Nyassobi as perdu votre page !</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <Link to={`/`}>
                <div className={`${styles['item']}`}>Retourner sur la page d'accueil</div>
            </Link>
            <img className={styles['gamerCat']} src={NyassoGamer} />

        </div>

    </div>
  );
}