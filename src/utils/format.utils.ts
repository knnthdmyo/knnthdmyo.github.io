export const formatHours = (hours: number): string => {
  if (hours >= 1000) {
    return `${(hours / 1000).toFixed(1)}k`;
  }
  return hours.toLocaleString();
};
