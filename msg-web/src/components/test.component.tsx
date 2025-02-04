import { User } from 'firebase/auth';

interface Props {
  token: string;
  user: User;
}

export function Test({ token, user }: Props) {
  return (
    <>
      Token: {token}
      User email: {user.email}
    </>
  );
}
