import React from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { StoreProvider } from "./Store";
import Routes from "./Routes";
import ReactDOM from 'react-dom/client';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StoreProvider>
    <Routes />
  </StoreProvider>,
);
