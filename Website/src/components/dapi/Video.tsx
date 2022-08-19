import { styled } from "@mui/material";
import { util } from "googlers-tools";

declare type Type = `video/${string}`;

interface VideoProps {
  src: string;
  type: Type;
  shadow?: string;
}

function Video(props: VideoProps) {
  const { src, type, shadow } = props;

  const StyledYouTube = styled("div")(({ theme }) => ({
    position: "relative",
    paddingBottom: "56.25%",
    paddingTop: 0,
    height: 0,
    overflow: "hidden",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[util.typeCheck<any>(shadow, "0")],
    "iframe,object,embed": {
      border: 0,
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
  }));

  const StyledVideo = styled("video")(({ theme }) => ({
    width: "100%",
    height: "100%",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[util.typeCheck<any>(shadow, "0")],
  }));

  switch (type) {
    case "video/youtube":
      return (
        <>
          <StyledYouTube>
            <iframe
              height="480"
              src={`https://www.youtube.com/embed/${src.replace(
                /((https:\/\/youtu\.be\/|https:\/\/www\.youtube\.com\/watch\?v=)(.*))/gm,
                "$3"
              )}`}
            ></iframe>
          </StyledYouTube>
        </>
      );

    default:
      return (
        <>
          <StyledVideo controls={true}>
            <source src={src} type={util.typeCheck(type, "video/mp4")} />
            Your browser does not support HTML video.
          </StyledVideo>
        </>
      );
  }
}

export default Video;
