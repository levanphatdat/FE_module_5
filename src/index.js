import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {ListProduct} from "./components/list";
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import {EditProduct} from "./components/editProduct";
import './handle_.css';
import './page.css';
import {CreateProduct} from "./components/createProduct";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<ListProduct/>}/>
                <Route path={'/edit/:id'} element={<EditProduct/>}/>
                <Route path={'/create'} element={<CreateProduct/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
