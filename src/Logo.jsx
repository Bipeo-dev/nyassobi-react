import { Link } from "react-router-dom";
import NyassobiLogo from "./assets/Nyassobi_logo.svg";

import styles from "./Logo.module.scss";

export default function Logo() {

    return (<div className={`${styles['nyassobi-logo']}`}>
        <Link to={`/`}>
            <div className={`${styles['logo']}`}>
                <img src={NyassobiLogo} />
            </div>
        </Link>
    </div>);
}