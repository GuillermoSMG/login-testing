import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../pages/Login/LoginForm';
import { LoginFromMock, LoginFromMockError } from '../_mocks_/LoginForm.mock';
import axios from 'axios';

jest.mock('axios');

describe('LoginForm', () => {
  afterEach(cleanup);
  afterEach(jest.clearAllMocks);

  beforeEach(() => {
    axios.post.mockResolvedValue({ data: LoginFromMock });
    render(<LoginForm />);
  });

  it('should two inputs and a submit button exist on the screen', () => {
    const usernameInput = screen.getByRole('textbox', { name: /Username/i });
    const passwordInput = screen.getByRole('textbox', { name: /Password/i });
    const submitButton = screen.getByRole('button', { name: /Log in/i });

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    expect(usernameInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(submitButton).toBeDisabled();
  });

  it('should enable submit button if form values are valid', async () => {
    const submitButton = screen.getByRole('button', { name: /Log in/i });

    const usernameInput = screen.getByRole('textbox', { name: /Username/i });
    const passwordInput = screen.getByRole('textbox', { name: /Password/i });

    await userEvent.type(usernameInput, LoginFromMock.username);
    await userEvent.type(passwordInput, LoginFromMock.password);

    await waitFor(() => {
      expect(usernameInput).toHaveValue(LoginFromMock.username);
      expect(passwordInput).toHaveValue(LoginFromMock.password);
      expect(submitButton).toBeEnabled();
    });
  });

  it('should disabled the submit button if the form values are invalid', async () => {
    const usernameInput = screen.getByRole('textbox', { name: /Username/i });
    const passwordInput = screen.getByRole('textbox', { name: /Password/i });
    const submitButton = screen.getByRole('button', { name: /Log in/i });

    await userEvent.type(usernameInput, LoginFromMockError.username);
    await userEvent.type(passwordInput, LoginFromMockError.password);

    await waitFor(() => {
      expect(usernameInput).toHaveValue(LoginFromMockError.username);
      expect(passwordInput).toHaveValue(LoginFromMockError.password);
      expect(
        screen.getByText(/Username debe ser máximo de 12 caracteres/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Password debe ser alfanumérico, y contener máximo 12 caracteres, una mayúscula y un caracter especial/i
        )
      ).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });
  });

  it('should call the submit function when the submit button is clicked', async () => {
    const submitButton = screen.getByRole('button', { name: /Log in/i });

    const usernameInput = screen.getByRole('textbox', { name: /Username/i });
    const passwordInput = screen.getByRole('textbox', { name: /Password/i });

    await userEvent.type(usernameInput, LoginFromMock.username);
    await userEvent.type(passwordInput, LoginFromMock.password);
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toBeEnabled();
      expect(axios.post).toHaveBeenCalledTimes(1);
    });
  });
});
