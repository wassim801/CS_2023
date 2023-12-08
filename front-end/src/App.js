import React from 'react';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Forgotpassword from './pages/Forgotpassword';
import CheckEmail from './pages/CheckEmail';
import Verify from './pages/verify';
import SingleProduct from './pages/SingleProduct';
import Wishlist from './pages/Wishlist';
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OurStore from './pages/OurStore';
import Suppliers from './pages/suppliers';
import SingleBlog from './pages/SingleBlog';
import Blog from './pages/Blog';
import { StripeProvider } from 'react-stripe-elements';
import Profile from './pages/Profile';
import Orders from './pages/OrdersList';
import CompareProduct from './pages/CompareProducts';
import EducateAdvocatePage from './pages/climate';
import DesertificationPage from './pages/desertification';

function App() {
  return (
    <>

    <BrowserRouter>
    <Routes>
    

      <Route path="/" element={ <Layout />} >
      <Route path='suppliers' element={<Suppliers />}/>

        <Route index element={<Home />}/>
        <Route path="educate_climate" element={<EducateAdvocatePage/>}/>
        <Route path="educate_deseritifiction" element={<DesertificationPage/>}/>


        <Route path="about" element={<About />}/>
        <Route path="contact" element={<Contact />}/>
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="product" element={<OurStore />} />


        <Route path='login' element={<Login />}/>
        <Route path='signup' element={<Signup />}/>
        <Route path='forgot-password' element={<Forgotpassword />}/>
        <Route path='check' element={<CheckEmail/>}/>
        <Route path="product/:id" element={<SingleProduct />} />
        <Route path="blogs" element={<Blog />} />

        <Route path="blog/:id" element={<SingleBlog />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path='profile' element={<Profile/>}/>
        <Route path='list_commande' element={<Orders/>}/>
        <Route path="compare-product" element={<CompareProduct />} />





      </Route>

      <Route path='verify/:token' element={<Verify/>}/>

    </Routes>
    </BrowserRouter>

      
    </>
  );
}

export default App;
