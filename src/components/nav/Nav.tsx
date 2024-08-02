import { useLocation, useNavigate } from "react-router-dom";
import "./Nav.css"

function Nav() {
    const location = useLocation();
    return (
        <div className="nav">
            <NavItem text="Vote" isActive={location.pathname.includes("vote")} />
            <NavItem text="Seed" isActive={location.pathname.includes("seed")} />
            <NavItem text="Pairs" isActive={location.pathname.includes("pairs")} />
            <NavItem text="Draw" isActive={location.pathname.includes("draw")} />
            <NavItem text="Rules" isActive={location.pathname.includes("rules")} />
            <NavItem text="Schedule" isActive={location.pathname.includes("schedule")} />
        </div>)
}

export default Nav;

function NavItem(props: { text: string, isActive: boolean }) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/${props.text.toLowerCase()}`)

    }
    return <div className={`navItem ${props.isActive ? "active" : ""}`} onClick={handleClick}>{props.text}</div>
}