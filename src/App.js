import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShopContextProvider from './contexts/ShopContextProvider';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <div className='App'>
      <ChakraProvider>
        <ShopContextProvider>
          <Router>
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
