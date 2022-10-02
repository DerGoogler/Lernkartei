import { DeleteRounded, Edit, EditRounded } from "@mui/icons-material";
import { Grid, Typography, Box, Stack, Divider, Chip, Pagination } from "@mui/material";
import reactStringReplace from "react-string-replace";
import { StyledCard } from "../../App/components/StyledCard";
import DescriptonActivity from "../../DescriptonActivity";
import { StyledIconButton } from "../../App/components/StyledIconButton";
import AddCardToGroupActivity from "../../AddCardToGroupActivity";
import { os } from "../../../native/Os";
import { Fragment, useState } from "react";
import { useConfirm } from "material-ui-confirm";
import { useKartei } from "../../../hooks/useKartei";
import React from "react";
import { useActivity } from "../../../hooks/useActivity";
import { usePagination } from "../../../hooks/usePagination";

type Props = {
  search: string;
};

const CardListBuilder = (props: Props) => {
  const { context, extra } = useActivity<any>();

  const { index: iindex } = extra;
  const [cards, setCards] = useKartei();
  const karten = cards[iindex].karten;
  const filteredCards = karten.filter((card) =>
    card.shortDescription.toLowerCase().includes(props.search.toLowerCase())
  );

  let [page, setPage] = useState(1);
  const PER_PAGE = 20;

  const count = Math.ceil(filteredCards.length / PER_PAGE);
  const _DATA = usePagination(filteredCards, PER_PAGE);

  const confirm = useConfirm();

  const handleChange = (e: any, p: any) => {
    setPage(p);
    _DATA.jump(p);
  };

  const navigation = (margin: string) => (
    <Stack style={{ marginBottom: 8 }} direction="row" justifyContent="center" alignItems="center" spacing={2}>
      <Pagination
        count={count}
        color="primary"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
        showFirstButton
        showLastButton
      />
    </Stack>
  );

  return (
    <>
      {navigation("0px 0px 8px 0px")}
      {_DATA.currentData().map((card, index) => (
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
      ))}
      {navigation("8px 0px 0px 0px")}
    </>
  );
};

export default CardListBuilder;
