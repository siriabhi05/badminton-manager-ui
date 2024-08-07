import DrawContainer from "../draw/Draw"
import Footer from "../footer/Footer"
import Header from "../header/Header"
import Nav from "../nav/Nav"

function DrawPage() {
    return (
        <>
            <div className='headerContainer'>
                <Header></Header>
            </div>
            <div className='navContainer'>
                <Nav></Nav>
            </div>
            <div className='mainContainer'>
                <DrawContainer></DrawContainer>
            </div>
            <Footer />
        </>
    )
}

export default DrawPage