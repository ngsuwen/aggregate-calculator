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
import { useState } from 'react';
import { useEffect } from 'react';
import { styled } from '@mui/system';
import { ELR2B2_A_G1, ELR2B2_A_G2, ELR2B2_B_G2, ELR2B2_BCD_G1, ELR2B2_C_G2, ELR2B2_D_G2, ite4Subjects, ite5Subjects, iteAggregateTypes, iteAggregateTypesEL, L1R5_L1, L1R5_R1, L1R5_R2, L1R5_R3, polyAggregateTypes, polyAggregateTypesBCD, R1B3_R1 } from './SubjectGroups';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const GroupHeader = styled('div')(() => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  backgroundColor: '#e0e0e0'
}));

const GroupItems = styled('ul')({
  padding: 0,
});

const aggregateTypeList = [
  {label: 'L1R5', group: 'JC'},
  {label: 'ELR2B2-A', group: 'POLY'},
  {label: 'ELR2B2-B', group: 'POLY'},
  {label: 'ELR2B2-C', group: 'POLY'},
  {label: 'ELR2B2-D', group: 'POLY'},
  {label: 'B4', group: 'ITE'},
  {label: 'ELB3', group: 'ITE'},
  {label: 'ELMAB2', group: 'ITE'},
  {label: 'ELMAB3', group: 'ITE'},
  {label: 'MAB3', group: 'ITE'},
  {label: 'R1B3', group: 'ITE'}
]

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
    if (results.length === 1) {
      setAggregateType('');
    }
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
            <Grid size={2}>
              <Typography sx={{fontWeight: 300}}>{result.group}</Typography>
            </Grid>
            <Grid size={8}>
              <Typography sx={{fontWeight: 300}}>{result.subject}</Typography>
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

  const selectAggregateType = (value: any) => {
    if (value) {
      if (aggregateTypeList.some(item =>
        item.label.includes(value.label)
      )) {
        setAggregateType(value.label);
      } else {
        setAggregateType('')
      }
    } else {
      setAggregateType('')
    }
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
    } else if (ite4Subjects.includes(aggregateType)) {
      if (results.length >= 4) {
        calculateScore();
      } else {
        setCalculateError('not enough subjects for this aggregate type');
        resetSelected();
      }
    } else if (ite5Subjects.includes(aggregateType)) {
      if (results.length >= 5) {
        calculateScore();
      } else {
        setCalculateError('not enough subjects for this aggregate type');
        resetSelected();
      }
    } else if (aggregateType !== '') {
      throw new Error('aggregate type not found');
    } else {
      setCalculateError('');
      setAggregateScore(0);
      resetSelected();
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
    if (polyAggregateTypes.includes(aggregateType) || aggregateType === 'L1R5' || iteAggregateTypesEL.includes(aggregateType)) {
      if (englishIndex === -1) {
        setCalculateError('missing english subject');
        resetSelected();
        return;
      }
    }

    if (aggregateType === 'L1R5') {
      let resultsL1:ResultsType[] = [];
      resultsL1 = results.filter(item => 
      L1R5_L1.includes(item.subject)
      );
      resultsL1.sort((a, b) => a.score - b.score);
      score += resultsL1[0].score;
      selectedSubjects.push(resultsL1[0].subject);
    } else if (polyAggregateTypes.includes(aggregateType)) {
      score += results[englishIndex].score;
      selectedSubjects.push(results[englishIndex].subject);
    } else if (aggregateType === 'ELMAB3') {
      score += results[englishIndex].scoreELMAB3;
      selectedSubjects.push(results[englishIndex].subject);
    } else if (iteAggregateTypesEL.includes(aggregateType)) {
      score += results[englishIndex].scoreITE;
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

    if (iteAggregateTypes.includes(aggregateType)) {
      // B4
      if (aggregateType === 'B4') {
        const resultsB4 = [...results].sort((a, b) => a.scoreITE - b.scoreITE);
        score = resultsB4[0].scoreITE + resultsB4[1].scoreITE + resultsB4[2].scoreITE + resultsB4[3].scoreITE;
        selectedSubjects.push(resultsB4[0].subject)
        selectedSubjects.push(resultsB4[1].subject)
        selectedSubjects.push(resultsB4[2].subject)
        selectedSubjects.push(resultsB4[3].subject)
      }
      // MA
      if (aggregateType.includes('MA')) {
        const resultsMA:ResultsType[] = results.filter(item => 
        item.subject.includes('Mathematics')
        );
        if (resultsMA.length === 0) {
          setCalculateError('missing relevant subjects from mathematics');
          resetSelected();
          return;
        }
        resultsMA.sort((a, b) => a.scoreITE - b.scoreITE);
        if (aggregateType === 'ELMAB3') {
          score += resultsMA[0].scoreELMAB3;
        } else {
          score += resultsMA[0].scoreITE;
        }
        selectedSubjects.push(resultsMA[0].subject);
      }
      if (aggregateType === 'R1B3') {      
        let resultsR1:ResultsType[] = [];
        resultsR1 = results.filter(item => 
        R1B3_R1.includes(item.subject) && !selectedSubjects.includes(item.subject)
        );
        if (resultsR1.length === 0) {
          setCalculateError('missing relevant subjects from mathematics or science');
          resetSelected();
          return;
        }
        resultsR1.sort((a, b) => a.scoreITE - b.scoreITE);
        score += resultsR1[0].scoreITE;
        selectedSubjects.push(resultsR1[0].subject);
      }
      // B2
      if (aggregateType.includes('B2')) {
        const resultsB2 = results.filter(item => 
          !selectedSubjects.includes(item.subject)
        );
        resultsB2.sort((a, b) => a.scoreITE - b.scoreITE);
        score = score + resultsB2[0].scoreITE + resultsB2[1].scoreITE;
        selectedSubjects.push(resultsB2[0].subject)
        selectedSubjects.push(resultsB2[1].subject)
      }
      // B3
      if (aggregateType.includes('B3')) {
        const resultsB3 = results.filter(item => 
          !selectedSubjects.includes(item.subject)
        );
        resultsB3.sort((a, b) => a.scoreITE - b.scoreITE);
        if (aggregateType === 'ELMAB3') {
          score = score + resultsB3[0].scoreELMAB3 + resultsB3[1].scoreELMAB3 + resultsB3[2].scoreELMAB3;
        } else {
          score = score + resultsB3[0].scoreITE + resultsB3[1].scoreITE + resultsB3[2].scoreITE;
        }
        selectedSubjects.push(resultsB3[0].subject)
        selectedSubjects.push(resultsB3[1].subject)
        selectedSubjects.push(resultsB3[2].subject)
      }
    } else {
      // check for B2 (POLY / JC)
      let resultsB2 = results.filter(item => 
        !selectedSubjects.includes(item.subject)
      );
      // exclude islamic religious knowledge for jc
      if (aggregateType === 'L1R5') {
        resultsB2 = resultsB2.filter(item => 
          item.subject != 'Islamic Religious Knowledge'
        );
      }
      resultsB2.sort((a, b) => a.score - b.score);
      score = score + resultsB2[0].score + resultsB2[1].score;
      selectedSubjects.push(resultsB2[0].subject)
      selectedSubjects.push(resultsB2[1].subject)
    }

    // check for F9 for ITE ELMAB3
    if (aggregateType === 'ELMAB3'  && score >= 100) {
      setCalculateError('grade F9, 6 and U are not eligible for this aggregate type');
      resetSelected();
      return;
    }
    
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
              <Grid size={2}>
                <Typography sx={{fontWeight: 500}}>Group</Typography>
              </Grid>
              <Grid size={8}>
                <Typography sx={{fontWeight: 500}}>Subject</Typography>
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
          color: '#242222',
          marginBottom: 3
        }} disableRipple onClick={handleOpen}>
          {results.length === 0? "Start by adding subjects":"Add subject"}
        </Button> 
        {results.length === 0? '':
        <>
        <Autocomplete
          fullWidth
          options={aggregateTypeList}
          groupBy={(option) => option.group}
          renderInput={(params) => <TextField {...params} label="Select Aggregate Type" variant="standard" />}
          renderGroup={(params) => (
            <li key={params.key}>
              <GroupHeader>{params.group}</GroupHeader>
              <GroupItems>{params.children}</GroupItems>
            </li>
          )}
          clearOnBlur
          onChange={(_event, value) => selectAggregateType(value)}
        />
        {calculateError !== ''?
          <Typography sx = {{marginTop: 3, fontWeight: 300, color:'#ed6464'}}>
            {calculateError}
          </Typography> : 
        aggregateScore > 0? 
          <>
          <Typography sx = {{marginTop: 3, fontWeight: 300}}>
            your aggregate score is : <b>{aggregateScore}</b>
          </Typography>
          <Typography sx = {{marginBottom: 3, fontWeight: 300}}>
            next step is to find your course!
          </Typography>
          <Button variant="outlined" startIcon={<OpenInNewIcon sx={{ color: '#3160eb' }}/>} 
        sx={{ 
          textTransform: 'none', 
          fontWeight: 400, 
          fontSize: 16,
          color: '#242222'
        }} disableRipple onClick={()=>window.open("https://www.moe.gov.sg/coursefinder","_blank")}>MOE CourseFinder</Button>
          </> : ''
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
