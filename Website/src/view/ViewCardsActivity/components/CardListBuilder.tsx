import { DeleteRounded, Edit, EditRounded } from "@mui/icons-material";
import { Grid, Typography, Box, Stack, Divider, Chip } from "@mui/material";
import reactStringReplace from "react-string-replace";
import { useJSON } from "../../../native/SharedPreferences";
import { StyledCard } from "../../App/components/StyledCard";
import DescriptonActivity from "../../DescriptonActivity";
import { StyledIconButton } from "../../App/components/StyledIconButton";
import AddCardToGroupActivity from "../../AddCardToGroupActivity";
import { os } from "../../../native/Os";
import { Fragment } from "react";
import { ViewCardActivityProps } from "..";
import { useConfirm } from "material-ui-confirm";

export function CardListBuilder({ pageTools, extra }: ViewCardActivityProps) {
  const { index: iindex } = extra;
  const [cards, setCards] = useJSON<Kartei[]>("katei", []);
  const karten = cards[iindex].karten;

  const confirm = useConfirm();

  const Lrender = (map: Array<Karten>, search: string) => {
    const filteredCards = map.filter((card) => card.shortDescription.toLowerCase().includes(search.toLowerCase()));
    return filteredCards.map((card, index) => {
      return (
        <StyledCard key={`item_${index}`} elevation={0}>
          <Box sx={{ p: 2, display: "flex" }}>
            <Stack
              spacing={0.5}
              style={{ flexGrow: 1 }}
              onClick={() => {
                pageTools.pushPage<typeof extra>({
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
              <Typography fontWeight={700}>
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
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: 2, py: 1, bgcolor: "rgb(255, 255, 255)" }}
          >
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
                  pageTools.pushPage({
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
                      let tmp = cards;
                      try {
                        tmp[iindex].karten = tmp[iindex].karten.filter(
                          (remv) => remv.shortDescription != card.shortDescription
                        );
                        setCards(tmp);
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
    });
  };

  const resultsRender = [];

  for (var i = 0; i < karten.length; i += 2) {
    resultsRender.push(
      <Grid item xs={6} key={i}>
        {Lrender(karten.slice(i, i + 2), extra.search)}
      </Grid>
    );
  }

  const checkDeviceSize = (element: JSX.Element): JSX.Element => {
    if (os.isTablet) {
      return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {element}
        </Grid>
      );
    } else {
      return element;
    }
  };

  return checkDeviceSize(<Fragment>{os.isTablet ? resultsRender : Lrender(karten, extra.search)}</Fragment>);
}
