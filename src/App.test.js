import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio name', () => {
    render(<App />);
    const linkElement = screen.getByText(/Vijaya Gopinadh Reddy Velagala/i);
    expect(linkElement).toBeInTheDocument();
});
