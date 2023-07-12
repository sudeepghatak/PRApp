import * as React from 'react';
import { DetailsList, IColumn, CheckboxVisibility } from '@fluentui/react/lib/DetailsList';
import { Icon } from '@fluentui/react/lib/Icon';

const TableComponent = () => {

  const columns: IColumn[] = [
    { key: 'column1', name: 'File Name', fieldName: 'column1', minWidth: 50, maxWidth: 100},
    { key: 'column2', name: 'Document Type', fieldName: 'column2', minWidth: 100, maxWidth: 200 },
    { key: 'column3', name: 'Modified By', fieldName: 'column3', minWidth: 150, maxWidth: 200 },
    { key: 'column4', name: 'Modified Date', fieldName: 'column4', minWidth: 100, maxWidth: 200 },
    { key: 'column5', name: 'Delete', fieldName: 'column5', minWidth: 100, maxWidth: 200 },

  ];

  const items = [

    { key: 'item1', column1: <span>PR 30928 copy of 220322.....</span>, column2:<span>Hi</span>, column3:<span>Brett smith</span>, column4:<span>3/28/2022 5:52:42 PM</span>,  column5: <Icon iconName="CompassNW" />,},
    // Add more items as needed
  ];

  return (
   
    <DetailsList items={items} columns={columns} checkboxVisibility={CheckboxVisibility.hidden}/>

  );
};

export default TableComponent;