import { IIconProps, IconButton, Modal, Stack, mergeStyleSets } from "office-ui-fabric-react";
import * as React from "react";
import { ApprovalLog } from "./ApprovalLog";
import { RequestHeader } from "./RequestHeader";
import { LineItemDetails } from "./LineItemDetails";
import { useEffect } from "react";
import { restApiCall } from "../../../Api/ApiCall";
import { AttachmentComponent } from "./AttachmentComponent";
import { GlobalStore } from "../../../../../app/globalStore";
import { ApproveRejectButtons } from "./ApproveRejectButtons";

//import { AttachmentComponent } from "./AttachmentComponent";

interface IModalProps {
    isModalOpen: boolean;
    showModal: () => void;
    backgroundcolor?: string;
    title?: string;
    content?: string;
    PrId: string, ApprovalId: string
}

const modal_title = "ApprovalsInfo";
export const RequestAndApprovalComponent: React.FunctionComponent<IModalProps> = (props) => {
    console.log("23 23 -----------------------")


    const [connectPrId, setPrId] = React.useState<string>("");
    const [hideApproval, setHideApproval] = React.useState<boolean>(true);
    const [isModalOpen, setisModalOpen] = React.useState<boolean>(true);
    const [approvalLogItems, setApprovalLogItem] = React.useState<any[]>([]);


    const showModal = () => {
        setisModalOpen(!isModalOpen);
    };

    useEffect(() => {
        (async () => {


            const prId = props.PrId;
            const approvalId = props.ApprovalId;
            let value;
            if (approvalId != "-1") {
                value = await restApiCall.getApprovalsForApprovalId(approvalId);
                console.log("This is Approval Log item", value);
                setApprovalLogItem(value);
                if (value[0].ApprovalStatus && value[0].ApprovalStatus.toLowerCase() === "waiting for approval") {
                    setHideApproval(false);
                } else {
                    setHideApproval(true);
                }

            }
            if (prId != "-1") {
                setPrId(prId);
            }
            console.log("GlobalStore:", GlobalStore.getmainEmail())
            console.log("This is Approval Log item", approvalLogItems);

        })();
    }, []);





    // async function ApproveOrReject(outcome: string): Promise<void> {
    //     console.log("function call 39", approvalLogItems);
    //     if (approvalLogItems.length !== 0) {
    //         let ApiCallList = [];
    //         for (let i = 0; i < approvalLogItems.length; i++) {
    //             let Data = {
    //                 ApprovalType: approvalLogItems[0]["ApprovalType"],
    //                 ApprovalLevel: approvalLogItems[0]["ApprovalLevel"],
    //                 ConnectPRID: approvalLogItems[0]["ConnectPRID"],
    //                 ApproverName: approvalLogItems[0]["ApproverName"],
    //                 ApprovalStatus: outcome,
    //                 ApproverEmail: approvalLogItems[0]["ApproverEmail"],
    //                 ApprovalDate: approvalLogItems[0]["ApprovalDate"],
    //                 ApprovalId: approvalLogItems[0]["ApprovalId"],
    //             };
    //             ApiCallList.push(Data);
    //         }
    //         console.log("function call 53  ", ApiCallList);

    //         await restApiCall.InsertApprovalLog(ApiCallList);
    //     }
    // }




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
              onClick={showModal}
            />
          </span>
        </Stack>
        <div style={{ paddingLeft: 15, paddingRight: 15 }}>
          
                    <Stack verticalAlign="start">
                        {props.ApprovalId !== "-1"  && <ApproveRejectButtons PrId={connectPrId} ApprovalId={props.ApprovalId} HideButtons={hideApproval} />}

                        {/* Request Header */}

                        {connectPrId !== "" && <RequestHeader PrId={connectPrId} />}

                        {/* Line Item Details */}
                        {connectPrId !== "" && <LineItemDetails PrId={connectPrId} />}
                        {/* Approval Log */}
                        {connectPrId !== "" && <ApprovalLog PrId={connectPrId} />}

                        {connectPrId !== "" && <AttachmentComponent ConnectPrId={connectPrId} />}



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
