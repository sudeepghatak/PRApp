import * as React from "react";
import { IPersonaProps } from "@fluentui/react/lib/Persona";
import { NormalPeoplePicker } from "@fluentui/react/lib/Pickers";
import { restApiCall } from "../../Api/ApiCall";
import { EmployeeDetails } from "../../Model/employee_details";

interface IPeoplPickerProps {
  companyCodeOptionSet: (item) => void;
  // content?: string;
}
export const NormalPicker: React.FunctionComponent<IPeoplPickerProps> = (
  props
) => {
  const { companyCodeOptionSet } = props;
  const [data, setdata] = React.useState("");
  const [delayResults, setDelayResults] = React.useState(false);
  const [employeeList, setemployeeList] = React.useState<EmployeeDetails[]>([]);

  const picker = React.useRef(null);
  const myDebounce = (callback: () => void, time: number) => {
    let timer: any;

    return function () {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        callback();
      }, time);
    };
  };

  const callFun = () => {
    //api call arhument data
    console.log("My Search data ", data);
    restApiCall.getallEmployeList(data).then((employeesData) => {
      console.log("My Search Output ", employeesData);
      setemployeeList(employeesData);
    });

    // console.log("Now I am Doing Here .....", data);
  };

  // Debounce the call to callFun when data changes

  const debouncedCallFun = myDebounce(callFun, 1000);
  React.useEffect(() => {
    console.log("I am Call Here =================");

    debouncedCallFun();
  }, [data]);
  const onFilterChanged = (
    filterText: string,
    currentPersonas: IPersonaProps[],
    limitResults?: number
  ): IPersonaProps[] | Promise<IPersonaProps[]> => {
    setdata(filterText);
    if (picker.current.items.length !== 0) {
      console.log(
        "878787878787878787877-------------------- >",
        picker.current.items[0]
      );
      //   GlobalStore.storeName(picker.current.items[0]["text"], false);
      //   GlobalStore.storeEmail(picker.current.items[0]["email"], false);
    }
    console.log("This is Picker here ", picker.current.items);

    companyCodeOptionSet(picker.current.items);
    if (filterText) {
      let filteredPersonas: IPersonaProps[] = filterPersonasByText(filterText);

      filteredPersonas = removeDuplicates(filteredPersonas, currentPersonas);
      filteredPersonas = limitResults
        ? filteredPersonas.slice(0, limitResults)
        : filteredPersonas;
      return filterPromise(filteredPersonas);
    } else {
      return [];
    }
  };

  const filterPersonasByText = (filterText: string): IPersonaProps[] => {
    return employeeList.filter((item) =>
      doesTextStartWith(item.text as string, filterText)
    );
  };

  const filterPromise = (
    personasToReturn: IPersonaProps[]
  ): IPersonaProps[] | Promise<IPersonaProps[]> => {
    if (delayResults) {
      return convertResultsToPromise(personasToReturn);
    } else {
      return personasToReturn;
    }
  };

  return (
    <div>
      <NormalPeoplePicker
        // eslint-disable-next-line react/jsx-no-bind
        onResolveSuggestions={onFilterChanged}
        inputProps={{
          onBlur: (ev: React.FocusEvent<HTMLInputElement>) =>
            console.log("onBlur called"),
          onFocus: (ev: React.FocusEvent<HTMLInputElement>) =>
            console.log("onFocus called"),
          "aria-label": "People Picker",
        }}
        componentRef={picker}
        resolveDelay={300}
      />
    </div>
  );
};

function doesTextStartWith(text: string, filterText: string): boolean {
  return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
}

function removeDuplicates(
  personas: IPersonaProps[],
  possibleDupes: IPersonaProps[]
) {
  return personas.filter(
    (persona) => !listContainsPersona(persona, possibleDupes)
  );
}

function listContainsPersona(
  persona: IPersonaProps,
  personas: IPersonaProps[]
) {
  if (!personas || !personas.length || personas.length === 0) {
    return false;
  }
  return personas.filter((item) => item.text === persona.text).length > 0;
}

function convertResultsToPromise(
  results: IPersonaProps[]
): Promise<IPersonaProps[]> {
  return new Promise<IPersonaProps[]>((resolve, reject) =>
    setTimeout(() => resolve(results), 2000)
  );
}