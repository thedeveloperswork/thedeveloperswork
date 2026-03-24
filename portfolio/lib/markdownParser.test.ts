import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getProfile } from './markdownParser';
import fs from 'fs';

vi.mock('fs', () => ({
    default: {
        readFileSync: vi.fn(),
        existsSync: vi.fn(),
        readdirSync: vi.fn(),
    },
    readFileSync: vi.fn(),
    existsSync: vi.fn(),
    readdirSync: vi.fn(),
}));

describe('markdownParser', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should parse profile name correctly', () => {
        const mockContent = '# VIJAYA GOPINADHREDDY VELAGALA\n## SUMMARY\nExpert in Data Engineering.';
        vi.mocked(fs.readFileSync).mockReturnValue(mockContent);
        vi.mocked(fs.existsSync).mockReturnValue(true);

        const profile = getProfile();
        expect(profile.name).toBe('VIJAYA GOPINADHREDDY VELAGALA');
    });

    it('should handle missing sections gracefully', () => {
        vi.mocked(fs.readFileSync).mockReturnValue('# Only Name');
        const profile = getProfile();
        expect(profile.name).toBe('Only Name');
        expect(profile.summary).toBe('');
    });
});
