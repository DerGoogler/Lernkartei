import Acknowledgements from "../view/Acknowledgements";
import { GroupsActivity } from "../view/GroupsActivity";
import { KPluginsActivity } from "../view/KPluginsActivity";
import SettingsActivity from "../view/SettingsActivity";
import TestPluginActivity from "../view/TestPluginActivity";
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
        children: "Einstellungen",
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
      {
        children: "KPlugins",
        tappable: true,
        modifier: "chevron",
        onClick(hide, pushPage, event) {
          pushPage<{}>({
            component: KPluginsActivity,
            props: {
              key: "md-plugins",
              extra: {},
            },
          });
          hide();
        },
      },
      {
        children: "Plugin tester",
        tappable: true,
        modifier: "chevron",
        onClick(hide, pushPage, event) {
          pushPage<{}>({
            component: TestPluginActivity,
            props: {
              key: "test-plugins",
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
