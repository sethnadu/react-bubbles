import React, { useState, useEffect } from "react";
import {axiosWithAuth} from "../Utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";


const BubblePage = (props) => {
  const [colorList, setColorList] = useState([]);
  useEffect(() => {
    axiosWithAuth()
        .get("http://localhost:5000/api/colors")
        .then(res => {
            console.log("get", res.data)
            setColorList(res.data)
        })
        .catch(error => console.log(error))
}, [setColorList])

  return (
    <>
      <ColorList {...props} colors={colorList} updateColors={setColorList}/>
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
