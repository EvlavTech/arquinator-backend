import * as yup from 'yup';

export const CompanyCreate = yup.object().shape({
    name: yup.string().required(),
});

export const CompanyUpdate = yup.object().shape({
    name: yup.string().required(),
});

export const CompanyUpdateAndDelete = yup.object().shape({
    id: yup.number().required(),
});
