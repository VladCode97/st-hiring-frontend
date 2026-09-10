import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AsyncThunk } from '@reduxjs/toolkit';
import type { Setting, SettingsState, ThunkConfig, SaveSettingsArg } from '../types';
import { API_ROUTES } from '../constants/api.constants';

export const fetchSettings: AsyncThunk<Setting, void, ThunkConfig> =
  createAsyncThunk<Setting, void, ThunkConfig>(
    'settings/fetch',
    async (_, { rejectWithValue }) => {
      try {
        const res = await fetch(API_ROUTES.SETTINGS);
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        const json = await res.json();
        const result = Array.isArray(json) ? json[0] : json;
        return result as Setting;
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
      }
    }
  );

export const fetchCurrencies: AsyncThunk<string[], void, ThunkConfig> =
  createAsyncThunk<string[], void, ThunkConfig>(
    'settings/fetchCurrencies',
    async (_, { rejectWithValue }) => {
      try {
        const res = await fetch(API_ROUTES.SETTINGS_CURRENCIES);
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        const json = await res.json();
        return Array.isArray(json) ? json : [];
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
      }
    }
  );

export const fetchTimezones: AsyncThunk<string[], void, ThunkConfig> =
  createAsyncThunk<string[], void, ThunkConfig>(
    'settings/fetchTimezones',
    async (_, { rejectWithValue }) => {
      try {
        const res = await fetch(API_ROUTES.SETTINGS_TIMEZONES);
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        const json = await res.json();
        return Array.isArray(json) ? json : [];
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
      }
    }
  );

export const saveSettings: AsyncThunk<Setting, SaveSettingsArg, ThunkConfig> =
  createAsyncThunk<Setting, SaveSettingsArg, ThunkConfig>(
    'settings/save',
    async (payload, { rejectWithValue }) => {
      try {
        const res = await fetch(API_ROUTES.SETTINGS, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        const json = await res.json();
        const result = Array.isArray(json) ? json[0] : json;
        return result as Setting;
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
      }
    }
  );

const initialState: SettingsState = {
  data: null,
  currencies: [],
  timezones: [],
  loading: false,
  currenciesLoaded: false,
  timezonesLoaded: false,
  saving: false,
  error: null,
  saveSuccess: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    clearSaveSuccess(state) {
      state.saveSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      });

    builder.addCase(fetchCurrencies.fulfilled, (state, action) => {
      state.currencies = action.payload;
      state.currenciesLoaded = true;
    });

    builder.addCase(fetchTimezones.fulfilled, (state, action) => {
      state.timezones = action.payload;
      state.timezonesLoaded = true;
    });

    builder
      .addCase(saveSettings.pending, (state) => {
        state.saving = true;
        state.error = null;
        state.saveSuccess = false;
      })
      .addCase(saveSettings.fulfilled, (state, action) => {
        state.saving = false;
        state.data = action.payload;
        state.saveSuccess = true;
      })
      .addCase(saveSettings.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export const { clearSaveSuccess } = settingsSlice.actions;
export default settingsSlice.reducer;
