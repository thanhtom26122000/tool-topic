import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import TreeFolder from "./components/TreeFolder";
function App() {
    const [data, setData] = useState([]);
    useEffect(() => {
        (async () => {
            let response: any = await axios.get(
                process.env.REACT_APP_ENDPOINT + "/get-all-new-categories"
            );
            setData(response.data);
        })();
    }, []);

    return (
        <div className="App">
            <TreeFolder data={data}></TreeFolder>
        </div>
    );
}

export default App;
