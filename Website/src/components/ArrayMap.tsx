import * as React from "react";

type FromObject = {
  map: Array<any>;
  render: (item: any, index: number) => JSX.Element;
  whenError: (error: Error) => JSX.Element;
  whenEmpty: () => JSX.Element;
};

const ArrayMap = {
  fromObject: ({ map, render, whenError, whenEmpty }: FromObject): JSX.Element => {
    try {
      if (map.length === 0) {
        return <React.Fragment>{whenEmpty()}</React.Fragment>;
      } else {
        return (
          <React.Fragment>
            {map.map((item, index) => {
              return render(item, index);
            })}
          </React.Fragment>
        );
      }
    } catch (error) {
      return <React.Fragment>{whenError(error as Error)}</React.Fragment>;
    }
  },
};

export { ArrayMap };
