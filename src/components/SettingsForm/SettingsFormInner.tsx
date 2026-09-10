import { useFormik } from 'formik';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  FormControlLabel,
  Switch,
  Button,
  Paper,
  Grid,
  Divider,
  CircularProgress,
} from '@mui/material';
import { saveSettings } from '../../store/settingsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { settingsValidationSchema } from '../../schemas/settings.schema';
import { formatDateWithTimezone } from '../../utils/date.utils';
import type { ECurreny, EIanaTimeZone, Setting, SettingsFormValues, SettingsFormInnerProps } from '../../types';

export default function SettingsFormInner({ data, currencies, timezones }: SettingsFormInnerProps) {
  const dispatch = useAppDispatch();
  const { saving } = useAppSelector((state) => state.settings);

  const formik = useFormik<SettingsFormValues>({
    initialValues: {
      maxTicketsPerOrder: data?.maxTicketsPerOrder ?? 1,
      currency: data?.currency ?? (currencies[0] || ''),
      timezone: data?.timezone ?? (timezones[0] || ''),
      maintenanceMode: data?.maintenanceMode ?? false,
    },
    validationSchema: settingsValidationSchema,
    onSubmit: async (values) => {
      await dispatch(
        saveSettings({
          maxTicketsPerOrder: Number(values.maxTicketsPerOrder),
          currency: values.currency as ECurreny,
          timezone: values.timezone as EIanaTimeZone,
          maintenanceMode: values.maintenanceMode,
        })
      );
    },
  });

  return (
    <>
      <Paper sx={{ p: { xs: 2, sm: 4 }, mb: 3, position: 'relative' }}>
        {(saving || formik.isSubmitting) && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              borderRadius: 'inherit',
            }}
          >
            <Box textAlign="center">
              <CircularProgress size={40} />
              <Typography variant="body2" color="text.secondary" mt={2} fontWeight={500}>
                {data ? 'Saving settings...' : 'Creating settings...'}
              </Typography>
            </Box>
          </Box>
        )}
        <Typography variant="overline" color="text.secondary" fontWeight={600} letterSpacing="0.08em" display="block" mb={2}>
          Edit settings
        </Typography>
        <form onSubmit={formik.handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="maxTicketsPerOrder"
                name="maxTicketsPerOrder"
                label="Max Tickets per Order"
                type="number"
                inputProps={{ min: 1, max: 100 }}
                value={formik.values.maxTicketsPerOrder}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.maxTicketsPerOrder && Boolean(formik.errors.maxTicketsPerOrder)}
                helperText={formik.touched.maxTicketsPerOrder && formik.errors.maxTicketsPerOrder}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                id="currency"
                name="currency"
                label="Currency"
                value={formik.values.currency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.currency && Boolean(formik.errors.currency)}
                helperText={formik.touched.currency && formik.errors.currency}
              >
                {currencies.map((c) => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                id="timezone"
                name="timezone"
                label="Timezone"
                value={formik.values.timezone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.timezone && Boolean(formik.errors.timezone)}
                helperText={formik.touched.timezone && formik.errors.timezone}
              >
                {timezones.map((tz) => (
                  <MenuItem key={tz} value={tz}>{tz}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ mb: 2 }} />
              <FormControlLabel
                control={
                  <Switch
                    id="maintenanceMode"
                    name="maintenanceMode"
                    checked={formik.values.maintenanceMode}
                    onChange={formik.handleChange}
                    color="warning"
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1">Maintenance Mode</Typography>
                    <Typography variant="caption" color="text.secondary">
                      When enabled, the app will be unavailable to end users.
                    </Typography>
                  </Box>
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={saving || formik.isSubmitting || !formik.dirty}
              >
                {data ? 'Save Settings' : 'Create Settings'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {data && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="overline" color="text.secondary" fontWeight={600} letterSpacing="0.08em" display="block" mb={2}>
            Current configuration
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary" display="block">Max tickets / order</Typography>
              <Typography variant="body1" fontWeight={600}>{data.maxTicketsPerOrder}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary" display="block">Currency</Typography>
              <Typography variant="body1" fontWeight={600}>{data.currency}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary" display="block">Timezone</Typography>
              <Typography variant="body1" fontWeight={600}>{data.timezone}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary" display="block">Maintenance mode</Typography>
              <Typography
                variant="body1"
                fontWeight={600}
                color={data.maintenanceMode ? 'warning.main' : 'success.main'}
              >
                {data.maintenanceMode ? 'Enabled' : 'Disabled'}
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="caption" color="text.secondary" display="block" mt={2}>
            Last updated: {formatDateWithTimezone(data.updatedAt, data.timezone)}
          </Typography>
        </Paper>
      )}
    </>
  );
}
