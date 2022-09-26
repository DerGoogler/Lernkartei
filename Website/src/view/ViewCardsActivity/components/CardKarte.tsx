import { DeleteRounded, EditRounded } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useConfirm } from "material-ui-confirm";
import React from "react";
import reactStringReplace from "react-string-replace";
import { Dispatch, SetPrefAction } from "web-shared-preferences";
import { useActivity } from "../../../hooks/useActivity";
import { useKartei } from "../../../hooks/useKartei";
import { os } from "../../../native/Os";
import AddCardToGroupActivity from "../../AddCardToGroupActivity";
import { StyledCard } from "../../App/components/StyledCard";
import { StyledIconButton } from "../../App/components/StyledIconButton";
import DescriptonActivity from "../../DescriptonActivity";

interface Props {
  card: Karten;
  index: number;
  setCards: Dispatch<SetPrefAction<Kartei[]>>;
}

const CardKarte = ({ card, index, setCards }: Props) => {
  const { context, extra } = useActivity<any>();

  const { index: iindex } = extra;

  const confirm = useConfirm();

  return (
    <StyledCard key={index} elevation={0}>
      <Box sx={{ p: 2, display: "flex" }}>
        <Stack
          spacing={0.5}
          style={{ flexGrow: 1 }}
          onClick={() => {
            context.pushPage<typeof extra>({
              component: DescriptonActivity,
              props: {
                key: `card_${card.shortDescription}`,
                extra: {
                  desc: card.description,
                  shortDesc: card.shortDescription,
                  index: index,
                },
              },
            });
          }}
        >
          {/* <Typography fontWeight={700}>{card.shortDescription}</Typography> */}
          {/* <Typography variant="body2" color="text.secondary">
#{index}
</Typography> */}
        </Stack>
      </Box>
      <Divider />
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1 }}>
        <Chip
          size="small"
          sx={{
            bgcolor: "#eeeeee",
          }}
          label={`#${index}`}
        />
        <Stack spacing={0.8} direction="row">
          <StyledIconButton
            style={{ width: 30, height: 30 }}
            onClick={() => {
              context.pushPage({
                component: AddCardToGroupActivity,
                props: {
                  key: `edit_${card.shortDescription}_${index}`,
                  extra: {
                    card: null,
                    desc: card.description,
                    shortDesc: card.shortDescription,
                    index: index,
                    cardIndex: iindex,
                    edit: true,
                  },
                },
              });
            }}
          >
            <EditRounded sx={{ fontSize: 14 }} />
          </StyledIconButton>

          <StyledIconButton
            style={{ width: 30, height: 30 }}
            onClick={() => {
              confirm({
                title: "Löschen",
                description: (
                  <span>
                    Möchtest Du die <strong>Karte Nr.{index}</strong> löschen?
                  </span>
                ),
                confirmationText: "Ja",
                cancellationText: "Nein",
              })
                .then(() => {
                  try {
                    setCards((tmp) => {
                      tmp[iindex].karten = tmp[iindex].karten.filter(
                        (remv) => remv.shortDescription != card.shortDescription
                      );
                      return tmp;
                    });

                    os.toast(`Karte Nr.${index} wurde gelöscht.`, "short");
                  } catch (error) {
                    os.toast((error as Error).message, "short");
                  }
                })
                .catch(() => {});
            }}
          >
            <DeleteRounded sx={{ fontSize: 14 }} />
          </StyledIconButton>
        </Stack>
      </Stack>
    </StyledCard>
  );
};

export default CardKarte;
