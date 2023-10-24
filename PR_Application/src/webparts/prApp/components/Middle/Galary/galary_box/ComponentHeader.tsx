import * as React from "react";
import { mergeStyles, DefaultPalette } from "@fluentui/react/lib/Styling";
interface ComponentProps {
  title: string;
  color?: string;
}
const ComponentHeader = (props: ComponentProps) => {
  const { title, color } = props;

  const stackItemStyles = mergeStyles({
    alignItems: "center",
    background:
      color == null || color == "undefined"
        ? DefaultPalette.black
        : DefaultPalette.green,
    color: DefaultPalette.white,
    display: "flex",
    height: 50,
    justifyContent: "flex-start",
    paddingLeft: 5,
  });
  return <span className={stackItemStyles}>{title}</span>;
};

export default ComponentHeader;
