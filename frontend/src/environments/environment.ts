export const environment = {
  production: false,
  apiUrl:
    typeof window !== 'undefined'
      ? `http://${window.location.hostname}:3000`
      : 'http://localhost:3000',
};
