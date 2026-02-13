/* eslint-disable max-len */
// eslint-disable-next-line
export const LINKS_REG_EXP = new RegExp (/(https?:\/\/[^\s]+)/g);
// eslint-disable-next-line
export const INNER_LINK_REG_EXP = new RegExp (/:\/\/(?:www\.)?(.[^/]+)(.*)/);

export const logNamesCompany = {
  name: 'Company Name',
  registrationNumber: 'Company Registration',
  email: 'Company Email',
  phoneNumber: 'Phone number',
  address: 'Address',
  incorporationDate: 'Date of incorporation',
  nextMeetingDate: 'Last Annual General Meeting',
  financialYearEndDate: 'Financial year end',
  profile: 'Company Profile',
  website: 'Website',
  comment: 'Comment',
  logoName: 'Company logo',
  'cosign-invitation': 'Co-signatory invitation',
  'cosign-deactivation': 'Co-signatory deactivation',
  'cosec-invitation': 'CoSecretary invitation',
};

export const logNamesCosignatory = {
  avatarName: 'Photo',
  position: 'Position',
  name: 'Name',
  surname: 'Surname',
  votingValue: 'Shareholding/voting%',
  phoneNumber: 'Phone',
  vetoPower: 'Veto Power',
  comment: 'Comment',
  emailNotification: 'Email Notification',
  smsNotification: 'Sms Notification',
  invitation: 'Invited',
  deactivation: 'Deactivated',
  delete: 'Removed',
  status: 'Status',
  personalId: 'ID',
  correspondenceAddress: 'Correspondence Address',
  residentialAddress: 'Residential Address',
};

export const logNamesProfile = {
  avatarName: 'Photo',
  position: 'Position',
  name: 'First name',
  surname: 'Surname',
  votingValue: 'Shareholding/voting%',
  phoneNumber: 'Phone number',
  vetoPower: 'Veto Power',
  cosecPosition: 'Position',
  newPassword: 'Change password',
  emailNotification: 'Email Notification',
  smsNotification: 'Sms Notification',
  invitation: 'Invitation',
  deactivation: 'Diactivation',
  status: 'Status',
  personalId: 'ID',
  correspondenceAddress: 'Correspondence Address',
  residentialAddress: 'Residential Address',
};

export const logParametersBackend = {
  incorporationDate: 'incorporationDate',
  nextMeetingDate: 'nextMeetingDate',
  financialYearEndDate: 'financialYearEndDate',
  position: 'position',
  vetoPower: 'vetoPower',
  smsNotification: 'smsNotification',
  emailNotification: 'emailNotification',
  status: 'status',
};

export const AVALIABLE_DOC_FORMATS = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
