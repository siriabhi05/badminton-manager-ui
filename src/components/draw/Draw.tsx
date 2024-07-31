import { useCallback, useEffect, useState } from "react";
import { apiService } from "../../service/apiService";
import { API_URL } from "../../config";
import { Pair as PairModel } from "../../models/pairModel";
import { Button } from "@mui/material";
import "./Draw.css"
import { Draw as DrawModel } from "../../models/drawModel";

interface DrawProps {
    pair: PairModel,
    index: number
}

function Draw(props: DrawProps) {
    return (
        <div className={`draw ${props.index % 2 === 0 ? "evenDraw" : "oddDraw"}`}>
            <div className="drawPlayer">{props.pair.player1} / {props.pair.player2}</div>
        </div>
    )
}

function DrawContainer() {
    const [drawCreated, setDrawCreated] = useState(true);
    const [draw, setDraw] = useState<DrawModel[]>([]);

    const handleDrawClick = async () => {
        await getDraw();
    }
    
    const getDraw = useCallback(async () => {
        const result = await apiService.get(`${API_URL}/draw`);
        if (result && result.data) {
            const draw = result.data as DrawModel[];
            if (draw.length > 0) {
                setDraw(draw);
                setDrawCreated(true);
            }
        }
    }, [])

    const getDrawStatus = useCallback(async () => {
        const result = await apiService.get(`${API_URL}/draw/status`);
        if (result && (result.data as boolean)) {
            await getDraw()
        }
        else {
            setDrawCreated(false)
        }
    }, [getDraw])


    useEffect(() => { getDrawStatus() }, [getDrawStatus])

    if (!drawCreated) return (
        <div className="createDrawContainer">
            <div className="createDrawLabel"> Groups haven't been created yet. Please click on the button to create groups.</div>
            <Button className='createDrawButton' variant="contained" size="large" onClick={handleDrawClick}>Draw</Button>
        </div>)

    return (
        <div className="drawContainer">
            {draw.map((d, i) => {
                return (
                    <div key={`draw${i}`} className="drawGroupContainer">
                        <div className="drawContainerHeader">{d.group}</div>
                        <div className="draws">
                            {d.pairs.map((p, i) => <Draw index={i} key={`d${i}`} pair={p}></Draw>)}
                        </div>
                    </div>)
            })}
        </div>
    )


}

export default DrawContainer;