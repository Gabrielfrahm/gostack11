"use strict";

var _tsyringe = require("tsyringe");

var _HandlebarsMailTemplateProvider = _interopRequireDefault(require("./implementations/HandlebarsMailTemplateProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providers = {
  handlebars: _HandlebarsMailTemplateProvider.default
}; // provedor de template para emails

_tsyringe.container.registerSingleton('MailTemplateProvider', providers.handlebars);