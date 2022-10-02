import React from "react";
import { ListItem } from "react-onsenui";
import { ConfirmationDialogRaw } from "../../../components/ConfirmationDialogRaw";
import { useActivity } from "../../../hooks/useActivity";
import { AccentColors, useScheme } from "../../../hooks/useScheme";
import { accent_colors } from "../../../theme";

export function AccentColorPickerItem() {
  const { context, extra } = useActivity();
  const [open, setOpen] = React.useState(false);
  const [scheme, setScheme] = useScheme();
  const [value, setValue] = React.useState<AccentColors[0]>(scheme);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (val: any) => {
    setOpen(false);

    if (val.name && val.value) {
      setValue(val);
      setScheme(val);
    }
  };

  return (
    <>
      <ListItem onClick={handleOpen}>
        <div className="center">
          <span className="list-item__title">Akzentfarbe</span>
          <span className="list-item__subtitle">{value.name}</span>
        </div>
      </ListItem>
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
