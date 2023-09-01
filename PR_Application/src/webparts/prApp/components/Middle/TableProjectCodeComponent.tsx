import {
  CheckboxVisibility,
  DetailsList,
  IIconProps,
  IconButton,
  Modal,
  Stack,
} from "@fluentui/react";
import * as React from "react";
import { ConnectPr } from "../../Api/api";

interface IPProjectCode {
  isProjectCodeOpen: boolean;
  showProjectCode: () => void;
  ProjectCode_title: string;
}

const ProjectCodeComponent: React.FunctionComponent<IPProjectCode> = (
  props
) => {
  const { isProjectCodeOpen, showProjectCode, ProjectCode_title } = props;
  const [items,setitems]=React.useState([])
  React.useEffect(()=>{
    if(ProjectCode_title ==="Engineering")
    {
      let eng=[]
      ConnectPr.getInstance().GetPREnggProCodeNeedHelp().then((engValue)=>{
        for(let i=0;i<engValue.length;i++){
          let newItem={
            key:i,
            project_code:engValue[i].Title,
            description:engValue[i].ProjDesc
          }
          eng.push(newItem)

        }
          setitems([...eng])


      })

    }
   else if(ProjectCode_title ==="Marketing")
   {
    ConnectPr.getInstance().GetPRMarketProCodeNeedHelp().then((mrkvalue)=>{
      console.log("Marketing values");
      let mar=[]
      for(let i=0;i<mrkvalue.length;i++){
        let newmrkItem={
            key:i,
            project_code:mrkvalue[i].Title,
            description:mrkvalue[i].ProjectDesc
          }
          mar.push(newmrkItem)
          
          
        
      }
          setitems([...mar])

    })

   }


  },[])

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
