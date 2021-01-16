import * as yup from 'yup';

export const ProjectCreate = yup.object().shape({
    template_id: yup.number(),
    name: yup.string().when(['template_id'], {
        is: (template_id: number) => !template_id,
        then: yup.string().required(),
    }),
    description: yup.string().when(['template_id'], {
        is: (template_id: number) => !template_id,
        then: yup.string().required(),
    }),
    owner_id: yup.number().when(['template_id'], {
        is: (template_id: number) => !template_id,
        then: yup.number().required(),
    }),
    start_date: yup.date().when(['template_id'], {
        is: (template_id: number) => !template_id,
        then: yup.date().required(),
    }),
    end_date: yup.date().when(['template_id'], {
        is: (template_id: number) => !template_id,
        then: yup.date().required(),
    }),
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
