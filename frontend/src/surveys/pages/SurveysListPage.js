import { Typography, Container, IconButton, Box, Paper, InputBase, Button } from '@mui/material';
import { Search, FilterAlt, Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import SurveyItem from '../components/SurveyItem';

const SurveysListPage = (props) => {
  return (
    <>
      <Container sx={{ mt: 10 }} component="main" maxWidth="md">
        {/* ========Action BAr or Header for List of surveys ========= */}
        <Paper sx={{ p: 3 }}>
          <Box
            sx={{ flexWrap: { xs: 'wrap' } }}
            display="flex"
            justifyContent="space-between"
            alignItems={'center'}
          >
            <div>
              <Typography variant="h5" element="h2">
                My Surveys
              </Typography>
              <Typography variant="body2" element="p">
                Total Count : 6
              </Typography>
            </div>
            <Box display="flex">
              <Box
                border={1}
                borderColor={'grey.200'}
                pl={2}
                borderRadius={2}
                display="flex"
                alignItems="center"
                component="form"
              >
                <InputBase name="keyword" placeholder="Search ..." />
                <IconButton type="submit">
                  <Search />
                </IconButton>
              </Box>
              <IconButton>
                <FilterAlt />
              </IconButton>
            </Box>
            <Button to="/surveys/new" component={Link} sx={{ mt: 3 }} fullWidth variant="contained">
              <Add />
              New Survey
            </Button>
          </Box>
        </Paper>
        {/* ========Action BAr or Header for List of surveys ========= */}
        <SurveyItem />
      </Container>
    </>
  );
};
export default SurveysListPage;
