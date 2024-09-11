import "./Home.css";
import { useHistory } from "react-router-dom";

export default function Home() {
    const {push} = useHistory();
    const handleClick = () => {
        push("/orderpizza");
    }
    return <div className="home" onClick={handleClick}/>
}