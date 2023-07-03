import { useKartei } from "@Hooks/useKartei";
import { useStrings } from "@Hooks/useStrings";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import DownloadRounded from "@mui/icons-material/DownloadRounded";
import { ListItemButton } from "@mui/material";
import { os } from "@Native/Os";
import { useEffect, useState } from "react";
import { useFetch } from "usehooks-ts";
import { StyledListItemText } from "../../SettingsActivity/components/StyledListItemText";
import { Icon } from "@Components/Icon";

interface Props {
  set: KarteiSet;
  cards: Kartei[];
  actions: ReturnType<typeof useKartei>["actions"];
}

export const Group = ({ set, cards, actions }: Props) => {
  const { data, error } = useFetch<Kartei>(set.cdn);
  const { strings } = useStrings();

  const [isDownloaded, setIsDownloaded] = useState(false);

  useEffect(() => {
    if (data) {
      setIsDownloaded(cards.some((elem) => elem?.group === data.group));
    }
  }, [data, cards]);

  const setDownloader = (): void => {
    if (data) {
      actions.addGroup({
        group: data.group,
        data: data,
        onExists: () => {
          os.toast(strings.group_exist, "short");
        },
        callback: () => {
          os.toast(
            strings.formatString(strings.group_downloaded, {
              name: data.name,
            }) as string,
            "short"
          );
        },
      });
    } else {
      os.toast("There was an error while downloading the group", "short");
    }
  };

  if (typeof error !== "undefined") return null;

  return (
    <ListItemButton onClick={setDownloader}>
      <StyledListItemText primary={set.name} secondary={set.desc} />
      {isDownloaded ? <Icon keepLight icon={FileDownloadDoneIcon} /> : <Icon keepLight icon={DownloadRounded} />}
    </ListItemButton>
  );
};
