import Link from "next/link";
import Layout from "../layouts/default";

export default () => (
  <>
    <style jsx>{`
      .About-photo {
        width: 200px;
        margin: 0 auto;
        display: block;
      }

      .About-container dt {
        font-weight: bold;
        margin: 1em 0;
      }
      .About-container dd {
        margin: 0;
      }

      @media (min-width: 768px) {
        .About-photo {
          float: right;
        }
        .About-container {
          display: flex;
        }
        .About-container-primary {
          flex: 1;
        }
        .About-container-secondary {
          flex: 3;
        }
        .About-container > *:nth-child(2) {
          padding-left: 2em;
        }
      }
    `}</style>
    <Layout>
      <div className="About-container">
        <div className="About-container-secondary">
          <h1>The Legend</h1>
          <b>Daijipi, Head of Vilic Vienna </b>
          <p>Breaking News: Pierre: "Ich habe dicke Eier"</p>
          <p>MIR IST WARM KANN HIER MAL JEMAND EIN FENSTER ÖFFNEN</p>
        </div>
        <div className="About-container-primary">
          <img className="About-photo" src="/static/bae.png" />
        </div>
      </div>
      <div className="About-container">
        <div className="About-container-primary">
          <dl>
            <dt>Location</dt>
            <dd>Vie CITY</dd>
          </dl>
          <dl>
            <dt>Technologies</dt>
            <dd>Popcorn Maschine, Nachowärmer</dd>
          </dl>
          <dl>
            <dt>Nationality</dt>
            <dd>TÜRKIYE,TÜRKIYE</dd>
          </dl>
          <dl>
            <dt>Languages</dt>
            <dd>
              <ul>
                <li>Sarcasm ;-) </li>
                <li>German </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>Other Interests</dt>
            <dd>Raves n Drugs</dd>
          </dl>
        </div>
        <div className="About-container-secondary">
          <h2>Work Experience</h2>
          <p>VILIC VILIC</p>
          <h3>Popcorn</h3>
          <b>Salzig GmbH</b>
          <p>Dec 2013 - Apr 2017</p>
          <p>300g Mais, 3 Löffel Salz</p>
          <ul>
            <li>Viel Öl</li>
            <li>Viel Liebe</li>
            <li>Viel Drama</li>
          </ul>
        </div>
      </div>
    </Layout>
  </>
);
