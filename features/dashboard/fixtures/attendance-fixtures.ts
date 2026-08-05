export type AttendanceDay = {
  day: string;
  presentPct: number;
  status: "Present" | "Half-Day" | "Approved";
  badgeColor: string;
};

export const attendanceFixtures = {
  stats: {
    presentPct: 82,
    presentCount: 118,
    absentPct: 12,
    absentCount: 17,
    leavePct: 6,
    leaveCount: 9,
  },
  weeklyGrid: [
    { day: "Mon", presentPct: 80, status: "Present", badgeColor: "bg-emerald-500" },
    { day: "Tue", presentPct: 88, status: "Present", badgeColor: "bg-emerald-500" },
    { day: "Wed", presentPct: 75, status: "Half-Day", badgeColor: "bg-amber-500" },
    { day: "Thu", presentPct: 94, status: "Approved", badgeColor: "bg-emerald-500" },
    { day: "Fri", presentPct: 85, status: "Present", badgeColor: "bg-emerald-500" },
  ] as AttendanceDay[],
};
