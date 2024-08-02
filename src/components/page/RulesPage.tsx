import Footer from "../footer/Footer"
import Header from "../header/Header"
import Nav from "../nav/Nav"
import Rule from "../rule/Rule"

function RulesPage() {
    return (
        <>
            <div className='headerContainer'>
                <Header></Header>
            </div>
            <div className='navContainer'>
                <Nav></Nav>
            </div>
            <div className='mainContainer'>
                <Rule></Rule>
            </div>
            <Footer />
        </>
    )
}

export default RulesPage