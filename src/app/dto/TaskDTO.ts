import * as yup from 'yup';

export const TaskCreate = yup.object().shape({
    task_template_id: yup.number(),
    task_parent_id: yup.number(),
    project_id: yup.number().required(),
    name: yup.string().when(['task_template_id'], {
        is: (task_template_id: number) => !task_template_id,
        then: yup.string().required(),
    }),
    description: yup.string(),
    owner_id: yup.number().when(['task_template_id'], {
        is: (task_template_id: number) => !task_template_id,
        then: yup.number().required(),
    }),
    start_date: yup.date().when(['task_template_id'], {
        is: (task_template_id: number) => !task_template_id,
        then: yup.date().required(),
    }),
    end_date: yup.date().when(['task_template_id'], {
        is: (task_template_id: number) => !task_template_id,
        then: yup.date().required(),
    }),
    responsible_id: yup.number(),
    done: yup.bool().when(['task_template_id'], {
        is: (task_template_id: number) => !task_template_id,
        then: yup.bool().required(),
    }),
});

export const TaskUpdate = yup.object().shape({
    start_date: yup.date(),
    end_date: yup.date(),
    name: yup.string(),
    description: yup.string(),
    project_id: yup.number(),
    task_parent_id: yup.number(),
    owner_id: yup.number(),
    responsible_id: yup.number(),
    task_template_id: yup.date(),
    done: yup.boolean(),
});

export const TaskUpdateAndDelete = yup.object().shape({
    id: yup.number().required(),
});
