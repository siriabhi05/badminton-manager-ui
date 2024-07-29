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
                <div style={{display:"flex", justifyContent: "center", fontSize: "24px", color: "#000" }}>This page is under development</div>
            </div>
            <Footer />
        </>
    )
}

export default DrawPage