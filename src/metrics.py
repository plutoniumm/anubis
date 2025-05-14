# metrics = {
#   'gdp_cap': 'NY.GDP.PCAP.CD',
#   'edu_exp': 'SE.XPD.TOTL.GD.ZS',
#   'elec_access': 'EG.ELC.ACCS.ZS',
#   'power_cons': 'EG.USE.ELEC.KH.PC',
#   'gdp_unitenergy': 'EG.GDP.PUSE.KO.PP.KD',
#   'female_labor': 'SL.TLF.TOTL.FE.ZS',
#   'fem_life_exp': 'SP.DYN.LE00.FE.IN',
# }

class Metric:
  name: str
  code: str
  desc: str
  unit: str

  def __init__(self, name: str, code: str, desc: str, unit: str):
    self.name = name
    self.code = code
    self.desc = desc
    self.unit = unit

  def __str__(self):
    return self.code

gdp_cap = Metric('gdp_cap', 'NY.GDP.PCAP.CD', 'GDP per capita (current US$)', 'USD')
edu_exp = Metric('edu_exp', 'SE.XPD.TOTL.GD.ZS', 'Government expenditure on education, total (% of GDP)', '%')
elec_access = Metric('elec_access', 'EG.ELC.ACCS.ZS', 'Access to electricity (% of population)', '%')
power_cons = Metric('power_cons', 'EG.USE.ELEC.KH.PC', 'Electric power consumption (kWh per capita)', 'kWh')
gdp_unitenergy = Metric('gdp_unitenergy', 'EG.GDP.PUSE.KO.PP.KD', 'GDP per unit of energy use (constant 2017 PPP $ per kg of oil equivalent)', 'USD')