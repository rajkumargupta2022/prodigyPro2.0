export const currentDateInStringNumber = (data?: string | null): string => {
  let date: any;
  if (data) {
    date = new Date(data);
  } else {
    date = new Date();
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
};

export const dateInStringNumber = (data?: string | null): string => {
  let date: any;
  if (data) {
    date = new Date(data);
  } else {
    date = new Date();
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export function convertDayToFullDate(dayNumber:number) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-based (January = 0)

  const targetDate = new Date(year, month, dayNumber);

  const formattedDate = `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, '0')}-${String(targetDate.getDate()).padStart(2, '0')} 00:00:00.000`;

  return formattedDate;
}
export function dayToUTCFormat(day: number): string {
  const year = new Date().getUTCFullYear(); // current year
  const month = new Date().getUTCMonth();   // current month (0-indexed)
  
  const date = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
  
  return date.toISOString().replace("T", " ");
}
export const sevenDaysAdded  = ()=>{
  return new Date(new Date().setDate(new Date().getDate() + 7))
}
export const daysAdded  = (days:number)=>{
  return new Date(new Date().setDate(new Date().getDate() + days))
  
}

export const dateForApi =(date: Date): string => {
  const pad = (n: number) => n.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // months are 0-indexed
  const day = pad(date.getDate());

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.000`;
}


