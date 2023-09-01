import * as React from "react";
import { useEffect, useState } from "react";
import { IPersonaProps } from "@fluentui/react/lib/Persona";
import { NormalPeoplePicker } from "@fluentui/react/lib/Pickers";
import { EmployeeData } from "../../Api/employee_api";
import { EmployeeDetails } from "../../Model/employee_details";

interface IPeoplPickerProps {
  companyCodeOptionSet: (item) => void;
  // content?: string;
}

export const PeoplePickerComponent: React.FunctionComponent<
  IPeoplPickerProps
> = (props) => {
  const { companyCodeOptionSet } = props;
  const [delayResults, setDelayResults] = useState(false);
  const [employeeList, setemployeeList] = useState<EmployeeDetails[]>([]);
  const picker = React.useRef(null);
  useEffect(() => {
    EmployeeData.fetchEmployeeDetails().then((employeesData) => {
      console.log(employeesData);
      console.log("Above employee data --------------");
      setemployeeList(employeesData);
    });
  }, []);

  const onFilterChanged = (
    filterText: string,
    currentPersonas: IPersonaProps[],
    limitResults?: number
  ): IPersonaProps[] | Promise<IPersonaProps[]> => {
    console.log(picker.current.items);
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
        onResolveSuggestions={onFilterChanged}
        inputProps={{
          onBlur: (ev: React.FocusEvent<HTMLInputElement>) =>
            console.log("onBlur called"),
          onFocus: (ev: React.FocusEvent<HTMLInputElement>) =>
            console.log("onFocus called"),
          "aria-label": "People Picker",
        }}
        componentRef={picker}
        itemLimit={1}
        // onInputChange={onInputChange}
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
