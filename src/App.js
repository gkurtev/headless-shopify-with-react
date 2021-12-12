import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShopContextProvider from './contexts/ShopContextProvider';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import { ChakraProvider } from '@chakra-ui/react';
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';

function App() {
  return (
    <div className='App'>
      <ChakraProvider>
        <ShopContextProvider>
          <Router>
            <Header />
            <CartDrawer />

            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/products/:handle' element={<ProductPage />} />
            </Routes>
          </Router>
        </ShopContextProvider>
      </ChakraProvider>
    </div>
  );
}

export default App;
