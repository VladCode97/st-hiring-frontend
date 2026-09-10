import * as Yup from 'yup';

export const settingsValidationSchema = Yup.object({
  maxTicketsPerOrder: Yup.number()
    .typeError('Must be a number')
    .integer('Must be a whole number')
    .min(1, 'Must be at least 1')
    .max(100, 'Cannot exceed 100')
    .required('Required'),
  currency: Yup.string().required('Required'),
  timezone: Yup.string().required('Required'),
  maintenanceMode: Yup.boolean().required(),
});
