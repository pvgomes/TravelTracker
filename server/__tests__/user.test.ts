// Mock the storage module before importing anything that uses it
const mockStorage = {
  getUserByUsername: jest.fn(),
  createUser: jest.fn(),
  getUser: jest.fn(),
  getUserByShareId: jest.fn(),
  updateShareId: jest.fn(),
};

jest.mock('../storage', () => ({
  storage: mockStorage,
}));

import { createUser, getUserById, generateShareId } from '../logic/user';

describe('User Logic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user successfully', async () => {
      const userData = {
        username: 'testuser',
        password: 'hashedpassword',
        fullName: 'Test User',
        homeCountryCode: 'US',
        homeCountryName: 'United States',
      };

      const mockUser = { ...userData, id: 1, shareId: null };

      mockStorage.getUserByUsername.mockResolvedValue(undefined);
      mockStorage.createUser.mockResolvedValue(mockUser);

      const result = await createUser(userData);
      
      expect(mockStorage.getUserByUsername).toHaveBeenCalledWith('testuser');
      expect(mockStorage.createUser).toHaveBeenCalledWith(userData);
      expect(result).toEqual(mockUser);
    });

    it('should throw error if username already exists', async () => {
      const userData = {
        username: 'existinguser',
        password: 'hashedpassword',
        fullName: 'Test User',
        homeCountryCode: 'US',
        homeCountryName: 'United States',
      };

      const existingUser = { ...userData, id: 1, shareId: null };
      mockStorage.getUserByUsername.mockResolvedValue(existingUser);

      await expect(createUser(userData)).rejects.toThrow('Username already exists');
    });
  });

  describe('getUserById', () => {
    it('should return user for valid ID', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        password: 'hashedpassword',
        fullName: 'Test User',
        homeCountryCode: 'US',
        homeCountryName: 'United States',
        shareId: null,
      };

      mockStorage.getUser.mockResolvedValue(mockUser);

      const result = await getUserById(1);
      expect(result).toEqual(mockUser);
    });

    it('should throw error for non-existent user', async () => {
      mockStorage.getUser.mockResolvedValue(undefined);

      await expect(getUserById(999)).rejects.toThrow('User not found');
    });
  });

  describe('generateShareId', () => {
    it('should generate unique share ID', async () => {
      mockStorage.getUserByShareId.mockRejectedValue(new Error('User not found'));
      mockStorage.updateShareId.mockResolvedValue(true);

      const result = await generateShareId(1);
      
      expect(typeof result).toBe('string');
      expect(result.length).toBe(16);
      expect(mockStorage.updateShareId).toHaveBeenCalledWith(1, result);
    });

    it('should throw error if updateShareId fails', async () => {
      mockStorage.getUserByShareId.mockRejectedValue(new Error('User not found'));
      mockStorage.updateShareId.mockResolvedValue(false);

      await expect(generateShareId(1)).rejects.toThrow('Failed to update share ID');
    });
  });
});