export default (path: string) =>
  encodeURIComponent(path.replace(/\s+/g, "-")).toLowerCase();
