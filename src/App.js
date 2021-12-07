import ShopContextProvider from './contexts/ShopContextProvider';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className='App'>
      <ShopContextProvider>
        <HomePage />
      </ShopContextProvider>
    </div>
  );
}

export default App;
