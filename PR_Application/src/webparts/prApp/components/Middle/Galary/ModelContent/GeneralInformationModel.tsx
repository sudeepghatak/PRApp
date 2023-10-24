import * as React from "react";
// import { useState } from "react";
import { Modal, IIconProps, Stack } from "@fluentui/react";
import { IconButton } from "@fluentui/react/lib/Button";

interface IModalProps {
  isModalOpen: boolean;
  showModal: () => void;
  backgroundcolor?: string;
  title?: string;
}
export const GeneralInformationModel: React.FunctionComponent<IModalProps> = (
  props
) => {
  const { isModalOpen, showModal, backgroundcolor, title } = props;
  const background_color = backgroundcolor as string;
  const modal_title = title as string;
  return (
    <div style={{ maxWidth: 500 }}>
      <Modal isOpen={isModalOpen} onDismiss={showModal} isBlocking={false}>
        <Stack
          horizontal
          horizontalAlign="space-between"
          style={{
            backgroundColor: `${background_color}`,
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
        <div style={{ paddingLeft: 15, paddingRight: 15, color: "red" }}>
          <ul>
            <li>
              Before you start the PR process. Be sure to have documents to
              attach and support the request.
              <ul>
                <li>Quote, Estimate, or Statement of Work (SOW)</li>
                <li>PR cannot be submitted without an attachment</li>
              </ul>
            </li>
            <li>
              Data Entry on a PR using this form is automatically SAVED. There
              is no SAVE icon and you may stop at any point in the process and
              come back to complete a PR at a later time.
            </li>
            <li>
              PO will be submitted to Supplier upon the PR being approved, based
              on the hierarchy.
              <ul>
                <li>
                  Expect 1 – 3 business days for approval and submission of PO
                  to Supplier with this process. Dependent on value of order and
                  number of approvers/hierarchy.
                </li>
              </ul>
            </li>
            <li>
              Two Types of Orders Standard Expense PR/PO and Blanket Orders.
              <ul>
                <li>
                  Expense Orders typically require a delivery of goods to an
                  address with a PO
                </li>
                <li>
                  Blanket Orders are used for Consulting and Service Agreement
                </li>
              </ul>
            </li>
            <li>
              Direct Shipment to Location of Choice is supported. However, it is
              the responsibility of the requestor of to ensure and confirm
              delivery of goods is complete. Purchasing and Shipping/Receiving
              Personal are not tracking or connected to these type of direct
              orders.
            </li>
          </ul>
        </div>
      </Modal>
    </div>
  );
};

const cancelIcon: IIconProps = { iconName: "Cancel" };
