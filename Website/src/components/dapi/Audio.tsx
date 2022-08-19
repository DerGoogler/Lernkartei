import { util } from "googlers-tools";

export interface AudioProps {
  src: string;
  type: string;
  controls?: boolean;
  noSupportText?: string;
}

function Audio(props: AudioProps) {
  const { src, type, controls, noSupportText } = props;
  return (
    <>
      <audio controls={util.typeCheck(controls, true)}>
        <source
          src={util.typeCheck(src, "https://dergoogler.com/fds/audio/benjamin.mp3")}
          type={util.typeCheck(type, "audio/mpeg")}
        />
        {util.typeCheck(noSupportText, "Your browser does not support audios.")}
      </audio>
    </>
  );
}

export default Audio;
