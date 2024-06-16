import PicrossCell from "../component/PicrossCell";
import "../styles/Picross.css";
import { useEffect, useState } from "react";

function CreatePicrossMap() {
  const [hint, setHint] = useState({ row: [], col: [] });
  const [userMap, setUserMap] = useState([]);
  const [dragStartPoint, setDSP] = useState({ isDragging: false });
  const [currPoint, setCP] = useState({row: -1, col: -1});
  const [cellSize, setCellSize] = useState(5);
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(5);
  const [result, setResult] = useState();

  // userMap Rule
  // 0 = Empty
  // 1 = Colored
  // 2 = Marked
  // 3 = Wrong
  useEffect(()=>{
    if(width > height){
      setCellSize(width);
    }else{
      setCellSize(height);
    }
  }, [width, height]);

  function hintSetting() {
    if(userMap.length == 0) return;
    var rowHintMap = [];
    var colHintMap = [];

    for (var i = 0; i < height; i++) {
      var rowHint = [];
      var count = 0;
      for (var j = 0; j < width; j++) {
        if (userMap[i][j] == 1) {
          count++;
        } else {
          if (count > 0) {
            rowHint.push(count);
            count = 0;
          }
        }
      }
      if (count > 0) {
        rowHint.push(count);
      }

      rowHintMap.push(rowHint);
    }

    for (var i = 0; i < width; i++) {
      var colHint = [];
      var count = 0;
      for (var j = 0; j < height; j++) {
        if (userMap[j][i] == 1) {
          count++;
        } else {
          if (count > 0) {
            colHint.push(count);
            count = 0;
          }
        }
      }
      if (count > 0) {
        colHint.push(count);
      }
      colHintMap.push(colHint);
    }

    console.log(rowHintMap);
    console.log(colHintMap);
    setHint({ row: rowHintMap, col: colHintMap });
  }
  useEffect(hintSetting, [userMap]);

  function userMapSetting(){
    var newUserMap = [];
    for(var i = 0; i < height; i++){
      var row = [];
      for(var j = 0; j < width; j++){
        row.push(0);
      }
      newUserMap.push(row);
    }
    setUserMap(newUserMap);
  }
  useEffect(userMapSetting, [width, height]);

  function getCellType(state, rowIdx, colIdx){
    if(state == 1) return "colored";
    if(state == 2) return "marked";
    if(state == 3) return "wrong";
    if(state == 4) return "drag";

    if(dragStartPoint.isDragging){
      //hor
      if(dragStartPoint.row == currPoint.row){
        if(rowIdx == dragStartPoint.row){
          // dragStartPoint.col <= colidx <= currPoint.col
          // or
          // c.col <= colidx <= d.col
          if((dragStartPoint.col <= colIdx && colIdx <= currPoint.col)
            || (currPoint.col <= colIdx && colIdx <= dragStartPoint.col)){
              return "drag";
          }
        }
      } 
      //ver
      if(dragStartPoint.col == currPoint.col){
        if(colIdx == dragStartPoint.col){
          if((dragStartPoint.row <= rowIdx && rowIdx <= currPoint.row)
            || (currPoint.row <= rowIdx && rowIdx <= dragStartPoint.row)){
              return "drag";
          }
        }
      }
    }
    return "";
  }

  function dragStart(rowIdx, colIdx){
    setDSP({
      isDragging: true,
      row: rowIdx,
      col: colIdx,
      isRightClick: false,
      isErasing: userMap[rowIdx][colIdx] == 1
    });
  }

  function rightClickDragStart(rowIdx, colIdx){
    setDSP({
      isDragging: true,
      row: rowIdx,
      col: colIdx,
      isRightClick: true,
      isErasing: userMap[rowIdx][colIdx] == 2
    });
  }

  function fillCell(rowIdx, colIdx, fillNumber){
    // userMap Rule
    // 0 = Empty
    // 1 = Colored
    // 2 = Marked
    if(userMap[rowIdx][colIdx] == 2 && dragStartPoint.isRightClick && dragStartPoint.isErasing){
      return 0;
    }
    if(userMap[rowIdx][colIdx] == 1 && !dragStartPoint.isRightClick && dragStartPoint.isErasing){
      return 0;
    }
    if(userMap[rowIdx][colIdx] != 0){
      return userMap[rowIdx][colIdx];
    }
    return fillNumber;
  }

  function dragEnd(){
    if(dragStartPoint.isDragging){
      var newUserMap = userMap.map(row => [...row]);
      var fillNumber = 1;
      if(dragStartPoint.isErasing){
        fillNumber = 0;
      }else if(dragStartPoint.isRightClick){
        fillNumber = 2;
      }else{
        fillNumber = 1;
      }
      //hor
      if(dragStartPoint.row == currPoint.row){
        for(var colIdx = 0; colIdx < userMap[0].length; colIdx++){
          if((dragStartPoint.col <= colIdx && colIdx <= currPoint.col)
            || (currPoint.col <= colIdx && colIdx <= dragStartPoint.col)){
              newUserMap[dragStartPoint.row][colIdx] =
                    fillCell(dragStartPoint.row, colIdx, fillNumber);
          }
        }
      } 
      //ver
      if(dragStartPoint.col == currPoint.col){
        for(var rowIdx = 0; rowIdx < userMap.length; rowIdx++){
          if((dragStartPoint.row <= rowIdx && rowIdx <= currPoint.row)
            || (currPoint.row <= rowIdx && rowIdx <= dragStartPoint.row)){
              newUserMap[rowIdx][dragStartPoint.col] =
                    fillCell(rowIdx, dragStartPoint.col, fillNumber);
          }
        }
      }
      setUserMap(newUserMap);
    }
    setDSP({isDragging: false});
  }

  function customStringifyArray(arr) {
    return 'NewMap = [\n' + arr.map(row => {
      var nr = [...row];
      nr.map((e, i) => {if(e == 2)nr[i] = 0})
      return '  [' + nr.join(', ') + ']';
    }).join(',\n') + '\n];';
  }

  return (
    <div className="picrossBody" onMouseUp={dragEnd}>
      <h1>Picross Map Generator</h1>
      <div className="container">
        <div className="row">
          <div className="key left"></div>
          {hint.col.map((colHint) => (
            <div className="key top">
              {colHint.map((num) => {
                return (
                  <>
                    {num}
                    <br></br>
                  </>
                );
              })}
            </div>
          ))}
        </div>
        {hint.row.map((rowHint, rowIdx) => 
          <div className="row">
            <div className="key left">
              {rowHint.map((num) => <> {num} </>)}
            </div>
            {rowIdx < height && userMap[rowIdx].map((state, colIdx) => {
              return (
                <div
                  className="wrap"
                  onMouseDown={(e) => {
                    console.log(e);
                    if ((e.button == 0) || (e.which && e.which == 1)){
                      dragStart(rowIdx, colIdx);
                    }else if ((e.button && e.button == 2) || (e.which && e.which == 3)){
                      rightClickDragStart(rowIdx, colIdx);
                    }
                  }}
                  onMouseEnter={() => {setCP({row: rowIdx, col: colIdx})}}
                  onContextMenu={(e) => {
                    e.preventDefault();
                  }}
                >
                  <PicrossCell
                    cellType={getCellType(state, rowIdx, colIdx)}
                    cellSize={cellSize}
                    isFinished={false}
                  ></PicrossCell>
                </div>
              )
            })}
          </div>
        )}
      </div>
      <div className="UI">
        <label>width</label>
        <select onChange={(e) => {
          setWidth(e.target.value);
        }}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
        <label>height</label>
        <select onChange={(e) => {
          setHeight(e.target.value);
        }}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
        <button onClick={() => { 
          console.log(customStringifyArray(userMap));
          setResult(customStringifyArray(userMap));
        }}>Print Map</button>
      </div>
      {result &&
        <>
          <div>RESULT</div>
          <pre>{result}</pre>
        </>}
    </div>
  );
}
export default CreatePicrossMap;
