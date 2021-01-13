"use strict";

var _FakeUserRepository = _interopRequireDefault(require("../../users/repositories/fakes/FakeUserRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _ListProvidersService = _interopRequireDefault(require("./ListProvidersService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUserRepository;
let listProvider;
let fakeCacheProvider;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new _FakeUserRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    listProvider = new _ListProvidersService.default(fakeUserRepository, fakeCacheProvider);
  });
  it('Should be able to show list providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'John Trê',
      email: 'johntre@example.com',
      password: '123456'
    });
    const user2 = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const loggedUser = await fakeUserRepository.create({
      name: 'John Qua',
      email: 'johnqua@example.com',
      password: '123456'
    });
    const providers = await listProvider.execute({
      user_id: loggedUser.id
    });
    expect(providers).toEqual([user1, user2]);
  });
});