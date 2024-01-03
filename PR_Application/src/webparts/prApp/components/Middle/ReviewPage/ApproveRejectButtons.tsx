import axios from "axios";
import { DefaultButton, DefaultPalette, Stack } from "office-ui-fabric-react";
import * as React from "react";
import { flowApprovalAPI } from "../../../Api/Config/server_config";
import { ModalComments } from "./ModalComments";
import { GlobalStore } from "../../../../../app/globalStore";

interface ApproveRejectButtonsProps {
    ApprovalId: string;
    PrId: string;
    HideButtons: boolean;
}

export const ApproveRejectButtons: React.FunctionComponent<ApproveRejectButtonsProps> = (props) => {
    const [hideButtons, setHideButton] = React.useState<boolean>(true);
    const [isModalOpen, setIsModelOpen] = React.useState<boolean>(false);
    const [flowMessage, setFlowMessage] = React.useState<string>("");

    const showModal = () => {
        setIsModelOpen(!isModalOpen);
    };

    React.useEffect(() => {
        setHideButton(props.HideButtons);
    }, [props.HideButtons]);


    async function ApproveTask(): Promise<void> {
        console.log("GlobalStore:", GlobalStore); // Log the GlobalStore object
        console.log("mainEmail:", GlobalStore.getmainEmail()); // Log the result of getmainEmail()

        let loggedInUserEmail = GlobalStore.getmainEmail();
        let triggerRes = await axios.post(flowApprovalAPI,
            {
                ApprovalId: props.ApprovalId, ApprovalStatus: "Approved", ApproverEmail: loggedInUserEmail, Comments:""
            }
        );

        setFlowMessage(triggerRes.data.Message);
        console.log("triggerRes: ", triggerRes)
        setHideButton(true)
    }

    return (<Stack>{!hideButtons ?
        <Stack horizontal horizontalAlign="end"><DefaultButton
            style={{
                background: DefaultPalette.greenDark,
                color: DefaultPalette.white,
                borderRadius: 5,
                height: "40px",
                margin: 5
            }}
            onClick={() => ApproveTask()}
        >
            <Stack horizontal>
                <span style={{ marginRight: 10, marginTop: 2 }}>
                    Approve
                </span>

            </Stack>
        </DefaultButton>
            <DefaultButton
                style={{
                    background: DefaultPalette.red,
                    color: DefaultPalette.white,
                    borderRadius: 5,
                    height: "40px",
                    margin: 5
                }}
                onClick={() => showModal()}
            >
                <Stack horizontal>
                    <span style={{ marginRight: 10, marginTop: 2 }}>
                        Reject
                    </span>

                </Stack>
            </DefaultButton>
            <Stack.Item>{flowMessage}</Stack.Item>
            {/* <DefaultButton
                style={{
                    background: DefaultPalette.blue,
                    color: DefaultPalette.white,
                    borderRadius: 5,
                    height: "40px",
                    margin: 5
                }}
                onClick={() => ApproveOrReject("Resend")}
            >
                <Stack horizontal>
                    <span style={{ marginRight: 10, marginTop: 2 }}>
                        Resend
                    </span>

                </Stack>
            </DefaultButton>*/}
            </Stack> : ( hideButtons && ( 
                <Stack>
                    <h4>This task has already been processed, or you may not have been assigned to it</h4>
                </Stack>
            )) }
            {isModalOpen && <ModalComments isModalOpen={isModalOpen} showModal={showModal} PRId={props.PrId} ApprovalId={props.ApprovalId}/>}
            </Stack>)
}