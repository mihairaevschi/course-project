import React from 'react';
import App from './App';
import './global.styles.scss';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { UserProvider } from './context/user.context';
import { ProductsProvider } from './context/products.context';
import { CartProvider } from './context/cart.context';
//1
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <UserProvider>
            <ProductsProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </ProductsProvider>
        </UserProvider>
    </BrowserRouter>
);

reportWebVitals();
