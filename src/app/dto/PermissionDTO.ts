import * as yup from 'yup';

export const PermissionCreate = yup.object().shape({
    name: yup.string().required(),
});

export const PermissionUpdate = yup.object().shape({
    name: yup.string(),
});

export const PermissionUpdateAndDelete = yup.object().shape({
    id: yup.number().required(),
});
