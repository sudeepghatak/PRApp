import { Stack } from "office-ui-fabric-react";
import * as React from "react";
import { ApprovalLog } from "./ApprovalLog";
import { RequestHeader } from "./RequestHeader";
import { LineItemDetails } from "./LineItemDetails";



export const ApprovalComponent: React.FunctionComponent = (props) => {

    const  prId= "490";
    const message="Hello!"

    return (<Stack>
        <Stack><RequestHeader Message={message} PrId={prId} /></Stack>
        <Stack><LineItemDetails PrId={prId} /></Stack>
        <Stack><ApprovalLog PrId={prId} />
        </Stack>
    </Stack>

    );

}