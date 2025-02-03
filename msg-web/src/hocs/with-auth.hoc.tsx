import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { ComponentType, FC, useEffect, useState } from 'react';

import { auth } from '../configs/firebase.config';

export const withAuth = <T extends object>(Component: ComponentType<T>) => {
  const ComponentWithLoading: FC<T> = (props) => {
    const router = useRouter();
    const [user, setUser] = useState<null | User>(null);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user: null | User) => {
        if (user) {
          setUser(user);
        } else {
          router.push('sign-in');
        }
      });
      return unsubscribe;
    }, [router]);

    if (user) {
      return <Component {...props} user={user} />;
    }

    return null;
  };

  return ComponentWithLoading;
};
