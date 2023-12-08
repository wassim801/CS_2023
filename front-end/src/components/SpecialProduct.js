import React,{useEffect,useState} from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import moment from "moment";

const SpecialProduct = ({tags}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state.product.products);
  const [data1, setData1] = useState([]);
  const [timers, setTimers] = useState([]);
  const [now, setNow] = useState(moment());


  useEffect(() => {
    setData1(
      productState?.filter((product) => product.tags === tags)
      )
  
  }, [productState, tags]);
  const filteredProducts = data1.filter(
    (product) => moment(product.endDate).isAfter(now)
     && moment(now).isAfter(product.startDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimers = filteredProducts.map((product) => {
        const now = moment();
        const diff = moment(product.endDate).diff(now);
        const duration = moment.duration(diff);
        const days = duration.days();
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
      });
      setTimers(updatedTimers);
    }, 1000);
    return () => clearInterval(interval);
  }, [data1]);


  useEffect(() => {
    const interval = setInterval(() => {
      setNow(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  


  return (
    <>
    {filteredProducts.map((product,index) => (
      <div className="col-6 mb-3">
        <div className="special-product-card">
          <div className="d-flex justify-content-between">
            <div>
              <Link to={`product/${product._id}`}>
              <img src={product.images[0].url} className="img-fuild" alt="watch"style={{ borderRadius: "10%" }} width="327" height="290" />
              </Link>
            </div>
            <div className="special-product-content">
              <h5 className="brand">{product.brand}</h5>
              <h6 className="title">
                {product.title}
              </h6>
              <ReactStars
                count={5}
                size={24}
                value={ product.totalrating ? product.totalrating : 0  }
                edit={false}
                activeColor="#ffd700"
              />
              <p className="price">
                <span className="red-p"><strike> ${product?.price}</strike></span> &nbsp; ${(product.price*(100-product?.discount)/100)}
              </p>
              <div className="discount-till d-flex align-items-center gap-10">
                <p className="mb-0">
                  {timers[index]?.split(' ')[0] } ays
                </p>
                <div className="d-flex gap-10 align-items-center">
                  <span className="badge rounded-circle p-3 bg-danger"> {timers[index]?.split(' ')[1] }</span>:
                  <span className="badge rounded-circle p-3 bg-danger"> {timers[index]?.split(' ')[2] }</span>:
                  <span className="badge rounded-circle p-3 bg-danger"> {timers[index]?.split(' ')[3] }</span>
                </div>
              </div>
              <div className="prod-count my-3">
                <p>Products: {product.key}</p>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: "25%" }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <Link className="button">Add to Cart</Link>
            </div>
          </div>
        </div>
      </div>
       ))}
    </>
  );
};

export default SpecialProduct;
