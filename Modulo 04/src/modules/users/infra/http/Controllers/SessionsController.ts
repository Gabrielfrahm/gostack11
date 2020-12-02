import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    // Com a atualização do TypeScript, isso se faz necessário
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json({ userWithoutPassword, token });
  }
}
