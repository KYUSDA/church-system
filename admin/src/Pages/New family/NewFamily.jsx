import { useState } from "react";
import "./NewFamily.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addFamily } from "../../redux/apiCall";
import { useDispatch } from "react-redux";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(inputs);
  };

  const handleClick = (e) => {
    e.preventDefault();
          const family = { ...inputs};
          console.log(family);
          addFamily(family, dispatch);
          alert('Family Created');
          window.location.replace('/')
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Family</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Name</label>
          <input
            name="name"
            type="text"
            placeholder="Family Name"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Elder in Charge</label>
          <input
            name="elder"
            type="text"
            placeholder="Elder in Charge"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Head</label>
          <input
            name="head"
            type="string"
            placeholder="Head Name"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Location</label>
          <input
            name="location"
            type="string"
            placeholder="location"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>bio</label>
          <input
            name="bio"
            type="string"
            placeholder="Event"
            onChange={handleChange}
          />
        </div>
        <button onClick={handleClick} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}