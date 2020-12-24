import Company, { ICompany } from '@models/Company';

import BaseRepository from './BaseRepository';

class CompanyRepository extends BaseRepository<Company, ICompany> {
}

export default new CompanyRepository(Company);
