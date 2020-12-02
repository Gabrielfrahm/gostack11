import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHAshProvider';

// injeção de dependência
container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
