import { hashPassword, comparePasswords, authenticateUser } from '../logic/auth';

// Mock the storage module
jest.mock('../storage', () => ({
  storage: {
    getUserByUsername: jest.fn(),
  },
}));

import { storage } from '../storage';

describe('Auth Logic', () => {
  describe('hashPassword', () => {
    it('should hash a password and return a string with salt', async () => {
      const password = 'testpassword123';
      const hashedPassword = await hashPassword(password);
      
      expect(typeof hashedPassword).toBe('string');
      expect(hashedPassword).toContain('.');
      expect(hashedPassword.split('.').length).toBe(2);
    });

    it('should generate different hashes for the same password', async () => {
      const password = 'testpassword123';
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);
      
      expect(hash1).not.toBe(hash2);
    });
  });

  describe('comparePasswords', () => {
    it('should return true for correct password', async () => {
      const password = 'testpassword123';
      const hashedPassword = await hashPassword(password);
      
      const isValid = await comparePasswords(password, hashedPassword);
      expect(isValid).toBe(true);
    });

    it('should return false for incorrect password', async () => {
      const password = 'testpassword123';
      const wrongPassword = 'wrongpassword';
      const hashedPassword = await hashPassword(password);
      
      const isValid = await comparePasswords(wrongPassword, hashedPassword);
      expect(isValid).toBe(false);
    });
  });

  describe('authenticateUser', () => {
    const mockStorage = storage as jest.Mocked<typeof storage>;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return user for valid credentials', async () => {
      const username = 'testuser';
      const password = 'testpassword123';
      const hashedPassword = await hashPassword(password);
      
      const mockUser = {
        id: 1,
        username,
        password: hashedPassword,
        fullName: 'Test User',
        homeCountryCode: 'US',
        homeCountryName: 'United States',
        shareId: null,
      };

      mockStorage.getUserByUsername.mockResolvedValue(mockUser);

      const result = await authenticateUser(username, password);
      expect(result).toEqual(mockUser);
    });

    it('should return null for non-existent user', async () => {
      const username = 'nonexistent';
      const password = 'testpassword123';

      mockStorage.getUserByUsername.mockResolvedValue(undefined);

      const result = await authenticateUser(username, password);
      expect(result).toBeNull();
    });

    it('should return null for invalid password', async () => {
      const username = 'testuser';
      const correctPassword = 'testpassword123';
      const wrongPassword = 'wrongpassword';
      const hashedPassword = await hashPassword(correctPassword);
      
      const mockUser = {
        id: 1,
        username,
        password: hashedPassword,
        fullName: 'Test User',
        homeCountryCode: 'US',
        homeCountryName: 'United States',
        shareId: null,
      };

      mockStorage.getUserByUsername.mockResolvedValue(mockUser);

      const result = await authenticateUser(username, wrongPassword);
      expect(result).toBeNull();
    });
  });
});