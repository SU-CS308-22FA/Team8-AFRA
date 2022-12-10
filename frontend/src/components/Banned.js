import { useNavigate, Link } from "react-router-dom"
import { Button} from "react-bootstrap";

const BanScreen = () => {

    return (
        <div>
            <h1>YOU HAVE BEEN BANNED</h1>
            <br />
            <p>Click to go to the home page.</p>
           
            <Link to="/">
                <Button size="lg" className="landingbutton">
                  Go Home
                </Button>
            </Link>
        </div>
    )
}

export default BanScreen
