import * as yup from 'yup';

export const ProjectTemplateCreate = yup.object().shape({
    project_template_id: yup.number(),
    name: yup.string().required(),
    description: yup.string().required(),
    client_id: yup.number().required(),
    duration: yup.number().required(),
});

export const ProjectTemplateUpdate = yup.object().shape({
    name: yup.string(),
    description: yup.string(),
    client_id: yup.number(),
    duration: yup.number(),
});

export const ProjectTemplateUpdateAndDelete = yup.object().shape({
    id: yup.number().required(),
});
