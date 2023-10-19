const totalCountColors = [
  { range: [1, 10], color: "rgba(255, 222, 0, 0.8)", width: 45, height: 45 },
  { range: [10, 30], color: "rgba(255, 143, 50, 0.8)", width: 55, height: 55 },
  { range: [30, 60], color: "rgba(102, 102, 0, 0.8)", width: 65, height: 65 },
  { range: [60, 100], color: "rgba(153, 102, 0, 0.8)", width: 75, height: 75 },
  { range: [100, 200], color: "rgba(204, 51, 0, 0.8)", width: 85, height: 85 },
  {
    range: [200, Infinity],
    color: "rgba(255, 0, 51, 0.8)",
    width: 65,
    height: 65,
  },
];

const categoryColors = [
  {
    crimeCategory: "Theft",
    color: "rgba(0, 255, 0, 0.8)",
    width: 25,
    height: 25,
  },
  {
    crimeCategory: "Burglary",
    color: "rgba(51, 153, 0, 0.8)",
    width: 35,
    height: 35,
  },
  {
    crimeCategory: "Assault",
    color: "rgba(102, 102, 0, 0.8)",
    width: 45,
    height: 45,
  },
  {
    crimeCategory: "Robbery",
    color: "rgba(153, 102, 0, 0.8)",
    width: 50,
    height: 50,
  },
  {
    crimeCategory: "Murder",
    color: "rgba(204, 51, 0, 0.8)",
    width: 55,
    height: 55,
  },
  {
    crimeCategory: "Rape",
    color: "rgba(255, 51, 0, 0.8)",
    width: 65,
    height: 65,
  },
  {
    crimeCategory: "Drug",
    color: "rgba(255, 0, 51, 0.8)",
    width: 75,
    height: 75,
  },
];

export { totalCountColors, categoryColors };
