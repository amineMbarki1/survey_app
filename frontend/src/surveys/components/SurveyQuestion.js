import { Typography, Paper, MenuItem, TextField, Box, Button, IconButton, Divider } from '@mui/material';
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

const SurveyQuestion = ({ register, control, index, removeQuestion, watch }) => {
  const { append, remove, fields } = useFieldArray({ name: `questions.${index}.options`, control });
  const questionType = watch(`questions.${index}.type`);
  // State Variable that tracks the question type and render add option accordingly
  const [renderAddOption, setRenderAddOption] = useState(false);

  useEffect(() => {
    setRenderAddOption(['radio', 'checkbox'].includes(questionType));
  }, [questionType]);

  const option = (
    <>
      {fields.map((field, optionIndex) => (
        <Fragment key={field.id}>
          <Box display="flex">
            <TextField
              placeholder={`Option #${optionIndex}`}
              sx={{ flexGrow: 1 }}
              {...register(`questions.${index}.options.${optionIndex}.option`)}
              size="small"
            />
            <IconButton onClick={() => remove(optionIndex)}>
              <Close />
            </IconButton>
          </Box>
          <br />
        </Fragment>
      ))}

      {renderAddOption && (
        <Button onClick={() => append({ option: '' })} variant="outlined">
          Add Option
        </Button>
      )}
    </>
  );

  return (
    <Paper sx={{ mt: 2, p: 2 }}>
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
      </Box>
      <TextField {...register(`questions.${index}.question`)} fullWidth size="small" label="Question" />
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

      <Divider sx={{ mt: 2 }} />
      <IconButton onClick={() => removeQuestion(index)} color="error">
        <Delete />
      </IconButton>
    </Paper>
  );
};

export default SurveyQuestion;
