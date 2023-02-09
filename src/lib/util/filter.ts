export function filterByUpdated(array: any[], property: string) {
  return array.sort((a, b) => -(a[property] - b[property]));
}
