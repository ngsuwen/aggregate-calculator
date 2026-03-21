import './App.css'
import ResultViewer from './components/ResultViewer';
import Stack from '@mui/material/Stack';
import { type ResultsType, DataContext } from './DataContext';
import { useState } from 'react';

function App() {

  const [results, setResults] = useState<ResultsType[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <DataContext.Provider value={{ results, setResults, open, setOpen }}>
     <div>
      <Stack 
        direction="column" 
        spacing={2}   
        sx={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ResultViewer/>
      </Stack>
    </div>   
    </DataContext.Provider>
  )
}

export default App
