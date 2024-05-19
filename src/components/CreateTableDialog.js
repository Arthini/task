import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  MenuItem,
  Typography,
  Grid,
  Snackbar,
  SnackbarContent
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const columnTypes = ['int', 'Varchar', 'float', 'set'];

const CreateTableDialog = ({ open, onClose, onSubmit, tableData }) => { // Receive tableData as props
  const [tableName, setTableName] = useState('');
  const [columns, setColumns] = useState([{ name: '', type: '' }]);
  const [errorOpen, setErrorOpen] = useState(false);

  useEffect(() => {
    if (open) {
      if (tableData) { // Populate dialog fields if editing
        setTableName(tableData.tableName);
        setColumns(tableData.columns);
      } else { // Reset fields if creating
        setTableName('');
        setColumns([{ name: '', type: '' }]);
      }
    }
  }, [open, tableData]);

  const handleAddColumn = () => {
    setColumns([...columns, { name: '', type: '' }]);
  };

  const handleColumnChange = (index, key, value) => {
    const newColumns = [...columns];
    newColumns[index][key] = value;
    setColumns(newColumns);
  };

  const handleDeleteColumn = (index) => {
    setColumns(columns.filter((_, colIndex) => colIndex !== index));
  };

  const handleOk = () => {
    if (!tableName || columns.some(column => !column.name || !column.type)) {
      setErrorOpen(true);
    } else {
      const tableData = { tableName, columns };
      onSubmit(tableData);
      onClose();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleCloseError = () => {
    setErrorOpen(false);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{tableData ? 'Edit Table' : 'Create Table'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Table Name"
          fullWidth
          margin="normal"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          required
        />
        <Typography variant="h6">Columns</Typography>
        {columns.map((column, index) => (
          <Grid container spacing={2} key={index} alignItems="center">
            <Grid item xs={6}>
              <TextField
                label="Column Name"
                fullWidth
                margin="normal"
                value={column.name}
                onChange={(e) => handleColumnChange(index, 'name', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                label="Column Type"
                fullWidth
                margin="normal"
                select
                value={column.type}
                onChange={(e) => handleColumnChange(index, 'type', e.target.value)}
                required
              >
                {columnTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={1}>
              {index > 0 && (
                <IconButton color="secondary" onClick={() => handleDeleteColumn(index)}>
                  <DeleteIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
        ))}
        <IconButton color="primary" onClick={handleAddColumn}>
          <AddIcon />
        </IconButton>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleOk}>OK</Button>
      </DialogActions>
      <Snackbar
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        open={errorOpen}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <SnackbarContent
          message="Please enter values in all fields."
        />
      </Snackbar>
    </Dialog>
  );
};

export default CreateTableDialog;
