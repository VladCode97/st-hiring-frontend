import { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Collapse,
  Typography,
  Chip,
  Button,
  Divider,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import type { EventCardProps } from '../../types';
import { formatDate, formatPrice, getStatusColor } from '../../utils/event.utils';

export default function EventCard({ event }: EventCardProps) {
  const [expanded, setExpanded] = useState(false);
  const availableCount = event.availableTickets.filter(
    (t) => t.status.toLowerCase() === 'available'
  ).length;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {event.name}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            📅 {formatDate(event.date)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            📍 {event.location}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" mb={2.5} sx={{ lineHeight: 1.7 }}>
          {event.description}
        </Typography>

        <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
          <Chip
            label={`${event.availableTickets.length} tickets`}
            size="small"
            variant="outlined"
            sx={{ borderRadius: '6px', color: 'text.secondary', borderColor: 'divider' }}
          />
          {availableCount > 0 && (
            <Chip
              label={`${availableCount} available`}
              size="small"
              color="success"
              sx={{ borderRadius: '6px' }}
            />
          )}
        </Box>
      </CardContent>

      {event.availableTickets.length > 0 && (
        <>
          <Divider />
          <CardActions sx={{ px: 3, py: 1.5 }}>
            <Button
              size="small"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              aria-label="show tickets"
              sx={{ color: 'primary.main', fontWeight: 600 }}
            >
              {expanded ? '▲ Hide tickets' : '▼ Show tickets'}
            </Button>
          </CardActions>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Divider />
            <Box sx={{ overflowX: 'auto', px: 1, pb: 1 }}>
              <Table size="small" aria-label="tickets table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {event.availableTickets.map((ticket) => (
                    <TableRow key={ticket.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>{ticket.type}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={ticket.status}
                          size="small"
                          color={getStatusColor(ticket.status)}
                          sx={{ borderRadius: '6px', fontWeight: 500 }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight={600} color="primary.main">
                          {formatPrice(ticket.price)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </>
      )}
    </Card>
  );
}
