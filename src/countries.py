class Country:
  name: str
  code: str
  code2: str

  def __init__(self, name: str, code: str, code2: str):
    self.name = name
    self.code = code
    self.code2 = code2

  def __str__(self):
    return self.code


India = Country("India", "IND", "IN")
USA = Country("United States", "USA", "US")
China = Country("China", "CHN", "CN")
Brazil = Country("Brazil", "BRA", "BR")
Russia = Country("Russia", "RUS", "RU")
Japan = Country("Japan", "JPN", "JP")
Germany = Country("Germany", "DEU", "DE")
France = Country("France", "FRA", "FR")
Italy = Country("Italy", "ITA", "IT")
