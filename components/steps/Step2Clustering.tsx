import { mockClusters } from "@/lib/mockData";

export default function Step2Clustering() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-1" style={{ color: "var(--text)" }}>Keyword Clustering</h2>
        <p className="text-sm" style={{ color: "var(--muted)" }}>Semantically grouped keywords for topical authority.</p>
      </div>

      <div className="flex flex-col gap-3">
        {mockClusters.map((cluster, i) => (
          <div key={i} className="p-4 rounded-xl border" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                {cluster.group}
              </span>
              <div className="flex gap-3">
                <span className="text-xs px-2 py-0.5 rounded" style={{ background: "var(--surface)", color: "var(--muted)" }}>
                  Vol: {cluster.volume}
                </span>
                <span className="text-xs px-2 py-0.5 rounded" style={{ background: "var(--surface)", color: "var(--muted)" }}>
                  KD: {cluster.difficulty}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {cluster.keywords.map((kw) => (
                <span key={kw} className="px-2.5 py-1 rounded-md text-xs"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}>
                  {kw}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 text-xs" style={{ color: "var(--muted)" }}>
        <span>✦ {mockClusters.reduce((a, c) => a + c.keywords.length, 0)} keywords clustered</span>
        <span>·</span>
        <span>{mockClusters.length} semantic groups</span>
      </div>
    </div>
  );
}
