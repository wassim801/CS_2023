import React,{useEffect,useState,useRef} from 'react'
import { NavLink , Link,useHistory,useLocation } from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import { useDispatch,useSelector } from 'react-redux'
import { getCart } from '../features/cart/cartSlice'
import { logOut, resetStateAuth } from '../features/auth/authSlice'
import { ReactSVG } from 'react-svg';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { researchProduct, sortByProduct } from '../features/product/productSlice'
import { FaClipboardList, FaBloggerB } from "react-icons/fa";




function Header() {
  const location = useLocation();
  const dispatch = useDispatch()
  const cartState = useSelector((state)=>state.cart.cart)
  const currentUser = useSelector((state)=> state.auth.user)
  const productsState = useSelector((state)=> state.product.sortByproducts)
  const searchSState = useSelector((state)=>state.product.researchProducts)
  const [searchValue, setSearchValue] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const searchInputRef = useRef(null); // Ref for the search input element

console.log(productsState)
  useEffect(()=>{
    dispatch(getCart())
  },[])
  const logOutUser = () => {
    localStorage.removeItem("user")
    dispatch(resetStateAuth())

   }
   const handleOpenTab = () => {
    window.open('http://localhost:3000/suppliers', '_blank');
  };


  const searchProducts= () => {
    dispatch(sortByProduct({query:searchValue}));
     // Update the URL with the search query
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('q', searchValue);

    // Programmatically focus on the search input element
  };
  useEffect(()=>{
    dispatch(researchProduct(searchValue))
  },[searchValue])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchProducts();
    } else if (e.key === 'Backspace' && searchValue === '') {
      // Handle the Backspace key press event when the search input is empty
      console.log('Perform some action when Backspace is pressed');
    }
  };
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSelectItem = (item) => {
    setSearchValue(item.title);
    // Do something with the selected item, e.g., navigate to a specific page
  };
  
  return (
    <>
      <header className='header-top-strip py-3'>
        <div className='container-xxl'>
            <div className='row'>
                <div className='col-6'>
                    <p className='text-white mb-0'>
                      Free shipping over $100 & Free Returns
                    </p>
                </div>
                <div className='col-6 '>
                    <p className='text-end text-white'>
                      Hotline:<a className='text-white' href='tel:+216 73455153'>+216 73455153</a>
                      </p>
                </div>
            </div>
        </div>
      </header>
      <header className='header-upper py-3'>
        <div className='container-xxl'>
          <div className='row align-items-center'>
            <div className='col-2'>
                <img src='/images/logo-waaa.svg' className='logo_laf'/>
                  
                </div>
            <div className='col-5'>
              <div className="input-group">
              <input
          type="text"
          className="form-control py-2"
          placeholder="Search product here"
          aria-label="Search product here"
          aria-describedby="basic-addon2"
          value={searchValue}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          
          
        />                 <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch onClick={searchProducts} className='fs-6'/>
                  </span>
             </div>
             {!searchValue ? null : (
             <Dropdown show>
                  <Dropdown.Menu >
                  {searchSState?.slice(0, 6).map((result) => (
                  <Dropdown.Item className={`search-result-item${selectedItem === result ? ' selected' : ''}`}
                      key={result._id} onClick={() =>{ handleSelectItem(result);setSearchValue(result.title)}} >
                        {/* Render the result details */}
                        <p>{result.title}</p>
                        {/* Add additional details as needed */}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
             )}
            </div>
            <div className='col-5'>
              <div className='header-upper-links d-flex align-items-center justify-content-between'>
                <div>
                  <Link className='d-flex align-items-center gap-10 text-white'to={"/compare-product"}>
                  <img src='/images/compare.svg' alt='compare'/>
                  <p className='mb-0'>
                    Compare <br/> products
                  </p>
                  </Link>
                </div>
                <div>
                <Link className='d-flex align-items-center gap-10 text-white' to={"/wishlist"}>
                  <img src='/images/wishlist.svg' alt='wishlist'/>
                  <p className='mb-0'>
                    Favourite <br/> wishlist
                  </p>
                  </Link>

                </div>
                {currentUser ? <div> <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >                <Link to="login" className='d-flex align-items-center gap-10 text-white'>
                  <img src='/images/user.svg' alt='user'/>
                  <p className='mb-0'>
                    Welcome <br/> {currentUser?.firstname}
                  </p>
                  </Link>

                </div>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/profile"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/login"
                    onClick={logOutUser}
                   
                    
                  >
                    Signout
                  </Link>
                </li>
              </div> </div>: <Link to="login" className='d-flex align-items-center gap-10 text-white'>
                  <img src='/images/user.svg' alt='user'/>
                  <p className='mb-0'>
                    Login <br/> My Account
                  </p>
                  </Link>}
                  <div>
                <Link className='d-flex align-items-center gap-10 text-white'to={"/list_commande"}>
                <FaClipboardList className="fs-4" />
                   <div className='d-flex flex-column gap-10'>
                   <p className='mb-0'>
                    Orders 
                  </p>
                   </div>
                  </Link>

                </div>
               
                <div>
                <Link className='d-flex align-items-center gap-10 text-white'to={"/cart"}>
                  <img src='/images/cart.svg' alt='cart'/>
                   <div className='d-flex flex-column gap-10'>
                    <span className='badge bg-white text-dark'>$ {cartState?.cartTotal}</span>
                    <p className='mb-0'>$ 500</p>
                   </div>
                  </Link>

                </div>
               

              </div>
            </div>


          </div>
        </div>
      </header>
      <header className='header-bottom py-3'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='menu-bottom d-flex align-items-center gap-30'>
                <div>
                  <div className="dropdown">
                      <button className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src='/images/menu.svg'/> <span className='me-5 d-inline-block'> Shop Categories</span>
                      </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                          <li><Link className="dropdown-item text-white" to="/">Action</Link></li>
                          <li><Link className="dropdown-item text-white" to="/">Another action</Link></li>
                          <li><Link className="dropdown-item text-white" to="/">Something else here</Link></li>
                        </ul>
                  </div>
                </div>
                <div className='menu-links'>
                  <div className='d-flex align-items-center gap-15'>
                    <NavLink style={{zIndex:"100"}} onClick={handleOpenTab}>Suppliers</NavLink>
                    <NavLink  to="/">Home</NavLink>
                    <NavLink to="/product">Our store</NavLink>
                    <NavLink to="/">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    
    </>
  )
}

export default Header