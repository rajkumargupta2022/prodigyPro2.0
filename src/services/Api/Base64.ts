export const encodeBase64 = (data: unknown): string => {
  const jsonString = JSON.stringify(data);

  const bytes = new TextEncoder().encode(jsonString);

  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
};