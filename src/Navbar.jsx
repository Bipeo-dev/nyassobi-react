import styles from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useMenu } from './hooks/createWPMenu';

function Navbar() {
  const [menuBurgerCss, setMenuBurgerCss] = useState(styles['unclicked']);
  const [menuClass, setMenuClass] = useState(`${styles['menu-mobile']} ${styles['hidden']}`);
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const { menuItems, loading, error } = useMenu();

  const updateMenu = () => {
    if (!isMenuClicked) {
      setMenuBurgerCss(styles['clicked']);
      setMenuClass(`${styles['menu-mobile']} ${styles['visible']}`);
    } else {
      setMenuBurgerCss(styles['unclicked']);
      setMenuClass(`${styles['menu-mobile']} ${styles['hidden']}`);
    }

    setIsMenuClicked(!isMenuClicked);
  };

  const topLevelItems = useMemo(() => menuItems ?? [], [menuItems]);

  const renderMenuLink = (item, keySuffix = '') => {
    const isExternal = item.path.startsWith('http') || item.path.startsWith('mailto:');

    if (isExternal) {
      const isMailto = item.path.startsWith('mailto:');

      return (
        <div key={`${item.id}${keySuffix}`} className={styles['item']}>
          <a
            href={item.path}
            target={isMailto ? undefined : '_blank'}
            rel={isMailto ? undefined : 'noreferrer noopener'}
          >
            {item.label}
          </a>
        </div>
      );
    }

    return (
      <NavLink
        key={`${item.id}${keySuffix}`}
        className={(navData) => (navData.isActive ? styles['active'] : '')}
        to={item.path}
      >
        <div className={styles['item']}>{item.label}</div>
      </NavLink>
    );
  };

  const renderMenuItem = (item) => {
    if (item.children.length > 0) {
      return (
        <div key={item.id} className={`${styles['menu-deroulant']} ${styles['active']}`}>
          {renderMenuLink(item, '-parent')}
          <div className={styles['sous-menu']}>
            {item.children.map((child) => renderMenuLink(child, '-child'))}
          </div>
        </div>
      );
    }

    return renderMenuLink(item);
  };

  const interleaveSeparators = (items) => {
    const result = [];

    items.forEach((item, index) => {
      result.push(renderMenuItem(item));

      if (index < items.length - 1) {
        result.push(
          <div key={`separator-${index}`} style={{ color: 'white' }}>
            |
          </div>,
        );
      }
    });

    return result;
  };

  return (
    <>
      <div className={styles['nav']}>
        {loading && <div className={styles['item']}>Chargement...</div>}
        {error && !loading && (
          <div className={styles['item']}>Impossible de charger le menu</div>
        )}
        {!loading && !error && interleaveSeparators(topLevelItems)}

        {/* <div className={styles['nav-mobile']}>
          <div className={styles['hamburger']} onClick={updateMenu}>
            <span className={`${styles['barHamburger']} ${menuBurgerCss}`}></span>
            <span className={`${styles['barHamburger']} ${menuBurgerCss}`}></span>
            <span className={`${styles['barHamburger']} ${menuBurgerCss}`}></span>
          </div>
        </div>
        <div className={menuClass}>
          <NavLink className={(navData) => (navData.isActive ? styles['active'] : '')} to={'/'}>
            <div className={styles['item']}>Accueil</div>
          </NavLink>
          <NavLink className={(navData) => (navData.isActive ? styles['active'] : '')} to={'/donation'}>
            <div className={styles['item']}>Faire un don</div>
          </NavLink>
          <NavLink className={(navData) => (navData.isActive ? styles['active'] : '')} to={'mailto:nyassobi.association@gmail.com'}>
            <div className={styles['item']}>Contact</div>
          </NavLink>
        </div> */}
      </div>
    </>
  );
}

export default Navbar;
