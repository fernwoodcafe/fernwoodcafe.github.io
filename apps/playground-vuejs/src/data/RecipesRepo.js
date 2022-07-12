export default (db) => ({
  select() {
    return [
      {
        recipeId: "Americano",
      },
      {
        recipeId: "Espresso",
      },
    ];
  },
});
