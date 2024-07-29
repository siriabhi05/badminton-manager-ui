import Footer from "../footer/Footer"
import Header from "../header/Header"
import Nav from "../nav/Nav"
import VoteContainer from "../vote/Vote"

interface VotePageProps {
    players: string[],
    user: string
}
function VotePage(props: VotePageProps) {
    return (
        <>
            <div className='headerContainer'>
                <Header></Header>
            </div>
            <div className='navContainer'>
                <Nav></Nav>
            </div>
            <div className='mainContainer'>
                <VoteContainer players={props.players} user={props.user}></VoteContainer>
            </div>
            <Footer></Footer>
        </>
    )
}

export default VotePage