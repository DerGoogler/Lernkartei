import { styled, useTheme } from "@mui/material";
import { os } from "../../native/Os";

const StyledAnchor = styled("div")(({ theme }) => ({
  display: "inline-block",
  "& div[href]": {
    cursor: "pointer",
    color: theme.palette.primary.main,
    "& abbr[title]": {
      textDecoration: "none",
      cursor: "pointer",
    },
    ":hover": {
      textDecoration: "underline",
    },
  },
}));

function Anchor(props: JSX.IntrinsicElements["a"]) {
  const { href, children, ...rest } = props;

  const theme = useTheme();

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

export default Anchor;
