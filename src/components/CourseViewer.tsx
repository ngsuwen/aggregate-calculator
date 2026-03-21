import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export default function CourseViewer() {

  return (
    <Stack 
        direction="row" 
        spacing={2}   
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
    >
        <Card variant="outlined" sx={{ maxWidth: 360 }}>
        <Box sx={{ p: 2 }}>
            <Typography gutterBottom variant="h6">
            Accountancy
            </Typography>
            <Typography gutterBottom variant="body2">
            Singapore Polytechnic
            </Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
            <Typography gutterBottom variant="body2">
            Admission Type: DAE, JPAE
            </Typography>
            <Typography gutterBottom variant="body2">
            Score Required : 9 - 12 
            </Typography>
            <Chip color="primary" label="Safe" size="small" />
        </Box>
        </Card>

        <Card variant="outlined" sx={{ maxWidth: 360 }}>
        <Box sx={{ p: 2 }}>
            <Typography gutterBottom variant="h6">
            Accountancy & Finance

            </Typography>
            <Typography gutterBottom variant="body2">
            Singapore Polytechnic
            </Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
            <Typography gutterBottom variant="body2">
            Admission Type: DAE, JPAE
            </Typography>
            <Typography gutterBottom variant="body2">
            Score Required : 5 - 7 
            </Typography>
            <Chip color="secondary" label="Risky" size="small" />
        </Box>
        </Card>

        <Card variant="outlined" sx={{ maxWidth: 360 }}>
        <Box sx={{ p: 2 }}>
            <Typography gutterBottom variant="h6">
            Aerospace Electronics

            </Typography>
            <Typography gutterBottom variant="body2">
            Singapore Polytechnic
            </Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
            <Typography gutterBottom variant="body2">
            Admission Type: DAE, JPAE
            </Typography>
            <Typography gutterBottom variant="body2">
            Score Required : 5 - 6 
            </Typography>
            <Chip color="secondary" label="Risky" size="small" />
        </Box>
        </Card>
    </Stack>
  );
}
