export interface Ticket {
  id: number;
  eventId: number;
  type: string;
  status: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
  availableTickets: Ticket[];
  createdAt: string;
  updatedAt: string;
}

export enum ECurreny {
  USD = 'USD',
  EUR = 'EUR',
  JPY = 'JPY',
  GBP = 'GBP',
  AUD = 'AUD',
}

export enum EIanaTimeZone {
  UTC = 'Etc/UTC',
  NEW_YORK = 'America/New_York',
  CHICAGO = 'America/Chicago',
  LOS_ANGELES = 'America/Los_Angeles',
  LONDON = 'Europe/London',
  PARIS = 'Europe/Paris',
  TOKYO = 'Asia/Tokyo',
  SHANGHAI = 'Asia/Shanghai',
  SAO_PAULO = 'America/Sao_Paulo',
  SYDNEY = 'Australia/Sydney',
  BOGOTA = 'America/Bogota',
}

export interface Setting {
  _id?: string;
  maxTicketsPerOrder: number;
  currency: ECurreny;
  timezone: EIanaTimeZone;
  maintenanceMode: boolean;
  updatedAt: string;
}

export interface SettingsFormInnerProps {
  data: Setting | null;
  currencies: string[];
  timezones: string[];
}

export interface SettingsFormValues {
  maxTicketsPerOrder: number | '';
  currency: string;
  timezone: string;
  maintenanceMode: boolean;
}

export interface TabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
}

export interface EventCardProps {
  event: Event;
}

export interface EventsState {
  items: Event[];
  loading: boolean;
  error: string | null;
}

export interface SettingsState {
  data: Setting | null;
  currencies: string[];
  timezones: string[];
  loading: boolean;
  currenciesLoaded: boolean;
  timezonesLoaded: boolean;
  saving: boolean;
  error: string | null;
  saveSuccess: boolean;
}

export interface ThunkConfig {
  rejectValue: string;
}

export type SaveSettingsArg = Omit<Setting, '_id' | 'updatedAt'>;
