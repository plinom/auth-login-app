'use client';

// import { Test } from '@/src/components/test.component';
import { Chat } from '@/src/components/chat.component';
import { withAuth } from '@/src/hocs/with-auth.hoc';
import { User } from 'firebase/auth';
import { FC } from 'react';

interface Props {
  token: string;
  user: User;
}

const Page: FC<Props> = ({ token, user }) => {
  return (
    <>
      {/* <Test token={token} user={user} /> */}
      <Chat />
    </>
  );
};

export default withAuth(Page);
