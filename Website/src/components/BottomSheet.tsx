import { styled, Theme } from "@mui/material";
import { ActionSheet } from "react-onsenui";

export type BottomSheetProps = {
  theme?: Theme;
  open: boolean;
  onCancel?(): void;
  children: React.ReactNode;
  maxHeight?: number;
};

export function BottomSheet(props: BottomSheetProps) {
  const StyledSheet = styled(ActionSheet)(({ theme, maxHeight }: BottomSheetProps) => ({
    "& .action-sheet--material": {
      maxHeight: `${maxHeight}px` || "500px",
      overflow: "auto",
      borderRadius: "20px 20px 0px 0px",
    },
  }));

  return (
    <StyledSheet
      maxHeight={props.maxHeight}
      isOpen={props.open}
      animation="default"
      onCancel={props.onCancel}
      isCancelable={true}
    >
      {props.children}
    </StyledSheet>
  );
}
