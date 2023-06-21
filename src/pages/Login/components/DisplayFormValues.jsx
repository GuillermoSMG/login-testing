import { Box, Typography } from '@mui/material';

function DisplayFormValues({ isDirty, isValid, values }) {
  return (
    <Box
      color='gray.600'
      mt='10px'
    >
      {isDirty && isValid && (
        <>
          <Typography>Username:{values.userNameWatch}</Typography>
          <Typography>Password:{values.passwordWatch}</Typography>
        </>
      )}
    </Box>
  );
}
export default DisplayFormValues;
