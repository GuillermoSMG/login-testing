import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../pages/Login/LoginForm';
import { LoginFromMock } from '../_mocks_/LoginForm.mock';

describe('LoginForm', () => {
  afterEach(cleanup);
  afterEach(jest.clearAllMocks);

  beforeEach(() => {
    render(<LoginForm />);
  });

  it('should two inputs exist on the screen', () => {
    const usernameInput = screen.getByRole('textbox', { name: /Username/i });
    const passwordInput = screen.getByRole('textbox', { name: /Password/i });

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    expect(usernameInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });

  it('should enable submit button if form values are valid', async () => {
    const submitButton = screen.getByRole('button', { name: /Log in/i });

    const usernameInput = screen.getByRole('textbox', { name: /Username/i });
    const passwordInput = screen.getByRole('textbox', { name: /Password/i });

    expect(submitButton).toBeDisabled();

    await userEvent.type(usernameInput, LoginFromMock.username);
    await userEvent.type(passwordInput, LoginFromMock.password);

    await waitFor(() => {
      expect(usernameInput).toHaveValue(LoginFromMock.username);
      expect(passwordInput).toHaveValue(LoginFromMock.password);
    });

    expect(submitButton).toBeEnabled();
  });
});
