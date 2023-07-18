import * as React from 'react';
import {Icon} from '@fluentui/react';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';

const classes = mergeStyleSets({
  cell: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '80px',
    float: 'left',
    height: '50px',
    width: '50px',
  },
  icon: {
    fontSize: '50px',
  },
  code: {
    background: '#f2f2f2',
    borderRadius: '4px',
    padding: '4px',
  },
  navigationText: {
    width: 50,
    margin: '0 5px',
  },
});

function ChevronDownMedIcon() {
  return (
    <div>
       <Icon iconName="ChevronDown" className={classes.icon}/>
    </div>
  )
}

export default ChevronDownMedIcon

