import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Popup({
    isOpen,
    onClose,
    topicData,
    setChangeInfo,
    changeInfo,
}: {
    isOpen: boolean;
    onClose: () => void;
    topicData: any;
    changeInfo: any;
    setChangeInfo: (value: any) => void;
}) {
    const [replaceId, setReplaceId] = React.useState(
        changeInfo[topicData._id]?._id ?? topicData?.cloneId ?? ""
    );
    const [status, setStatus] = React.useState(
        changeInfo[topicData._id]?.status ?? topicData.status ?? -1
    );
    const handleAddChange = () => {
        if (replaceId.length >= 24) {
            setChangeInfo({
                ...changeInfo,
                [topicData._id]: {
                    _id: replaceId,
                    status: status,
                },
            });
            onClose();
        } else {
            if (status > 5 || status < 0) {
                window.alert("Type invalid");
            } else {
                window.alert("invalid id");
            }
        }
    };
    return (
        <div>
            <Dialog
                open={isOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={onClose}
                PaperProps={{
                    style: {
                        minWidth: 500,
                    },
                }}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle style={{ textAlign: "center" }}>
                    {topicData.name}
                </DialogTitle>
                <DialogContent>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "20px",
                        }}
                    >
                        <div>ReplaceId</div>
                        <TextField
                            variant="outlined"
                            value={replaceId}
                            onChange={(event) =>
                                setReplaceId(event.target.value)
                            }
                            style={{ width: "100%" }}
                            placeholder="Replace Id"
                            onKeyDown={(event) => {
                                if (event.key == "Enter") {
                                    handleAddChange();
                                }
                            }}
                        ></TextField>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "20px",
                            marginTop: "20px",
                        }}
                    >
                        <div>Status</div>
                        <TextField
                            variant="outlined"
                            value={status}
                            onChange={(event) => {
                                setStatus(event.target.value);
                            }}
                            style={{ width: "100%" }}
                            placeholder="Type"
                            type={"number"}
                            onKeyDown={(event) => {
                                if (event.key == "Enter") {
                                    handleAddChange();
                                }
                            }}
                        ></TextField>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={handleAddChange}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
