import { Button as MUIButton } from '@mui/material';

function Button({ isDirty, isValid, children, type }) {
  return (
    <MUIButton
      type={type}
      fullWidth
      variant='contained'
      disabled={!!(!isDirty || !isValid)}
    >
      {children}
    </MUIButton>
  );
}
export default Button;
