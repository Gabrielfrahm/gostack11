import IMailtemplateProvider from '../models/IMailTemplateProvider';

export default class FakeMailTemplateProvider implements IMailtemplateProvider {
  public async parse(): Promise<string> {
    return 'mail content';
  }
}
