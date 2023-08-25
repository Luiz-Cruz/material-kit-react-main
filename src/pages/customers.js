import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { useRouter } from 'next/navigation';


const useCustomers = (users, page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(users, page, rowsPerPage);
    },
    [users, page, rowsPerPage]
  );
};

const useCustomerIds = (userData) => {
  return useMemo(
    () => {
      return userData.map((user) => user.id);
    },
    [userData]
  );
};

const Page = () => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [userData, setUserData] = useState([]);
  const [total, setTotal] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(userData, page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  const [searchName, setSearchName] = useState("");

  const getUsers = async () => {
    const skip = page * rowsPerPage;
    const data = await fetch(`http://127.0.0.1:8000/users/?skip=${skip}&limit=${rowsPerPage}&name=${searchName}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      })
        .then(response => response.json())
        .finally(() => setIsLoadingUsers(false));
    return data;
  }

  const request = async () => {
    if(isLoadingUsers) return;
    setIsLoadingUsers(true);
    const users = await getUsers("");
    setUserData(users.data);
    setTotal(users.total);
  }

  useEffect(() => {
    request();
  }, [page, rowsPerPage, searchName])
  
  const handleSearchChange = useCallback(
    (event) => {
      const searchValue = event.target.value;
      setSearchName(searchValue);
      setPage(0); // Volta para a primeira página ao pesquisar
    },
    [searchName]
  );

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );    

  const handleRowsPerPageChange = useCallback(
    (event) => {
      const numbersPerPage = event.target.value;
      setPage(0);
      setRowsPerPage(numbersPerPage);
    },
    [rowsPerPage, page, total]
  );

  return (
    <>
      <Head>
        <title>
          Customers | Easy Refund
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Customers
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={() => router.push('/user')}
                >
                  Add
                </Button>
              </div>
            </Stack>
            <CustomersSearch
              onSearchChange={handleSearchChange}
              // props adicionadas
            />
            <CustomersTable
              count={total}
              items={userData.map((user) => ({
                id: user.id,
                address: user.address,
                city: user.city,
                state: user.state,
                avatar: user.image,
                createdAt: user.createdAt,
                email: user.e_mail,
                name: user.full_name,
                phone: user.phone,
                createdAt: user.created_at,
              }))}
              loading={false}
              onPaginate={handlePageChange}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
