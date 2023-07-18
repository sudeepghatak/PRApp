import {
  CheckboxVisibility,
  DetailsList,
  IIconProps,
  IconButton,
  Modal,
  Stack,
} from "@fluentui/react";
import * as React from "react";

interface IPProjectCode {
  isProjectCodeOpen: boolean;
  showProjectCode: () => void;
  ProjectCode_title: string;
}

const ProjectCodeComponent: React.FunctionComponent<IPProjectCode> = (
  props
) => {
  const { isProjectCodeOpen, showProjectCode, ProjectCode_title } = props;
  const items = [
    {
      key: 1,
      project_code: "ACP.DAP",
      description: "Omnicell Device Platform ",
    },
  ];
  const columns = [
    {
      key: "column1",
      name: "Project Code",
      fieldName: "project_code",
      minWidth: 400,
      maxWidth: 450,
      isResizable: true,
    },
    {
      key: "column2",
      name: "Description",
      fieldName: "description",
      minWidth: 400,
      maxWidth: 450,
      isResizable: true,
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
