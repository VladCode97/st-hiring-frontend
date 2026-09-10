export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
}

export function getStatusColor(status: string): 'success' | 'warning' | 'error' | 'default' {
  switch (status.toLowerCase()) {
    case 'available':
      return 'success';
    case 'reserved':
      return 'warning';
    case 'sold':
      return 'error';
    default:
      return 'default';
  }
}
