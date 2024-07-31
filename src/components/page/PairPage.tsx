import Footer from "../footer/Footer"
import Header from "../header/Header"
import Nav from "../nav/Nav"
import PairContainer from "../pair/Pair"

function PairPage() {
    return (
        <>
            <div className='headerContainer'>
                <Header></Header>
            </div>
            <div className='navContainer'>
                <Nav></Nav>
            </div>
            <div className='mainContainer'>
                <PairContainer></PairContainer>
            </div>
            <Footer />
        </>
    )
}

export default PairPage