/**
 * Formats a date string into a relative or absolute date representation.
 * Returns 'today' for dates less than 24 hours ago,
 * 'yesterday' for dates between 24-48 hours ago,
 * 'this week' for dates within the last 7 days,
 * and a formatted date string for older dates.
 *
 * @param date - The date string to format
 * @param options - Optional Intl.DateTimeFormatOptions for customizing the date format
 * @returns A string representing the relative or formatted date
 *
 * @example
 * formatRelativeDate('2023-12-25') // Returns 'today', 'yesterday', 'this week' or e.g. '25 December'
 * formatRelativeDate('2023-12-25', { year: 'numeric' }) // With custom formatting options
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
  if (diffDays <= 7) return "this week";
  const targetOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    ...options,
  };
  return target.toLocaleDateString("id-ID", targetOptions);
}
