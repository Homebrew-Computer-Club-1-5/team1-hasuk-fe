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

export function dateObjToString(date: Date) {
  const options = {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  };
  const locale = 'ko-KR';
  const formattedDate = date.toLocaleDateString(locale, options as any);
  const parts = formattedDate.split(' ');
  const month = parts[0];
  const day = parts[1].replace('일', '일');
  const weekday = parts[2].replace('(', '').replace(')', '');

  return `${month} ${day}(${weekday})`;
}
