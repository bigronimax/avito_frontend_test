export default function formatDate(oldDate: string): string {
  const date = new Date(oldDate);

  return date.toLocaleString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
