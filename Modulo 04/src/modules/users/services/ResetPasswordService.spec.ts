import AppError from '@shared/error/AppError';

import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRespository';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

import ResetPasswordService from './ResetPasswordService';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let resetPassword: ResetPasswordService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();

    resetPassword = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokenRepository,
    );
  });

  it('Should be able to reset to password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    await resetPassword.execute({
      token,
      password: '123123',
    });

    const updatedUser = await fakeUserRepository.findById(user.id);

    expect(updatedUser?.password).toBe('123123');
  });
});
