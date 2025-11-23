// lib/dates.ts
export const last7Days = () =>
  Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().slice(0, 10); // YYYY-MM-DD
  }).reverse();