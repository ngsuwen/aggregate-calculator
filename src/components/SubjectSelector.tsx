import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const subjectList = [
  { group: 'Language', value: 'CH', label: 'Chinese' },
  { group: 'Language', value: 'EN', label: 'English' },
  { group: 'Science', value: 'BIO', label: 'Biology' },
  { group: 'Science', value: 'CHEM', label: 'Chemistry' }
]

export default function SubjectSelector() {

  return (
    <Card variant="outlined" sx={{ width: 360 }}>
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
        />
        <Typography gutterBottom variant="body2">
          Select group
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip color="primary" label="1" size="small" />
          <Chip label="2" size="small" />
          <Chip label="3" size="small" />
        </Stack>
        <Typography gutterBottom marginTop={2} variant="body2">
          Select grade
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip color="primary" label="A" size="small" />
          <Chip label="B" size="small" />
          <Chip label="C" size="small" />
          <Chip label="D" size="small" />
          <Chip label="E" size="small" />
          <Chip label="F" size="small" />
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
          <Chip label="Cancel" size="small" />
          <Chip color="primary" label="Add Subject" size="small" />
        </Stack>
      </Box>
    </Card>
  );
}
