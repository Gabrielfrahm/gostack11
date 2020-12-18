import { container } from 'tsyringe';
import IMailTemplateProvider from './models/IMailTemplateProvider';
import handlebarMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';

const providers = {
  handlebars: handlebarMailTemplateProvider,
};

// provedor de template para emails
container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
