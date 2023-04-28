import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
const SubmitButton = ({ submitData }: { submitData: any }) => {
    const [disable, setDisable] = useState(false);
    const handleSubmit = async () => {
        setDisable(true);

        if (Object.keys(submitData).length == 0) {
            setDisable(false);
            window.alert("Not thing change");
        } else {
            let endpoint =
                process.env.REACT_APP_ENDPOINT + "/update-categories";
            let result = await axios.post(endpoint, {
                data: submitData,
            });
            window.alert("Submitted");
            setDisable(false);
        }
    };
    return (
        <Button
            disabled={disable}
            onClick={() => handleSubmit()}
            variant="contained"
        >
            Submit
        </Button>
    );
};
export default SubmitButton;
