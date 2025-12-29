
import './App.css';
import Home from './pages/Home/Home';
import {  Route, Routes } from "react-router-dom";
import { Header } from './components/Header/Header';
import { Wishlist } from './pages/Wishlist/Wishlist';
import { MyLibrary } from './pages/My-Library/My-Library';
import { CardDetails } from './pages/Card-Details/Card-Details';
import { NotFound } from './pages/Not-Found/Not-Found';



function App() {
 return (
    <div>
      <Header/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/my-library" element={<MyLibrary />} />
            <Route path="/game/:id" element={<CardDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
    </div>
 )
}

export default App;