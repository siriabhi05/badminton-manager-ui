import { useCallback, useEffect, useState } from "react";
import { apiService } from "../../service/apiService";
import { API_URL } from "../../config";
import { Pair as PairModel } from "../../models/pairModel";
import { Button } from "@mui/material";
import "./Pair.css"

interface PairProps {
    pair: PairModel,
    index: number,
    isEditable?: boolean,
    edit?: (seed: number, player: number, value: string) => void
}

function Pair(props: PairProps) {
    const handleChange = (seed: number, player: number, value: string) => {
        if (props.edit && value && value !== "") props.edit(seed, player, value)
    }

    return (
        <div className={`pair ${props.index % 2 === 0 ? "evenPair" : "oddPair"}`}>
            <div className="pairPlayer">
                {props.isEditable
                    ? <div className="editablePlayer">
                        <input className={`${props.index % 2 === 0 ? "evenEditableText" : "oddEditableText"}`}
                            placeholder={props.pair.player1} onChange={(e) => handleChange(props.pair.seed, 1, e.target.value)} />
                        <div className="slash"> / </div>
                        <input className={`${props.index % 2 === 0 ? "evenEditableText" : "oddEditableText"}`}
                            placeholder={props.pair.player2} onChange={(e) => handleChange(props.pair.seed, 2, e.target.value)} />
                    </div>
                    :
                    <div> {props.pair.player1} / {props.pair.player2}</div>
                }

            </div>
        </div>
    )
}

function PairContainer() {
    const [pairsCreated, setPairsCreated] = useState(true);
    const [pairs, setPairs] = useState<PairModel[]>([]);
    const [externalPairs, setExternalPairs] = useState<PairModel[]>([]);

    const onExternalValueUpdate = (seed: number, player: number, value: string) => {
        setExternalPairs(prev => {
            const externalPlayer = prev.find(p => p.seed === seed);
            if (!externalPlayer) return prev;
            if (player === 1) externalPlayer.player1 = value;
            else if (player === 2) externalPlayer.player2 = value;
            return prev
        })
    }

    const getExternalPairs = useCallback(async () => {
        const result = await apiService.get(`${API_URL}/externalpairs`);
        if (result && result.data) {
            setExternalPairs(result.data as PairModel[])

        }
    }, [])

    const getPairs = useCallback(async () => {
        const result = await apiService.get(`${API_URL}/pairs`);
        if (result && result.data) {
            const pairs = result.data as PairModel[];
            if (pairs.length > 0) {
                setPairs(pairs);
                setPairsCreated(true);
                getExternalPairs();
            }
        }
    }, [getExternalPairs])

    const getPairStatus = useCallback(async () => {
        const result = await apiService.get(`${API_URL}/pairs/status`);
        if (result && (result.data as boolean)) {
            await getPairs();
        }
        else {
            setPairsCreated(false);
        }
    }, [getPairs])

    const handleCreatePairClick = async () => {
        await getPairs();
    }

    const handleUpdateExternalPairs = async () => {
        const result = await apiService.post(`${API_URL}/externalpairs`, { pairs: externalPairs });
        if(result && result.data as boolean){
            setExternalPairs(prev=>[...prev])
        }

    }

    useEffect(() => { getPairStatus() }, [getPairStatus])

    if (!pairsCreated) return (
        <div className="createPairContainer">
            <div className="createPairLabel">Pairs are created based on seeding. Top 4 seeds each will have a player from next 4 seeds. Pairs haven't been created yet. Please click on the button to create pairs.</div>
            <Button className='createPairButton' variant="contained" size="large" onClick={handleCreatePairClick}>Create Pairs</Button>
        </div>)

    if (pairs.length > 0) {
        return (
            <div className="pairContainer">
                <div className="internalPairContainer">
                    <div className="pairContainerHeader">Internal Pairs</div>
                    <div className="pairs">
                        {pairs.map((p, i) => <Pair index={i} key={`p${i}`} pair={p}></Pair>)}
                    </div>

                </div>
                <div className="externalPairContainer">
                    <div className="pairContainerHeader">External Pairs</div>
                    <div className="pairs">
                        {externalPairs.map((p, i) => <Pair index={i} key={`ep${i}`} pair={p} isEditable={p.player1.toLowerCase().includes("external") || p.player2.toLowerCase().includes("external")} edit={onExternalValueUpdate}></Pair>)}
                    </div>
                    {
                        externalPairs.some(p => p.player1.toLowerCase().includes("external") || p.player2.toLowerCase().includes("external")) &&
                        <Button className='updateExternalPairButton' variant="contained" size="large"
                            onClick={handleUpdateExternalPairs}>Update External Pairs</Button>
                    }
                </div>
            </div>
        )

    }
    return <></>

}

export default PairContainer;