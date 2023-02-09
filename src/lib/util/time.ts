export function convertTimestamp(timestamp: number) {
  let totalSeconds = Math.floor(timestamp / 1000);

  let days = Math.floor(totalSeconds / (24 * 60 * 60));
  totalSeconds -= days * 24 * 60 * 60;

  let hours = Math.floor(totalSeconds / (60 * 60));
  totalSeconds -= hours * 60 * 60;

  let minutes = Math.floor(totalSeconds / 60);
  totalSeconds -= minutes * 60;

  return { days, hours, minutes, totalSeconds };
}