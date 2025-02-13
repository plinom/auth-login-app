import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Link from 'next/link';
import { FC } from 'react';

import { menuItems } from '../data/menu.items';

interface Props {
  open: boolean;
  toggleMenu: () => void;
}

export const Menu: FC<Props> = ({ open, toggleMenu }) => {
  return (
    <Drawer onClose={toggleMenu} open={open}>
      <Box onClick={toggleMenu} role='presentation' sx={{ width: 250 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem disablePadding key={item.text}>
              <ListItemButton component={Link} href={item.href}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
