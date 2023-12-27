import { Stack } from "office-ui-fabric-react";
import * as React from "react";
import { ApprovalLog } from "./ApprovalLog";
import { RequestHeader } from "./RequestHeader";
import { LineItemDetails } from "./LineItemDetails";
import { useEffect } from "react";

export const ApprovalComponent: React.FunctionComponent = (props) => {
   // const [connectPrId, setPrId] = React.useState<string>("");

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const prId = queryParams.get('PrId');
        const approvalId = queryParams.get('ApprovalId');

        // Do something with the parameters
        console.log('param1:', prId);
        console.log('param2:', approvalId);
        if (prId !== null) {
    //        setPrId(prId);
        }

    }, []);

    return (
        <Stack verticalAlign="start">
            {/* Request Header */}
            <RequestHeader PrId={"490"} />

            {/* Line Item Details */}
            <LineItemDetails PrId={"490"} />

            {/* Approval Log */}
            <ApprovalLog PrId={"490"} />
        </Stack>
    );
};
