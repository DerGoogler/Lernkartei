import { styled } from "@mui/material";
import { os } from "../../native/Os";

function Anchor(props: JSX.IntrinsicElements["a"]) {
  const { href, children, ...rest } = props;

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

  return (
    <StyledAnchor>
      <div
        href={href}
        // @ts-ignore
        onClick={() => {
          href
            ? os.open(href, {
                target: "_blank",
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
