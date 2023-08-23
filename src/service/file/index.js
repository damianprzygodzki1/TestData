export const createFile = (content) => {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  return URL.createObjectURL(blob);
}