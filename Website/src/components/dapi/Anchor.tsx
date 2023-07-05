import { useTheme } from "@Hooks/useSettings";
import { styled } from "@mui/material";
import { useActivity } from "../../hooks/useActivity";
import { os } from "../../native/Os";
import { GroupsDownloadActivity } from "../../view/GroupsDownloadActivity";
import SettingsActivity from "../../view/SettingsActivity";
import { Icon } from "@Components/Icon";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import DescriptonActivity from "../../view/DescriptonActivity";

const StyledAnchor = styled("div")(({ theme }) => {
  const { scheme } = useTheme();
  const s = {
    cursor: "pointer",
    color: scheme[300],
    display: "flex",
    alignItems: "center",
    // "& abbr[title]": {
    //   textDecoration: "none",
    //   cursor: "pointer",
    // },
    ":hover": {
      textDecoration: "underline",
    },
  };

  return {
    display: "inline-block",
    "& div[href]": s,
    "& div[page]": s,
  };
});

function Anchor(props: JSX.IntrinsicElements["a"]) {
  const { href, children, ...rest } = props;

  const { theme, scheme } = useTheme();

  return (
    <StyledAnchor>
      <div
        href={href}
        // @ts-ignore
        onClick={() => {
          href
            ? os.open(href, {
                target: "_blank",
                features: {
                  color: theme.palette.primary.main,
                },
              })
            : null;
        }}
        {...rest}
      >
        {children}{" "}
        <Icon
          icon={LaunchRoundedIcon}
          sx={{
            fontSize: 16,
            marginLeft: "2px",
          }}
        />
      </div>
    </StyledAnchor>
  );
}

interface OpenProps extends React.PropsWithChildren {
  page: string;
  url?: string;
  title?: string;
}

export function Open(props: OpenProps) {
  const { page, children } = props;
  const { context } = useActivity();

  return (
    <StyledAnchor>
      <div
        // @ts-ignore
        page={page}
        // @ts-ignore
        onClick={() => {
          switch (page) {
            case "settings":
              context.pushPage<{}>({
                component: SettingsActivity,
                props: {
                  key: "settings",
                  extra: {},
                },
              });
              break;

            case "groupsdownload":
            case "groups":
              context.pushPage<{}>({
                component: GroupsDownloadActivity,
                props: {
                  key: "sets",
                  extra: {},
                },
              });
              break;
            case "request":
              if (!props.url) {
                os.toast("Missing Url!", "short");
              } else {
                context.pushPage<{}>({
                  component: DescriptonActivity,
                  props: {
                    key: `desc_open${Math.round(Math.random() * 56)}`,
                    extra: {
                      request: {
                        use: true,
                        url: props.url,
                      },
                      shortDesc: props.title,
                    },
                  },
                });
              }
              break;
            default:
              break;
          }
        }}
      >
        {children}{" "}
        <Icon
          icon={NorthEastRoundedIcon}
          sx={{
            fontSize: 16,
            marginLeft: "2px",
          }}
        />
      </div>
    </StyledAnchor>
  );
}

export default Anchor;
