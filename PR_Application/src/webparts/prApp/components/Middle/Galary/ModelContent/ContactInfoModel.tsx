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
export const ContactInfoModel: React.FunctionComponent<IModalProps> = (
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
          <h3>Omnicell Contact for Expense</h3>
          <p>For assistance Contact Site Helpdesk</p>
          <ul>
            <li>Milpitas, CA</li>
            <span>Phone: 408-854-5704</span>
            <div>
              <span>
                Email: <a href="#">P2P-Milpitas@omnicell.com</a>
              </span>
            </div>

            <br />
            <li>St. Petersburgh, FL</li>
            <span>Phone: 727-580-2939</span>
            <div>
              <span>
                Email: <a href="#">P2P-StPetersburg@omnicell.com</a>
              </span>
            </div>

            <br />
            <li>Warrendale, PA</li>
            <span>Phone: 724-741-7729</span>
            <div>
              <span>
                Email: <a href="#">P2P-Warrendale@omnicell.com</a>
              </span>
            </div>
          </ul>

          <h3>MTS-OMCL Contact for Expense</h3>
          <ul>
            <li>
              Email:<a href="#">P2P-MTS@omnicell.com</a>
            </li>
            <li>Phone: 727-580-2939 ext. 1451</li>
          </ul>

          <h3>Business Admin Connect PR</h3>
          <ul>
            <li>
              Email: <a href="#">ConnectPRBusAdmin@omnicell.com</a>
            </li>
          </ul>

          <h3>IT Admin Connect PR</h3>
          <ul>
            <li>
              Email: <a href="#">connectpradmin@omnicell.com</a>
            </li>
          </ul>

          <h3>Omnicell – MACH4 GERMANY</h3>
          <ul>
            <li>
              Email: <a href="#">DE-Einkauf-BO@omnicell.com</a>
            </li>
            <li>Phone: +49 234 588 34 2150</li>
          </ul>

          <h3>Omnicell - UK</h3>
          <ul>
            <li>
              Email: <a href="#">uk_p2p@omnicell.com</a>
            </li>
          </ul>

          <h3>Omnicell – France</h3>
          <ul>
            <li>
              Email: <a href="#">france_p2p@omnicell.com​​</a>
            </li>
          </ul>
        </div>
      </Modal>
    </div>
  );
};

const cancelIcon: IIconProps = { iconName: "Cancel" };
