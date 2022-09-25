import ons from "onsenui";
import { LazyList } from "react-onsenui";

type LazyLoadListProps = {
  length: number;
  map: any;
  render(element: any, index: number): JSX.Element;
};

export const LazyLoadList = (props: LazyLoadListProps) => {
  const renderRow = (index: number) => {
    return props.render(props.map[index], index);
  };

  return (
    <LazyList
      length={props.length}
      renderRow={renderRow}
      calculateItemHeight={() => (ons.platform.isAndroid() ? 48 : 44)}
    />
  );
};
