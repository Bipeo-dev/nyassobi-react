import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import HttpsRedirect from "react-https-redirect";
import Root from './routes/root';
import ErrorPage from './pages/ErrorPage';
import LegalsMentionPage from './pages/LegalsMentionPage';
import HomePage from './pages/HomePage';
import AdhesionPage from './pages/AdhesionPage';
import DonationPage from './pages/DonationPage';
import { AnimatePresence } from 'motion/react';
import PrestationPage from './pages/PrestationPage';
import { ApolloProvider } from '@apollo/client/react';
import wordPressClient from './api/wordPressQuery';
import WordPressPage from './pages/WordPressPage';
import BlogIndex from './pages/BlogIndex';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage/>
      },
      {
        path: "mentions-legales",
        element: <LegalsMentionPage/>
      },
      {
        path: "adhesion",
        element: <AdhesionPage/>
      },
      {
        path: "donation",
        element: <DonationPage/>
      },
      {
        path: "prestation",
        element: <PrestationPage/>
      },
      {
        path: "blog",
        element: <BlogIndex/>
      },
      {
        path: "*",
        element: <WordPressPage/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <ApolloProvider client={wordPressClient}>
      <HttpsRedirect>
        <AnimatePresence>
          <RouterProvider router={router} />
        </AnimatePresence>
      </HttpsRedirect>
    </ApolloProvider>
  </React.StrictMode>,
)
