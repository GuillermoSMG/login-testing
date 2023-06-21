import { TextField, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';

const fromValidation = (errors, errorKey) => {
  return errors[errorKey] ? (
    <Typography color='red'>{errors[errorKey].message}</Typography>
  ) : (
    ''
  );
};

function Input({
  name = '',
  label = '',
  type = 'text',
  disabled = false,
  required = false,
}) {
  const { register, errors } = useFormContext();

  return (
    <div>
      <TextField
        required={required}
        {...(disabled ? { disabled } : {})}
        type={type}
        error={errors && !!errors[name]}
        id={name}
        variant='outlined'
        label={label}
        {...register(name)}
        fullWidth
      />
      {errors && fromValidation(errors, name)}
    </div>
  );
}
export default Input;
