'use client';

import { withAuth } from '@/src/hocs/with-auth.hoc';

const Page = () => {
  return <div>msg route</div>;
};

export default withAuth(Page);
