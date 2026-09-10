import { useState } from 'react';
import {
  Box,
  Tab,
  Tabs,
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import type { TabPanelProps } from './types';
import EventsList from './components/EventsList/EventsList';
import SettingsForm from './components/SettingsForm/SettingsForm';

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky">
        <Toolbar sx={{ gap: 1 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #6C63FF 0%, #FF6584 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Typography sx={{ color: '#fff', fontSize: 16, lineHeight: 1 }}>🎟</Typography>
          </Box>
          <Typography variant="h6" component="div" fontWeight={700}>
            See Tickets
          </Typography>
        </Toolbar>
        <Tabs
          value={activeTab}
          onChange={(_, newValue: number) => setActiveTab(newValue)}
          aria-label="main navigation tabs"
          variant={isMobile ? 'fullWidth' : 'standard'}
          sx={{ px: { xs: 0, sm: 2 }, borderTop: '1px solid', borderColor: 'divider' }}
        >
          <Tab label="Events" id="tab-0" aria-controls="tabpanel-0" />
          <Tab label="Settings" id="tab-1" aria-controls="tabpanel-1" />
        </Tabs>
      </AppBar>

      <TabPanel value={activeTab} index={0}>
        <EventsList />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <SettingsForm />
      </TabPanel>
    </Box>
  );
}
