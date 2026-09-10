import { useEffect } from 'react';
import {
  Grid,
  Typography,
  Alert,
  Skeleton,
  Box,
  Container,
} from '@mui/material';
import { fetchEvents } from '../../store/eventsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import EventCard from './EventCard';

function EventCardSkeleton() {
  return (
    <Box sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'divider', p: 3 }}>
      <Skeleton variant="text" width="65%" height={28} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="45%" height={20} />
      <Skeleton variant="text" width="35%" height={20} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1, mb: 2 }} />
      <Skeleton variant="text" width="30%" height={24} />
    </Box>
  );
}

export default function EventsList() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Events
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Browse upcoming events and available tickets.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Grid item xs={12} sm={6} lg={4} key={i}>
                <EventCardSkeleton />
              </Grid>
            ))
          : items.map((event) => (
              <Grid item xs={12} sm={6} lg={4} key={event.id}>
                <EventCard event={event} />
              </Grid>
            ))}
      </Grid>

      {!loading && !error && items.length === 0 && (
        <Box textAlign="center" py={10}>
          <Typography variant="h6" color="text.secondary">
            No events found.
          </Typography>
        </Box>
      )}
    </Container>
  );
}
