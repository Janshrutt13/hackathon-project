# 📚 Component Inventory & Usage Guide

## Overview
Complete list of all components, their purpose, props, and usage examples.

---

## 🏗️ Layout Components

### Sidebar.tsx
**Location**: `components/layout/Sidebar.tsx`  
**Purpose**: Left navigation panel  
**Props**: None  
**Features**:
- Logo + tagline
- "+ New Blog Post" button
- 5 navigation items
- Help Center + user profile

**Usage**:
```typescript
import Sidebar from "@/components/layout/Sidebar";

<Sidebar />
```

---

### TopNav.tsx
**Location**: `components/layout/TopNav.tsx`  
**Purpose**: Top navigation with tabs  
**Props**:
```typescript
{
  currentTab: string;
  onTabChange: (tab: string) => void;
}
```
**Features**:
- 5 tabs (KEYWORD, CLUSTER, SERP, BLOG, SEO)
- Active tab indicator
- Export & Publish buttons
- Undo/Share actions

**Usage**:
```typescript
import TopNav from "@/components/layout/TopNav";

const [tab, setTab] = useState("BLOG");
<TopNav currentTab={tab} onTabChange={setTab} />
```

---

### ContentEditor.tsx
**Location**: `components/layout/ContentEditor.tsx`  
**Purpose**: Main blog content area  
**Props**: None  
**Features**:
- Large typography
- Status badges
- Structured sections
- Featured image placeholder

**Usage**:
```typescript
import ContentEditor from "@/components/layout/ContentEditor";

<ContentEditor />
```

---

### RightPanel.tsx
**Location**: `components/layout/RightPanel.tsx`  
**Purpose**: SEO metrics sidebar  
**Props**: None  
**Features**:
- Live optimization status
- Overall SEO Score
- Key metrics with progress bars
- Architecture Settings
- AI Insights
- Command input

**Usage**:
```typescript
import RightPanel from "@/components/layout/RightPanel";

<RightPanel />
```

---

## 📑 Tab Components

### KeywordTab.tsx
**Location**: `components/tabs/KeywordTab.tsx`  
**Purpose**: Keyword analysis view  
**Props**:
```typescript
{
  state: WorkflowState;
}
```
**Features**:
- Keyword metrics (volume, difficulty)
- Search intent display
- Keyword variations list

**Usage**:
```typescript
import KeywordTab from "@/components/tabs/KeywordTab";

<KeywordTab state={workflowState} />
```

---

### ClusterTab.tsx
**Location**: `components/tabs/ClusterTab.tsx`  
**Purpose**: Semantic keyword clustering  
**Props**: None  
**Features**:
- Keyword groups
- Volume & difficulty metrics
- Tag-based display

**Usage**:
```typescript
import ClusterTab from "@/components/tabs/ClusterTab";

<ClusterTab />
```

---

### SerpTab.tsx
**Location**: `components/tabs/SerpTab.tsx`  
**Purpose**: SERP gap analysis  
**Props**: None  
**Features**:
- Content gaps (high/medium/low priority)
- Already covered topics
- Priority indicators

**Usage**:
```typescript
import SerpTab from "@/components/tabs/SerpTab";

<SerpTab />
```

---

### SeoTab.tsx
**Location**: `components/tabs/SeoTab.tsx`  
**Purpose**: SEO validation scores  
**Props**: None  
**Features**:
- Overall score card
- 7 individual metrics
- Progress bars with colors

**Usage**:
```typescript
import SeoTab from "@/components/tabs/SeoTab";

<SeoTab />
```

---

## 🎨 Landing Components

### Hero.tsx
**Location**: `components/landing/Hero.tsx`  
**Purpose**: Landing page hero section  
**Props**: None  
**Features**:
- Large headline
- Tagline
- CTA buttons
- Background glow effect

**Usage**:
```typescript
import Hero from "@/components/landing/Hero";

<Hero />
```

---

### PipelinePreview.tsx
**Location**: `components/landing/PipelinePreview.tsx`  
**Purpose**: Pipeline feature strip  
**Props**: None  
**Features**:
- 7-step pipeline visualization
- 3 feature cards
- Icon-based display

**Usage**:
```typescript
import PipelinePreview from "@/components/landing/PipelinePreview";

<PipelinePreview />
```

---

## 🔄 Legacy Step Components

### Step1KeywordInput.tsx
**Purpose**: Keyword input confirmation  
**Props**: `{ state: WorkflowState }`

### Step2Clustering.tsx
**Purpose**: Keyword clustering display  
**Props**: None

### Step3Serp.tsx
**Purpose**: SERP gap analysis  
**Props**: None

### Step4PromptArch.tsx
**Purpose**: Prompt architecture visualization  
**Props**: None

### Step5Generation.tsx
**Purpose**: Blog generation with streaming  
**Props**: None

### Step6Validation.tsx
**Purpose**: SEO validation scorecards  
**Props**: None

### Step7Output.tsx
**Purpose**: Final output summary  
**Props**: None

---

## 📦 Utility Functions

### cn() - Class Name Merger
**Location**: `lib/utils.ts`  
**Purpose**: Merge Tailwind classes safely  
**Usage**:
```typescript
import { cn } from "@/lib/utils";

const className = cn(
  "px-4 py-2 rounded-lg",
  isActive && "bg-purple-500"
);
```

---

## 🎯 Type Definitions

**Location**: `lib/types.ts`

### WorkflowState
```typescript
{
  currentStep: number;
  keyword: string;
  audience: string;
  intent: Intent[];
  region: string;
  tone: string;
  stepStatuses: StepStatus[];
}
```

### Intent
```typescript
type Intent = "informational" | "commercial" | "navigational" | "transactional";
```

### SeoScore
```typescript
{
  label: string;
  value: number;
  color: string;
}
```

### KeywordCluster
```typescript
{
  group: string;
  keywords: string[];
  volume: string;
  difficulty: string;
}
```

### SerpGap
```typescript
{
  topic: string;
  covered: boolean;
  priority: "high" | "medium" | "low";
}
```

---

## 📊 Mock Data

**Location**: `lib/mockData.ts`

### Available Data
- `mockClusters` — 4 keyword groups
- `mockSerpGaps` — 7 SERP topics
- `mockSeoScores` — 7 SEO metrics
- `mockBlogContent` — Full blog with sections
- `promptFlowNodes` — 7 pipeline steps

**Usage**:
```typescript
import { mockClusters, mockSeoScores } from "@/lib/mockData";

mockClusters.forEach(cluster => {
  console.log(cluster.group, cluster.keywords);
});
```

---

## 🎨 Styling System

### CSS Variables
**Location**: `app/globals.css`

```css
:root {
  --bg: #0B0F14;
  --surface: #111827;
  --border: #1F2937;
  --accent: #7C3AED;
  --accent2: #2563EB;
  --text: #E5E7EB;
  --muted: #9CA3AF;
}
```

### Usage in Components
```typescript
<div style={{ background: "var(--surface)", color: "var(--text)" }}>
  Content
</div>
```

---

## 🔗 Component Relationships

```
App Root
├── Landing Page (/)
│   ├── Hero
│   └── PipelinePreview
│
├── Workflow Page (/workflow)
│   ├── Sidebar
│   ├── TopNav
│   ├── ContentArea
│   │   ├── KeywordTab
│   │   ├── ClusterTab
│   │   ├── SerpTab
│   │   ├── ContentEditor (BLOG)
│   │   └── SeoTab
│   └── RightPanel
│
└── Output Page (/output)
    └── Blog Viewer
```

---

## 🚀 Common Patterns

### Adding a New Tab
1. Create `components/tabs/NewTab.tsx`
2. Import in `app/workflow/page.tsx`
3. Add to tabs array in `TopNav.tsx`
4. Add case in `renderContent()` switch

### Styling with CSS Variables
```typescript
style={{
  background: "var(--surface)",
  border: "1px solid var(--border)",
  color: "var(--text)"
}}
```

### Using Mock Data
```typescript
import { mockClusters } from "@/lib/mockData";

mockClusters.map(cluster => (
  <div key={cluster.group}>{cluster.group}</div>
))
```

### Type-Safe Props
```typescript
import type { WorkflowState } from "@/lib/types";

type Props = { state: WorkflowState };

export default function MyComponent({ state }: Props) {
  // ...
}
```

---

## 📋 Component Checklist

- [x] Sidebar — Navigation
- [x] TopNav — Tab switching
- [x] ContentEditor — Blog display
- [x] RightPanel — SEO metrics
- [x] KeywordTab — Keyword analysis
- [x] ClusterTab — Clustering
- [x] SerpTab — Gap analysis
- [x] SeoTab — SEO scores
- [x] Hero — Landing hero
- [x] PipelinePreview — Feature strip
- [x] Step components — Legacy pipeline
- [x] Utility functions — Helpers
- [x] Type definitions — TypeScript
- [x] Mock data — Test data

---

## 🎓 Best Practices

1. **Always use types** — Define Props interface
2. **Use CSS variables** — For consistent theming
3. **Keep components small** — Single responsibility
4. **Use mock data** — For development/testing
5. **Document props** — Clear interfaces
6. **Use semantic HTML** — For accessibility
7. **Optimize imports** — Only import what's needed

---

## 📞 Quick Reference

| Need | File | Component |
|------|------|-----------|
| Navigation | `layout/Sidebar.tsx` | Sidebar |
| Tabs | `layout/TopNav.tsx` | TopNav |
| Blog Content | `layout/ContentEditor.tsx` | ContentEditor |
| SEO Metrics | `layout/RightPanel.tsx` | RightPanel |
| Keyword Data | `tabs/KeywordTab.tsx` | KeywordTab |
| Clustering | `tabs/ClusterTab.tsx` | ClusterTab |
| SERP Analysis | `tabs/SerpTab.tsx` | SerpTab |
| SEO Scores | `tabs/SeoTab.tsx` | SeoTab |
| Landing | `landing/Hero.tsx` | Hero |
| Features | `landing/PipelinePreview.tsx` | PipelinePreview |
| Types | `lib/types.ts` | Type definitions |
| Data | `lib/mockData.ts` | Mock data |
| Utils | `lib/utils.ts` | Helper functions |

---

**All components are production-ready and fully typed! 🎉**
