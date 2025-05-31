import { hashPassword, comparePasswords } from '../logic/auth';

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
});