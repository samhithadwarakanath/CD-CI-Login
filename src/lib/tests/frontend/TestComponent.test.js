import { render, screen } from '@testing-library/svelte';
import TestComponent from '../../components/TestComponent.svelte';

test('TestComponent renders without crashing', () => {
  render(TestComponent);
});

test('TestComponent renders correct text', () => {
  render(TestComponent);
  expect(screen.getByText(/test component/i)).toBeInTheDocument();
});
