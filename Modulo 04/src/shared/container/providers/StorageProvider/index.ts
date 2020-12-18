import { container } from 'tsyringe';

import IStorageProvider from './models/IStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';
import FirebaseStorageProvider from './implementations/FirebaseStorageProvider';

const providers = {
  disk: DiskStorageProvider,
  fire: FirebaseStorageProvider,
};

// files
container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers.fire,
);
