// import React, { useEffect, useState } from "react";
// import api from "./services/api";

// export default function App() {
//   const [user, setUser] = useState();

//   useEffect(() => {
//     api
//       .get("/users/GabrielEvaristo432")
//       .then((response) => setUser(response.data))
//       .catch((err) => {
//         console.error("ops! ocorreu um erro" + err);
//       });
//   }, []);

//   return (
//     <div className="App">
//       <p>Usuário: {user?.login}</p>
//       <p>Biografia: {user?.bio}</p>
//     </div>
//   );
// }

import * as React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

export default function StickyHeadTable() {
  const columns = [
    { id: 'identificacao', label: 'Identificacao', minWidth: 100 },
    { id: 'cpf', label: 'CPF', minWidth: 100 },
    {
      id: 'mae',
      label: 'Mãe',
      minWidth: 100
    },
    {
      id: 'contato',
      label: 'Contato',
      minWidth: 100
    },
    {
      id: 'localizacao',
      label: 'Localização',
      minWidth: 100
    },
  ];

  const [alunos, setAlunos] = useState([]);

  const listarAlunos = async () => {

    try {
      const { data: response } = await axios.get('http://localhost:3010/alunos');
      setAlunos(response);
    } catch (error) {
      console.error(error.message);
    }

  }

  useEffect(() => {
    listarAlunos()
  }, [])

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '5px' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {alunos
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((a, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = a[column.id];
                      return (
                        <TableCell key={column.id}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={alunos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
