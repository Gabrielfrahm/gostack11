import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailtemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
