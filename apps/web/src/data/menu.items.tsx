import ArchiveIcon from '@mui/icons-material/Archive';
import BlockIcon from '@mui/icons-material/Block';
import ChatIcon from '@mui/icons-material/Chat';
import ContactsIcon from '@mui/icons-material/Contacts';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

import { IMenuItem } from '../interfaces/menu-item.interface';

export const menuItems: IMenuItem[] = [
  {
    href: 'chats',
    icon: <ChatIcon />,
    text: 'Chats',
  },
  {
    href: 'profile',
    icon: <PersonIcon />,
    text: 'Profile',
  },
  {
    href: 'settings',
    icon: <SettingsIcon />,
    text: 'Settings',
  },
  {
    href: 'contacts',
    icon: <ContactsIcon />,
    text: 'Contacts',
  },
  {
    href: 'notifications',
    icon: <NotificationsIcon />,
    text: 'Notifications',
  },
  {
    href: 'archived-chats',
    icon: <ArchiveIcon />,
    text: 'Archived Chats',
  },
  {
    href: 'blocked-users',
    icon: <BlockIcon />,
    text: 'Blocked Users',
  },
  {
    href: 'help-support',
    icon: <HelpIcon />,
    text: 'Help & Support',
  },
  {
    href: 'logout',
    icon: <LogoutIcon />,
    text: 'Log Out',
  },
];
