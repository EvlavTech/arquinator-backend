import * as yup from 'yup';

export const ProjectTemplateCreate = yup.object().shape({
    project_template_id: yup.number(),
    name: yup.string().required(),
    description: yup.string().required(),
    owner_id: yup.number().required(),
});

export const ProjectTemplateUpdate = yup.object().shape({
    name: yup.string(),
    description: yup.string(),
    owner_id: yup.number(),
});

export const ProjectTemplateUpdateAndDelete = yup.object().shape({
    id: yup.number().required(),
});
