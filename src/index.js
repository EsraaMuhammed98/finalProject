import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "slick-carousel/slick/slick.css"; 
import 'animate.css'
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import UserContextProvider from './Context/userContext';

let queryClient= new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <QueryClientProvider client={queryClient}>
<UserContextProvider>
            <App />
</UserContextProvider>
     </QueryClientProvider>
);
