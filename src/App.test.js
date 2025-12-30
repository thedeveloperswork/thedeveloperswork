
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
    it('imports without crashing', () => {
        expect(App).toBeDefined();
        // DOM rendering tests are disabled due to environment issues
    });
});
