import FooterSocialWidget from "../components/FooterSocialWidget";
import ContactForm from "../components/ContactForm";
import styles from "./ContactPage.module.scss";
import layoutStyles from "./HomePage.module.scss";
import TitleNyasso from "../TitleNyasso";
import Footer from "../Footer";

import { useNyassobiSettings } from "../hooks/useNyassobiSettings";

function ContactPage() {

  const { settings } = useNyassobiSettings();

  return (
    <>
      <div className={layoutStyles.mainContent}>
        <div className={layoutStyles.mainContent}>
          <div className={layoutStyles.homePage}>
            <div className={styles.contactPage}>
              <section className={styles.contactIntro}>
                <TitleNyasso title="Contact" />
                <p>
                  Une question, une proposition de collaboration, ou simplement envie de nous laisser un mot ? Utilisez le
                  formulaire ci-dessous ou contactez-nous directement via nos r\u00e9seaux.
                </p>
              </section>

              <TitleNyasso subtitle="Formulaire de contact" />

              <section className={styles.contactContent}>
                <ContactForm contactEmail={settings.contactEmail} />

                <aside className={styles.socialCard}>
                  <h2>Retrouvez Nyassobi</h2>
                  <p>
                    Nous partageons toutes nos actualit\u00e9s en ligne. Suivez-nous pour ne rien manquer ou envoyez-nous un
                    message priv\u00e9.
                  </p>
                  <FooterSocialWidget />
                  <p>
                    E-mail direct :{" "}
                    <a href={`mailto:${settings.contactEmail}`} style={{ color: "#ED5E24", fontWeight: 600 }}>
                      {settings.contactEmail}
                    </a>
                  </p>
                </aside>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactPage;
