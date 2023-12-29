import { DefaultPalette, Stack } from "office-ui-fabric-react";
import * as React from "react";
import { ApprovalLog } from "./ApprovalLog";
import { RequestHeader } from "./RequestHeader";
import { LineItemDetails } from "./LineItemDetails";
import { useEffect } from "react";
import { DefaultButton } from "@fluentui/react";
import { restApiCall } from "../../../Api/ApiCall";
//import { AttachmentComponent } from "./AttachmentComponent";


export const ApprovalComponent: React.FunctionComponent = (props) => {
    const [connectPrId, setPrId] = React.useState<string>("");
    const [approvalLogItems, setApprovalLogItem] = React.useState<any[]>([]);




    useEffect(() => {
        (async () => {

            //const queryParams = new URLSearchParams(window.location.search);
            const prId = "413"//queryParams.get('PrId');

            let value = await restApiCall.getApprovalsForApprovalId("23");
            console.log("PrId from Query string", prId);
            console.log("This is Approval Log item", value);

            setPrId(prId);
            setApprovalLogItem(value);
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
                };
                ApiCallList.push(Data);
            }
            console.log("function call 53  ", ApiCallList);

            await restApiCall.InsertApprovalLog(ApiCallList);
        }
            }
        
        
    

    return (
        <Stack verticalAlign="start">
            {/* Request Header */}
            <RequestHeader PrId={connectPrId} />

            {/* Line Item Details */}
            <LineItemDetails PrId={connectPrId} />

            {/* Approval Log */}
            <ApprovalLog PrId={connectPrId} />

            {/* <AttachmentComponent ConnectPrId={connectPrId}/> */}
            
            <Stack horizontal><DefaultButton
                style={{
                    background: DefaultPalette.blue,
                    color: DefaultPalette.blue,
                    borderRadius: 5,
                    height: "40px",
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
                    color: DefaultPalette.blue,
                    borderRadius: 5,
                    height: "40px",
                }}
                onClick={() => ApproveOrReject("Rejected")}
            >
                    <Stack horizontal>
                        <span style={{ marginRight: 10, marginTop: 2 }}>
                            Reject
                        </span>
                        
                    </Stack>
                </DefaultButton></Stack>
            
        </Stack>
    );
};
