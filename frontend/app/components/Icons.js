import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import FormatSizeicon from "@mui/icons-material/FormatSize";

export const Icons = () => {
  return (
    <div className="flex flex-wrap font-medium space-x-2 text-black-600 mb-3">
      <FormatBoldIcon />
      <FormatItalicIcon />
      <FormatUnderlinedIcon />
      <FormatAlignCenterIcon />
      <FormatAlignRightIcon />
      <FormatAlignJustifyIcon />
      <FormatListBulletedIcon />
      <FormatListNumberedIcon />
      <FormatColorFillIcon />
      <FormatSizeicon />
    </div>
  );
};
