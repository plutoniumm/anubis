from src.core import getTable, inner, pd

populations = getTable(
  "List_of_countries_and_dependencies_by_population",
  expect="UN projection",
  use=["Location", "Population"]
)

gdps = getTable(
  "List_of_countries_by_GDP_(nominal)",
  expect="World Bank",
  use=["Country/Territory", "World Bank Estimate"]
)

merged = inner(
  populations,
  gdps,
  on=("Location", "Country/Territory"),
)

print(merged.head())