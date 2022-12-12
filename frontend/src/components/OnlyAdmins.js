import { useNavigate } from "react-router-dom"

const OnlyAdmins = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <div>
            <h1>ONLY ADMINS CAN ACCESS TO THIS PAGE</h1>
            <br />
            <p>Go back to where you belong.</p>
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
        </div>
    )
}

export default OnlyAdmins
