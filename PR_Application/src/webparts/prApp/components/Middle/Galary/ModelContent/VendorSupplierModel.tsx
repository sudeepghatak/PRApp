import * as React from "react";
// import { useState } from "react";
import { Modal, IIconProps, Stack, mergeStyleSets } from "@fluentui/react";
import { IconButton } from "@fluentui/react/lib/Button";

interface IModalProps {
  isModalOpen: boolean;
  showModal: () => void;
  backgroundcolor?: string;
  title?: string;
}
export const VendorSupplierModel: React.FunctionComponent<IModalProps> = (
  props
) => {
  const { isModalOpen, showModal, backgroundcolor, title } = props;
  const background_color = backgroundcolor as string;
  const modal_title = title as string;
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
              style={{ color: "black" }}
              iconProps={cancelIcon}
              onClick={showModal}
            />
          </span>
        </Stack>
        <div style={{ paddingLeft: 15, paddingRight: 15 }}>
          <ul>
            <li>
              {" "}
              US Vendors:
              <ul>
                <li>
                  <a
                    title="Add Vendor Form"
                    href="https://omnicell.sharepoint.com/teams/secure/QA2007archive/QSD/Integrated%20QMS/Quality%20Documents/QSP-21/QF-21.10.7.docx"
                    target="_blank"
                  >
                  Add Vendor Form
                  </a>
                </li>
                <li>
                  <a
                    href="https://connectdev.omnicell.com/pr/Pages/PageNotFoundError.aspx?requestUrl=https://connectdev.omnicell.com/pr/SupplyChain/Documents/OCT%202018%20W9.pdf"
                    target="_blank"
                  >
                  W9
                  </a>
                </li>
              </ul>
            </li>
            <br />
            <br />
            <br />

            <li>
              Non US Vendors:
              <ul>
                <li>
                  <a
                    title="Add Vendor Form"
                    href="https://omnicell.sharepoint.com/teams/secure/QA2007archive/QSD/Integrated%20QMS/Quality%20Documents/QSP-21/QF-21.10.7.docx"
                    target="_blank"
                  >
                  Add Vendor Form
                  </a>
                </li>
                <li>
                  <a
                    href="https://connectdev.omnicell.com/pr/SupplyChain/Documents/2017%20fw8ben.pdf"
                    target="_blank"
                  >
                  W-8BE9
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </Modal>
    </div>
  );
};
const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    minWidth: 500,
    width: 500,
    minHeight: 500,
    height: 500,
    // textAlign: "center",
    // flexFlow: "column nowrap",
    // alignItems: "stretch",
  },
});
const cancelIcon: IIconProps = { iconName: "Cancel" };
