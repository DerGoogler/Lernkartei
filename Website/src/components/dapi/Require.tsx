import { BuildConfig } from "@Native/BuildConfig";

interface RequireProps extends React.PropsWithChildren {
  version: string;
}

function Require(props: RequireProps) {
  const { version } = props;

  if (BuildConfig.VERSION_CODE >= version) {
    return <>{props.children}</>;
  } else {
    return null;
  }
}

export default Require;
