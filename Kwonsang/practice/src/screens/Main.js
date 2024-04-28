import { Link } from "react-router-dom";
import "../styles/Main.css";
import { HashLink } from "react-router-hash-link";

function Main() {
    return(
        <div className="body">
            <div className="TobBar">
                <HashLink smooth to='/#main'>
                    <div>Main</div>
                </HashLink>
                <HashLink smooth to='/#game'>
                    <div>Games</div>
                </HashLink>
            </div>
            <div className="screen" id="main">
                main screen
            </div>
            <div className="screen" id="game">
                <h3>Games</h3>
                <div className="gameContainer">
                    <Link to='/random'>
                        <button>
                            Random Game
                        </button>
                    </Link>
                    <Link to='/tictactoe'>
                        <button>
                            TicTacToe Game
                        </button>
                    </Link>
                    <Link to='/orthello'>
                        <button>
                            Orthello Game
                        </button>
                    </Link>
                </div>
            </div>
            
        </div>
    );
}
export default Main;