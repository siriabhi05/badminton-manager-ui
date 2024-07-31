import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { PlayerSeed } from "../../models/playerModel";
import { useCallback, useEffect, useState } from "react";
import { apiService } from "../../service/apiService";
import { API_URL } from "../../config";
import "./Seed.css"

interface SeedProp {
    seed: PlayerSeed,
    index: number
}

function Seed(props: SeedProp) {
    return (
        <div className={`seed`} >
            <Accordion>
                <AccordionSummary
                    aria-controls="panel1-content"
                    id="panel1-header"
                    className={` ${props.index % 2 === 0 ? 'even' : 'odd'}`}
                >
                    <div className="summary">
                        <div className="summaryLable">{props.seed.name}</div>
                        <div className="summarySeed">Seed - {props.index + 1}</div>
                        {/* <div className="summaryScore">Points - {props.seed.score}</div> */}
                    </div>

                </AccordionSummary>
                <AccordionDetails>
                    <p>Hand : {props.seed.hand}</p>
                    <p>Style : {props.seed.style}</p>
                    <p>Details : {props.seed.details}</p>
                </AccordionDetails>
            </Accordion>
        </div>
    )

}

function SeedContainer() {

    const [seeds, setSeeds] = useState<PlayerSeed[]>([])
    const getSeeds = useCallback(async () => {
        const result = await apiService.get(`${API_URL}/seed`)
        if (result?.data) setSeeds(result.data as PlayerSeed[])
    }, [])

    useEffect(() => {
        getSeeds()
    }, [getSeeds])
    return (
        <div className="seedContainer">
            {seeds.map((s, i) => <Seed seed={s} key={i} index={i} />)}
        </div>
    )
}

export default SeedContainer