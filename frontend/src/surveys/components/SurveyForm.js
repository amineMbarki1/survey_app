import { Box, TextField, Paper, Fab, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useForm, useFieldArray } from 'react-hook-form';

import SurveyQuestion from './SurveyQuestion';

const SurveyForm = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    watch,
  } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: 'questions' });

  const onSubmit = (surveyData) => {
    console.log(surveyData);
  };

  return (
    <Box onSubmit={handleSubmit(onSubmit)} component="form">
      {/* Survey Info */}
      <Paper sx={{ p: 2, borderLeft: 4, borderColor: 'cyan' }}>
        <TextField
          sx={{ fontWeight: 'bold' }}
          label="Survey Title..."
          variant="standard"
          name="title"
          placeholder="Survey Title"
          fullWidth
          {...register('title')}
        />
        <TextField
          sx={{ mt: 2 }}
          label="Survey Description..."
          variant="outlined"
          name="description"
          placeholder="Survey Title"
          multiline
          rows={3}
          fullWidth
          {...register('description')}
        />
      </Paper>

      {/* Survey Questions */}
      {fields.map((field, index) => (
        <SurveyQuestion
          removeQuestion={remove}
          control={control}
          key={field.id}
          index={index}
          register={register}
          watch={watch}
        />
      ))}

      <Fab
        onClick={() => {
          append({ type: 'text', description: '', options: [] });
        }}
        sx={{ mt: 4 }}
        color="primary"
        aria-label="add"
      >
        <Add />
      </Fab>

      <Button type="submit">submit</Button>
    </Box>
  );
};

export default SurveyForm;
