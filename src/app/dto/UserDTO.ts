import * as yup from 'yup';

export const UserCreate = yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().required(),
    password: yup.string().required(),
});

export const UserUpdate = yup.object().shape({
    email: yup.string().email(),
    name: yup.string(),
});

export const UserUpdateAndDelete = yup.object().shape({
    id: yup.number().required(),
});
