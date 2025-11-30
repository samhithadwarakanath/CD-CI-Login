import { render, screen, fireEvent } from '@testing-library/svelte';
import LoginPage from '../../components/pages/LoginPage.svelte';


test('renders login page', () => {
  render(LoginPage);
  expect(screen.getAllByText(/login/i).length).toBeGreaterThan(0);
});


test('Login page shows Google button', () => {
  render(LoginPage);
  expect(screen.getByText(/login with google/i)).toBeTruthy();
});

test('Login page has email input', () => {
  render(LoginPage);
  expect(screen.getByPlaceholderText(/email/i)).toBeTruthy();
});

test('Login button disabled without input', () => {
  render(LoginPage);
  const btn = screen.getByRole('button');
  expect(btn.disabled).toBe(true);
});

test('Shows error message if invalid email typed', async () => {
  render(LoginPage);

  const input = screen.getByPlaceholderText(/email/i);
  await fireEvent.input(input, { target: { value: 'invalid' } });

  expect(screen.getByText(/invalid email/i)).toBeTruthy();
});
