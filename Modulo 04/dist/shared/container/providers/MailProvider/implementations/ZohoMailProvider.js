"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _mail = _interopRequireDefault(require("../../../../../config/mail"));

var _tsyringe = require("tsyringe");

var _IMailTemplateProvider = _interopRequireDefault(require("../../MailTremplateProvider/models/IMailTemplateProvider"));

var _dec, _dec2, _dec3, _dec4, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ZohoMailProvider = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('MailTemplateProvider')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IMailTemplateProvider.default === "undefined" ? Object : _IMailTemplateProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_temp = class ZohoMailProvider {
  constructor(mailTemplateProvider) {
    this.mailTemplateProvider = mailTemplateProvider;
    this.client = void 0;

    const transporter = _nodemailer.default.createTransport({
      host: process.env.ZOHO_CONFIG_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_CONFIG_USER,
        pass: process.env.ZOHO_CONFIG_PASSWORD
      }
    });

    this.client = transporter;
  }

  async sendMail({
    to,
    from,
    subject,
    templateData
  }) {
    const {
      name,
      email
    } = _mail.default.defaults.from;
    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData)
    });
  }

}, _temp)) || _class) || _class) || _class) || _class);
exports.default = ZohoMailProvider;