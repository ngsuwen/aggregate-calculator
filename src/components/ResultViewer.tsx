import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useDataContext, type ResultsType } from '../DataContext';
import Modal from '@mui/material/Modal';
import SubjectSelector from './SubjectSelector';
import Stack from '@mui/material/Stack';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useEffect } from 'react';
import { ELR2B2_A_G1, ELR2B2_A_G2, ELR2B2_B_G2, ELR2B2_BCD_G1, ELR2B2_C_G2, ELR2B2_D_G2, L1R5_L1, L1R5_R1, L1R5_R2, L1R5_R3, polyAggregateTypes, polyAggregateTypesBCD } from './SubjectGroups';

export default function ResultViewer() {
  const { results, setResults, open, setOpen, SetSubjectList, subjectList } = useDataContext();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [aggregateType, setAggregateType] = useState<string>('');
  const [aggregateScore, setAggregateScore] = useState<number>(0);
  const [calculateError, setCalculateError] = useState<string>('');
  
  function removeSubject(result:ResultsType): void {
    setResults(results.filter(function(value) { 
        return value !== result 
    }))
    SetSubjectList(subjectList.map(item =>
      item.label === result.subject
        ? { ...item, disabled: false }
        : item
    ));
  }

  useEffect(() => {
      const refreshRequirements = () => {
        checkRequirements();
      };
      refreshRequirements();
    }, [results.length, aggregateType]);

  const getResults = results.map((result:ResultsType, i:number)=>{
      return (
      <ListItem
        key={i}
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={()=>removeSubject(result)}>
            <DeleteIcon fontSize="small"/>
          </IconButton>
        }
      >
        <Box sx={{ flexGrow: 1, backgroundColor: result.selected?'#eaffc7':'#ffffff' }}>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography sx={{fontWeight: 300}}>{result.subject}</Typography>
            </Grid>
            <Grid size={2}>
              <Typography sx={{fontWeight: 300}}>{result.group}</Typography>
            </Grid>
            <Grid size={2}>
              <Typography sx={{fontWeight: 300}}>{result.grade}</Typography>
            </Grid>
          </Grid>
        </Box>
      </ListItem>
      )
    }
  )

  const selectAggregateType = (event: SelectChangeEvent) => {
    setAggregateType(event.target.value as string);
  };

  const checkRequirements=()=>{
    let noOfG3 = 0;
    for (let value of results) {
      if (value.group === '3') {
        noOfG3++;
      }
    }

    if (polyAggregateTypes.includes(aggregateType)) {
      if (noOfG3 >= 5) {
        calculateScore();
      } else {
        setCalculateError('not enough G3 subjects for this aggregate type');
        resetSelected();
      }
    } else if (aggregateType==='L1R5') {
      if (noOfG3 >= 6) {
        calculateScore();
      } else {
        setCalculateError('not enough G3 subjects for this aggregate type');
        resetSelected();
      }
    } else {
      setCalculateError('')
    }
  }

  const resetSelected=()=>{
    const reset: ResultsType[] = results.map((item:ResultsType) => 
     ({...item, selected: false}));
    setResults(reset);
  }

  const calculateScore=()=>{
    let score = 0;
    let selectedSubjects = [];

    // EL or L1
    let englishIndex = results.findIndex((value)=>value.subject === 'English')
    if (englishIndex === -1) {
      setCalculateError('please add english!');
      resetSelected();
      return;
    }

    if (aggregateType === 'L1R5') {
      let resultsL1:ResultsType[] = [];
      resultsL1 = results.filter(item => 
      L1R5_L1.includes(item.subject)
      );
      resultsL1.sort((a, b) => a.score - b.score);
      score += resultsL1[0].score;
      selectedSubjects.push(resultsL1[0].subject);
    } else {
      score += results[englishIndex].score;
      selectedSubjects.push(results[englishIndex].subject);
    }

    if (polyAggregateTypes.includes(aggregateType)) {
      // check for G1 (POLY)
      let resultsG1:ResultsType[] = [];
      if (aggregateType === 'ELR2B2-A') {
        resultsG1 = results.filter(item => 
        ELR2B2_A_G1.includes(item.subject)
        );
      } else if (polyAggregateTypesBCD.includes(aggregateType)) {
        resultsG1 = results.filter(item => 
        ELR2B2_BCD_G1.includes(item.subject)
        );
      }
      if (resultsG1.length === 0) {
        setCalculateError('missing 1st group of relevant subjects');
        resetSelected();
        return;
      }
      resultsG1.sort((a, b) => a.score - b.score);
      score += resultsG1[0].score;
      selectedSubjects.push(resultsG1[0].subject);
  
      // check for G2 (POLY)
      let resultsG2:ResultsType[] = [];
      if (aggregateType === 'ELR2B2-A') {
        resultsG2 = results.filter(item => 
        ELR2B2_A_G2.includes(item.subject) && !selectedSubjects.includes(item.subject)
        );
      } else if (aggregateType === 'ELR2B2-B') {
        resultsG2 = results.filter(item => 
        ELR2B2_B_G2.includes(item.subject) && !selectedSubjects.includes(item.subject)
        );
      } else if (aggregateType === 'ELR2B2-C') {
        resultsG2 = results.filter(item => 
        ELR2B2_C_G2.includes(item.subject) && !selectedSubjects.includes(item.subject)
        );
      } else if (aggregateType === 'ELR2B2-D') {
        resultsG2 = results.filter(item => 
        ELR2B2_D_G2.includes(item.subject) && !selectedSubjects.includes(item.subject)
        );
      }
      if (resultsG2.length === 0) {
        setCalculateError('missing 2nd group of relevant subjects');
        resetSelected();
        return;
      }
      resultsG2.sort((a, b) => a.score - b.score);
      score += resultsG2[0].score;
      selectedSubjects.push(resultsG2[0].subject);
    }

    if (aggregateType === 'L1R5') {
      // check for R1 (JC)
      let resultsR1:ResultsType[] = [];
      resultsR1 = results.filter(item => 
      L1R5_R1.includes(item.subject) && !selectedSubjects.includes(item.subject)
      );
      if (resultsR1.length === 0) {
        setCalculateError('missing relevant subjects from humanities (R1)');
        resetSelected();
        return;
      }
      resultsR1.sort((a, b) => a.score - b.score);
      score += resultsR1[0].score;
      selectedSubjects.push(resultsR1[0].subject);
  
      // check for R2 (JC)
      let resultsR2:ResultsType[] = [];
      resultsR2 = results.filter(item => 
      L1R5_R2.includes(item.subject) && !selectedSubjects.includes(item.subject)
      );
      if (resultsR2.length === 0) {
        setCalculateError('missing relevant subjects from mathematics or science (R2)');
        resetSelected();
        return;
      }
      resultsR2.sort((a, b) => a.score - b.score);
      console.log(resultsR2)
      score += resultsR2[0].score;
      selectedSubjects.push(resultsR2[0].subject);
  
      // check for R3 (JC)
      let resultsR3:ResultsType[] = [];
      resultsR3 = results.filter(item => 
      L1R5_R3.includes(item.subject) && !selectedSubjects.includes(item.subject)
      );
      if (resultsR3.length === 0) {
        setCalculateError('missing relevant subjects from humanities, mathematics or science (R3)');
        resetSelected();
        return;
      }
      resultsR3.sort((a, b) => a.score - b.score);
      score += resultsR3[0].score;
      selectedSubjects.push(resultsR3[0].subject);
    }

    // check for B2
    const resultsB2 = results.filter(item => 
      !selectedSubjects.includes(item.subject)
    );
    resultsB2.sort((a, b) => a.score - b.score);
    score = score + resultsB2[0].score + resultsB2[1].score;
    console.log(score)
    console.log(resultsB2)
    selectedSubjects.push(resultsB2[0].subject)
    selectedSubjects.push(resultsB2[1].subject)
    
    setCalculateError('');
    setAggregateScore(score);

    // update selected subjects in results to true
    const newResults: ResultsType[] = results.map((item:ResultsType) => {
      if (selectedSubjects.includes(item.subject)) return {...item, selected: true};
      if (!selectedSubjects.includes(item.subject)) return {...item, selected: false};
      return item;
    });
    setResults(newResults);
  }

  return (
    <Box sx={{ width: '90vw', maxWidth: 560 }} >
      {results.length === 0? 
      ""
      :
      <>
      <List>
        <ListItem
        secondaryAction={
          <IconButton edge="end" disabled>
          </IconButton>
          }
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid size={8}>
                <Typography sx={{fontWeight: 500}}>Subject</Typography>
              </Grid>
              <Grid size={2}>
                <Typography sx={{fontWeight: 500}}>Group</Typography>
              </Grid>
              <Grid size={2}>
                <Typography sx={{fontWeight: 500}}>Grade</Typography>
              </Grid>
            </Grid>
          </Box>
        </ListItem>
        <Divider />
        {getResults}
      </List>
      <Divider />
      </>}
      <Stack direction="column" sx={{alignItems: "center", marginTop: 3}}> 
        <Button variant="outlined" startIcon={<AddIcon sx={{ color: '#3160eb' }}/>} 
        sx={{ 
          textTransform: 'none', 
          fontWeight: 400, 
          fontSize: 16,
          color: '#242222'
        }} disableRipple onClick={handleOpen}>
          {results.length === 0? "Start by adding subjects":"Add subject"}
        </Button> 
        {results.length === 0? '':
        <>
        <FormControl variant="standard" fullWidth sx = {{marginTop: 2}}>
          <InputLabel id="demo-simple-select-standard-label">Select Aggregate Type</InputLabel>  
          <Select value={aggregateType} onChange={selectAggregateType}>
            <MenuItem value="L1R5">(JC) L1R5</MenuItem>
            <MenuItem value="ELR2B2-A">(POLY) ELR2B2-A</MenuItem>
            <MenuItem value="ELR2B2-B">(POLY) ELR2B2-B</MenuItem>
            <MenuItem value="ELR2B2-C">(POLY) ELR2B2-C</MenuItem>
            <MenuItem value="ELR2B2-D">(POLY) ELR2B2-D</MenuItem>
          </Select>
        </FormControl>
        {calculateError !== ''?
          <Typography sx = {{marginTop: 3, fontWeight: 300, color:'#ed6464'}}>
            {calculateError}
          </Typography> : 
        aggregateScore > 0? 
          <Typography sx = {{marginTop: 3, fontWeight: 300}}>
            net aggregate score: {aggregateScore}
          </Typography> : ''
        }
        </>
        }
      </Stack>
        <Modal
          open={open}
          onClose={handleClose}
        >
        <SubjectSelector/>
        </Modal>
    </Box>
  );
}
