import { useTheme } from "@Hooks/useSettings";
import { styled } from "@mui/material";
import { useActivity } from "../../hooks/useActivity";
import { os } from "../../native/Os";
import { GroupsActivity } from "../../view/GroupsActivity";
import SettingsActivity from "../../view/SettingsActivity";

const StyledAnchor = styled("div")(({ theme }) => {
  const { scheme } = useTheme();
  const s = {
    cursor: "pointer",
    color: scheme[900],
    "& abbr[title]": {
      textDecoration: "none",
      cursor: "pointer",
    },
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

  const { theme } = useTheme();

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
        {/* @ts-ignore */}
        <abbr title={href}>{children}</abbr>
      </div>
    </StyledAnchor>
  );
}

export function Open(props: any) {
  const { page, children, ...rest } = props;
  const { context } = useActivity();

  const theme = useTheme();

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

            case "groups":
              context.pushPage<{}>({
                component: GroupsActivity,
                props: {
                  key: "sets",
                  extra: {},
                },
              });
              break;
            default:
              break;
          }
        }}
        {...rest}
      >
        {children}
      </div>
    </StyledAnchor>
  );
}

export default Anchor;
