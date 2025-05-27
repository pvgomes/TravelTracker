import { createVisit, getUserVisits, getVisitById, updateVisit, deleteVisit } from '../logic/visit';

// Mock the storage module
jest.mock('../storage', () => ({
  storage: {
    createVisit: jest.fn(),
    getVisitsByUserId: jest.fn(),
    getVisitById: jest.fn(),
    updateVisit: jest.fn(),
    deleteVisit: jest.fn(),
  },
}));

import { storage } from '../storage';

describe('Visit Logic', () => {
  const mockStorage = storage as jest.Mocked<typeof storage>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createVisit', () => {
    it('should create a visit successfully', async () => {
      const userId = 1;
      const visitData = {
        countryCode: 'CZ',
        countryName: 'Czech Republic',
        city: 'Prague',
        visitMonth: 6,
        visitYear: 2024,
        notes: 'Beautiful city!',
      };

      const mockVisit = {
        id: 1,
        userId,
        ...visitData,
        state: null,
      };

      mockStorage.createVisit.mockResolvedValue(mockVisit);

      const result = await createVisit(userId, visitData);
      
      expect(mockStorage.createVisit).toHaveBeenCalledWith({
        userId,
        countryCode: 'CZ',
        countryName: 'Czech Republic',
        state: null,
        city: 'Prague',
        visitMonth: 6,
        visitYear: 2024,
        notes: 'Beautiful city!',
      });
      expect(result).toEqual(mockVisit);
    });

    it('should handle optional fields correctly', async () => {
      const userId = 1;
      const visitData = {
        countryCode: 'FR',
        countryName: 'France',
        visitMonth: 8,
        visitYear: 2023,
      };

      const mockVisit = {
        id: 2,
        userId,
        countryCode: 'FR',
        countryName: 'France',
        state: null,
        city: null,
        visitMonth: 8,
        visitYear: 2023,
        notes: null,
      };

      mockStorage.createVisit.mockResolvedValue(mockVisit);

      const result = await createVisit(userId, visitData);
      
      expect(mockStorage.createVisit).toHaveBeenCalledWith({
        userId,
        countryCode: 'FR',
        countryName: 'France',
        state: null,
        city: null,
        visitMonth: 8,
        visitYear: 2023,
        notes: null,
      });
      expect(result).toEqual(mockVisit);
    });
  });

  describe('getUserVisits', () => {
    it('should return user visits', async () => {
      const userId = 1;
      const mockVisits = [
        { id: 1, userId, countryCode: 'CZ', countryName: 'Czech Republic', state: null, city: 'Prague', visitMonth: 6, visitYear: 2024, notes: null },
        { id: 2, userId, countryCode: 'FR', countryName: 'France', state: null, city: 'Paris', visitMonth: 8, visitYear: 2023, notes: null },
      ];

      mockStorage.getVisitsByUserId.mockResolvedValue(mockVisits);

      const result = await getUserVisits(userId);
      
      expect(mockStorage.getVisitsByUserId).toHaveBeenCalledWith(userId);
      expect(result).toEqual(mockVisits);
    });
  });

  describe('getVisitById', () => {
    it('should return visit for valid ID and user', async () => {
      const userId = 1;
      const visitId = 1;
      const mockVisit = {
        id: visitId,
        userId,
        countryCode: 'CZ',
        countryName: 'Czech Republic',
        state: null,
        city: 'Prague',
        visitMonth: 6,
        visitYear: 2024,
        notes: null,
      };

      mockStorage.getVisitById.mockResolvedValue(mockVisit);

      const result = await getVisitById(visitId, userId);
      expect(result).toEqual(mockVisit);
    });

    it('should throw error if visit not found', async () => {
      mockStorage.getVisitById.mockResolvedValue(undefined);

      await expect(getVisitById(999, 1)).rejects.toThrow('Visit not found');
    });

    it('should throw error if visit belongs to different user', async () => {
      const mockVisit = {
        id: 1,
        userId: 2, // Different user
        countryCode: 'CZ',
        countryName: 'Czech Republic',
        state: null,
        city: 'Prague',
        visitMonth: 6,
        visitYear: 2024,
        notes: null,
      };

      mockStorage.getVisitById.mockResolvedValue(mockVisit);

      await expect(getVisitById(1, 1)).rejects.toThrow('Access denied - visit belongs to another user');
    });
  });

  describe('updateVisit', () => {
    it('should update visit successfully', async () => {
      const userId = 1;
      const visitId = 1;
      const mockVisit = {
        id: visitId,
        userId,
        countryCode: 'CZ',
        countryName: 'Czech Republic',
        state: null,
        city: 'Prague',
        visitMonth: 6,
        visitYear: 2024,
        notes: null,
      };

      const updateData = { notes: 'Updated notes' };
      const updatedVisit = { ...mockVisit, notes: 'Updated notes' };

      mockStorage.getVisitById.mockResolvedValue(mockVisit);
      mockStorage.updateVisit.mockResolvedValue(updatedVisit);

      const result = await updateVisit(visitId, userId, updateData);
      
      expect(mockStorage.updateVisit).toHaveBeenCalledWith(visitId, updateData);
      expect(result).toEqual(updatedVisit);
    });

    it('should throw error if update fails', async () => {
      const userId = 1;
      const visitId = 1;
      const mockVisit = {
        id: visitId,
        userId,
        countryCode: 'CZ',
        countryName: 'Czech Republic',
        state: null,
        city: 'Prague',
        visitMonth: 6,
        visitYear: 2024,
        notes: null,
      };

      mockStorage.getVisitById.mockResolvedValue(mockVisit);
      mockStorage.updateVisit.mockResolvedValue(undefined);

      await expect(updateVisit(visitId, userId, { notes: 'New notes' })).rejects.toThrow('Failed to update visit');
    });
  });

  describe('deleteVisit', () => {
    it('should delete visit successfully', async () => {
      const userId = 1;
      const visitId = 1;
      const mockVisit = {
        id: visitId,
        userId,
        countryCode: 'CZ',
        countryName: 'Czech Republic',
        state: null,
        city: 'Prague',
        visitMonth: 6,
        visitYear: 2024,
        notes: null,
      };

      mockStorage.getVisitById.mockResolvedValue(mockVisit);
      mockStorage.deleteVisit.mockResolvedValue(true);

      const result = await deleteVisit(visitId, userId);
      
      expect(mockStorage.deleteVisit).toHaveBeenCalledWith(visitId);
      expect(result).toBe(true);
    });

    it('should throw error if delete fails', async () => {
      const userId = 1;
      const visitId = 1;
      const mockVisit = {
        id: visitId,
        userId,
        countryCode: 'CZ',
        countryName: 'Czech Republic',
        state: null,
        city: 'Prague',
        visitMonth: 6,
        visitYear: 2024,
        notes: null,
      };

      mockStorage.getVisitById.mockResolvedValue(mockVisit);
      mockStorage.deleteVisit.mockResolvedValue(false);

      await expect(deleteVisit(visitId, userId)).rejects.toThrow('Failed to delete visit');
    });
  });
});