'use client';

import { withAuth } from '@/src/hocs/with-auth.hoc';
import { User } from 'firebase/auth';
import { FC, useEffect } from 'react';

interface Props {
  token: string;
  user: User;
}

const Page: FC<Props> = ({ token, user }) => {
  useEffect(() => {
    console.log(token, user.uid);
  }, [token, user.uid]);
  return <>Contacts</>;
};

export default withAuth(Page);
