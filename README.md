<details>
<summary><strong>Sommaire</strong></summary>

- [Présentation](#présentation)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Variables d'environnement](#variables-denvironnement)
- [Commandes disponibles](#commandes-disponibles)
- [Intégration WordPress](#intégration-wordpress)
  - [Menus](#menus)
  - [Pages & Articles](#pages--articles)
  - [Blog](#blog)
  - [Actualités (carrousel accueil)](#actualités-carrousel-accueil)
- [Structure de navigation](#structure-de-navigation)
- [Notes diverses](#notes-diverses)

</details>

---

# Présentation

Application React (Vite) du site **Nyassobi**, connectée à WordPress via WPGraphQL.  
Elle consomme les menus, pages, articles et flux d'actualités directement depuis l'instance WordPress et expose un carrousel dynamique sur l'accueil.

# Prérequis

- Node.js ≥ 18
- Accès à une instance WordPress disposant du plugin **WPGraphQL**
- URL GraphQL fonctionnelle (ex: `https://mon-site.fr/graphql`)

# Installation

```bash
npm install
```

# Variables d'environnement

Créer un fichier `.env.local` à la racine avec :

```bash
VITE_WORDPRESS_GRAPHQL_URL=https://mon-site.fr/graphql
```

Cette variable remplace l'endpoint WordPress par défaut (`http://react-nyassobi.local/graphql`).

# Commandes disponibles

| Commande           | Description                           |
| ------------------ | ------------------------------------- |
| `npm run dev`      | Démarre l'environnement de développement |
| `npm run build`    | Compile l'application pour la production |
| `npm run preview`  | Sert la build locale pour validation  |

# Intégration WordPress

## Menus

- Le hook `useMenu` (`src/hooks/createWPMenu.ts`) interroge WPGraphQL via `menus(where: { location: PRIMARY })`.
- Les URLs du menu sont normalisées : les liens internes WordPress pointent vers le router React, les liens externes restent absolus/mailto.
- Le composant `Navbar` affiche les entrées et gère automatiquement les sous-menus.

## Pages & Articles

- Le composant `WordPressPage` (`src/pages/WordPressPage.jsx`) se charge de toutes les routes non explicites.
- `nodeByUri` est interrogé avec le chemin courant : si le contenu est introuvable, une erreur 404 est remontée pour afficher la page d'erreur globale.
- Un composant `Loader` (`src/components/Loader.jsx`) affiche une animation de chargement plein écran pendant les requêtes.
- Les hooks `useWordPressPages` et `useWordPressPosts` (`src/hooks/useWordPressContent.ts`) exposent des listings normalisés pouvant être réutilisés ailleurs.
- La page `Contact` (`/contact`) propose un formulaire mailto et réutilise le widget social du footer pour afficher tous les réseaux.

## Blog

- Route React dédiée `/blog` (`src/pages/BlogIndex.jsx`).
- `BlogIndex` liste les 20 derniers articles triés du plus récent au plus ancien.
- Chaque entrée renvoie vers sa page WordPress (`/blog/mon-article/`) gérée par `WordPressPage`.

## Actualités (carrousel accueil)

- L'accueil (`src/pages/HomePage.jsx`) charge les 9 dernières actualités via `useWordPressPosts`.
- `NyassoCarousel` affiche chaque article :
  - Slide image si WP fournit une image mise en avant.
  - Slide texte sinon (titre uniquement).
  - La pagination utilise les titres plutôt que « Slide X ».
- Le sous-titre « News » est synchronisé sur le titre de la slide active.

# Structure de navigation

| Route React | Contenu |
| ----------- | ------- |
| `/` | Accueil avec carrousel |
| `/adhesion`, `/donation`, `/prestation`, `/mentions-legales`, `/contact` | Pages statiques locales |
| `/blog` | Listing des articles WordPress |
| Toute autre route | `WordPressPage` via WPGraphQL (pages/posts) |

# Notes diverses

- Des avertissements Sass (API legacy & `mixed-decls`) apparaissent au build ; ils n'empêchent pas la compilation mais il faudra migrer vers la nouvelle API avant Sass 2.0.
- Un masque SVG (`src/WaveJoinOrganization.module.scss`) est résolu côté navigateur : Vite laisse `./svg.svg` tel quel par design.
- Les gros assets (images > 500 kB) déclenchent des warnings de taille Rollup ; prévoir une optimisation si nécessaire.
