import { Request, Response } from 'express';

import Company from '@models/Company';

class CompanyController {
    async store(req: Request, res: Response) {
        const company = await Company.create(req.body);

        return res.json(company);
    }

    async index(req: Request, res: Response) {
        const companies = await Company.findAll();

        return res.json(companies);
    }

    async delete(req: Request, res: Response) {
        const company = await Company.destroy({ where: { id: req.params.id } });

        return res.json(company);
    }
}

export default new CompanyController();
