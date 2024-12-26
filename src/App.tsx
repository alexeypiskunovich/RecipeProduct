import React from 'react';
import HeaderNavbar from './Header/HeaderNavbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainProducts from './MainPart/MainProducts';
import Favorites from './Favorites.tsx/Favorites';
import ProductDetails from './ProductsDetails/ProductsDetails';
import CreateProducts from './CreateProducts/CreateProducts';



const App: React.FC = () => {
  return (
    <>
    <HeaderNavbar/>
      
    <Routes>
     <Route path="/" element={<Navigate to="/main" replace />} />
     <Route path="/main" element={<MainProducts/>}/>
     <Route path="/myFavorite" element={<Favorites/>}/>
     <Route path="/products/:id" element={<ProductDetails/>}/>
     <Route path="/create" element={<CreateProducts/>}/>
    </Routes>
    </>
  );
};

export default App;