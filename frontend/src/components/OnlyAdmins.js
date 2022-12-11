import { Link } from "react-router-dom"
import { Button} from "react-bootstrap";
import "./center.css"

const OnlyAdmins = () => {

    return (
        <section>
            <h1 class="center">ONLY ADMINS ARE ALLOWED HERE</h1>
            <img class="center" src="https://64.media.tumblr.com/79cf561b34c6b8e9aa66da6552208b6a/56cbf33a4f27d77a-89/s400x600/8021a46c9bf7ca2cca62805c52c761d31a0f6b6a.gifv"></img>
            <br />
            <h3 class= "center">Click to go to the home page.</h3>
            <Link to="/">
                <Button size="lg" className="center">
                  Go Home
                </Button>
            </Link>
        </section>
    )
}

export default OnlyAdmins
