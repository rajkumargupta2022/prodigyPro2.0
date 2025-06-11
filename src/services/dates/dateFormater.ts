export const currentDateInStringNumber = (): string=>{
  const date = new Date();

return date.toLocaleDateString('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

}