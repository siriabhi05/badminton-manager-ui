import { useContext } from "react"
import image from "../../images/Shuttle.jpg"
import { UserContext } from "../../context"
import "./Header.css"
function Header() {
    const user = useContext(UserContext) ?? "Anonymus User";

    return (
        < div className="header" >
            <div className="imageContainer">
                <img src={image} className="image" />
                <div className="badLabel">Badminton Manager</div>
            </div>
            <div className="userContainer">
                {user?.split(" ").map(a => a.substring(0, 1)).join("")}
            </div>
        </div >
    )
}

export default Header