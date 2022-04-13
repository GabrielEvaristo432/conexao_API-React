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


// import { useEffect, useState } from "react";
// import axios from 'axios';

// function App() {

//   const [carregando, setCarregando] = useState(true);
//   const [alunos, setAlunos] = useState([]);

//   const listarAlunos = async () => {

//     setCarregando(true);
//     try {
//       const {data: response} = await axios.get('http://localhost:3010/alunos');
//       setAlunos(response);
//     } catch (error) {
//       console.error(error.message);
//     }
//     setCarregando(false)
//   }

//   useEffect(() => {
//     listarAlunos()
//   }, [])

//   return (
//     <>
//       <h1>Lista de alunos(as)</h1>

//       {carregando && <div>Carregando dados...</div>}
//       {!carregando && (
//         <table>
//           <tr>
//             <th>Id</th>
//             <th>Nome</th>
//           </tr>
//           {alunos.map((a, index) => (
//             <tr key={index}>
//               <td>{a.identificacao}</td>
//               <td>{a.cpf}</td>
//               <td>{a.mae}</td>
//               <td>{a.contato}</td>
//               <td>{a.localizacao}</td>
//             </tr>)
//           )}
//         </table>
//       )}

//       <button onClick={() => listarAlunos()}>Carregar novos dados</button>
//     </>
//   );
// }

// export default App;

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
  id: 'name' | 'code' | 'population' | 'size' | 'density';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Identificação', minWidth: 170 },
  { id: 'code', label: 'CPF', minWidth: 100 },
  {
    id: 'population',
    label: 'Mãe',
    minWidth: 170
  },
  {
    id: 'size',
    label: 'Contato',
    minWidth: 170
  },
  {
    id: 'density',
    label: 'Localização',
    minWidth: 170
  },
];

interface Data {
  identificacao: string;
  cpf: string;
  mae: string;
  contato: string;
  localizacao: string;
}

function createData(
  identificacao: string,
  cpf: string,
  mae: string,
  contato: string,
  localizacao: string,
): Data {
  return { identificacao, cpf, mae, contato, localizacao };
}

const rows = [
  createData('Tatiane Carolina de Souza', '776.852.608-90', 'Sophia Pietra Baptista', '(69) 99243-1496', 'Ji-Paraná/RO'),
  createData('Kevin Calebe Miguel Barros', '123.439.176-88', 'Mirella Julia Assis', '(69) 99267-3345', 'Vilhena/RO'),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

function App() {

  // const [carregando, setCarregando] = useState(true);
  // const [alunos, setAlunos] = useState([]);

  // const listarAlunos = async () => {

  //   setCarregando(true);
  //   try {
  //     const {data: response} = await axios.get('http://localhost:3010/alunos');
  //     setAlunos(response);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  //   setCarregando(false)
  // }

  // useEffect(() => {
  //   listarAlunos()
  // }, [])

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {/* <Typography
        sx={{
          fontSize: "24px",
          fontWeight: "bold"
        }}
      >Lista de alunos</Typography>
      
      {carregando && <Typography>Carregando dados...</Typography>}
      {!carregando && (
        <table>
          <tr>
            <th>Identificação</th>
            <th>CPF</th>
            <th>Mãe</th>
            <th>Contato</th>
            <th>Localização</th>
          </tr>
          {alunos.map((a, index) => (
            <tr key={index}>
              <td>{a.identificacao}</td>
              <td>{a.cpf}</td>
              <td>{a.mae}</td>
              <td>{a.contato}</td>
              <td>{a.localizacao}</td>
            </tr>)
          )}
        </table>
      )}
      <button onClick={() => listarAlunos()}>Carregar novos dados</button> */}

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default App;
