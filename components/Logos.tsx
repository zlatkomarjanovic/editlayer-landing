import styles from "./Logos.module.css";

const items = [
  { label: "Next.js",    icon: <NextjsIcon /> },
  { label: "Vercel",     icon: <VercelIcon /> },
  { label: "GitHub",     icon: <GitHubIcon /> },
  { label: "Resend",     icon: <ResendIcon /> },
  { label: "TypeScript", icon: <TSIcon /> },
  { label: "App Router", icon: <AppRouterIcon /> },
];

export default function Logos() {
  return (
    <div className={styles.wrap}>
      <p className={styles.label}>Works with the stack you already use</p>
      <div className={styles.track}>
        <div className={styles.row}>
          {[...items, ...items, ...items, ...items].map((item, i) => (
            <div key={i} className={styles.item} aria-hidden={i >= items.length}>
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NextjsIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.049-.106.005-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/></svg>; }
function VercelIcon()  { return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 22.525H0l12-21.05 12 21.05z"/></svg>; }
function GitHubIcon()  { return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>; }
function ResendIcon()  { return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3.5 3h17A1.5 1.5 0 0 1 22 4.5v.643a1.5 1.5 0 0 1-.844 1.352L12 10.5 2.844 6.495A1.5 1.5 0 0 1 2 5.143V4.5A1.5 1.5 0 0 1 3.5 3zM2 8.236l9.203 4.329a1.8 1.8 0 0 0 1.594 0L22 8.236V19.5a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 19.5V8.236z"/></svg>; }
function TSIcon()      { return <svg width="14" height="14" viewBox="0 0 400 400" fill="currentColor"><rect width="400" height="400" rx="50" fill="currentColor"/><path d="M87.5 200H187.5V237.5H162.5V325H125V237.5H87.5V200Z" fill="#080808"/><path d="M212.5 200H312.5V237.5H275V325H237.5V237.5H212.5V200Z" fill="#080808"/></svg>; }
function AppRouterIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22 8.5 12 15.5 2 8.5"/></svg>; }
