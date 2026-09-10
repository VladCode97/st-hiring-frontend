export function formatDateWithTimezone(dateStr: string, timezone: string): string {
  return new Date(dateStr).toLocaleString('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  });
}
