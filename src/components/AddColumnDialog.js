// AddColumnDialog.js
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const AddColumnDialog = ({ open, onClose, onSubmit }) => {
  const [columnName, setColumnName] = useState('');
  const [columnType, setColumnType] = useState('');

  const handleColumnNameChange = (event) => {
    setColumnName(event.target.value);
  };

  const handleColumnTypeChange = (event) => {
    setColumnType(event.target.value);
  };

  const handleCancel = () => {
    onClose();
    setColumnName('');
    setColumnType('');
  };

  const handleAddColumn = () => {
    onSubmit({ name: columnName, type: columnType });
    setColumnName('');
    setColumnType('');
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Add Column</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Column Name"
              variant="outlined"
              fullWidth
              value={columnName}
              onChange={handleColumnNameChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Column Type</InputLabel>
              <Select
                value={columnType}
                onChange={handleColumnTypeChange}
                label="Column Type"
              >
                <MenuItem value="int">int</MenuItem>
                <MenuItem value="varchar">varchar</MenuItem>
                <MenuItem value="float">float</MenuItem>
                <MenuItem value="set">set</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddColumn} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddColumnDialog;
