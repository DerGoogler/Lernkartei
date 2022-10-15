import { DeleteRounded, EditRounded } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useConfirm } from "material-ui-confirm";
import React, { Dispatch, SetStateAction } from "react";
import reactStringReplace from "react-string-replace";
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
  actions: ReturnType<typeof useKartei>["actions"];
}

const CardKarte = ({ card, index, actions }: Props) => {
  const { context, extra } = useActivity<any>();
  const { setCards } = useKartei();

  const { index: iindex } = extra;

  const confirm = useConfirm();

  const data = {
    shortDesc: card.shortDescription ? card.shortDescription : "Null",
    desc: card.description ? card.description : "Null",
  };

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
          <Typography fontWeight={700} color="text.primary">
            {reactStringReplace(card.shortDescription, /\*\*(\w+)\*\*/g, (match, i) => (
              <strong>{match}</strong>
            ))}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
#{index}
</Typography> */}
        </Stack>
      </Box>
      <Divider />
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1 }}>
        <Chip
          size="small"
          sx={(theme) => ({
            bgcolor: theme.palette.secondary.light,
          })}
          label={`#${index}`}
        />
        <Stack spacing={0.8} direction="row">
          {!card.readonly && (
            <>
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
                        actions.removeKarte({
                          index: iindex,
                          shortDescription: card.shortDescription,
                          callback() {
                            os.toast(`Karte Nr.${index} wurde gelöscht.`, "short");
                          },
                        });
                      } catch (error) {
                        os.toast((error as Error).message, "short");
                      }
                    })
                    .catch(() => {});
                }}
              >
                <DeleteRounded sx={{ fontSize: 14 }} />
              </StyledIconButton>
            </>
          )}
        </Stack>
      </Stack>
    </StyledCard>
  );
};

export default CardKarte;
