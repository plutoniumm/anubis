from typing import List, Union, Tuple
import pandas as pd
import re

def getTable(page, expect=None, use=[]):
  wiki = "https://en.m.wikipedia.org/wiki/" + page

  if expect:
    tables = pd.read_html(wiki, match=expect)
  else:
    tables = pd.read_html(wiki)

  tables = tables[0]

  if isinstance(tables.columns, pd.MultiIndex):
    multi_index = tables.columns
    cols = []
    for a, b in multi_index:
      if a != b:
        cols.append(f"{a} {b}")
      else:
        cols.append(a)
    tables.columns = cols

  tables.columns = [re.sub(r"\[\d+\]", "", col) for col in tables.columns]

  if len(use) > 0:
    try:
      return tables[use]
    except KeyError:
      print(f"ColErr: {use}")
      print(f"\t->{tables.columns}")
      return tables

  return tables

def inner(
  df1: pd.DataFrame,
  df2: pd.DataFrame,
  on: Union[str, Tuple[str, str]],
  how: str = "inner"
) -> pd.DataFrame:
  if isinstance(on, str):
    on = (on, on)

  newdf = pd.merge(
    df1, df2,
    left_on=on[0],
    right_on=on[1],
    how=how
  )

  # first col is domintant so we drop the second
  newdf.drop(columns=[on[1]], inplace=True)
  return newdf
