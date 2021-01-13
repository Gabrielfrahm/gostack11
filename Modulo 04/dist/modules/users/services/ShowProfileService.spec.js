"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/error/AppError"));

var _ShowProfileService = _interopRequireDefault(require("./ShowProfileService"));

var _FakeUserRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUserRepository;
let showProfile;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new _FakeUserRepository.default();
    showProfile = new _ShowProfileService.default(fakeUserRepository);
  });
  it('Should be able to show the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const profile = await showProfile.execute({
      user_id: user.id
    });
    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@example.com');
  });
  it('Should not be able the show profile from non-existing user', async () => {
    expect(showProfile.execute({
      user_id: 'non-existing-userId'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});