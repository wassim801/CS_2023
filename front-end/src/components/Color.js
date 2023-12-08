import React from "react";
import { useSelector } from "react-redux";
const Color = () => {
  const colorState = useSelector((state)=>state.color.colorList)
console.log(colorState)
  return (
    <>
    
 <ul className="colors ps-0  d-flex list-unstyled">
 {colorState?.color?.map((color)=>(
          <li key={color.id} className="color-item me-2" style={{ backgroundColor: color.title }}>
          </li>

    ))}
     </ul>
    </>
  );
};

export default Color;
