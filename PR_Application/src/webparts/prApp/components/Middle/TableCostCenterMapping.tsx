import * as React from "react";
import { useState, useEffect } from "react";
import {
  Modal,
  IIconProps,
  Stack,
  Spinner,
} from "@fluentui/react";
import { IconButton } from "@fluentui/react/lib/Button";
import { ConnectPr } from "../../Api/api";

interface ITableCostCenterMappingProps {
  isModalOpen: boolean; // Add the isModalOpen prop
  closeModal: () => void;
}

interface ITableItem {
  key: string;
  Title: string;
  Approver:string;
  Amount: string;
  CompanyCode: string;
  CountryCode: string;
}

export const TableCostCenterMapping: React.FunctionComponent<ITableCostCenterMappingProps> = (props) => {
  const { isModalOpen,closeModal } = props; // Destructure the isModalOpen prop
  

  const [items, setItems] = useState<ITableItem[]>([]);
  const [completeDatafetch, setCompleteDatafetch] = useState<boolean>(false);
  const companyCode = ""; // Set your initial value here

  // Icon for the cancel button
  const cancelIcon: IIconProps = { iconName: "Cancel" };

  // Function to fetch data
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await ConnectPr.getInstance().GetCostCenterMapping();
        const choiceGroupOptions = response.map((item, index) => ({
          key: index.toString(),
          Title: item.Title,
          Amount: item.Amount,
          CompanyCode: item.CompanyCode,
          CountryCode: item.CountryCode,
          Approver: item.Approver.Title,
        }));
        setCompleteDatafetch(true);
        setItems(choiceGroupOptions);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  

  return (
    <Modal
      styles={{ main: { maxHeight: "unset" } }}
      isOpen={isModalOpen}
      onDismiss={closeModal}
      isBlocking={false}
    >
      <Stack
        horizontal
        horizontalAlign="space-between"
        style={{
          backgroundColor: "black",
          border: "3px solid #fff",
        }}
      >
        <span style={{ marginTop: -5, paddingLeft: 15 }}>
          <h2 style={{ color: "#fff" }}>Company Code Mappings</h2>
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
            onClick={closeModal} // Use closeModal to close the modal
          />
        </span>
      </Stack>
      <div style={{ paddingLeft: 15, paddingRight: 15 }}>
        <div>
          <Stack>
            {!completeDatafetch ? (
              <div>
                <Spinner label="Please wait .." />
              </div>
            ) : items.length === 0 ? (
              "No Data Found"
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Approver</th>
                    <th>Amount</th>
                    <th>CompanyCode</th>
                    <th>CountryCode</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.key}>
                      <td>{item.Title}</td>
                      <td>{item.Approver}</td>
                      <td>{item.Amount}</td>
                      <td>{item.CompanyCode}</td>
                      <td>{item.CountryCode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Stack>
        </div>
      </div>
    </Modal>
  );
};
