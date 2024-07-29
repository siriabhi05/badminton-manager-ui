import Nav from "../nav/Nav"
import SeedContainer from "../seed/Seed"

function SeedPage() {
    return (
        <>
            <div className='navContainer'>
                <Nav></Nav>
            </div>
            <div className='mainContainer'>
                <SeedContainer />
            </div>
        </>
    )
}

export default SeedPage