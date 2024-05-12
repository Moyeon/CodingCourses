function PicrossCell({ cellType }) {
  function getClassName() {
    if (cellType == "colored") {
      return "cell colored";
    }
    if (cellType === "wrong") {
      return "cell wrong";
    }
    if (cellType == "marked") {
      return "cell marked";
    }
    return "cell";
  }

  return <div className={getClassName()}></div>;
}

export default PicrossCell;
