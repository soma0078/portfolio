const breakpoints = {
  xs: "320px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
};

const devices = {
  xs: `(max-width: ${breakpoints.xs})`,
  sm: `(max-width: ${breakpoints.sm})`,
  md: `(max-width: ${breakpoints.md})`,
  lg: `(max-width: ${breakpoints.lg})`,
};

export default devices;
