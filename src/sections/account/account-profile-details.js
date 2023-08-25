import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';


const jobPositions = [
  {value: "Senior Developr", label: "Senior Developer"},
  {value: "Junior Developr", label: "Junior Developer"},
  {value: "Marketing Analyst", label: "Marketing Analyst"},
]

const states = [
  { value: 'AC', label: 'AC' },
  { value: 'AL', label: 'AL' },
  { value: 'AP', label: 'AP' },
  { value: 'AM', label: 'AM' },
  { value: 'BA', label: 'BA' },
  { value: 'CE', label: 'CE' },
  { value: 'DF', label: 'DF' },
  { value: 'ES', label: 'ES' },
  { value: 'GO', label: 'GO' },
  { value: 'MA', label: 'MA' },
  { value: 'MT', label: 'MT' },
  { value: 'MS', label: 'MS' },
  { value: 'MG', label: 'MG' },
  { value: 'PA', label: 'PA' },
  { value: 'PB', label: 'PB' },
  { value: 'PR', label: 'PR' },
  { value: 'PE', label: 'PE' },
  { value: 'PI', label: 'PI' },
  { value: 'RJ', label: 'RJ' },
  { value: 'RN', label: 'RN' },
  { value: 'RS', label: 'RS' },
  { value: 'RO', label: 'RO' },
  { value: 'RR', label: 'RR' },
  { value: 'SC', label: 'SC' },
  { value: 'SP', label: 'SP' },
  { value: 'SE', label: 'SE' },
  { value: 'TO', label: 'TO' }
];

export const AccountProfileDetails = () => {
  const [values, setValues] = useState({
    fullName: '',
    taxId: '',
    email: '',
    phone: '',
    city: '',
    state: 'SP',
    birthDate: '',
    address: '',
    neighborhood: '',
    zipCode: ''
  });

  const handleDateChange = (date) => {
    console.log(date);
    console.log(new Date(date).toLocaleDateString('pt-BR'));
    setValues((prevState) => ({
      ...prevState,
      birthDate: new Date(date).toLocaleDateString('pt-BR')
    }));
  };

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="Please enter full name"
                  label="Full name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="CPF"
                  name="cpf"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
              <Grid
                xs={12}
                md={3}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  required
                  value={values.phone}
                />
              </Grid>
              <Grid
                xs={12}
                md={3}
              >
                <TextField
                  fullWidth
                  label="Birthdate"
                  name="Birthdate"
                  onChange={handleChange}
                  required
                  value={values.birthDate}
                />
              </Grid>
              <Grid
                xs={12}
                md={9}
              >
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  onChange={handleChange}
                  type="city"
                  value={values.city}
                />
              </Grid>
              <Grid
                xs={12}
                md={3}
              >
                <TextField
                  fullWidth
                  label="Select State"
                  name="state"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                >
                  {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  onChange={handleChange}
                  required
                  value={values.address}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Neighborhood"
                  name="neighborhood"
                  onChange={handleChange}
                  required
                  value={values.neighborhood}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Zip Code"
                  name="zipcode"
                  onChange={handleChange}
                  required
                  value={values.zipCode}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Job Position"
                  name="jobPosition"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.jobPosition}
                >
                  {jobPositions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <DesktopDatePicker
                  label="BirthDate"
                  inputFormat="dd/mm/yyyy"
                  name="birthDate"
                  value={values.birthDate}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">
            Send
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
