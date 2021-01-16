import Company, { ICompany } from '@models/Company';

import BaseController from './BaseController';
import CompanyService from '../services/CompanyService';

class CompanyController extends BaseController<Company, ICompany> {
}

export default new CompanyController(CompanyService);
