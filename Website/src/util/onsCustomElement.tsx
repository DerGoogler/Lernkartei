// https://github.com/OnsenUI/OnsenUI/blob/90c0aeb2b2acadfefb66a3da038b6b09cfb5b9c8/react-onsenui/src/onsCustomElement.jsx
import React, { useRef, useEffect } from "react";
const kebabize = (camelString: string) => camelString.replace(/([a-zA-Z])([A-Z])/g, "$1-$2").toLowerCase();

const addDeprecated = (props, deprecated) => {
  const propsCopy = { ...props };

  const nameMap = {
    className: "class",
    ...deprecated,
  };

  for (const [oldName, newName] of Object.entries<string>(nameMap)) {
    if (propsCopy[newName] === undefined && propsCopy[oldName] !== undefined) {
      propsCopy[newName] = propsCopy[oldName];
      delete propsCopy[oldName];
    }
  }

  return propsCopy;
};

function useCustomElementListener(ref, prop, handler) {
  const event = prop.slice(2).toLowerCase();
  useEffect(() => {
    const current = ref.current;
    current.addEventListener(event, handler);

    return function cleanup() {
      current.removeEventListener(event, handler);
    };
  }, [ref, handler]);
}

interface DefaultProps<T> extends React.PropsWithChildren, React.RefAttributes<T> {
  style?: React.CSSProperties;
}

interface CustomElementOptions {
  notAttributes?: string[];
  deprecated?: {
    [name: string]: string;
  };
}

function useCustomElement<P = {}>(props: P, options?: CustomElementOptions, ref?: any) {
  const notAttributes = options?.notAttributes || [];
  const deprecated = options?.deprecated || {};

  const properties = {};
  for (const [prop, value] of Object.entries(addDeprecated(props, deprecated))) {
    const jsName = kebabize(prop);

    if (notAttributes.includes(prop)) {
      useEffect(() => {
        ref.current[prop] = value;
      });
    } else if (/^on[A-Z]/.test(prop)) {
      useCustomElementListener(ref, prop, value);
    } else if (typeof value === "boolean") {
      properties[jsName] = value ? "" : null;
    } else if (typeof value === "object" && value !== null) {
      properties[jsName] = JSON.stringify(value);
    } else {
      properties[jsName] = value;
    }
  }

  return { properties };
}

export default function onsCustomElement<P = {}>(
  WrappedComponent: React.ComponentType<any> | keyof JSX.IntrinsicElements,
  options?: CustomElementOptions
) {
  return React.forwardRef<HTMLElement, React.DetailedHTMLProps<React.HTMLAttributes<P>, P>>((props, _ref) => {
    const ref = _ref || useRef();

    const { children, style, ...rest } = props;
    const { properties } = useCustomElement<
      Omit<React.DetailedHTMLProps<React.HTMLAttributes<P>, P>, "style" | "children">
    >(rest, options, ref);

    return <WrappedComponent ref={ref} style={style} children={children} {...properties} />;
  });
}
