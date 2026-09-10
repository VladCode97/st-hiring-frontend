import { useEffect } from 'react';
import {
  Container,
  Typography,
  Alert,
  Paper,
  Grid,
  Skeleton,
  Box,
} from '@mui/material';
import {
  fetchSettings,
  fetchCurrencies,
  fetchTimezones,
  clearSaveSuccess,
} from '../../store/settingsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import SettingsFormInner from './SettingsFormInner';

export default function SettingsForm() {
  const dispatch = useAppDispatch();
  const { data, currencies, timezones, loading, error, saveSuccess, currenciesLoaded, timezonesLoaded } =
    useAppSelector((state) => state.settings);

  useEffect(() => {
    dispatch(fetchSettings());
    dispatch(fetchCurrencies());
    dispatch(fetchTimezones());
  }, [dispatch]);

  useEffect(() => {
    if (!saveSuccess) return;
    const timer = setTimeout(() => dispatch(clearSaveSuccess()), 3000);
    return () => clearTimeout(timer);
  }, [saveSuccess, dispatch]);

  const isReady = !loading && currenciesLoaded && timezonesLoaded;

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure global application preferences.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {saveSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Settings saved successfully.
        </Alert>
      )}

      {!isReady ? (
        <Paper sx={{ p: { xs: 2, sm: 4 } }}>
          <Grid container spacing={3}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Grid item xs={12} key={i}>
                <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      ) : (
        <SettingsFormInner data={data} currencies={currencies} timezones={timezones} />
      )}
    </Container>
  );
}
