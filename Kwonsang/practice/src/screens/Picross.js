import PicrossCell from "../component/PicrossCell";
import MAP_HEART from "../script/PicrossMap";
import "../styles/Picross.css";
import { useEffect, useState } from "react";

function Picross() {
  const [hint, setHint] = useState({ row: [], col: [] });
  const [map, setMap] = useState([]);

  function mapSetting() {
    setMap(MAP_HEART);
  }
  useEffect(mapSetting, []);

  function hintSetting() {
    var width = map[0].length;
    var height = map.length;

    for (var i = 0; i < height; i++) {
      var rowHint = [];
      var count = 0;
      for (var j = 0; j < width; j++) {
        if (map[i][j] == 1) {
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
    }

    //todo : rowhint finish
  }

  return (
    <div className="picrossBody">
      <h1>Picross</h1>
      <div className="container">
        <div className="row">
          <div className="key"></div>
          <div className="key top">
            1<br></br>1
          </div>
          <div className="key top">1</div>
          <div className="key top">1</div>
          <div className="key top">
            2<br></br>2
          </div>
          <div className="key top">
            1<br></br>2
          </div>
        </div>
        <div className="row">
          <div className="key left">1</div>
          <PicrossCell></PicrossCell>
          <PicrossCell cellType="wrong"></PicrossCell>
          <PicrossCell cellType="colored"></PicrossCell>
          <PicrossCell cellType="marked"></PicrossCell>
          <PicrossCell></PicrossCell>
        </div>
        <div className="row">
          <div className="key left">1</div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
        </div>
        <div className="row">
          <div className="key left">1</div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
        </div>
        <div className="row">
          <div className="key left">1</div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
        </div>
        <div className="row">
          <div className="key left">1</div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
        </div>
      </div>
      <div className="UI">
        <button>New Game</button>
      </div>
    </div>
  );
}
export default Picross;
