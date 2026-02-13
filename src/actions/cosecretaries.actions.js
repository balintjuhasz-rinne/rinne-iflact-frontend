import flactService from '../services/flact';

export const inviteCosecretary = async (data) => {
  await flactService.cosecretaries.inviteCosecretary(data);
};
