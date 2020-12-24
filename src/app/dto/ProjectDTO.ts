import * as yup from 'yup';

export const ProjectCreate = yup.object().shape({
    project_template_id: yup.number(),
    name: yup.string().when(['project_template_id'], {
        is: (project_template_id: number) => !project_template_id,
        then: yup.string().required(),
    }),
    description: yup.string().when(['project_template_id'], {
        is: (project_template_id: number) => !project_template_id,
        then: yup.string().required(),
    }),
    owner_id: yup.number().when(['project_template_id'], {
        is: (project_template_id: number) => !project_template_id,
        then: yup.number().required(),
    }),
    start_date: yup.date().required(),
    end_date: yup.date().required(),
});

export const ProjectUpdate = yup.object().shape({
    name: yup.string(),
    description: yup.string(),
    owner_id: yup.number(),
    start_date: yup.date(),
    end_date: yup.date(),
});

export const ProjectupdateAndDelete = yup.object().shape({
    id: yup.number().required(),
});
