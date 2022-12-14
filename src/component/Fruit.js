import React from "react";
import "./Fruit.css";
import axios from "axios";

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
  const [imageName, setImageName] = React.useState("");
  const [imageURLs, setImageURLs] = React.useState([]);

  React.useEffect(() => {
    axios.get("http://localhost:4000/fruit").then((res) => {
      setFruitData(res.data);
      setFruitFilter(res.data);
    });
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    const searchName = fruitData.filter((data) => data.name.includes(value));
    console.log("searchName", searchName);
    setFruitFilter(searchName);
  };

  const onNameChange = (event) => {
    setFruitName(event.target.value);
    console.log("fruitName",fruitName)
  };

  const onImageChange = (event) => {
    const imageURL = event.target.files[0];
    setImageURLs([URL.createObjectURL(imageURL)]);
    setImageName(event.target.files[0].name);

    const { files } = event.target;
    handleImage([...files]);
    // console.log("setLogoName", event.target.files[0])
  };

  const handleImage = (files) => {
    setImageAllData({ ...imageAllData, name: fruitName, image: files[0] });
    // setLogoName({ ...logoName, logoTime: format(new Date(),"ddmmyyyy_hhmmssss")
  };

  const sendImage = async (event) => {
    let formdata = new FormData();
    formdata.append("name", imageAllData.name);
    formdata.append("image", imageAllData.image);

    const result = await axios.post("http://localhost:4000/fruit", formdata);
    if (result.data.status === "ok") {
      alert("New Logo is ready to use");
    }
  };

  console.log("image", imageAllData);

  return (
    <>
      <div className="container">
        <div>
          <h1>ผลไม้</h1>
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
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ width: "150px" }}>ผลไม้</th>
              <th style={{ width: "250px" }}>รูป</th>
            </tr>
          </thead>
          <tbody>
            {fruitFilter.map((data, i) => {
              return (
                <tr key={i} style={{ textAlign: "center" }}>
                  <td>{data.name}</td>
                  <td>
                    <img src={data.image} width="200px" />
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
          }}
          // onClick={() => setIsOpenModal(false)}
        >
          <div
            style={{
              background: "white",
              width: "80%",
              marginTop: "40%",
              padding: "10px",
            }}
          >
            <h2>Create</h2>
            <div style={{ fontWeight: "bold", textAlign: "center" }}>
              <div style={{ margin: "10px" }}>
                Name : <input type="text" onChange={onNameChange} />
              </div>
              <div>
                Photo : <input type="file" onChange={onImageChange} />
              </div>
              <div style={{ margin: "10px" }}>
                <button
                  style={{
                    background: "#2196f3",
                    border: "none",
                    width: "80px",
                    height: "30px",
                    borderRadius: "5px",
                    color: "white",
                    marginRight: "5px",
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
