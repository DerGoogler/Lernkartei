// import { Stack, Pagination } from "@mui/material";
// import { useState } from "react";
// import { useConfirm } from "material-ui-confirm";
// import { useKartei } from "../../../hooks/useKartei";
// import { useActivity } from "../../../hooks/useActivity";
// import { usePagination } from "../../../hooks/usePagination";
// import CardKarte from "./CardKarte";

// type Props = {
//   search: string;
// };

// const CardListBuilder = (props: Props) => {
//   const { context, extra } = useActivity<any>();

//   const { index: iindex } = extra;
//   const { cards, actions } = useKartei();
//   const karten = cards[iindex].karten;
//   const filteredCards = karten.filter((card) =>
//     card.shortDescription.toLowerCase().includes(props.search.toLowerCase())
//   );

//   let [page, setPage] = useState(1);
//   const PER_PAGE = 20;

//   const count = Math.ceil(filteredCards.length / PER_PAGE);
//   const _DATA = usePagination(filteredCards, PER_PAGE);

//   const confirm = useConfirm();

//   const handleChange = (e: any, p: any) => {
//     setPage(p);
//     _DATA.jump(p);
//   };

//   return (
//     <>
     
//       {_DATA.currentData().map((card, index) => (
//         <CardKarte actions={actions} card={card} index={index} />
//       ))}
//     </>
//   );
// };

// export default CardListBuilder;
