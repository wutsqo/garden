/**
 * Formats a date string into a relative date format or a localized date string.
 * Returns "today" if the date is within 24 hours, "yesterday" if it's within 48 hours,
 * or formats the date using Indonesian locale (id-ID) for older dates.
 *
 * @param date - The input date string to format
 * @param options - Optional Intl.DateTimeFormatOptions to customize the output format
 * @returns A string representing the relative date ("today"/"yesterday") or formatted date
 *
 * @example
 * formatRelativeDate("2024-01-20") // Returns "20 Januari" (if today is not Jan 20/21)
 * formatRelativeDate("2024-01-20", { year: 'numeric' }) // Returns "20 Januari 2024"
 */
export function formatRelativeDate(
  date: string,
  options?: Intl.DateTimeFormatOptions
) {
  const now = new Date();
  const target = new Date(date);
  const diffTime = Math.abs(now.getTime() - target.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays < 1) return "today";
  if (diffDays === 1) return "yesterday";
  const targetOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    ...options,
  };
  return target.toLocaleDateString("id-ID", targetOptions);
}
