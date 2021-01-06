import CompanyRepository from '@repositories/CompanyRepository';

import Company, { ICompany } from '@models/Company';

import BaseService from './BaseService';

class CompanyService extends BaseService<Company, ICompany> {
}

export default new CompanyService(CompanyRepository);
