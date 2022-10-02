import { DeleteRounded, EditRounded } from "@mui/icons-material";
import { Box, Chip, Collapse, Divider, Fade, List, Stack, Typography } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { StyledCard } from "./StyledCard";
import { StyledIconButton } from "./StyledIconButton";
import { os } from "../../../native/Os";
import { Fragment } from "react";
import { ViewCardActivity } from "../../ViewCardsActivity";
import AddActivity from "../../AddActivity";
import { useKartei } from "../../../hooks/useKartei";
import { TransitionGroup } from "react-transition-group";
import { useActivity } from "../../../hooks/useActivity";

const GroupRenderer = () => {
  const activity = useActivity();
  const [cards, setCards] = useKartei();

  const confirm = useConfirm();

  return (
    <>
      {cards.map((card, index) => (
        <StyledCard key={index + 1} elevation={0}>
          <Box key={index + 2} sx={{ p: 2, display: "flex" }}>
            <Stack
              key={index + 3}
              spacing={0.5}
              style={{ flexGrow: 1 }}
              onClick={() => {
                activity.context.pushPage<any>({
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
              <Typography key={index + 4} fontWeight={700} color="text.primary">
                {card.name}
              </Typography>
              <Typography key={index + 5} variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </Stack>
          </Box>
          <Divider key={index + 6} />
          <Stack
            key={index + 7}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: 2, py: 1 }}
          >
            <Chip
              key={index + 7}
              size="small"
              sx={(theme) => ({
                bgcolor: theme.palette.secondary.light,
              })}
              label={
                card.karten.length != 0 && card.karten.length <= 1
                  ? `${card.karten.length} Karte`
                  : `${card.karten.length} Karten`
              }
            />
            <Stack key={index + 8} spacing={0.8} direction="row">
              <StyledIconButton
                key={index + 9}
                style={{ width: 30, height: 30 }}
                onClick={() => {
                  activity.context.pushPage({
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
                <EditRounded key={index + 10} sx={{ fontSize: 14 }} />
              </StyledIconButton>

              <StyledIconButton
                key={index + 11}
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
                <DeleteRounded key={index + 12} sx={{ fontSize: 14 }} />
              </StyledIconButton>
            </Stack>
          </Stack>
        </StyledCard>
      ))}
    </>
  );
};

export default GroupRenderer;
