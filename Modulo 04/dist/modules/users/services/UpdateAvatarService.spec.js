"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/error/AppError"));

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));

var _FakeUserRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserRepository"));

var _UpdateAvatarService = _interopRequireDefault(require("./UpdateAvatarService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUserRepository;
let fakeStorageProvider;
let updateUserAvatarService;
describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new _FakeUserRepository.default();
    fakeStorageProvider = new _FakeStorageProvider.default();
    updateUserAvatarService = new _UpdateAvatarService.default(fakeUserRepository, fakeStorageProvider);
  });
  it('Should be able to update avatar with  User', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg'
    });
    expect(user.avatar).toBe('avatar.jpg');
  });
  it('Should not  be able to update avatar from non existing user', async () => {
    await expect(updateUserAvatarService.execute({
      user_id: 'non-existing-user',
      avatarFileName: 'avatar.jpg'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('Should delete old avatar when updating new one ', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg'
    });
    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg'
    });
    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});