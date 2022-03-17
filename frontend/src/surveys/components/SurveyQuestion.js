import { Typography, Paper, MenuItem, TextField, Box, Button, IconButton } from '@mui/material';
import {
  Close,
  Delete,
  CheckBox,
  RadioButtonChecked,
  TextFields,
  FormatColorText,
} from '@mui/icons-material';
import { useFieldArray } from 'react-hook-form';
import { useState, Fragment, useEffect } from 'react';

const SurveyQuestion = ({ register, control, index, removeQuestion, watch, errors }) => {
  const { append, remove, fields } = useFieldArray({ name: `questions.${index}.options`, control });
  const questionType = watch(`questions.${index}.type`);
  const [renderOptions, setRenderOptions] = useState(false);

  const removeOptionFields = () => {
    fields.reduceRight((_, __, i) => {
      remove(i);
      return null;
    }, null);
  };

  useEffect(() => {
    setRenderOptions(['checkbox', 'radio'].includes(questionType));
    if (['text', 'textarea'].includes(questionType)) removeOptionFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionType]);

  useEffect(() => {
    if (renderOptions && fields.length === 0) {
      append({ option: '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderOptions]);

  //JSX for Option field
  const option = renderOptions && (
    <>
      {fields.map((field, optionIndex) => (
        <Fragment key={field.id}>
          <Box display="flex" alignItems="normal">
            <TextField
              sx={{ width: '20rem' }}
              variant="standard"
              placeholder={`Option #${optionIndex}`}
              {...register(`questions.${index}.options.${optionIndex}.option`, {
                required: 'This Option is required',
              })}
              size="small"
              error={!!errors.questions?.[index]?.options?.[optionIndex]?.option}
              helperText={errors.questions?.[index]?.options?.[optionIndex]?.option?.message}
            />
            {optionIndex !== 0 && (
              <IconButton sx={{ marginLeft: 2 }} onClick={() => remove(optionIndex)}>
                <Close />
              </IconButton>
            )}
          </Box>
          <br />
        </Fragment>
      ))}

      <Button onClick={() => append({ option: '' })} variant="outlined">
        Add Option
      </Button>
    </>
  );

  return (
    <Paper
      sx={{
        alignItems: 'center',
        mt: 2,
        p: 2,
        borderLeft: 6,
        borderColor: (theme) => theme.palette.primary.main,
      }}
    >
      <Box display="flex" gap={4} alignItems="baseline" mb={2}>
        <Typography>Question #{index}</Typography>
        <TextField
          defaultValue={'text'}
          {...register(`questions.${index}.type`)}
          sx={{ minWidth: 300, display: 'flex', justifyContent: 'center' }}
          select
          variant="standard"
        >
          <MenuItem value={'text'}>
            <TextFields sx={{ verticalAlign: 'middle', mr: 1 }} />
            Text
          </MenuItem>
          <MenuItem value={'textarea'}>
            <FormatColorText sx={{ verticalAlign: 'middle', mr: 1 }} />
            Long Text
          </MenuItem>
          <MenuItem value={'checkbox'}>
            <CheckBox sx={{ verticalAlign: 'middle', mr: 1 }} /> Multiple Choice
          </MenuItem>
          <MenuItem value={'radio'}>
            <RadioButtonChecked sx={{ verticalAlign: 'middle', mr: 1 }} />
            Single Choice
          </MenuItem>
        </TextField>

        {index !== 0 && (
          <IconButton sx={{ marginLeft: 'auto' }} onClick={() => removeQuestion(index)} color="error">
            <Delete />
          </IconButton>
        )}
      </Box>
      <TextField
        {...register(`questions.${index}.question`, { required: 'Question Title is required' })}
        helperText={errors.questions && errors.questions[index]?.question?.message}
        error={!!errors.questions && !!errors.questions[index]?.question}
        fullWidth
        size="small"
        label="Question"
      />
      <TextField
        sx={{ mt: 2, mb: 2 }}
        fullWidth
        size="small"
        multiline
        rows={2}
        label="Question Description (optional)..."
        {...register(`questions.${index}.description`)}
      />
      {option}
    </Paper>
  );
};

export default SurveyQuestion;
