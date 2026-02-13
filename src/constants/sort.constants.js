export const USER_SORT_PARAM = {
  NAME: 'name',
  COMPANY: 'companyName',
  POSITION: 'position',
  SHARES: 'votingValue',
};

export const SORT_DIRECTION = {
  1: 'DESC',
  '-1': 'ASC',
};

export const RESOLUTIONS_SORT_FIELDS = {
  ID: 'id',
  NAME: 'name',
  COMPANY: 'company.name',
  CREATED: 'cosec.name',
  START: 'startDate',
  END: 'endDate',
  RESOLVE: 'resolveDate',
};

export const STATISTICS_SORT_FIELDS = {
  ID: 'id',
  NAME: 'name',
  START_DATE: 'votingStartDate',
  END_DATE: 'votingEndDate',
  CREATION_DATE: 'creationDate',
  RESOLVE_DATE: 'resolveDate',
  TYPE: 'type',
};

export const LOGS_SORT_FIELDS = {
  DATE: 'createdAt',
  NAME: 'author.name',
  PARAMETR: 'parameter',
};

export const COSIGNATORY_MESSAGES_SORT_FIELDS = {
  DATE: 'updatedAt',
  TYPE: 'type',
};

export const TEMPLATES_SORT_FIELDS = {
  NAME: 'file.originalName',
  CREATED: 'createdAt',
};

export const PAGE_LIMIT = 15;
