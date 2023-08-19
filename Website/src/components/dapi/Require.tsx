import { BuildConfig } from "@Native/BuildConfig";

interface RequireProps extends React.PropsWithChildren {
  version?: string;
  pattern?: string;
}

const Require = (props: RequireProps) => {
  const { version, pattern } = props;

  const compareVer = (ver1, middle, ver2) => {
    const res = new Intl.Collator("en").compare(ver1, ver2);
    let comp: boolean = false;

    switch (middle) {
      case "=":
        comp = 0 === res;
        break;

      case ">":
        comp = 1 === res;
        break;

      case ">=":
        comp = 1 === res || 0 === res;
        break;

      case "<":
        comp = -1 === res;
        break;

      case "<=":
        comp = -1 === res || 0 === res;
        break;
    }

    return comp;
  };

  if (!version) {
    if (compareVer(BuildConfig.VERSION_NAME, pattern, version)) {
      return <>{props.children}</>;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export default Require;
