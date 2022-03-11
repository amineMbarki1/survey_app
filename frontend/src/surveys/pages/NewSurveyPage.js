import { Container } from '@mui/material';

import SurveyForm from '../components/SurveyForm';

const NewSurveyPage = (props) => {
  return (
    <Container maxWidth="md" sx={{ mt: 12 }}>
      <SurveyForm />
    </Container>
  );
};

export default NewSurveyPage;
