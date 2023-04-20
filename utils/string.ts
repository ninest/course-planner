export function encodeSearchQuery(str: string) {
  return encodeURIComponent(str.replaceAll(",", "-"));
}

export function decodeSearchQuery(str: string) {
  return decodeURIComponent(str).replaceAll("-", ",");
}
