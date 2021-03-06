import AppError from '@shared/error/AppError';
import FakerUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakerUserRepository;
let listProvider: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakerUserRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProvider = new ListProvidersService(
      fakeUserRepository,
      fakeCacheProvider,
    );
  });

  it('Should be able to show list providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'John Trê',
      email: 'johntre@example.com',
      password: '123456',
    });

    const user2 = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'John Qua',
      email: 'johnqua@example.com',
      password: '123456',
    });

    const providers = await listProvider.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
