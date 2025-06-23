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
    year: "numeric",
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
