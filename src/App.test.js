import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import experience from './constants/experience.json';
import education from './constants/education.json';

test('renders portfolio content correctly', () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>
    );

    // Check for Timeline Titles
    expect(screen.getByText(/CAREER HISTORY/i)).toBeInTheDocument();
    expect(screen.getByText(/ACADEMIC DATABASE/i)).toBeInTheDocument();

    // Check for ALL Experience Data
    experience.forEach((item) => {
        const roles = screen.getAllByText(item.role);
        expect(roles.length).toBeGreaterThan(0);
        expect(roles[0]).toBeInTheDocument();

        const companies = screen.getAllByText(item.company);
        expect(companies.length).toBeGreaterThan(0);
        expect(companies[0]).toBeInTheDocument();
    });

    // Check for ALL Education Data
    education.forEach((item) => {
        // Assuming 'role' key holds the degree name
        const degrees = screen.getAllByText(item.role);
        expect(degrees.length).toBeGreaterThan(0);
        expect(degrees[0]).toBeInTheDocument();

        const universities = screen.getAllByText(item.company);
        expect(universities.length).toBeGreaterThan(0);
        expect(universities[0]).toBeInTheDocument();
    });
});
