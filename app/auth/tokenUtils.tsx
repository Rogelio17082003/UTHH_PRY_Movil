export const isTokenExpired = (expirationString: string): boolean => {
  const expirationDate = new Date(expirationString);
  const currentDate = new Date();
  return currentDate > expirationDate;
};
