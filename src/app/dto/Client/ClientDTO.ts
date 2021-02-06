import * as yup from 'yup';

export const ClientCreate = yup.object().shape({
    name: yup.string().required(),
    company_id: yup.number().required(),
});

export const ClientUpdate = yup.object().shape({
    name: yup.string(),
});

export const ClientUpdateAndDelete = yup.object().shape({
    id: yup.number().required(),
});
