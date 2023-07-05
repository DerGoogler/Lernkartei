import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import { Icon } from "../Icon";
import onsCustomElement from "@Util/onsCustomElement";

export type BackButtonProps = {
  id?: string;
  onClick: React.MouseEventHandler<any>;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
};

interface HTMLToolbarButton {
  modifier: string;
  disabled: boolean;
  icon: string;
  onClick: Function;
}

const HTMLToolbarButton = onsCustomElement<HTMLToolbarButton>("ons-toolbar-button");

export const ToolbarButton = (props: BackButtonProps) => {
  return (
    <HTMLToolbarButton id={props.id} style={{ fontFamily: "unset" }} onClick={props.onClick}>
      <Icon icon={props.icon} keepLight />
    </HTMLToolbarButton>
  );
};
