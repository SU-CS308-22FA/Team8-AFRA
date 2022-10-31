import {Link} from "react-router-dom"
import logo from "../logo.png"
export const Home = () => {
    return(
        
        <nav>
            <img src= {logo} alt="Logo" />
            <ul>
                <li>
                    <Link to = "/login">Login</Link>
                </li>
                <li>
                    <Link to = "/register">Register</Link>
                </li>
            </ul>
        </nav>
    );
}