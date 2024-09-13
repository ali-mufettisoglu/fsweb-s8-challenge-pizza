import "./Home.css";
import { useHistory } from "react-router-dom";

export default function Home() {
    const {push} = useHistory();
    const handleClick = () => {
        push("/orderpizza");
    }
    return    <div onClick={handleClick} >
      <img id="home" src="Interfaces/Iteration-1/Home.png"/>
    </div>
}