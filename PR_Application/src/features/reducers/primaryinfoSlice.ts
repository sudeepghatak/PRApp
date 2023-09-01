import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface choiceGroup{
  key:string,
  text:string
}
 interface dropdownOption{
  key:string,
  text:string
 }
interface ActionType {
  radioGroup:{[key: string]: choiceGroup}[];
  optionGroup:{[key: string]: dropdownOption}[];
}


export interface CheckboxItem {
  label: string;
  id: string;
  isChecked: boolean;
}
export interface fileInformation{
  key:string;
  fileName:string;
  fileType:string;
  fileModifiedTime:string;
}

interface radioGroup{
  prRadio:choiceGroup;
  constCenterRadio:choiceGroup;
  buyRadio:choiceGroup;
  prepaidcapitalRadio:choiceGroup;
  ehsRadio:choiceGroup;
  prProjectRadio:choiceGroup;
}
interface optionGroup{
  prOption:dropdownOption;
  companyCode:dropdownOption;

  selectDepartment:dropdownOption;

  projectCode:dropdownOption;
}


 interface PrimaryPageinformation{
  radioGroup:radioGroup;
  optionGroup:optionGroup;

  leftCheckbox:CheckboxItem[];
  rightCheckbox:CheckboxItem[];
  fileData:fileInformation[];
}



const initialState: PrimaryPageinformation = {
  radioGroup:{
  buyRadio:{key:"",text:""},
  prProjectRadio:{key:"",text:""},
  prRadio: { key: "", text: "" },
  constCenterRadio: { key: "", text: "" },
  prepaidcapitalRadio: { key: "", text: "" },
  ehsRadio: { key: "", text: "" },
  },
  optionGroup:{
    prOption: { key: "", text: "" },
    companyCode: { key: "", text: "" },
    selectDepartment: { key: "", text: "" },
    projectCode: { key: "", text: "" },
  },
  leftCheckbox:[{"label":"Consulting","id":"Consulting","isChecked":false},{"label":"Engineering","id":"Engineering","isChecked":false},{"label":"Field Services","id":"Field Services","isChecked":false},{"label":"Manufacturing","id":"Manufacturing","isChecked":false},{"label":"Office Supply and Equipment","id":"Office Supply and Equipment","isChecked":false},{"label":"GAAP","id":"GAAP","isChecked":false}],
  rightCheckbox:[],
  fileData:[]
  };

  export const primaryinfoSlice = createSlice({
    name: "reducers",
    initialState,
    reducers: {
      setValue(
        state: PrimaryPageinformation, 
        action: PayloadAction<any>
      ) {
        console.log("opiiiiiiiiiiiiiiiiiiiiii")
        console.log(action.payload)
        console.log("opopopopopopopopopopopopopopopopo")
        // action.payload
        for(let i=0;i<action.payload.optionGroup.length;i++){
          
          state.optionGroup[Object.keys(action.payload.optionGroup[i])[0]]=action.payload.optionGroup[i][Object.keys(action.payload.optionGroup[i])[0]]

        }
        
        for(let i=0;i<action.payload.radioGroup.length;i++){
          
          state.radioGroup[Object.keys(action.payload.radioGroup[i])[0]]=action.payload.radioGroup[i][Object.keys(action.payload.radioGroup[i])[0]]

        }

      },
      changeCheckbox(state: PrimaryPageinformation, 
        action: PayloadAction<string>){
        for(let i=0;i<state.leftCheckbox.length;i++){
          if(state.leftCheckbox[i].id ===action.payload){
            state.leftCheckbox[i].isChecked=!state.leftCheckbox[i].isChecked
            break;
          }
        }
      },
      saveFileDoc(state: PrimaryPageinformation, 
        action: PayloadAction<fileInformation>){
          console.log("File Data Save Here ....")
          console.log(action.payload)

          state.fileData.push(action.payload);
        },
        deleteFileDoc(state: PrimaryPageinformation, 
          action: PayloadAction<string>){
            console.log("Coming Here -------------------- ")
            console.log(action.payload)
            console.log("SSSSSSSSSSSSSSSSSSSSSSS")
            state.fileData=state.fileData.filter((fileItem)=> fileItem.key !==action.payload);


        }
    },
  });

  export const { setValue,changeCheckbox ,saveFileDoc,deleteFileDoc} = primaryinfoSlice.actions;

  // It is a convention to export reducer as a default export:
  export default primaryinfoSlice.reducer;
