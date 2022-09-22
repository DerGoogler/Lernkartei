import * as React from "react";
import { Add, DeleteRounded, EditRounded, Menu } from "@mui/icons-material";
import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useJSON } from "../../../native/SharedPreferences";
import { AppProps } from "..";
import { StyledCard } from "./StyledCard";
import { StyledIconButton } from "./StyledIconButton";
import { os } from "../../../native/Os";
import { Fragment } from "react";
import { ViewCardActivity } from "../../ViewCardsActivity";
import AddActivity from "../../AddActivity";
import { useKartei } from "../../../hooks/useKartei";

export function CardRenderer({ pageTools, extra }: AppProps) {
  const [cards, setCards] = useKartei();

  const confirm = useConfirm();

  return (
    <Fragment>
      {cards.map((card, index) => (
        <StyledCard elevation={0}>
          <Box sx={{ p: 2, display: "flex" }}>
            <Stack
              spacing={0.5}
              style={{ flexGrow: 1 }}
              onClick={() => {
                pageTools.pushPage<any>({
                  component: ViewCardActivity,
                  props: {
                    key: `card_item_${card.group}`,
                    extra: {
                      card: card.karten,
                      index: index,
                      title: card.name,
                      desc: card.description,
                    },
                  },
                });
              }}
            >
              <Typography fontWeight={700}>{card.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </Stack>
          </Box>
          <Divider />
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1 }}>
            <Chip
              size="small"
              sx={{
                bgcolor: "#eeeeee",
              }}
              label={
                card.karten.length != 0 && card.karten.length <= 1
                  ? `${card.karten.length} Karte`
                  : `${card.karten.length} Karten`
              }
            />
            <Stack spacing={0.8} direction="row">
              <StyledIconButton
                style={{ width: 30, height: 30 }}
                onClick={() => {
                  pageTools.pushPage({
                    component: AddActivity,
                    props: {
                      key: `edit_${card.name}_${index}`,
                      extra: {
                        name: card.name,
                        description: card.description,
                        editGroup: true,
                        index: index,
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
                        Möchtest Du die <strong>{card.name}</strong>-Gruppe löschen?
                      </span>
                    ),
                    confirmationText: "Ja",
                    cancellationText: "Nein",
                  })
                    .then(() => {
                      try {
                        setCards((_card) => _card.filter((remv) => remv.group != card.group));
                        os.toast(`${card.name} wurde gelöscht.`, "short");
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
      ))}
    </Fragment>
  );
}
