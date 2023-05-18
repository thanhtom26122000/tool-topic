import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import Popup from "./Popup";
import SubmitButton from "./SubmitButton";

interface TreeNode {
    name: string;
    status: number;
    cloneId?: string;
    _id: string;
    children: TreeNode[];
}

interface Props {
    data: TreeNode[];
}

const TreeFolder = ({ data }: Props) => {
    const [topicInfo, setTopicInfo] = useState<TreeNode | null>(null);
    const [changeInfo, setChangeInfo] = useState<any>({});
    const [openFolders, setOpenFolders] = useState<string[]>([]);
    const handleContextMenu = (
        event: React.MouseEvent,
        topicInfo: TreeNode
    ) => {
        event.preventDefault(); // prevent default right-click menu
        setTopicInfo(topicInfo);
    };

    const handleFolderClick = (folderId: string) => {
        if (openFolders.includes(folderId)) {
            setOpenFolders(openFolders.filter((id) => id !== folderId));
        } else {
            setOpenFolders([...openFolders, folderId]);
        }
    };

    const renderTree = (data: TreeNode[], paddingLeft = 10) => {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                }}
            >
                {data.map((item, index) => {
                    const isOpen = openFolders.includes(item._id);
                    const isFolder = item.children && item.children.length > 0;

                    return (
                        <div key={item._id} style={{ paddingLeft }}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    width: "100%",
                                    cursor: "pointer",
                                }}
                                onClick={() => handleFolderClick(item._id)}
                                onContextMenu={(event) =>
                                    handleContextMenu(event, item)
                                }
                            >
                                {isFolder ? (
                                    <FontAwesomeIcon
                                        icon={isOpen ? faFolderOpen : faFolder}
                                    />
                                ) : (
                                    <div style={{ marginLeft: "16px" }}></div>
                                )}
                                <div
                                    style={{
                                        marginLeft: "5px",
                                        color:
                                            Object.keys(changeInfo).includes(
                                                item._id
                                            ) || item.cloneId
                                                ? "#FEC20C"
                                                : "#212121",
                                    }}
                                >
                                    {item.name}
                                </div>
                            </div>
                            {isOpen &&
                                isFolder &&
                                renderTree(item.children, paddingLeft + 5)}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div>
            {renderTree(data)}
            {topicInfo && (
                <Popup
                    isOpen={topicInfo !== null}
                    changeInfo={changeInfo}
                    setChangeInfo={(value) => setChangeInfo(value)}
                    onClose={() => setTopicInfo(null)}
                    topicData={topicInfo}
                ></Popup>
            )}
            <SubmitButton submitData={changeInfo}></SubmitButton>
        </div>
    );
};

export default TreeFolder;
