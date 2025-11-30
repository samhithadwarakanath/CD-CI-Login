import { render, screen } from '@testing-library/svelte';
import HomePage from '../../components/pages/HomePage.svelte';

test('Home page renders heading', () => {
  render(HomePage);
  expect(screen.getByText(/welcome/i)).toBeTruthy();
});

test('Home page lists cat facts section', () => {
  render(HomePage);
  const list = screen.getByTestId('cat-list');
  expect(list).toBeTruthy();
});
