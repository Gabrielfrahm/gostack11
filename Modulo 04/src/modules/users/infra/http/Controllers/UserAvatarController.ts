import { Response, Request } from 'express';
import { container } from 'tsyringe';
import UpdateAvatarService from '@modules/users/services/UpdateAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = container.resolve(UpdateAvatarService);

    const user = await updateAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json(userWithoutPassword);
  }
}
