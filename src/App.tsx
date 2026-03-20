import './App.css'
import SubjectSelector from './components/SubjectSelector';
import ResultViewer from './components/ResultViewer';
import Stack from '@mui/material/Stack';
import CourseViewer from './components/CourseViewer';
import PathTabs from './components/PathTabs';
function App() {

  return (
     <div>
      <Stack 
        direction="column" 
        spacing={2}   
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SubjectSelector/>
        <ResultViewer/>
        <PathTabs/>
        {/* <CourseViewer/> */}
      </Stack>
    </div>
  )
}

export default App
