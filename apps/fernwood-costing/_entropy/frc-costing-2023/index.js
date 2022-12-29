const businessInputs = {
  revenueDollars: 300_000,
  cogsPercent: 0.3,
};

const businessOutputs = {
  grossProfit: businessInputs.revenueDollars * (1 - businessInputs.cogsPercent),
};

const format = (record) =>
  Object.fromEntries(
    Object.entries(record).map(([key, value]) => {
      if (key.endsWith("Dollars")) {
        return [
          key,
          value.toLocaleString("en-CA", { style: "currency", currency: "CAD" }),
        ];
      }

      if (key.endsWith("Percent")) {
        return [key, `${value * 100}%`];
      }

      return [key, value];
    })
  );

console.log(
  JSON.stringify(
    {
      inputs: format(businessInputs),
      outputs: format(businessOutputs),
    },
    undefined,
    2
  )
);
