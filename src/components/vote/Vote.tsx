import { Alert, Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import "./Vote.css";
import { Player, VoteGiven } from "../../models/playerModel";
import { useCallback, useEffect, useState } from "react";
import { apiService } from "../../service/apiService";
import { API_URL } from "../../config";

interface VoteContainerProps {
    players: string[]
    user: string
}

interface VoteProps {
    name: string
    index: number
    voteType?: VoteType
    voted: (voteType: VoteType) => void
}

type VoteType = "First" | "Second" | "Third" | "Fourth";
interface MsgType {
    msg?: string;
    type: "error" | "success"
}

function Vote(props: VoteProps) {
    const [voteType, setVoteType] = useState<VoteType | undefined>(props.voteType)
    const handleChange = (
        _event: React.MouseEvent<HTMLElement>,
        selectedVoteType: VoteType,
    ) => {
        setVoteType(selectedVoteType);
        props.voted(selectedVoteType);
    };

    useEffect(() => setVoteType(props.voteType), [props.voteType])
    return (
        <div className={`vote ${props.index % 2 === 0 ? "even" : "odd"}`}>
            <div className="voter">{props.name}</div>
            <div className="voteOption">
                <ToggleButtonGroup
                    color={props.index % 2 === 0 ? "primary" : "standard"}
                    value={voteType}
                    exclusive
                    size="large"
                    onChange={handleChange}
                >
                    <ToggleButton value="First" className={`vote ${props.index % 2 === 0 ? "evenToggleButton" : "oddToggleButton"}`} >First</ToggleButton>
                    <ToggleButton value="Second" className={`vote ${props.index % 2 === 0 ? "evenToggleButton" : "oddToggleButton"}`}>Second</ToggleButton>
                    <ToggleButton value="Third" className={`vote ${props.index % 2 === 0 ? "evenToggleButton" : "oddToggleButton"}`}>Third</ToggleButton>
                    <ToggleButton value="Fourth" className={`vote ${props.index % 2 === 0 ? "evenToggleButton" : "oddToggleButton"}`}>Fourth</ToggleButton>
                </ToggleButtonGroup>
            </div>
        </div>
    )
}

function VoteContainer(props: VoteContainerProps) {

    const [player, setPlayer] = useState<Player>();
    const [msg, setMsg] = useState<MsgType>({ type: "error" });

    const getVoteGiven = useCallback(async () => {
        const result = await apiService.get(`${API_URL}/votegiven?user=${props.user}`)
        if (result?.data) {
            const voteGiven = result.data as VoteGiven
            setPlayer({ name: props.user, voteGiven: voteGiven })
        }
    }, [props.user])

    const onVoted = (name: string, voteType: VoteType) => {
        setPlayer(player => {
            if (!player) return undefined;

            if (voteType === "First") player.voteGiven.first = name
            else if (voteType === "Second") player.voteGiven.second = name
            else if (voteType === "Third") player.voteGiven.third = name
            else if (voteType === "Fourth") player.voteGiven.fourth = name

            if (player.voteGiven.first === name && voteType !== "First") player.voteGiven.first = ""
            if (player.voteGiven.second === name && voteType !== "Second") player.voteGiven.second = ""
            if (player.voteGiven.third === name && voteType !== "Third") player.voteGiven.third = ""
            if (player.voteGiven.fourth === name && voteType !== "Fourth") player.voteGiven.fourth = ""
            return player ? { ...player } : player
        })
    }

    const handleVoteClick = async () => {
        if (player!.voteGiven.first === "") setMessage({ msg: "Please select first seed.", type: "error" })
        else if (player!.voteGiven.second === "") setMessage({ msg: "Please select second seed.", type: "error" })
        else if (player!.voteGiven.third === "") setMessage({ msg: "Please select third seed.", type: "error" })
        else if (player!.voteGiven.fourth === "") setMessage({ msg: "Please select fourth seed.", type: "error" })
        else {
            const result = await apiService.post(`${API_URL}/vote`, { player: player })
            if (result?.data) setMsg({ msg: "Thanks for participating, your vote for player seeding is saved successfully.", type: "success" })
        }

    }

    function setMessage(msg: MsgType) {
        setMsg(msg);
        setTimeout(() => {
            setMsg({ type: "error" });
        }, 2000);
    }

    useEffect(() => {
        getVoteGiven()
    }, [getVoteGiven])

    return (
        <div className="voteContainer">
            {msg.msg && <Alert className='alert' variant="filled" severity={msg.type}>{msg.msg}</Alert>}
            {player && props.players.filter(p => p !== player.name).map((p, i) => <Vote
                key={p}
                voteType={player.voteGiven.first === p
                    ? "First"
                    : player.voteGiven.second === p
                        ? "Second"
                        : player.voteGiven.third === p
                            ? "Third"
                            : player.voteGiven.fourth === p
                                ? "Fourth"
                                : undefined
                }
                voted={(voteType: VoteType) => onVoted(p, voteType)}
                name={p} index={i}></Vote>)}

            <div className="buttonDiv">
                {new Date() < new Date("2024-07-31") && <Button className='voteButton' variant="contained" size="large" onClick={handleVoteClick}>Vote</Button>}
            </div>
        </div>)
}

export default VoteContainer;

