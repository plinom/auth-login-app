"use client";

import { User } from "firebase/auth";
import { FC, useEffect } from "react";

import { withAuth } from "../../../src/hocs/with-auth.hoc";

interface Props {
  token: string;
  user: User;
}

const Page: FC<Props> = ({ token, user }) => {
  useEffect(() => {
    console.log(token, user.uid);
  }, [token, user.uid]);
  return <>Archived chats</>;
};

export default withAuth(Page);
