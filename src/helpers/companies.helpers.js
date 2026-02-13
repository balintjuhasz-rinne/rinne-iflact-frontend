export const sortAZ = (a, b) => {
  if (a.name === null || b.name === null) return false;
  const x = a.name.toLowerCase();
  const y = b.name.toLowerCase();
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
};

export const sortZA = (a, b) => {
  if (a.name === null || b.name === null) return false;
  const x = a.name.toLowerCase();
  const y = b.name.toLowerCase();
  return ((x > y) ? -1 : ((x < y) ? 1 : 0));
};

export const filterCompanies = (company, filterConfig) => {

  const companyName = company.name ? company.name.trim().toLowerCase() : '';
  const filterConfigCompany = filterConfig.company.trim().toLowerCase();
  const filterByName = companyName.startsWith(filterConfigCompany);
  return filterByName;
};
