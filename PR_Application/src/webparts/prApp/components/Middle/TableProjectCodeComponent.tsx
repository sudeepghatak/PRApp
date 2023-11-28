import {
  CheckboxVisibility,
  DetailsList,
  IIconProps,
  IconButton,
  Link,
  Modal,
  Stack,
} from "@fluentui/react";
import * as React from "react";
// import { ConnectPr } from "../../Api/api";
import { restApiCall } from "../../Api/ApiCall";
import { IPrProjectCode } from "../../Model/IPrProjectCode";
// import { useState } from "react";

//Link for Project Code-----------------

interface IPProjectCode {
  isProjectCodeOpen: boolean;
  showProjectCode: () => void;
  ProjectCode_title: string;
  ProCodeItemDatapick?: (ProCode: IPrProjectCode) => void;
  checkProCode: boolean;
}
// ------------------------------------------------

const ProjectCodeComponent: React.FunctionComponent<IPProjectCode> = (
  props
) => {
  const {
    isProjectCodeOpen,
    showProjectCode,
    ProjectCode_title,
    ProCodeItemDatapick,
    checkProCode,
  } = props;
  const [items, setitems] = React.useState<any[]>([]);

  //Link for Project Code-----------------
  const sendProCodeDetails = (procodeDetails: IPrProjectCode) => {
    console.log(procodeDetails);
    if (ProCodeItemDatapick) {
      ProCodeItemDatapick(procodeDetails);
    }
    showProjectCode();
  };
  //---------------------------------------------------

  React.useEffect(() => {
    let listProjectCode: any[] = [];

    restApiCall
      .getProjetCodeList(ProjectCode_title)
      .then((projectCodevalue) => {
        console.log(projectCodevalue);
        for (let i: number = 0; i < projectCodevalue.length; i++) {
          console.log(projectCodevalue[i]);
          if (projectCodevalue[i].IsActive) {
            console.log(projectCodevalue[i].ProjDesc);
            let newItem = {
              key: i,
              project_code: projectCodevalue[i].Title,
              description: projectCodevalue[i].ProjDesc,
            };
            console.log(newItem);
            listProjectCode.push(newItem);
          }
        }
        setitems([...listProjectCode]);
      });
  }, []);

  const columns = [
    {
      key: "column1",
      name: "Project Code",
      fieldName: "project_code",
      minWidth: 300,
      maxWidth: 350,
      isResizable: true,
      onRender: (item: IPrProjectCode) => {
        let procodeValue = item.project_code as string;

        return (
          <>
            {ProCodeItemDatapick !== null && checkProCode === true ? (
              <Link onClick={() => sendProCodeDetails(item)}>
                {procodeValue}
              </Link>
            ) : (
              { procodeValue }
            )}
          </>
        );
      },
      styles: {
        root: {
          backgroundColor: "green",
          color: "white",
          borderRightColor: "white", // Set the right border color to white
          borderRightWidth: "1px", // Optional: Adjust the border width if needed
          borderRightStyle: "solid",
          selectors: {
            ":hover": {
              backgroundColor: "green", // Change the background color on hover
              cursor: "pointer",
              color: "white",
              // Optional: Show a pointer cursor on hover
            },
          },
        },
      },
    },
    {
      key: "column2",
      name: "Description",
      fieldName: "description",
      minWidth: 500,
      maxWidth: 600,
      isResizable: true,
      styles: {
        root: {
          backgroundColor: "green",
          color: "white",
          borderRightColor: "white", // Set the right border color to white
          borderRightWidth: "1px", // Optional: Adjust the border width if needed
          borderRightStyle: "solid",
          selectors: {
            ":hover": {
              backgroundColor: "green", // Change the background color on hover
              color: "white",
              // Optional: Show a pointer cursor on hover
            },
          },
        },
      },
    },
  ];
  return (
    <div>
      <Modal
        isOpen={isProjectCodeOpen}
        onDismiss={showProjectCode}
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
          {/* <div className={classNames.item} data-is-focusable data-selection-index={itemIndex}>
      {selection && selection.canSelectItem(item) && selection.mode !== SelectionMode.none && (
        <div className={classNames.check} data-is-focusable data-selection-toggle>
          <Check checked={isSelected} />
        </div> */}

          <span style={{ marginTop: -5, paddingLeft: 15 }}>
            <h2 style={{ color: "#fff" }}>{ProjectCode_title} Project Codes</h2>
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
              onClick={showProjectCode}
            />
          </span>
        </Stack>
        <div style={{ paddingLeft: 15, paddingRight: 15, width: 1000 }}>
          <DetailsList
            items={items}
            columns={columns}
            checkboxVisibility={CheckboxVisibility.hidden}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ProjectCodeComponent;

const cancelIcon: IIconProps = { iconName: "Cancel" };
