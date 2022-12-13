import React from 'react'
import { Link } from 'react-router-dom';

const Tree = () => {

  const maxLoop = 9;
  let result = "";

  for (let row = 1; row <= maxLoop; row++) {
    let textRow = "";
  console.log("row",row)

    for (let col = 1; col < row; col++) {
      textRow += row + " ";
  // console.log(textRow += row);
    }

    for (let col = 1; col > 0; col--) {
      textRow += row;
  // console.log("textRow += row", textRow += row);
    }

    result += textRow + "<br>";
  }
  
  console.log(result);

  function createMarkup() {
    return {__html: result}
  }


  return (
    <>
    <div
    dangerouslySetInnerHTML={createMarkup()}
    style={{textAlign:"center"}}
    ></div>
    <Link to="/test" style={{display:"flex",justifyContent:"center",
      textDecoration:"none",}}>
    <div 
    style={{
      padding:"10px",
      margin:"20px",
      background:"#4caf50",
      width:"100px",
      textAlign:'center',
      color:"white",
      fontSize:"20px",
      fontWeight:"bold"
      }}>Click Test</div>
    </Link>
     </>
  )
}

export default Tree