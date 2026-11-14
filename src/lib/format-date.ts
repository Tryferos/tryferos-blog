const dateFormat = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

export function formatDate(isoDate: string) {
  return dateFormat.format(new Date(isoDate));
}
