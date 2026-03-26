import { mockClusters } from "@/lib/mockData";

export default function ClusterTab() {
  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "var(--bg)" }}>
      <div className="max-w-3xl mx-auto px-12 py-16">
        <h1 className="text-4xl font-bold mb-12" style={{ color: "var(--text)" }}>Keyword Clustering</h1>
        
        <div className="space-y-4">
          {mockClusters.map((cluster, i) => (
            <div key={i} className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold" style={{ color: "var(--accent)" }}>{cluster.group}</h3>
                <div className="flex gap-3">
                  <span className="text-xs px-2.5 py-1 rounded" style={{ background: "var(--elevated)", color: "var(--muted)" }}>
                    {cluster.volume}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded" style={{ background: "var(--elevated)", color: "var(--muted)" }}>
                    KD: {cluster.difficulty}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {cluster.keywords.map((kw) => (
                  <span key={kw} className="text-sm px-3 py-1.5 rounded-md" style={{ background: "var(--elevated)", color: "var(--text-secondary)" }}>
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
