import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AsyncThunk } from '@reduxjs/toolkit';
import type { Event, EventsState, ThunkConfig } from '../types';
import { API_ROUTES } from '../constants/api.constants';

export const fetchEvents: AsyncThunk<Event[], void, ThunkConfig> =
  createAsyncThunk<Event[], void, ThunkConfig>(
    'events/fetchAll',
    async (_, { rejectWithValue }) => {
      try {
        const res = await fetch(API_ROUTES.EVENTS);
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        return (await res.json()) as Event[];
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
      }
    }
  );

const initialState: EventsState = {
  items: [],
  loading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export default eventsSlice.reducer;
