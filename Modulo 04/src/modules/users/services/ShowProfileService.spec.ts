import AppError from '@shared/error/AppError';
import ShowProfileService from './ShowProfileService';
import FakerUserRepository from '../repositories/fakes/FakeUserRepository';

let fakeUserRepository: FakerUserRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakerUserRepository();

    showProfile = new ShowProfileService(fakeUserRepository);
  });

  it('Should be able to show the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@example.com');
  });

  it('Should not be able the show profile from non-existing user', async () => {
    expect(
      showProfile.execute({
        user_id: 'non-existing-userId',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
