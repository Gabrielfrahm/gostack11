import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

import IMailTemplateProvider from './MailTremplateProvider/models/IMailTemplateProvider';
import handlebarMailTemplateProvider from './MailTremplateProvider/implementations/HandlebarsMailTemplateProvider';

// files
container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

// provedor de template para emails
container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  handlebarMailTemplateProvider,
);

// provedor de email
container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);
