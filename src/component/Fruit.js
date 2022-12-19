import React from "react";
import "./Fruit.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Fruit = () => {
  const initialState = {
    name: "",
    image: "",
  };

  const [fruitData, setFruitData] = React.useState([]);
  const [fruitFilter, setFruitFilter] = React.useState([]);
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [imageAllData, setImageAllData] = React.useState(initialState);
  const [fruitName, setFruitName] = React.useState("");
  const [clickSendImage, setClickSendImage] = React.useState("");
  const [imageName, setImageName] = React.useState("");
  const [imageURLs, setImageURLs] = React.useState([]);

  React.useEffect(() => {
    axios.get("http://localhost:4000/fruit").then((res) => {
      setFruitData(res.data);
      setFruitFilter(res.data);
    });
  }, [clickSendImage]);

  const handleChange = (e) => {
    const value = e.target.value;
    const searchName = fruitData.filter((data) => data.name.includes(value));
    console.log("searchName", searchName);
    setFruitFilter(searchName);
  };

  const onNameChange = (event) => {
    setFruitName(event.target.value);
    console.log("fruitName", fruitName);
  };

  const onImageChange = (event) => {
    const imageURL = event.target.files[0];
    setImageURLs([URL.createObjectURL(imageURL)]);
    setImageName(event.target.files[0].name);

    const { files } = event.target;
    handleImage([...files]);
  };

  const handleImage = (files) => {
    setImageAllData({ ...imageAllData, name: fruitName, image: files[0] });
  };

  const sendImage = async (event) => {
    setClickSendImage("Clicked Image");
    let formdata = new FormData();
    formdata.append("name", imageAllData.name);
    formdata.append("image", imageAllData.image);

    const result = await axios.post("http://localhost:4000/fruit", formdata);
    if (result.data.status === "ok") {
      alert("New Fruit image is ready");
      setClickSendImage("");
    }
    setIsOpenModal(false);
  };

  console.log("image", imageAllData);

  return (
    <>
      <div className="container">
        <div style={{ display: "flex" }}>
          <h1>ผลไม้</h1>
          <Link
            to="/"
            style={{
              display: "flex",
              justifyContent: "center",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                padding: "10px",
                margin: "20px",
                background: "#4caf50",
                width: "100px",
                textAlign: "center",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Tree
            </div>
          </Link>
        </div>
        <div style={{ textAlign: "end", margin: "10px" }}>
          <div style={{ marginBottom: "10px" }}>
            <button
              style={{
                background: "#2196f3",
                border: "none",
                width: "80px",
                height: "30px",
                borderRadius: "5px",
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => setIsOpenModal(true)}
            >
              เพิ่มผลไม้
            </button>
          </div>
          <input
            type="text"
            placeholder="Search here"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ผลไม้</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {fruitFilter.map((data, i) => {
              return (
                <tr key={i} style={{ verticalAlign: "top" }}>
                  <td>{data.name}</td>
                  <td>
                    <img src={data.image} width="auto" height="150px" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {isOpenModal && (
        <div
          style={{
            background: "#00000094",
            backdropFilter: "blur(25px)",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
          }}
          // onClick={() => setIsOpenModal(false)}
        >
          <div
            style={{
              background: "white",
              width: "80%",
              marginTop: "150px",
              padding: "10px",
            }}
          >
            <h2>Create</h2>
            <div style={{ fontWeight: "bold" }}>
              <div style={{ textAlign: "center", padding: "5px" }}>
                Name : <input type="text" onChange={onNameChange} />
              </div>
              <div
                style={{
                  justifyContent: "center",
                  display: "flex",
                  padding: "5px",
                }}
              >
                Photo :
                <input
                  type="file"
                  class="custom-file-input"
                  id="inputImage"
                  name="Image"
                  accept="image/*"
                  onChange={onImageChange}
                  hidden
                />
                <label
                  class="custom-file-label"
                  for="inputImage"
                  style={{
                    border: "1px solid rgb(110 110 110)",
                    width: "164px",
                    height: "20px",
                    marginLeft: "4px",
                    fontWeight: "400",
                    fontSize: "14px",
                    paddingLeft: "4px",
                    cursor: "pointer",
                  }}
                >
                  {imageName}
                </label>
              </div>
              <div style={{ margin: "10px", textAlign: "center" }}>
                <button
                  style={{
                    background: "#2196f3",
                    border: "none",
                    width: "80px",
                    height: "30px",
                    borderRadius: "5px",
                    color: "white",
                    marginRight: "5px",
                    cursor: "pointer",
                  }}
                  type="submit"
                  onClick={sendImage}
                >
                  Save
                </button>
                <button
                  style={{
                    // background: "#2196f3",
                    border: "none",
                    width: "80px",
                    height: "30px",
                    borderRadius: "5px",
                    color: "black",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsOpenModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Fruit;
