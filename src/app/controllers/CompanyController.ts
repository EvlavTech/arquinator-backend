import CompanyRepository from '@repositories/CompanyRepository';

import Company, { ICompany } from '@models/Company';

import BaseController from './BaseController';

class CompanyController extends BaseController<Company, ICompany> {
}

export default new CompanyController(CompanyRepository);
