"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import ContentEditor from "@/components/layout/ContentEditor";
import RightPanel from "@/components/layout/RightPanel";
import PipelineProgress from "@/components/workflow/PipelineProgress";
import BlogInputForm from "@/components/workflow/BlogInputForm";
import KeywordTab from "@/components/tabs/KeywordTab";
import ClusterTab from "@/components/tabs/ClusterTab";
import SerpTab from "@/components/tabs/SerpTab";
import SeoTab from "@/components/tabs/SeoTab";
import { useBlogStore } from "@/lib/store";

export default function WorkflowPage() {
  const router = useRouter();
  const { currentStep, keyword } = useBlogStore();

  // Redirect to output when blog is generated
  useEffect(() => {
    if (currentStep === 7 && keyword) {
      const timer = setTimeout(() => {
        router.push("/output");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, keyword, router]);

  const renderContent = () => {
    // Show input form on step 1
    if (currentStep === 1) {
      return <BlogInputForm />;
    }

    // Show tabs for other steps
    switch (currentStep) {
      case 2:
        return <KeywordTab state={{ currentStep, keyword, audience: "", intent: [], region: "", tone: "", stepStatuses: [] }} />;
      case 3:
        return <ClusterTab />;
      case 4:
        return <SerpTab />;
      case 5:
        return <ContentEditor />;
      case 6:
        return <SeoTab />;
      case 7:
        return (
          <div className="flex-1 overflow-y-auto flex items-center justify-center" style={{ background: "var(--bg)" }}>
            <div className="text-center">
              <div className="text-6xl mb-4">✨</div>
              <h2 className="text-3xl font-bold mb-2" style={{ color: "var(--text)" }}>Blog Generated!</h2>
              <p style={{ color: "var(--text-secondary)" }}>Redirecting to output...</p>
            </div>
          </div>
        );
      default:
        return <BlogInputForm />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg)" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 ml-56 overflow-hidden">
        {/* Pipeline Progress */}
        {currentStep > 1 && <PipelineProgress />}

        {/* Top Navigation */}
        {currentStep > 1 && <TopNav currentTab="BLOG" onTabChange={() => {}} />}

        {/* Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Center - Dynamic Content */}
          {renderContent()}

          {/* Right Panel - Only show after step 1 */}
          {currentStep > 1 && <RightPanel />}
        </div>
      </div>
    </div>
  );
}
