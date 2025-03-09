export const isValidUrl = (url: string) => !!url && /^https?:\/\/.+\..+/.test(url);
