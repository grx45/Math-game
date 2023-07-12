export const generateToken = () => {
  const today = new Date();
  const dateString = today.toISOString().slice(11);
  return dateString;
};
