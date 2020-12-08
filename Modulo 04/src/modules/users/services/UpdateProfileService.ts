import { injectable, inject } from 'tsyringe';

import AppError from '@shared/error/AppError';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

interface IRequestDTO {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('user not found.');
    }

    // encontra o email
    const userWithUpdateEmail = await this.usersRepository.findByEmail(email);

    // caso o email seja encontrado e ele for diferente do id da pessao que pediu o reset da erro
    if (userWithUpdateEmail && userWithUpdateEmail.id !== user_id) {
      throw new AppError('E-mail already in use.');
    }

    user.email = email;
    user.name = name;

    // se passar a senha mas não passa a senha antiga
    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not math');
      }
      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
