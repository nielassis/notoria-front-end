export function formatDate(
  date: Date | string,
  format: "YY. M" | "DD MM YY" | "MM YY"
): string {
  const d = typeof date === "string" ? new Date(date) : date;

  const months = [
    "jan",
    "fev",
    "mar",
    "abr",
    "mai",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez",
  ];

  const day = d.getDate().toString().padStart(2, "0");
  const month = months[d.getMonth()];
  const numericMonth = (d.getMonth() + 1).toString().padStart(2, "0");
  const year = d.getFullYear();

  switch (format) {
    case "YY. M":
      return `${year}.${numericMonth}`;
    case "DD MM YY":
      return `${day} ${month} ${year}`;
    case "MM YY":
      return `${month} ${year}`;
    default:
      return "";
  }
}
