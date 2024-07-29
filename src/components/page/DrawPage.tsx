import Nav from "../nav/Nav"

function DrawPage() {
    return (
        <>
            <div className='navContainer'>
                <Nav></Nav>
            </div>
            <div className='mainContainer'>
                <div style={{ fontSize: "24px", color: "#fff" }}>This page is under development</div>
            </div>
        </>
    )
}

export default DrawPage