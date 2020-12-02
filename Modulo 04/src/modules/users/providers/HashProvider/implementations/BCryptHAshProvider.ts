import { compare, hash } from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';

export default class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    // gera o hash da senha, recebendo uma string
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    // faz a verificação da senha
    return compare(payload, hashed);
  }
}
