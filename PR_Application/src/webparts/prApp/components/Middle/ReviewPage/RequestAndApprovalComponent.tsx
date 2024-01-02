import * as React from "react";
import { IIconProps, IconButton, Modal, Stack, mergeStyleSets } from "office-ui-fabric-react";
import { useEffect, useState } from "react";
import { restApiCall } from "../../../Api/ApiCall";
import { ApprovalLog } from "./ApprovalLog";
import { RequestHeader } from "./RequestHeader";
import { LineItemDetails } from "./LineItemDetails";
import { AttachmentComponent } from "./AttachmentComponent";
import { ApproveRejectButtons } from "./ApproveRejectButtons";

interface IModalProps {
    isModalOpen: boolean;
    showModal: () => void;
    PrId: string;
    ApprovalId: string;
    userEmail: string;
}

const modal_title = "ApprovalsInfo";

export const RequestAndApprovalComponent: React.FunctionComponent<IModalProps> = (props) => {
    const [connectPrId, setConnectPrId] = useState<string>(props.PrId);
    const [hideApproval, setHideApproval] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
    const [approvalLogItems, setApprovalLogItems] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const prId = props.PrId;
            const approvalId = props.ApprovalId;

            let value;

            if (approvalId !== "-1") {
                value = await restApiCall.getApprovalsForApprovalId(approvalId);
                console.log("This is Approval Log item", value);
                setApprovalLogItems(value);

                if (value[0]?.ApprovalStatus?.toLowerCase() === "waiting for approval" && value[0]?.ApproverEmail?.toLowerCase() === props.userEmail?.toLowerCase()) {
                    setHideApproval(false);
                } else {
                    setHideApproval(true);
                }
            }

            if (prId !== "-1") {
                setConnectPrId(prId);
                console.log("ConnectPRId: ", connectPrId);
            }

            console.log("GlobalStore:", props.userEmail);
            console.log("This is Approval Log item", approvalLogItems);
        };

        fetchData();
    }, [props.PrId, props.ApprovalId, props.userEmail]);

    const handleCloseModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div style={{ maxWidth: 500 }}>
            <Modal
                isOpen={isModalOpen}
                onDismiss={handleCloseModal}
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
                        <h2 style={{ color: "#fff" }}>{modal_title}</h2>
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
                            onClick={handleCloseModal}
                        />
                    </span>
                </Stack>
                <div style={{ paddingLeft: 15, paddingRight: 15 }}>
                    <Stack verticalAlign="start">
                        {props.ApprovalId !== "-1" && (
                            <ApproveRejectButtons PrId={props.PrId} ApprovalId={props.ApprovalId} HideButtons={hideApproval} />
                        )}

                        {props.PrId !== "-1" && <RequestHeader PrId={props.PrId} />}
                        {props.PrId !== "-1" && <LineItemDetails PrId={props.PrId} />}
                        {props.PrId !== "-1" && <ApprovalLog PrId={props.PrId} />}
                        {props.PrId !== "-1" && <AttachmentComponent ConnectPrId={props.PrId} />}
                    </Stack>
                </div>
            </Modal>
        </div>
    );
};

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
