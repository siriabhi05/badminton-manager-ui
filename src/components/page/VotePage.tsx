import { useContext } from "react"
import Footer from "../footer/Footer"
import Header from "../header/Header"
import Nav from "../nav/Nav"
import VoteContainer from "../vote/Vote"
import { UserContext } from "../../context"

interface VotePageProps {
    players: string[],
}
function VotePage(props: VotePageProps) {
    const user = useContext(UserContext)
    return (
        <>
            <div className='headerContainer'>
                <Header></Header>
            </div>
            <div className='navContainer'>
                <Nav></Nav>
            </div>
            <div className='mainContainer'>
                {user && props.players.length > 0 && <VoteContainer players={props.players} user={user}></VoteContainer>}
            </div>
            <Footer></Footer>
        </>
    )
}

export default VotePage