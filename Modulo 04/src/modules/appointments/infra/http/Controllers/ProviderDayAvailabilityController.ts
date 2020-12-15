import ListProviderDaysAvailabilityService from '@modules/appointments/services/ListProviderDaysAvailabilityService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;

    const { month, year, day } = request.body;

    // usando injeção de dependências
    const listProviderDaysAvailabilityService = container.resolve(
      ListProviderDaysAvailabilityService,
    );

    const availability = await listProviderDaysAvailabilityService.execute({
      month,
      provider_id,
      year,
      day,
    });

    return response.json(availability);
  }
}
