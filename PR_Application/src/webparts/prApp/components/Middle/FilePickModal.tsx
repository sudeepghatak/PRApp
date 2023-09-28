import * as React from "react";
// import { useState } from "react";
import { Modal, IIconProps, Stack, Link } from "@fluentui/react";
import { IconButton } from "@fluentui/react/lib/Button";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import {
  fileInformation,
  saveFileDoc,
} from "../../../../features/reducers/primaryinfoSlice";
import { GlobalStore } from "../../../../app/globalStore";

interface IModalProps {
  isModalOpen: boolean;
  showModal: () => void;
}
export const FilePickModal: React.FunctionComponent<IModalProps> = (props) => {
  const { isModalOpen, showModal } = props;
  const dispatch = useDispatch();

  const onDrop = (acceptedFiles: any) => {
    console.log(acceptedFiles);
    let randomKey: string = new Date().valueOf().toString();
    const reader = new FileReader();
    let thisbase64String:string="";
    reader.onload = () => {       
      const base64String = (reader.result as string).split(',')[1]; 
      console.log("kkkkkkkkkkkkkkkkkkkkkkkkkk")
      console.log(base64String)
      thisbase64String=base64String;
      let fileData: fileInformation = {
      key:randomKey,
      fileName: acceptedFiles[0].name,
      fileType: acceptedFiles[0].type,
      modifiedBy:GlobalStore.getmainName(),
      // acceptedFiles[0].type
      fileModifiedTime: new Date().toLocaleDateString(),
      docType:"",
      content:thisbase64String
    };
    console.log("Data ---------------------- >> ",fileData)
    
    dispatch(saveFileDoc(fileData));
      console.log("llllllllllllllllllllllll")
    }
    reader.readAsDataURL(acceptedFiles[0]);
    console.log("Here -------------------",thisbase64String);
    

    showModal();
  };
  return (
    <div style={{ maxWidth: 500 }}>
      <Modal isOpen={isModalOpen} onDismiss={showModal} isBlocking={false}>
        <Stack
          horizontal
          horizontalAlign="space-between"
          style={{ backgroundColor: "#f2f2f2", border: "3px solid #fff" }}
        >
          <span style={{ marginTop: -5, paddingLeft: 15 }}>
            <h2 style={{ color: "#080708" }}>Upload Files</h2>
          </span>
          <span
            style={{
              marginTop: 15,
              marginRight: 15,
              //   backgroundColor: "whitesmoke",
              maxHeight: 30,
            }}
          >
            <IconButton iconProps={cancelIcon} onClick={showModal} />
          </span>
        </Stack>
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <>
              <div style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 5 }}>
                <div
                  {...getRootProps()}
                  style={{
                    width: "700px",
                    height: "200px",
                    border: "3px dashed #4267b2",
                    background: "#fff",
                    borderRadius: "2%",
                  }}
                >
                  <input {...getInputProps()} />
                  <Stack style={{ paddingTop: 50 }}>
                    <Stack.Item align="center">
                      Drop files here to upload
                    </Stack.Item>
                    <Stack.Item align="center">OR</Stack.Item>

                    <Stack.Item align="center">
                      <Link style={{ color: "blue" }}>Click Here</Link>
                      <span>to upload files using windows explorer view</span>
                    </Stack.Item>
                  </Stack>
                </div>
              </div>
              <div
                style={{
                  height: 200,
                }}
              ></div>
            </>
          )}
        </Dropzone>
      </Modal>
    </div>
  );
};

const cancelIcon: IIconProps = { iconName: "Cancel" };
