import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.title,
});

const theme2 = createTheme({
  palette: {
    accent1Color: {
        main: "#1a1a1a",
    },
    primary: {
      main: "#1a1a1a",
    },
    secondary: {
      main: "#1a1a1a",
    },
    background: {
      default: ' #1a1a1a', 
      paper: ' #1a1a1a',
    },
    text: {
      primary: '#FFFFFF',
    }
  },
});

// const theme2 = createTheme({
//   palette: {
//     accent1Color: {
//         main: "#e6e9ec",
//     },
//     primary: {
//       main: "#e6e9ec",
//     },
//     secondary: {
//       main: "#e6e9ec",
//     },
//     background: {
//       default: ' #e6e9ec', 
//       paper: ' #e6e9ec',
//     },
//     text: {
//       primary: '#052541',
//     }
//   },
// });

const options = [ "Mentor", "Mentee" ]


export default function Filter({ setFilter }) {
    const [value, setValue] = React.useState(options[0]);

  return (
    <ThemeProvider theme={theme2}>
    <div>
      <br />
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          setFilter(newValue)
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Membership Type" />}
      />
    </div>
    </ThemeProvider>
  );
}
