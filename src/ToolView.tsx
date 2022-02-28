import { useToolViewApi } from "./useToolViewApi";
import "./ToolView.css";
import Arcade from "./Arcade";

export default function ToolView() {
  const toolViewApi = useToolViewApi();
  const themeClass =
    toolViewApi.theme.appearance === "dark" ? "dark-theme" : "light-theme";

  return (
    <div className={`${themeClass} theme`}>
      <Arcade />
    </div>
  );
}
