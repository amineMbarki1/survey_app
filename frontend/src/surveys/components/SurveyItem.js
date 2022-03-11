import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  IconButton,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { Edit, Delete, BarChart, OpenInNew, ExpandMore } from '@mui/icons-material';
const SurveyItem = (props) => {
  return (
    <Accordion sx={{ mt: 2, borderRadius: 2, overflow: 'hidden' }}>
      <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
        <div>
          <Typography element="h3" variant="h5">
            Survey title
          </Typography>
          <Typography>responses: 6</Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Box display="flex" gap={2} alignItems="center">
          <Box display="flex" flexDirection="column" alignItems="center">
            <IconButton color="error">
              <Delete />
            </IconButton>
            <Typography variant="caption">Delete</Typography>
          </Box>

          <Box display="flex" flexDirection="column" alignItems="center">
            <IconButton color="warning">
              <Edit />
            </IconButton>
            <Typography variant="caption">Edit</Typography>
          </Box>

          <Box display="flex" flexDirection="column" alignItems="center">
            <IconButton color="info">
              <BarChart />
            </IconButton>
            <Typography variant="caption">Answers</Typography>
          </Box>

          <Box display="flex" flexDirection="column" alignItems="center">
            <IconButton color="info">
              <OpenInNew />
            </IconButton>
            <Typography variant="caption">Open</Typography>
          </Box>

          <FormControlLabel sx={{ ml: 'auto' }} control={<Switch />} label="Active" />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default SurveyItem;
