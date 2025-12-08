import styles from "./PressKitButton.module.scss";
import { useNyassobiSettings } from "../hooks/useNyassobiSettings";

function PressKitButton({ label = "Télécharger le press kit", className }) {
  const { settings } = useNyassobiSettings();
  const href = settings.pressKitUrl;

  if (!href) {
    return null;
  }

  const combinedClassName = [styles.pressKitButton, className].filter(Boolean).join(" ");

  return (
    <a className={combinedClassName} href={href} target="_blank" rel="noreferrer noopener">
      {label}
    </a>
  );
}

export default PressKitButton;
