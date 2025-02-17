import { User } from 'firebase/auth';
import { FC } from 'react';

interface Props {
  token: string;
  user: User;
}

export const Test: FC<Props> = ({ token, user }) => {
  return (
    <>
      Token: {token}
      User email: {user.email}
    </>
  );
};
