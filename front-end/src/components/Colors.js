import React,{useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { getAllColors } from "../features/color/colorSlice";
const Colors = () => {
  const dispatch = useDispatch()
  const colorState = useSelector((state)=>state.color.allColors)
  useEffect(()=>{
    dispatch(getAllColors())
  },[])
  console.log(colorState)
  return (
    <>
    
 <ul className="colors ps-0  d-flex list-unstyled">
 {colorState?.map((color)=>(
          <li key={color.id} className="color-item me-2" style={{ backgroundColor: color.title }}>
          </li>

    ))}
     </ul>
    </>
  );
};

export default Colors;
