const COLORS = [
  "text-red-500",
  "text-green-500",
  "text-blue-500",
  "text-purple-500",
  "text-yellow-600",
];

export const getRandomColor = () => {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
};