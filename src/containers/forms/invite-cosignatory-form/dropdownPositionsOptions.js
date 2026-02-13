import { USER_POSITIONS, USER_POSITIONS_BACKEND } from '../../../constants/user.constants';

const options = [
  {
    title: USER_POSITIONS.DIRECTOR,
    id: USER_POSITIONS_BACKEND.Director,
    isActive: false,
  },
  {
    title: USER_POSITIONS.SHARE_HOLDER,
    id: USER_POSITIONS_BACKEND.Shareholder,
    isActive: false,
  },
];

export default options;
