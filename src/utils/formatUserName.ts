export const formatUserName = (
  firstName: string,
  lastName: string,
): string | null => {
  if (firstName || lastName) return `${firstName} ${lastName}`;
  return null;
};
