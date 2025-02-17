"use client";

import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Switch,
  useColorScheme,
} from "@mui/material";
import { User } from "firebase/auth";
import { FC, useEffect, useState } from "react";

import { ActionItem } from "../../../src/components/action-item.component";
import { MultistepsForm } from "../../../src/components/multisteps-form.component";
import { withAuth } from "../../../src/hocs/with-auth.hoc";

interface Props {
  token: string;
  user: User;
}

const Page: FC<Props> = ({ token, user }) => {
  const { mode, setMode } = useColorScheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [readReceiptsEnabled, setReadReceiptsEnabled] = useState(true);

  useEffect(() => {
    console.log(token, user.email);
  }, [token, user.email]);

  return (
    <Box sx={{ height: "100%", p: 3, width: "100%" }}>
      <ActionItem
        description="Customize how the MSG looks on your device. Choose between light, dark, or system-based theme."
        title="Appearance"
      >
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-theme-toggle"
            name="theme-toggle"
            onChange={(event) =>
              setMode(event.target.value as "dark" | "light" | "system")
            }
            row
            sx={{ gap: 2 }}
            value={mode}
          >
            <FormControlLabel
              control={<Radio />}
              label="System"
              value="system"
            />
            <FormControlLabel control={<Radio />} label="Light" value="light" />
            <FormControlLabel control={<Radio />} label="Dark" value="dark" />
          </RadioGroup>
        </FormControl>
      </ActionItem>
      <ActionItem
        description="Manage your notification preferences."
        title="Notifications"
      >
        <FormControlLabel
          control={
            <Switch
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
            />
          }
          label="Enable Notifications"
        />
      </ActionItem>
      <ActionItem description="Control your privacy settings." title="Privacy">
        <FormControlLabel
          control={
            <Switch
              checked={readReceiptsEnabled}
              onChange={(e) => setReadReceiptsEnabled(e.target.checked)}
            />
          }
          label="Enable Read Receipts"
        />
      </ActionItem>
      <MultistepsForm />
    </Box>
  );
};

export default withAuth(Page);
