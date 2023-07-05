import * as React from "react";
import { BackButton, Page, Toolbar } from "react-onsenui";
import dep from "./../util/dep.json";
import nativeDep from "./../util/native-dep.json";
import { Packages } from "package-depend-list";
import { Card, CardContent, Typography, useTheme } from "@mui/material";
import { os } from "../native/Os";
import { useActivity } from "../hooks/useActivity";

function Acknowledgements() {
  const { context, extra } = useActivity();

  const [libs, setLibs] = React.useState<Array<Packages>>([]);

  const theme = useTheme();

  React.useEffect(() => {
    setLibs((dep as any[]).concat(nativeDep as any[]));
  });

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <div className="left">
          <BackButton onClick={context.popPage}>Back</BackButton>
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
                  features: {
                    color: theme.palette.primary.main,
                  },
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
