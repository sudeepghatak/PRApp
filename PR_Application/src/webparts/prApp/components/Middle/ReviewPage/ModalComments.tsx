import { DefaultButton, DefaultPalette, IIconProps, IconButton, Modal, Stack, TextField, mergeStyleSets } from "office-ui-fabric-react";
import * as React from "react";
import { flowApprovalAPI } from "../../../Api/Config/server_config";
import axios from "axios";
import { useState } from "react";

interface IModalProps {
    isModalOpen: boolean;
    showModal: () => void;
    PRId: string;
    ApprovalId: string;
}
export const ModalComments: React.FunctionComponent<IModalProps> = (props) => {
    const { isModalOpen, showModal } = props;
    const [comments, setComments] = useState<string>("");
    async function RejectTask(comments: string): Promise<void> {
        let triggerRes = await axios.post(
            flowApprovalAPI,
            {
                PrId: props.PRId, Outcome: "Rejected", Comments: comments
            }
        );
        console.log("triggerRes: ", triggerRes)
    }

    return (
        <div style={{ maxWidth: 500 }}>
            <Modal
                isOpen={isModalOpen}
                onDismiss={showModal}
                isBlocking={false}
                containerClassName={contentStyles.container}
            >
                <Stack
                    horizontal
                    horizontalAlign="space-between"
                    style={{
                        backgroundColor: `white`,
                        border: "3px solid #fff",
                    }}
                >
                    <span style={{ marginTop: -5, paddingLeft: 15 }}>
                        <h2 style={{ color: "#fff" }}>{"Rejection Comments"}</h2>
                    </span>
                    <span
                        style={{
                            marginTop: 15,
                            marginRight: 15,
                            backgroundColor: "whitesmoke",
                            maxHeight: 30,
                        }}
                    >
                        <IconButton
                            style={{ color: "red" }}
                            iconProps={cancelIcon}
                            onClick={showModal}
                        />
                    </span>
                </Stack>
                <div style={{ paddingLeft: 15, paddingRight: 15 }}>
                    <Stack style={{ height: 50, marginBottom: 10 }}>
                        <Stack.Item><h2>Rejection Comments</h2></Stack.Item>
                        <Stack.Item><TextField
                            styles={{
                                root: { height: 50 },  // Set the height here
                                field: { height: "100%" }, // Adjust the height of the input field if needed

                            }}
                            name="RejectionComments"
                            onChange={(e, newValue) =>
                                setComments(newValue || "")
                            }
                            placeholder="Please provide rejection comments"
                        /></Stack.Item>
                        <Stack.Item>
                            <DefaultButton style={{
                                background: DefaultPalette.red,
                                color: DefaultPalette.white,
                                borderRadius: 5,
                                height: "40px",
                                width: "100px"
                            }}
                                onClick={() => RejectTask(comments)}
                            >
                                <Stack horizontal>
                                    <span style={{ marginRight: 10, marginTop: 2 }}>

                                    </span>
                                    <span>Submit</span>
                                </Stack></DefaultButton></Stack.Item>
                    </Stack>


                </div>
            </Modal>
        </div>)
}

const contentStyles = mergeStyleSets({
    container: {
        display: "flex",
        minWidth: 800,
        width: 800,
        minHeight: 400,
        height: 500,
        textAlign: "center",
        flexFlow: "column nowrap",
        alignItems: "stretch",
    },
});
const cancelIcon: IIconProps = { iconName: "Cancel" };