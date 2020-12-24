import Company, { ICompany } from '@models/Company';

import CompanyRepository from '../repository/CompanyRepository';
import BaseController from './BaseController';

class CompanyController extends BaseController<Company, ICompany> {
}

export default new CompanyController(CompanyRepository);
