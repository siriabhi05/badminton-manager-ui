import Footer from "../footer/Footer"
import Header from "../header/Header"
import Nav from "../nav/Nav"
import SeedContainer from "../seed/Seed"

function SeedPage() {
    return (
        <>
            <div className='headerContainer'>
                <Header></Header>
            </div>
            <div className='navContainer'>
                <Nav></Nav>
            </div>
            <div className='mainContainer'>
                <SeedContainer />
            </div>
            <Footer />
        </>
    )
}

export default SeedPage