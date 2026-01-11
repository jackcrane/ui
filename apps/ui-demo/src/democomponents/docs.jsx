import { Layout } from "@jcui/ui-kit";
import layoutSource from "@kit-source/components/Layout/layout.jsx?raw";
import layoutStyles from "@kit-source/components/Layout/layout.module.css?raw";
import styles from "./docs.module.css";

const layoutPath = "packages/ui-kit/src/components/Layout/layout.jsx";
const layoutStylesPath = "packages/ui-kit/src/components/Layout/layout.module.css";

export const Docs = () => {
  return (
    <section className={styles.docs}>
      <div className={styles.docsHeader}>
        <div>
          <h2>Layout documentation</h2>
          <p>
            Live preview tied to <code>{layoutPath}</code> for instant hot refresh as you edit.
          </p>
        </div>
        <a
          className={styles.docsLink}
          href={`vscode://file/${layoutPath}`}
          target="_blank"
          rel="noreferrer"
        >
          Open Layout source in editor
        </a>
      </div>
      <div className={styles.docsPreview}>
        <Layout>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              padding: 10,
              color: "var(--body-color)",
            }}
          >
            <strong>Layout preview</strong>
            <p style={{ margin: 0 }}>
              This live preview stays in sync with the module above, so editing the layout
              component will hot-reload both the demo and its source snippet.
            </p>
          </div>
        </Layout>
      </div>
      <div className={styles.docsSource}>
        <div>
          <h3>JSX source</h3>
          <pre>{layoutSource}</pre>
        </div>
        <div>
          <h3>CSS module</h3>
          <pre>{layoutStyles}</pre>
          <p>
            Path: <code>{layoutStylesPath}</code>
          </p>
        </div>
      </div>
    </section>
  );
};
