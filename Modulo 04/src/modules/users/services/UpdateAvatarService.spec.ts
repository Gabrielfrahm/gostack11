import AppError from '@shared/error/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakerUserRepository from '../repositories/fakes/FakeUserRepository';

import UpdateAvatarService from './UpdateAvatarService';

let fakeUserRepository: FakerUserRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatarService: UpdateAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakerUserRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatarService = new UpdateAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
  });

  it('Should be able to update avatar with  User', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('Should not  be able to update avatar from non existing user', async () => {
    await expect(
      updateUserAvatarService.execute({
        user_id: 'non-existing-user',
        avatarFileName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should delete old avatar when updating new one ', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

    expect(user.avatar).toBe('avatar2.jpg');
  });
});
