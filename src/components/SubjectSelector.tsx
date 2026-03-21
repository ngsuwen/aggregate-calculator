import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDataContext } from '../DataContext';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function SubjectSelector() {
  const { results, setResults, setOpen, subjectList, SetSubjectList } = useDataContext();
  const [ subject, setSubject ] = useState<string>();
  const [ group, setGroup ] = useState<string>();
  const [ grade, setGrade ] = useState<string>();
  const handleClose = () => setOpen(false);

  function submitSubject(): void {
    if ( subject === undefined ){
      return;
    }
    if ( group === undefined ){
      return;
    }
    if ( grade === undefined ){
      return;
    }
    setResults([...results,{
      subject: subject,
      group: group,
      grade: grade
    }])
    setOpen(false)
    SetSubjectList(subjectList.map(item =>
      item.label === subject
        ? { ...item, disabled: true }
        : item
    ));
  }

  function selectSubject(sub: any): void {
    setSubject(sub.label)
  }

  function selectGroup(grp:string): void {
    setGroup(grp)
  }

  function selectGrade(grade:string): void {
    setGrade(grade)
  }

  

  return (
    <Card variant="outlined" sx={style}>
      <Box sx={{ p: 2 }}>
        <Autocomplete
          freeSolo
          sx={{ marginBottom: 3 }}
          options={subjectList}
          groupBy={(option) => option.group}
          renderInput={(params) => <TextField {...params} label="Subject" variant="standard" />}
          renderGroup={(params) => (
            <li key={params.key}>
              {params.group}
              {params.children}
            </li>
          )}
          getOptionDisabled={(option) =>
            option.disabled  === true
          }
          clearOnBlur
          onChange={(_event, value) => selectSubject(value)}
        />
        <Typography gutterBottom variant="body2">
          Select group
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip color={group === '1'?"primary":"default"} label="1" size="small" onClick={()=>selectGroup('1')}/>
          <Chip color={group === '2'?"primary":"default"} label="2" size="small" onClick={()=>selectGroup('2')}/>
          <Chip color={group === '3'?"primary":"default"} label="3" size="small" onClick={()=>selectGroup('3')}/>
        </Stack>
        <Typography gutterBottom marginTop={2} variant="body2">
          Select grade
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip color={grade === 'A'?"primary":"default"} label="A" size="small" onClick={()=>selectGrade('A')}/>
          <Chip color={grade === 'B'?"primary":"default"} label="B" size="small" onClick={()=>selectGrade('B')}/>
          <Chip color={grade === 'C'?"primary":"default"} label="C" size="small" onClick={()=>selectGrade('C')}/>
          <Chip color={grade === 'D'?"primary":"default"} label="D" size="small" onClick={()=>selectGrade('D')}/>
          <Chip color={grade === 'E'?"primary":"default"} label="E" size="small" onClick={()=>selectGrade('E')}/>
          <Chip color={grade === 'F'?"primary":"default"} label="F" size="small" onClick={()=>selectGrade('F')}/>
        </Stack>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Stack 
          direction="row" 
          spacing={1}
          sx={{
            justifyContent: "flex-end",
          }}
        >
          <Chip label="Cancel" size="small" onClick={handleClose} />
          <Chip color="primary" label="Add Subject" size="small" onClick={()=>submitSubject()}/>
        </Stack>
      </Box>
    </Card>
  );
}
