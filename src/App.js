import Main from './components/Main';
import './App.css';
import { useContext} from 'react';
import ItemData from './store/central-store';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditScreen from './components/screeens/EditScreen';
import AddScreen from './components/screeens/AddScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import { Navigate } from 'react-router-dom';

function App() {
  const itemCtx = useContext(ItemData);
  const foundItem = itemCtx.foundItem;


  return (
    <Router>
    <>
      <Header />
      <Main />
      <Footer />
      <Routes>
        <Route
          path={`/edit/:${itemCtx.activeItemId}`}
          element={
            foundItem !== undefined ? (
              <EditScreen
                title={foundItem.title}
                desc={foundItem.description.slice(0, 50)}
                brand={foundItem.brand}
                price={foundItem.price}
                category={foundItem.category}

              />
            ) : null
          }
        />
        <Route path="/add" element={<AddScreen />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  </Router>
    )
}

export default App;
