import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Autocomplete from '@material-ui/lab/Autocomplete';
import technologies from './technologies.json';
import {
  Typography,
  Grid,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@material-ui/core';

export default function PostForm({
  postData,
  setPostData,
  handleChange,
  handleCategory,
  err,
  setErr,
  inputErrCheck
}) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={3}>
        <TextField
          required
          fullWidth
          id="title"
          name="title"
          label="Title"
          value={postData.title}
          onChange={handleChange}
          onBlur={inputErrCheck}
          error={err.title}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          required
          fullWidth
          id="summary"
          name="summary"
          label="Brief summary"
          value={postData.summary}
          onChange={handleChange}
          onBlur={inputErrCheck}
          error={err.summary}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Select all categories that apply:</Typography>
        <FormControl
          required
          fullWidth
          error={err.category || err.categoryOverLimit}
          component="fieldset"
        >
          <FormLabel component="legend">Pick up to two</FormLabel>
          <FormGroup row>
            {postData.category.map(({ name, checked }) => (
              <FormControlLabel
                key={name}
                label={name}
                control={
                  <Checkbox
                    name={name}
                    checked={checked}
                    onChange={handleCategory}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                }
              />
            ))}
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant="h6" color={err.description ? 'error' : 'initial'}>
          Enter detailed description*:
        </Typography>
        <CKEditor
          editor={ClassicEditor}
          onInit={(editor) => {
            editor.setData(postData.description);
          }}
          onChange={(event, editor) => {
            const description = editor.getData();
            setPostData({ ...postData, description });
            setErr({ ...err, description: description.length === 0 });
          }}
          onBlur={(event, editor) => {
            const description = editor.getData();
            if (description.length === 0) setErr({ ...err, description: true });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Autocomplete
          multiple
          id="tags-standard"
          options={technologies}
          getOptionLabel={(option) => option}
          value={postData.technologies}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Technologies required (optional)"
            />
          )}
          onChange={(e, technologies) =>
            setPostData({ ...postData, technologies })
          }
        />
      </Grid>
    </Grid>
  );
}
