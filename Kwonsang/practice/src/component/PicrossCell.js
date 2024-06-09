function PicrossCell({ cellType, cellSize, isFinished }) {
  function getClassName() {
    var result = "cell";

    result += " ";
    if(isFinished){
      if(cellType == "colored"){
        result += "rainbow";
      }
    }else{
      result += cellType;
    }

    // cellSize 5, 10, 15, 20, ...
    result += " ";
    result += "cell" + cellSize;

    return result;
  }

  return <div className={getClassName()}></div>;
}

export default PicrossCell;
