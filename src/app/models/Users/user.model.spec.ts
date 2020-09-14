import { Student } from './user.model';

describe('User', () => {
  it('should create an instance', () => {
    expect(new Student()).toBeTruthy();
  });
});
