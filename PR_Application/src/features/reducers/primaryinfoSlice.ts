import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { restApiCall } from "../../webparts/prApp/Api/ApiCall";
import { GlobalStore } from "../../app/globalStore";

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
  isDisable:boolean;
  store:[];
}
export interface fileInformation{
  key:string;
  fileName:string;
  fileType:string;
  modifiedBy:string;
  fileModifiedTime:string;
  docType:string;
  content:string;
}

export interface tableToolinterface{
    prType:string;
    ebuy:string;
    toolName:string;
    // data:[];
    

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
  buyRadio: { key: "expensebuy", text: "Expense Buy" },//type of buy
  prProjectRadio:{key:"no",text:"No"},//pr project
  prRadio: { key: "yes", text: "Yes" },
  constCenterRadio: { key: "1", text: "Department" },//cost center 
  prepaidcapitalRadio: { key: "expense", text: "Expense" },//is this Prepaid
  ehsRadio: { key: "no", text: "No" },
  },
  optionGroup:{
    prOption:  { key: "SAP", text: "SAP(Omnicell)" },
    companyCode: { key: "", text: "" },
    selectDepartment: { key: "engineering", text: "Engineering" },
    projectCode: { key: "", text: "" },
  },
  leftCheckbox:[{"label":"Consulting","id":"Consulting","isChecked":false,"isDisable":false,"store":[]},
  {"label":"Engineering","id":"Engineering","isChecked":false,"isDisable":false,"store":[]},
  {"label":"Field Services","id":"Field Services","isChecked":false,"isDisable":false,"store":[]},
  {"label":"Manufacturing","id":"Manufacturing","isChecked":false,"isDisable":false,"store":[]},
  {"label":"Office Supply and Equipment","id":"Office Supply and Equipment","isChecked":false ,"isDisable":false ,"store":[]},
  {"label":"GAAP","id":"GAAP","isChecked":false,"isDisable":false ,"store":[]}],


  rightCheckbox:[{"label":"Corporate","id":"Corporate","isChecked":false,"isDisable":false ,"store":[]},
  {"label":"Facilities or Lease","id":"Facilities or Lease","isChecked":false,"isDisable":false,"store":[]},
  {"label":"Computer Equipment","id":"Computer Equipment","isChecked":false,"isDisable":false,"store":[]},
  {"label":"Marketing","id":"Marketing","isChecked":false,"isDisable":false,"store":[]},
  {"label":"Softwaret","id":"Software","isChecked":false,"isDisable":false,"store":[]},
  {"label":"Benefits","id":"Benefits","isChecked":false,"isDisable":false,"store":[]}],
  fileData:[]
  };

  export const insertContent = createAsyncThunk(

    'insertContent',

    async () => {

      console.log("------------------------ >> ");

      console.log(initialState.radioGroup)

      console.log(initialState.optionGroup)

      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxx");

      // const res = await FakeApi.fakeDataApi();
      let res;
    
      for(let i:number=0;i<initialState.leftCheckbox.length;i++){
        console.log("initialState.leftCheckbox.length.......",initialState.leftCheckbox.length);
        
        res=await restApiCall.GetTypeOfPurGLCodeOdrType("340B","Prepaid",initialState.leftCheckbox[i].label)
      return res
      }
    }

  )

  export const primaryinfoSlice = createSlice({
    name: "reducers",
    initialState,
    reducers: {
       ChangeDisable(state: PrimaryPageinformation, 
        action: PayloadAction<boolean>)
      {
        for(let i:number=0;i<state.rightCheckbox.length;i++){
          if(state.rightCheckbox[i].label==="Facilities or Lease"){
            state.rightCheckbox[i].isDisable=false
            }
            else{
              state.rightCheckbox[i].isDisable=true
            }
        }
        for(let i:number=0;i<state.leftCheckbox.length;i++){
            state.leftCheckbox[i].isDisable=true
        }

      },
      ChangeDisableToEdit(state: PrimaryPageinformation, 
        action: PayloadAction<boolean>){
        for(let i:number=0;i<state.rightCheckbox.length;i++){
            state.rightCheckbox[i].isDisable=false
           
        }
        for(let i:number=0;i<state.leftCheckbox.length;i++){
            state.leftCheckbox[i].isDisable=false
        }
      },
      setValue(
        state: PrimaryPageinformation, 
        action: PayloadAction<any>
      ) {
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
      rightchangeCheckbox(state: PrimaryPageinformation, 
        action: PayloadAction<string>){
        for(let i=0;i<state.rightCheckbox.length;i++){
          if(state.rightCheckbox[i].id ===action.payload){
            state.rightCheckbox[i].isChecked=!state.rightCheckbox[i].isChecked
            break;
          }
        }
      },
      //toolTip update
      toolTipUpdate(
        state: PrimaryPageinformation, 
        action: PayloadAction<tableToolinterface>

      ){
        let resData=GlobalStore.getToolData(action.payload.prType,action.payload.ebuy,action.payload.toolName);
        for(let i:number=0;i<state.leftCheckbox.length;i++){
           if(state.leftCheckbox[i].label ===action.payload.toolName){
            state.leftCheckbox[i].store=resData;
            break;
           }
        }
        // for(let i:number=0;i<state.leftCheckbox.length;i++){
        // console.log(state.leftCheckbox[i].store);

        // }

      },

      saveFileDoc(state: PrimaryPageinformation, 
        action: PayloadAction<fileInformation>){
          state.fileData.push(action.payload);
        },
        deleteFileDoc(state: PrimaryPageinformation, 
          action: PayloadAction<string>){
            state.fileData=state.fileData.filter((fileItem)=> fileItem.key !==action.payload);


        },
        modifyFileData(state: PrimaryPageinformation, 
        action: PayloadAction<fileInformation>){
          state.fileData.forEach((fileItem)=>{
            if(fileItem.content===action.payload.content && fileItem.key === action.payload.key){
              fileItem.docType=action.payload.docType;
                console.log("modifyFileData----modifyFileData---  ",fileItem.docType,fileItem,action.payload);
                
            }

          })
console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
          console.log(state.fileData);
         
console.log("iiiiiiiiiiiiiXXXXXXXXXXXXXXXXXXiiiiiiiiiiiiiiiiiiiiiii")

        }
    },
    extraReducers: (builder) => {

      builder.addCase(insertContent.pending, (state) => {

        console.log("Pending....")

        // state.isLoading = true

      })

      builder.addCase(insertContent.fulfilled, (state, action) => {

        // state.isLoading = fal
        console.log("Response TOP-----------action.payload ::",action.payload);
 

      })

      builder.addCase(insertContent.rejected, (state, action) => {

        // state.isLoading = false

      })
    }
  });

  export const { setValue,changeCheckbox,rightchangeCheckbox ,saveFileDoc,deleteFileDoc,ChangeDisable,ChangeDisableToEdit,toolTipUpdate,modifyFileData} = primaryinfoSlice.actions;

  // It is a convention to export reducer as a default export:
  export default primaryinfoSlice.reducer;
