import React, { useState, useEffect } from "react";
import {axiosWithAuth} from "../Utils/axiosWithAuth";
import FormikAddColor from "./newColor.js"


const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {

  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [updatedColor, setUpdatedColor] = useState([])
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const Run = () => {
    axiosWithAuth()
        .get("http://localhost:5000/api/colors")
        .then(res => {
            console.log("get", res.data)
            updateColors(res.data)
        })
        .catch(error => console.log(error))
}


  const saveEdit = e => {
    e.preventDefault()
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log("edit", res.data)
        Run()
        
      })
      .catch(error => console.log(error))
   
  }

console.log(colors)
  const deleteColor = color => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => {
        console.log("delete", res.data)
        Run()
        })
      .catch(error => console.log(error))
   
  };


  console.log(colors)
  
console.log(updatedColor)


  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <button className="delete" onClick={() => deleteColor(color)}>
                x
              </button>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div />
      <FormikAddColor updateColors = {updateColors} colors = {colors} Run = {Run}/>
    </div>
  );
};

export default ColorList;
