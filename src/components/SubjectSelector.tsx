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
import { styled, lighten, darken } from '@mui/system';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 0.5,
};

const GroupHeader = styled('div')(() => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  backgroundColor: '#e0e0e0'
}));

const GroupItems = styled('ul')({
  padding: 0,
});

export default function SubjectSelector() {
  const { results, setResults, setOpen, subjectList, SetSubjectList } = useDataContext();
  const [ subject, setSubject ] = useState<string>();
  const [ group, setGroup ] = useState<string>();
  const [ grade, setGrade ] = useState<string>();
  const [ errorSub, setErrorSub ] = useState<boolean>(false);
  const [ errorGrp, setErrorGrp ] = useState<boolean>(false);
  const [ errorGrd, setErrorGrd ] = useState<boolean>(false);
  const handleClose = () => setOpen(false);

  function submitSubject(): void {
    let error = false;
    if ( subject === undefined ){
      setErrorSub(true)
      error = true;
    } else {
      setErrorSub(false)
    }
    if ( group === undefined ){
      setErrorGrp(true)
      error = true;
    } else {
      setErrorGrp(false)
    }
    if ( grade === undefined ){
      setErrorGrd(true)
      error = true;
    } else {
      setErrorGrd(false)
    }
    if (error) {
      return
    }
    setResults([...results,{
      subject: subject!,
      group: group!,
      grade: grade!,
      selected: false
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
        <Typography component="span" variant="body2" sx ={{display: 'inline-block'}}>
          Select subject {errorSub? <Typography component="span" variant="body2" sx ={{color:'#ed6464'}}>* required</Typography>:''}
        </Typography>
        <Autocomplete
          freeSolo
          sx={{ marginBottom: 3 }}
          options={subjectList}
          groupBy={(option) => option.group}
          renderInput={(params) => <TextField {...params} variant="standard" />}
          renderGroup={(params) => (
            <li key={params.key}>
              <GroupHeader>{params.group}</GroupHeader>
              <GroupItems>{params.children}</GroupItems>
            </li>
          )}
          getOptionDisabled={(option) =>
            option.disabled  === true
          }
          clearOnBlur
          onChange={(_event, value) => selectSubject(value)}
        />
        <Typography component="span" variant="body2" sx ={{display: 'inline-block', mb:1}}>
          Select group {errorGrp? <Typography component="span" variant="body2" sx ={{color:'#ed6464'}}>* required</Typography>:''}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip color={group === '1'?"primary":"default"} label="1" onClick={()=>selectGroup('1')}/>
          <Chip color={group === '2'?"primary":"default"} label="2" onClick={()=>selectGroup('2')}/>
          <Chip color={group === '3'?"primary":"default"} label="3" onClick={()=>selectGroup('3')}/>
        </Stack>
        <Typography component="span" variant="body2" sx ={{display: 'inline-block', mb:1, mt:3}}>
          Select grade {errorGrd? <Typography component="span" variant="body2" sx ={{color:'#ed6464'}}>* required</Typography>:''}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip color={grade === 'A'?"primary":"default"} label="A" onClick={()=>selectGrade('A')}/>
          <Chip color={grade === 'B'?"primary":"default"} label="B" onClick={()=>selectGrade('B')}/>
          <Chip color={grade === 'C'?"primary":"default"} label="C" onClick={()=>selectGrade('C')}/>
          <Chip color={grade === 'D'?"primary":"default"} label="D" onClick={()=>selectGrade('D')}/>
          <Chip color={grade === 'E'?"primary":"default"} label="E" onClick={()=>selectGrade('E')}/>
          <Chip color={grade === 'F'?"primary":"default"} label="F" onClick={()=>selectGrade('F')}/>
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
          <Chip color="primary" label="Add Subject" onClick={()=>submitSubject()}/>
        </Stack>
      </Box>
    </Card>
  );
}
