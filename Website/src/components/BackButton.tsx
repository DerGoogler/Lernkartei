import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ToolbarButton } from "./onsenui/ToolbarButton";

export type BackButtonProps = {
  onClick: () => void;
};

export const BackButton = (props: BackButtonProps) => <ToolbarButton icon={ArrowBackIcon} onClick={props.onClick} />;
