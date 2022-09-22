import * as React from "react";

type MapableProps = {
  map: Array<any>;
  render: (item: any, index: number) => JSX.Element;
  whenError: (error: string) => JSX.Element;
  whenEmpty: () => JSX.Element;
};

function Mapable(props: MapableProps) {
  try {
    if (props.map.length === 0) {
      return <React.Fragment>{props.whenEmpty()}</React.Fragment>;
    } else {
      return (
        <React.Fragment>
          {props.map.map((item, index) => {
            return props.render(item, index);
          })}
        </React.Fragment>
      );
    }
  } catch (error) {
    return <React.Fragment>{props.whenError((error as Error).message)}</React.Fragment>;
  }
}

export { Mapable, MapableProps };
