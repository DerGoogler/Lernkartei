import Acknowledgements from "../view/Acknowledgements";
import { GroupsActivity } from "../view/GroupsActivity";
import SettingsActivity from "../view/SettingsActivity";
const drawerItems: DrawerListItems[] = [
  {
    title: "Others",
    content: [
      {
        children: "Acknowledgements",
        tappable: true,
        modifier: "chevron",
        onClick(hide, pushPage, event) {
          pushPage<{}>({
            component: Acknowledgements,
            props: {
              key: "acknowledgements",
              extra: {},
            },
          });
          hide();
        },
      },
      {
        children: "Settings",
        tappable: true,
        modifier: "chevron",
        onClick(hide, pushPage, event) {
          pushPage<{}>({
            component: SettingsActivity,
            props: {
              key: "settings",
              extra: {},
            },
          });
          hide();
        },
      },
      {
        children: "Gruppen",
        tappable: true,
        modifier: "chevron",
        onClick(hide, pushPage, event) {
          pushPage<{}>({
            component: GroupsActivity,
            props: {
              key: "sets",
              extra: {},
            },
          });
          hide();
        },
      },
    ],
  },
];

export default drawerItems;
