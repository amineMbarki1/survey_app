import { Box, TextField, Paper, Fab, FormLabel } from '@mui/material';
import { LoadingButton, LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDate from '@date-io/date-fns';
import { Add } from '@mui/icons-material';
import { useForm, useFieldArray } from 'react-hook-form';
import { useState, useContext } from 'react';

import AlertContext from '../../shared/context/alertContext';
import SurveyQuestion from './SurveyQuestion';

const SurveyForm = ({ formState, defaultValues }) => {
  const alertContext = useContext(AlertContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    watch,
  } = useForm({ defaultValues });

  const { fields, append, remove } = useFieldArray({ control, name: 'questions' });

  const [expireDate, setExpireDate] = useState(defaultValues.expireDate);

  const onSubmit = async (surveyData) => {
    formState.clearError();
    surveyData.expireDate = expireDate.toISOString().split('T')[0];
    surveyData.status = 'active';

    const response = await formState.fetchData(surveyData);

    if (response) {
      alertContext.showAlert({ message: 'Survey Created Successfully', severity: 'success' });
    } else {
      if (formState.error && !formState.error.response)
        alertContext.showAlert({ message: 'network error', severity: 'error' });
    }
  };

  return (
    <Box onSubmit={handleSubmit(onSubmit)} component="form">
      <Paper sx={{ p: 2, borderLeft: 6, borderColor: (theme) => theme.palette.primary.main }}>
        <TextField
          label="Survey Title..."
          variant="standard"
          name="title"
          placeholder="Survey Title"
          fullWidth
          {...register('title', {
            required: 'The title is required',
            minLength: { value: 3, message: 'Title must have at least 3 characters' },
          })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          sx={{ mt: 2, mb: 2 }}
          label="Survey Description..."
          variant="outlined"
          name="description"
          placeholder="Survey Title"
          multiline
          rows={3}
          fullWidth
          {...register('description')}
        />
        <Box display="flex" alignItems="center" gap={2}>
          <FormLabel>Expiration Date: </FormLabel>
          <LocalizationProvider dateAdapter={AdapterDate}>
            <DatePicker
              renderInput={(params) => <TextField size="small" {...params} />}
              onChange={(value) => setExpireDate(value)}
              value={expireDate}
            />
          </LocalizationProvider>
        </Box>
      </Paper>

      {/* Survey Questions */}
      {fields.map((field, index) => (
        <SurveyQuestion
          errors={errors}
          removeQuestion={remove}
          control={control}
          key={field.id}
          index={index}
          register={register}
          watch={watch}
        />
      ))}

      <Box display="flex" alignItems="center" padding={4}>
        <Fab
          onClick={() => {
            append({ type: 'text', description: '', options: [] });
          }}
          color="primary"
          aria-label="add"
        >
          <Add />
        </Fab>

        <LoadingButton
          size="large"
          variant="contained"
          color="primary"
          loading={formState.loading}
          type="submit"
          sx={{ marginLeft: 'auto' }}
        >
          submit
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default SurveyForm;
