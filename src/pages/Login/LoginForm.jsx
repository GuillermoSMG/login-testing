import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { callEndpoint } from '../../services/call-endpoint';
import DisplayFormValues from './components/DisplayFormValues';
import { LoginFormSchema } from './schemas/login-form-schema';

function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({
    defaultValues: {
      userName: '',
      password: '',
    },
    mode: 'onChange',
    resolver: yupResolver(LoginFormSchema),
  });

  const userNameWatch = watch('username');
  const passwordWatch = watch('password');
  const onSubmit = async data => {
    const result = await callEndpoint(data);
    console.log(result);
    reset();
  };

  return (
    <>
      {userNameWatch}
      {passwordWatch}
      <FormProvider {...{ register, errors }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name='username'
            label='Username'
            required={true}
          />
          <Input
            name='password'
            label='Password'
            required={true}
          />
          <Button
            isDirty={isDirty}
            isValid={isValid}
            type='submit'
          >
            Log in
          </Button>
        </form>
      </FormProvider>
      <DisplayFormValues
        isDirty={isDirty}
        isValid={isValid}
        values={{ userNameWatch, passwordWatch }}
      />
    </>
  );
}
export default LoginForm;
