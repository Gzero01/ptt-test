import React from "react";

const App = () => {

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
    <div>
      <div
      dangerouslySetInnerHTML={createMarkup()}
      style={{textAlign:"center"}}
      ></div> 
    </div>
  );
};

export default App;
