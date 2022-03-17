import { Container } from '@mui/material';

import SurveyForm from '../components/SurveyForm';
import useAxios from '../../shared/hooks/useAxios';

const NewSurveyPage = (props) => {
  const defaultValues = {
    title: '',
    expireDate: new Date(),
    description: '',
    questions: [{ question: '', type: 'text', description: '', options: [] }],
  };

  const { loading, error, fetchData, clearError } = useAxios();

  const createSurvey = async (data) => await fetchData({ url: '/surveys', method: 'post', data });

  return (
    <Container maxWidth="md" sx={{ mt: 12 }}>
      <SurveyForm
        defaultValues={defaultValues}
        formState={{ error, loading, fetchData: createSurvey, clearError }}
      />
    </Container>
  );
};

export default NewSurveyPage;
