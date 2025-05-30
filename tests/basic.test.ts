describe('Basic Test Setup', () => {
  it('should run a simple test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle basic string operations', () => {
    const testString = 'Hello World';
    expect(testString.toLowerCase()).toBe('hello world');
  });
});