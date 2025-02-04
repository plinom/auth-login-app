'use client';

import { Test } from '@/src/components/test.component';
import { withAuth } from '@/src/hocs/with-auth.hoc';
import { User } from 'firebase/auth';
import { FC } from 'react';

interface Props {
  token: string
  user: User
}

const Page: FC<Props> = ({ token, user }) => {
  return (
    <div>
      <Test token={token} user={user} />
    </div>
  );
};

export default withAuth(Page);
