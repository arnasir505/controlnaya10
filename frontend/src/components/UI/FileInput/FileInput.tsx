import React, { useRef } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectNewPostImageName, updateFilename } from '../../../store/newPostSlice/newPostSlice';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
}

const FileInput: React.FC<Props> = ({ onChange, name, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const filename = useAppSelector(selectNewPostImageName);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      dispatch(updateFilename(e.target.files[0].name));
    } else {
      dispatch(updateFilename(''));
    }

    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        style={{ display: 'none' }}
        type='file'
        accept='.jpg, .jpeg, .png'
        name={name}
        onChange={onFileChange}
        ref={inputRef}
      />

      <Grid container direction='row' spacing={2} alignItems='center'>
        <Grid item xs>
          <TextField
            fullWidth
            inputProps={{ readOnly: true }}
            label={label}
            value={filename}
            onClick={activateInput}
          />
        </Grid>

        <Grid item>
          <Button variant='contained' onClick={activateInput}>
            Browse
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;
