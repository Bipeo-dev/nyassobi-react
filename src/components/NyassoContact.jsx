import ContactForm from "./ContactForm";
import { useNyassobiSettings } from "../hooks/useNyassobiSettings";

function NyassoContact() {
  const { settings } = useNyassobiSettings();

  return (
    <>
      <ContactForm />
      {settings.contactEmail ? (
        <p>
          Vous pouvez aussi nous écrire à{" "}
          <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a>.
        </p>
      ) : null}
    </>
  );
}

export default NyassoContact;
