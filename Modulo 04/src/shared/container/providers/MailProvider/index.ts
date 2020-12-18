import { container } from 'tsyringe';
import mailConfig from '@config/mail';
import IMailProvider from './models/IMailProvider';

import ZohoMailProvider from './implementations/ZohoMailProvider';
import EtherealMailProvider from './implementations/EtherealMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  zoho: container.resolve(ZohoMailProvider),
};

// provedor de email
container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
