import * as React from "react";
import { BackButton, Toolbar } from "react-onsenui";
import dep from "./../util/dep.json";
import { Packages } from "package-depend-list";
import { Card, CardContent, Typography } from "@mui/material";
import { Page } from "../components/onsenui/Page";
import { os } from "../native/Os";

interface Props extends PushProps<{}> {}

function Acknowledgements({ pageTools, extra }: Props) {
  const [libs, setLibs] = React.useState<Array<Packages>>([]);

  os.useOnBackPressed(pageTools.popPage);

  React.useEffect(() => {
    setLibs(dep as any);
  });

  const renderToolbar = () => {
    return (
      <Toolbar>
        <div className="left">
          <BackButton onClick={pageTools.popPage}>Back</BackButton>
        </div>
        <div className="center">Acknowledgements</div>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <license-container
        style={{
          paddingBottom: "4px",
        }}
      >
        {libs.map((item) => {
          return (
            <Card
              variant="outlined"
              onClick={() => {
                os.open(item.repository, {
                  target: "_blank",
                });
              }}
              style={{ margin: 8 }}
            >
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {typeof item.author == "object"
                    ? item.author.name
                    : item.author?.replace(/<(.*?)@(.*?)\.(.*?)>/gm, "")}
                </Typography>
                <Typography variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {item.version} ({item.license} License)
                </Typography>
                <Typography variant="body2">{item.description}</Typography>
              </CardContent>
            </Card>
          );
        })}
      </license-container>
    </Page>
  );
}

export default Acknowledgements;
