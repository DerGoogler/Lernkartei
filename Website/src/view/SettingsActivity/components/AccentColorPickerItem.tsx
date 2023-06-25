import { ListItemButton } from "@mui/material";
import React from "react";
import { ListItem } from "react-onsenui";
import { ConfirmationDialogRaw } from "../../../components/ConfirmationDialogRaw";
import { useActivity } from "../../../hooks/useActivity";
import { Settings, accent_colors, useSettings } from "../../../hooks/useSettings";
import { useStrings } from "../../../hooks/useStrings";
import { StyledListItemText } from "./StyledListItemText";

export function AccentColorPickerItem() {
  const { context, extra } = useActivity();
  const { strings } = useStrings();
  const [open, setOpen] = React.useState(false);
  const { settings, setSettings } = useSettings();
  const [value, setValue] = React.useState<Settings.AccentScheme[][0]>(settings.accent_scheme);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (val: any) => {
    setOpen(false);

    if (val.name && val.value) {
      setValue(val);
      setSettings({ accent_scheme: val });
    }
  };

  return (
    <>
      <ListItemButton onClick={handleOpen}>
        <StyledListItemText id="switch-list-label-wifi" primary={strings.accent_colors} secondary={value.name} />
      </ListItemButton>
      <ConfirmationDialogRaw
        id="accent-menu"
        title="Farbakzent auswählen"
        keepMounted
        open={open}
        contentMap={accent_colors}
        onClose={handleClose}
        value={value}
      />
    </>
  );
}
