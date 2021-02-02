import * as yup from 'yup';

export const TaskTemplateCreate = yup.object().shape({
    project_template_id: yup.number().required(),
    name: yup.string().required(),
    owner_id: yup.number().required(),
    duration: yup.number().required(),
});

export const TaskTemplateUpdate = yup.object().shape({
    project_template_id: yup.number(),
    name: yup.string(),
    owner_id: yup.number(),
    duration: yup.number(),
});

export const TaskTemplateUpdateAndDelete = yup.object().shape({
    id: yup.number().required(),
});
