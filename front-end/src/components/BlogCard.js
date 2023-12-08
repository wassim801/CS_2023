import React from "react";
import { Link } from "react-router-dom";

const BlogCard = () => {
  return (
    <div className="blog-card">
      <div className="card-image">
        <img src="images/blogclim.jpg" className="img-fluid w-100" alt="blog" style={{ width: '305px',  height: '330px' }}
 />
      </div>
      <div className="blog-content">
        <p className="date">18 Dec, 2023</p>
        <h5 className="title">NASA Climate Change</h5>
        <p className="desc">
        Understanding our planet to benefit humankind
        </p>
        <Link to="/blog/:id" className="button">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
