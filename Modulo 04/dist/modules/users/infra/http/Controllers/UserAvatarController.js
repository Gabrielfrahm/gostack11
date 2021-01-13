"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _UpdateAvatarService = _interopRequireDefault(require("../../../services/UpdateAvatarService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserAvatarController {
  async update(request, response) {
    const updateAvatar = _tsyringe.container.resolve(_UpdateAvatarService.default);

    const user = await updateAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename
    }); // const userWithoutPassword = {
    //   id: user.id,
    //   name: user.name,
    //   email: user.email,
    //   avatar: user.avatar,
    //   created_at: user.created_at,
    //   updated_at: user.updated_at,
    // };

    return response.json((0, _classTransformer.classToClass)(user));
  }

}

exports.default = UserAvatarController;