import { useState, useEffect } from 'react';

import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { 
  Table, 
  TableCell, 
  TableHead, 
  TableRow,
  TableBody, 
  Button,
  Modal,
  Box,
  Typography,
  Stack,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useRouter } from 'next/navigation';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const Page = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup .string().required('Digite o nome!!!'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        if(isLoading) return;
        setIsLoading(true);

        const body = {
          name: values.name,
        }

        if(values.id) {
          await fetch(`https://jsonplaceholder.typicode.com/users/${values.id}`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          })
          .then(response => response.json())
          .finally(async () => {
            setSuccessMessage('Usuário atualizado com sucesso!!!')
            setSuccessAlert(true);
            await request();
          });
        } else {
          await fetch(`https://jsonplaceholder.typicode.com/users`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          })
          .then(response => response.json())
          .finally(async () => {
            setSuccessMessage('Usuário cadastrado com sucesso!!!')
            setSuccessAlert(true);
            await request();
          });
        }

        setIsLoading(false);

        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);

        handleClose();
      } catch (err) {
        setIsLoading(false);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const handleOpen = (id) => {
    if(id) {
      const user = users.find(user => user.id === id);
      formik.setFieldValue('id', user.id);
      formik.setFieldValue('name', user.name);
    } else {
      formik.setFieldValue('id', '');
      formik.setFieldValue('name', '');
    }
    
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const getUsers = async () => {
    const data = await fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .finally(() => setIsLoadingUsers(false));

    return data;
  }

  const request = async () => {
    if(isLoadingUsers) return;

    setIsLoadingUsers(true);

    setTimeout(async () => {
      const users = await getUsers();
      setUsers(users);
    }, 2000);
  }

  useEffect(() => {
    request();
  }, [])

  const removeUser = async (id) => {
    if(window.confirm('Deseja realmente deletar esse usuário?')) {
      try {
        await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .finally(async () => {
          setSuccessMessage('Usuário deletado com sucesso!!!')
          setSuccessAlert(true);
          await request();
        });
      } catch(e) {
        console.log(e)
      }
    }
    return;
  }
  
  return (
    <>
      <h1>Usuários</h1>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: 20,
        paddingRight: 30
      }}>
        <Button onClick={() => router.push('/customers')}>
          voltar
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={() => handleOpen()}
        >
          Cadastrar
        </Button>
      </div>
      <div style={{ paddingLeft: 30, paddingRight: 30 }}>
        <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>nome</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                isLoadingUsers && (
                  'Carregando...'
                )
              }
              {
                !isLoadingUsers && users.map(user => (
                  <TableRow
                    key={user.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleOpen(user.id)}>
                          editar
                        </Button>
                        <Button 
                        color='error'
                        onClick={() => removeUser(user.id)}>
                          desativar
                        </Button>
                      </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
        </Table>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <Stack spacing={3}>
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Nome"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Stack>
            {formik.errors.submit && (
              <Typography
                color="error"
                sx={{ mt: 3 }}
                variant="body2"
              >
                {formik.errors.submit}
              </Typography>
            )}
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
            >
              {isLoading ? 'Carregando...' : 'Salvar'}
            </Button>
          </form>
        </Box>
      </Modal>
      <Snackbar 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={successAlert}
        autoHideDuration={6000}
        onClose={() => setSuccessAlert(false)}
        >
        <Alert 
          onClose={() => setSuccessAlert(false)}
          severity="success"
          sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
