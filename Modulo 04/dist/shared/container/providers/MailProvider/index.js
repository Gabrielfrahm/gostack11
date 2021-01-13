"use strict";

var _tsyringe = require("tsyringe");

var _mail = _interopRequireDefault(require("../../../../config/mail"));

var _ZohoMailProvider = _interopRequireDefault(require("./implementations/ZohoMailProvider"));

var _EtherealMailProvider = _interopRequireDefault(require("./implementations/EtherealMailProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providers = {
  ethereal: _tsyringe.container.resolve(_EtherealMailProvider.default),
  zoho: _tsyringe.container.resolve(_ZohoMailProvider.default)
}; // provedor de email

_tsyringe.container.registerInstance('MailProvider', providers[_mail.default.driver]);