export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const formatDate2 = (dateString) => {
  const date = new Date(dateString); // Convert the string to a Date object
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-us", { month: "short" });
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
