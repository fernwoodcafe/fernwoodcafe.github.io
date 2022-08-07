export default <T>(input: unknown, target: new () => T): input is T =>
  input instanceof target;
