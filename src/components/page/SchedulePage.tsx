import Footer from "../footer/Footer"
import Header from "../header/Header"
import Nav from "../nav/Nav"
import Schedule from "../schedule/Schedule"

function SchedulePage() {
    return (
        <>
            <div className='headerContainer'>
                <Header></Header>
            </div>
            <div className='navContainer'>
                <Nav></Nav>
            </div>
            <div className='mainContainer'>
                <Schedule />
            </div>
            <Footer />
        </>
    )
}

export default SchedulePage