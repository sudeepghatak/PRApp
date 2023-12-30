import { DefaultPalette, Stack } from "office-ui-fabric-react";
import * as React from "react";
import { ApprovalLog } from "./ApprovalLog";
import { RequestHeader } from "./RequestHeader";
import { LineItemDetails } from "./LineItemDetails";
import { useEffect } from "react";
import { DefaultButton } from "@fluentui/react";
import { restApiCall } from "../../../Api/ApiCall";
//import { AttachmentComponent } from "./AttachmentComponent";


export const RequestAndApprovalComponent: React.FunctionComponent<{ PrId: string, ApprovalId: string }> = (props) => {
    const [connectPrId, setPrId] = React.useState<string>("");
    const [hideApproval, setHideApproval] = React.useState<boolean>(true);
    const [approvalLogItems, setApprovalLogItem] = React.useState<any[]>([]);




    useEffect(() => {
        (async () => {


            const prId = props.PrId;
            const approvalId = props.ApprovalId;
            let value;
            if (approvalId != "-1") {
                value = await restApiCall.getApprovalsForApprovalId(approvalId);
                console.log("This is Approval Log item", value);
                setApprovalLogItem(value);
                setHideApproval(false);
            }
            if (prId != "-1") {
                setPrId(prId);
            } 
            
            console.log("This is Approval Log item", approvalLogItems);

        })();
    }, []);





    async function ApproveOrReject(outcome: string): Promise<void> {
        console.log("function call 39", approvalLogItems);
        if (approvalLogItems.length !== 0) {
            let ApiCallList = [];
            for (let i = 0; i < approvalLogItems.length; i++) {
                let Data = {
                    ApprovalType: approvalLogItems[0]["ApprovalType"],
                    ApprovalLevel: approvalLogItems[0]["ApprovalLevel"],
                    ConnectPRID: approvalLogItems[0]["ConnectPRID"],
                    ApproverName: approvalLogItems[0]["ApproverName"],
                    ApprovalStatus: outcome,
                    ApproverEmail: approvalLogItems[0]["ApproverEmail"],
                    ApprovalDate: approvalLogItems[0]["ApprovalDate"],
                    ApprovalId: approvalLogItems[0]["ApprovalId"],
                };
                ApiCallList.push(Data);
            }
            console.log("function call 53  ", ApiCallList);

            await restApiCall.InsertApprovalLog(ApiCallList);
        }
    }




    return (
        <Stack verticalAlign="start">
            {!hideApproval &&
                <Stack horizontal horizontalAlign="end"><DefaultButton
                    style={{
                        background: DefaultPalette.greenDark,
                        color: DefaultPalette.white,
                        borderRadius: 5,
                        height: "40px",
                        margin: 5
                    }}
                    onClick={() => ApproveOrReject("Approved")}
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
                        onClick={() => ApproveOrReject("Rejected")}
                    >
                        <Stack horizontal>
                            <span style={{ marginRight: 10, marginTop: 2 }}>
                                Reject
                            </span>

                        </Stack>
                    </DefaultButton>
                    <DefaultButton
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
                    </DefaultButton></Stack>}
            {/* Request Header */}

            {connectPrId !== "" && <RequestHeader PrId={connectPrId} />}

            {/* Line Item Details */}
            {connectPrId !== "" && <LineItemDetails PrId={connectPrId} />}
            {/* Approval Log */}
            {connectPrId !== "" && <ApprovalLog PrId={connectPrId} />}

            {/* <AttachmentComponent ConnectPrId={connectPrId}/> */}



        </Stack>
    );
};
