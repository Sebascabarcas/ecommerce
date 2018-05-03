import { NotOwnerPipe } from './not-owner.pipe';

describe('NotOwnerPipe', () => {
  it('create an instance', () => {
    const pipe = new NotOwnerPipe();
    expect(pipe).toBeTruthy();
  });
});
