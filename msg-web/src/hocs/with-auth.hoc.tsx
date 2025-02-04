import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { ComponentType, FC, useEffect, useState } from 'react';

import { auth } from '../configs/firebase.config';

export const withAuth = <T extends { token: string; user: User }>(
  Component: ComponentType<T>,
) => {
  const ComponentWithAuth: FC<Omit<T, 'token' | 'user'>> = (props) => {
    const router = useRouter();
    const [user, setUser] = useState<null | User>(null);
    const [token, setToken] = useState<string>('');

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user: null | User) => {
        if (user) {
          setUser(user);
          const fetchToken = async () => {
            const accessToken = await user.getIdToken();
            setToken(accessToken);
          };
          fetchToken();
        } else {
          router.push('sign-in');
        }
      });
      return unsubscribe;
    }, [router]);

    if (user) {
      return <Component {...(props as T)} token={token} user={user} />;
    }

    return null;
  };

  return ComponentWithAuth;
};
