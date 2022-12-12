import { Button} from "react-bootstrap";
import { Link } from "react-router-dom"

const Unauthorized = () => {

    return (
        <section>
            <h1 class="center">YOU ARE UNAUTHORIZED TO ACCESS</h1>
            <img class="center" src="https://media.tenor.com/bz4bg1gWPYMAAAAC/afham-saul-goodman.gif"></img>
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

export default Unauthorized
