"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import { Trash2, ExternalLink } from "lucide-react";
import { useBlogStore } from "@/lib/store";

interface Project {
  id: string;
  keyword: string;
  title: string;
  createdAt: string;
  seoScore: number;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [mounted, setMounted] = useState(false);
  const { setKeyword, setAudience, setIntent, setRegion, setTone, setCurrentStep } = useBlogStore();

  // Load projects from localStorage
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("blogy_projects");
    if (saved) {
      try {
        setProjects(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to load projects:", error);
      }
    }
  }, []);

  // Save projects to localStorage
  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem("blogy_projects", JSON.stringify(newProjects));
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    saveProjects(updated);
  };

  const openProject = (project: Project) => {
    // Load project data into store
    setKeyword(project.keyword);
    setCurrentStep(7); // Go to output
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg)" }}>
      <Sidebar />
      <div className="flex-1 ml-56 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-40 border-b px-8 py-6"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <h1 className="text-3xl font-bold" style={{ color: "var(--text)" }}>Projects</h1>
          <p style={{ color: "var(--text-secondary)" }}>Manage your generated blogs</p>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-8 py-12">
          {projects.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text)" }}>No projects yet</h2>
              <p className="mb-6" style={{ color: "var(--text-secondary)" }}>Create your first blog to get started</p>
              <Link href="/workflow" className="btn-primary inline-block">
                Create New Blog →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="card p-6 hover:border-purple-500/50 transition-all"
                  style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1" style={{ color: "var(--text)" }}>
                        {project.title}
                      </h3>
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        {project.keyword}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
                        {project.seoScore}
                      </div>
                      <div className="text-xs" style={{ color: "var(--muted)" }}>SEO Score</div>
                    </div>
                  </div>

                  <div className="text-xs mb-4" style={{ color: "var(--muted)" }}>
                    {new Date(project.createdAt).toLocaleDateString()}
                  </div>

                  <div className="flex gap-2">
                    <Link href="/output" onClick={() => openProject(project)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                      style={{ background: "var(--accent)", color: "white" }}>
                      <ExternalLink size={14} />
                      View
                    </Link>
                    <button onClick={() => deleteProject(project.id)}
                      className="px-3 py-2 rounded-lg text-sm font-medium transition-all"
                      style={{ background: "var(--bg)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
