export default (
  columnHeader: string,
  columnId: string,
  dummyValueForRowIndex: (i: number) => string
) => ({
  columnHeader,
  columnId,
  dummyValueForRowIndex,
});
