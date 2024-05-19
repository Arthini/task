// App.js
import React, { useState } from 'react';
import { Container, Grid, Paper, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import CreateTableDialog from './components/CreateTableDialog';
import Header from './components/Header';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import AddColumnDialog from './components/AddColumnDialog';
import Login from './components/Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // State to manage login
  const [openCreateTableDialog, setOpenCreateTableDialog] = useState(false);
  const [openAddColumnDialog, setOpenAddColumnDialog] = useState(false);
  const [tables, setTables] = useState([]);
  const [selectedTableIndex, setSelectedTableIndex] = useState(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleOpenCreateTableDialog = () => {
    setOpenCreateTableDialog(true);
  };

  const handleCloseCreateTableDialog = () => {
    setOpenCreateTableDialog(false);
    setSelectedTableIndex(null);
  };

  const handleSubmitCreateTableDialog = (tableData) => {
    if (selectedTableIndex !== null) {
      const updatedTables = [...tables];
      updatedTables[selectedTableIndex] = tableData;
      setTables(updatedTables);
    } else {
      setTables([...tables, tableData]);
    }
    handleCloseCreateTableDialog();
  };

  const handleOpenEditTableDialog = (tableIndex) => {
    setSelectedTableIndex(tableIndex);
    setOpenCreateTableDialog(true);
  };

  const handleOpenAddColumnDialog = (tableIndex) => {
    setSelectedTableIndex(tableIndex);
    setOpenAddColumnDialog(true);
  };

  const handleCloseAddColumnDialog = () => {
    setOpenAddColumnDialog(false);
  };

  const handleSubmitAddColumnDialog = (columnData) => {
    const updatedTables = [...tables];
    updatedTables[selectedTableIndex].columns.push(columnData);
    setTables(updatedTables);
    handleCloseAddColumnDialog();
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>
      <Header onOpenCreateTable={handleOpenCreateTableDialog} />
      <Container>
        <Grid container spacing={3} style={{ marginTop: 20 }}>
          {tables.map((table, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2}>
                        {table.tableName}
                      </TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleOpenEditTableDialog(index)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="primary" onClick={() => handleOpenAddColumnDialog(index)}>
                          <AddIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {table.columns.map((column, colIndex) => (
                      <TableRow key={colIndex}>
                        <TableCell>{column.name}</TableCell>
                        <TableCell>{column.type}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          ))}
        </Grid>
      </Container>
      <CreateTableDialog open={openCreateTableDialog} onClose={handleCloseCreateTableDialog} onSubmit={handleSubmitCreateTableDialog} tableData={selectedTableIndex !== null ? tables[selectedTableIndex] : null} />
      <AddColumnDialog open={openAddColumnDialog} onClose={handleCloseAddColumnDialog} onSubmit={handleSubmitAddColumnDialog} />
    </div>
  );
};

export default App;
