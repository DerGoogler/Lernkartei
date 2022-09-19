import { Edit } from "@mui/icons-material";
import { Grid, Typography, Box, Stack } from "@mui/material";
import reactStringReplace from "react-string-replace";
import { useJSON } from "../../../native/SharedPreferences";
import { StyledCard } from "../../App/components/StyledCard";
import DescriptonActivity from "../../DescriptonActivity";
import { StyledIconButton } from "../../App/components/StyledIconButton";
import AddCardToGroupActivity from "../../AddCardToGroupActivity";
import { os } from "../../../native/Os";
import { Fragment } from "react";
import { ViewCardActivityProps } from "..";

export function CardListBuilder({ pageTools, extra }: ViewCardActivityProps) {
  const { index: iindex } = extra;
  const [cards, setCards] = useJSON<Kartei[]>("katei", []);
  const karten = cards[iindex].karten;

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
              <Typography variant="body2" color="text.secondary">
                #{index}
              </Typography>
            </Stack>
            <StyledIconButton
              style={{ width: 30, height: 30 }}
              onClick={() => {
                pageTools.pushPage({
                  component: AddCardToGroupActivity,
                  props: {
                    key: "edit",
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
              <Edit sx={{ fontSize: 14 }} />
            </StyledIconButton>
          </Box>
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
