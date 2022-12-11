import { Link } from "react-router-dom"
import { Button} from "react-bootstrap";
import "./center.css"

const BanScreen = () => {

    return (
        <div>
            <h1 class="center">  OOPS, YOU HAVE BEEN BANNED</h1>
            <img class="center" src="https://media.tenor.com/8fB9pdaT8-oAAAAd/saul-goodman-finger-guns.gif"/>
            <br />
            <h3 class= "center">Click to go to the home page.</h3>
           
            <Link to="/">
                <Button size="lg" className="center">
                  Go Home
                </Button>
            </Link>
        </div>
    )
}

export default BanScreen
