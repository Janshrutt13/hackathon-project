# Blogy AI Blog Engine - Architecture & Implementation Plan

## 1. SITEMAP

```
/
├── / (Landing Page)
│   ├── Hero Section
│   ├── How It Works (4-step)
│   ├── Features Grid
│   ├── SEO Scoring Preview
│   ├── Integrations
│   ├── Social Proof
│   ├── Pricing
│   └── FAQ
│
├── /auth
│   ├── /login
│   ├── /signup
│   └── /forgot-password
│
├── /dashboard (Protected)
│   ├── Main Dashboard
│   │   ├── Project cards
│   │   ├── Content pipeline status
│   │   ├── Analytics charts
│   │   └── Quick actions
│   ├── /projects
│   │   ├── Projects list
│   │   └── Create new project modal
│   ├── /analytics
│   │   ├── Content performance chart
│   │   ├── SEO score trends
│   │   ├── Keyword performance table
│   │   └── Publishing metrics
│   ├── /settings
│   │   ├── Account settings
│   │   ├── Workspace settings
│   │   ├── API keys
│   │   └── Integrations
│   └── /help
│       ├── Documentation
│       └── Contact support
│
├── /generate (Protected - Multi-step Wizard)
│   ├── /generate?step=1 (Project details)
│   ├── /generate?step=2 (Keyword clustering)
│   ├── /generate?step=3 (SERP gap analysis)
│   ├── /generate?step=4 (Prompt architecture)
│   ├── /generate?step=5 (Blog generation)
│   ├── /generate?step=6 (SEO validation)
│   └── /generate?step=7 (Final editor)
│
├── /editor/:contentId (Protected)
│   ├── Blog title & meta fields
│   ├── Generated content editor
│   ├── SEO scorecard sidebar
│   ├── Analytics panel
│   └── Publish/Export actions
│
└── /content (Protected)
    ├── Content library
    ├── Content cards (draft/published)
    ├── Bulk actions
    └── Search/filter
```

---

## 2. COMPONENT ARCHITECTURE

### High-Level Component Structure

```
components/
├── layout/
│   ├── Navbar.tsx (Top navigation bar)
│   ├── Sidebar.tsx (Left navigation sidebar)
│   ├── MainLayout.tsx (Protected layout wrapper)
│   ├── Footer.tsx (Landing page footer)
│   └── AuthLayout.tsx (Auth pages layout)
│
├── auth/
│   ├── LoginForm.tsx
│   ├── SignupForm.tsx
│   └── ForgotPasswordForm.tsx
│
├── landing/
│   ├── HeroSection.tsx
│   ├── HowItWorks.tsx
│   ├── FeaturesGrid.tsx
│   ├── SEOScoringPreview.tsx
│   ├── IntegrationsSection.tsx
│   ├── SocialProof.tsx
│   ├── PricingSection.tsx
│   └── FAQSection.tsx
│
├── dashboard/
│   ├── DashboardOverview.tsx
│   ├── ProjectCard.tsx
│   ├── ContentPipeline.tsx
│   ├── MetricsCard.tsx
│   ├── PerformanceChart.tsx
│   ├── KeywordOpportunitiesCard.tsx
│   └── QuickActionButtons.tsx
│
├── workflow/
│   ├── WorkflowStepper.tsx (Progress indicator)
│   ├── Step1ProjectDetails.tsx
│   ├── Step2KeywordClustering.tsx
│   ├── Step3SERPAnalysis.tsx
│   ├── Step4PromptArchitecture.tsx
│   ├── Step5BlogGeneration.tsx
│   ├── Step6SEOValidation.tsx
│   ├── Step7FinalEditor.tsx
│   └── WorkflowContainer.tsx (Wrapper)
│
├── editor/
│   ├── BlogEditor.tsx (Main editor page)
│   ├── TitleFields.tsx (Title, meta fields)
│   ├── ContentEditor.tsx (Rich text editor area)
│   ├── FAQSection.tsx (FAQ block)
│   ├── CTABlock.tsx (Call-to-action block)
│   ├── InternalLinksPanel.tsx (Link suggestions)
│   └── EditorSidebar.tsx (Meta info, publish actions)
│
├── validation/
│   ├── SEOScorecard.tsx (Overall score widget)
│   ├── KeywordDensityPanel.tsx
│   ├── HeadingStructurePanel.tsx
│   ├── SnippetReadinessPanel.tsx
│   ├── ReadabilityPanel.tsx
│   ├── AIDetectionPanel.tsx
│   ├── CTAQualityPanel.tsx
│   ├── GeoAnswerEnginePanel.tsx
│   └── SEOValidationGrid.tsx (Master grid)
│
├── analytics/
│   ├── AnalyticsDashboard.tsx
│   ├── ContentPerformanceChart.tsx
│   ├── SEOScoreTrends.tsx
│   ├── KeywordPerformanceTable.tsx
│   ├── PublishingMetrics.tsx
│   └── ExportDataButton.tsx
│
├── content/
│   ├── ContentLibrary.tsx
│   ├── ContentCard.tsx
│   ├── ContentTable.tsx
│   ├── BulkActions.tsx
│   ├── SearchFilter.tsx
│   └── EmptyState.tsx
│
├── settings/
│   ├── SettingsDashboard.tsx
│   ├── AccountSettings.tsx
│   ├── WorkspaceSettings.tsx
│   ├── APIKeysSection.tsx
│   ├── IntegrationsPanel.tsx
│   └── DangerZone.tsx
│
├── shared/
│   ├── ScoreBadge.tsx (Reusable score display)
│   ├── Card.tsx (Generic card wrapper)
│   ├── Button.tsx (Button variants)
│   ├── Input.tsx (Form input)
│   ├── SelectDropdown.tsx
│   ├── Modal.tsx
│   ├── LoadingSpinner.tsx
│   ├── EmptyStateBlock.tsx
│   ├── ConfirmDialog.tsx
│   ├── Toast.tsx (Notifications)
│   ├── Badge.tsx (Status badges)
│   ├── ProgressBar.tsx
│   └── Tooltip.tsx
│
├── charts/
│   ├── LineChartWrapper.tsx (Recharts wrapper)
│   ├── BarChartWrapper.tsx
│   ├── PieChartWrapper.tsx
│   └── AreaChartWrapper.tsx
│
└── integrations/
    ├── IntegrationCard.tsx
    ├── SlackIntegration.tsx
    ├── GoogleAnalyticsIntegration.tsx
    ├── WordPressIntegration.tsx
    └── WebhookIntegration.tsx
```

### Component Props Interface Examples

```typescript
// ScoreBadge.tsx
interface ScoreBadgeProps {
  score: number; // 0-100
  label: string;
  size?: 'sm' | 'md' | 'lg';
  showTrend?: boolean;
  trendValue?: number;
}

// Card.tsx
interface CardProps {
  title?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
}

// MetricsCard.tsx
interface MetricsCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: React.ReactNode;
  trend?: { direction: 'up' | 'down'; percentage: number };
  backgroundColor?: string;
}

// WorkflowStepper.tsx
interface WorkflowStepperProps {
  currentStep: number;
  totalSteps: number;
  steps: Array<{ label: string; description: string }>;
  onStepClick?: (step: number) => void;
}

// SEOScorecard.tsx
interface SEOScorecardProps {
  overallScore: number;
  metrics: {
    keywordDensity: number;
    headingStructure: number;
    snippetReadiness: number;
    readability: number;
    aiNaturalness: number;
    ctaQuality: number;
    geoReady: number;
    internalLinks: number;
  };
  recommendations: string[];
}
```

---

## 3. DATABASE SCHEMA (Minimal Prototype)

For a hackathon prototype using **Supabase** or **Firebase**, here's the minimal schema:

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  password_hash VARCHAR(255),
  profile_picture_url TEXT,
  workspace_id UUID REFERENCES workspaces(id),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### Workspaces Table
```sql
CREATE TABLE workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  owner_id UUID REFERENCES users(id),
  slug VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### Projects Table
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  brand_context TEXT,
  target_audience TEXT,
  tone VARCHAR(50), -- 'professional', 'casual', 'friendly', etc.
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### Keywords Table
```sql
CREATE TABLE keywords (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) NOT NULL,
  seed_keyword VARCHAR(255),
  keyword_cluster JSONB, -- Array of related keywords
  search_volume INT,
  difficulty INT, -- 0-100
  intent VARCHAR(50), -- 'commercial', 'informational', 'navigational', 'transactional'
  created_at TIMESTAMP DEFAULT now()
);
```

### Content Table
```sql
CREATE TABLE content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) NOT NULL,
  keyword_id UUID REFERENCES keywords(id),
  title VARCHAR(255),
  meta_title VARCHAR(255),
  meta_description TEXT,
  slug VARCHAR(255) UNIQUE,
  content TEXT, -- Full blog post markdown
  outline JSONB, -- Blog outline structure
  faq_section JSONB, -- FAQ content
  cta_block JSONB, -- CTA content
  status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'review', 'approved', 'published'
  internal_links JSONB, -- Suggested internal links
  created_at TIMESTAMP DEFAULT now(),
  published_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT now()
);
```

### SEO Scores Table
```sql
CREATE TABLE seo_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID REFERENCES content(id) NOT NULL,
  overall_score INT, -- 0-100
  keyword_density DECIMAL(5,2),
  heading_structure INT,
  snippet_readiness INT,
  readability INT, -- Flesch-Kincaid grade
  ai_naturalness INT,
  cta_quality INT,
  geo_ready INT,
  internal_links INT,
  recommendations JSONB,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### Analytics Table
```sql
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID REFERENCES content(id),
  project_id UUID REFERENCES projects(id),
  views INT DEFAULT 0,
  clicks INT DEFAULT 0,
  average_position DECIMAL(5,2),
  impressions INT DEFAULT 0,
  ctr DECIMAL(5,2), -- Click-through rate
  date DATE,
  created_at TIMESTAMP DEFAULT now()
);
```

### API Keys / Integrations Table
```sql
CREATE TABLE integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) NOT NULL,
  provider VARCHAR(50), -- 'openai', 'google_analytics', 'wordpress', 'slack'
  api_key_encrypted TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### Entity Relationship Diagram (Simplified)

```
Users (1) ---< (many) Workspaces
Workspaces (1) ---< (many) Projects
Workspaces (1) ---< (many) Integrations

Projects (1) ---< (many) Keywords
Projects (1) ---< (many) Content
Projects (1) ---< (many) Analytics

Keywords (1) ---< (many) Content
Content (1) ---< (1) SEO Scores
Content (1) ---< (many) Analytics
```

---

## 4. PHASED IMPLEMENTATION PLAN

### **PHASE 1: Foundation & Landing Page** (Hackathon Day 1, 3-4 hours)

**Goals:**
- Set up Next.js 15 project with TypeScript
- Create clean folder structure
- Build landing page with all sections
- Implement navigation and routing
- Style with Tailwind & shadcn/ui
- Set up authentication pages (UI only, no backend initially)

**Deliverables:**
- ✅ Clean Next.js project scaffolding
- ✅ Landing page (hero, features, pricing, FAQ)
- ✅ Auth pages (login, signup, forgot password)
- ✅ Navigation sidebar and top bar
- ✅ All pages linked and routable
- ✅ Responsive design working
- ✅ Color scheme and typography system established

**Components to Build:**
- HeroSection
- HowItWorks
- FeaturesGrid
- PricingSection
- FAQSection
- LoginForm / SignupForm
- Navbar / Sidebar
- MainLayout / AuthLayout

**Mock Data:**
- Static feature list
- Static pricing tiers
- Static FAQ items

**Time Estimate:** 3-4 hours

---

### **PHASE 2: Dashboard & Workflow Wizard** (Hackathon Day 1, 3-4 hours)

**Goals:**
- Build protected dashboard
- Create multi-step blog generation workflow
- Implement workflow stepper
- Build keyword clustering mock data display
- Build SERP gap analysis cards
- Build prompt architecture preview

**Deliverables:**
- ✅ Dashboard overview with metrics cards
- ✅ Content pipeline status
- ✅ Project management interface
- ✅ Multi-step wizard (7 steps)
- ✅ Progress indicators
- ✅ Form validation and state management
- ✅ Mock keyword clustering data
- ✅ Mock SERP analysis data

**Components to Build:**
- DashboardOverview
- ProjectCard
- ContentPipeline
- MetricsCard
- WorkflowStepper
- Step1ProjectDetails
- Step2KeywordClustering
- Step3SERPAnalysis
- Step4PromptArchitecture
- Step5BlogGeneration (loading state)

**Mock Data:**
- 3-5 sample projects
- Sample keywords and clusters
- Sample SERP data with gaps
- Sample prompt architecture

**Time Estimate:** 3-4 hours

---

### **PHASE 3: Blog Generation & SEO Validation** (Hackathon Day 2, 3-4 hours)

**Goals:**
- Build SEO validation dashboard with scoring
- Create blog output page with editor
- Implement scorecard widgets
- Build analytics chart displays
- Create reusable score/metric components

**Deliverables:**
- ✅ Step 6 & 7 of workflow (SEO validation, final editor)
- ✅ Blog editor page with all sections
- ✅ SEO scoring dashboard with detailed panels
- ✅ Individual metric panels (keyword density, readability, etc.)
- ✅ SEO recommendations display
- ✅ Analytics charts (Recharts integration)
- ✅ Mock generated blog content
- ✅ Internal links suggestions

**Components to Build:**
- SEOScorecard
- KeywordDensityPanel
- HeadingStructurePanel
- SnippetReadinessPanel
- ReadabilityPanel
- AIDetectionPanel
- CTAQualityPanel
- GeoAnswerEnginePanel
- BlogEditor
- TitleFields
- ContentEditor
- FAQSection
- CTABlock
- InternalLinksPanel
- ContentPerformanceChart
- SEOScoreTrends

**Mock Data:**
- Sample blog content (with good structure)
- Sample SEO scores for demo
- Sample internal links suggestions
- Sample analytics data
- Sample FAQ items
- Sample CTAs

**Time Estimate:** 3-4 hours

---

### **PHASE 4: Analytics, Settings & Polish** (Hackathon Day 2, 2-3 hours)

**Goals:**
- Build analytics dashboard
- Build settings and integrations pages
- Implement publish/export actions
- Add loading and empty states
- Polish animations and transitions
- Final responsive testing
- Deploy to Vercel

**Deliverables:**
- ✅ Analytics dashboard with all charts
- ✅ Settings page (account, workspace, API keys)
- ✅ Integrations page with mock integrations
- ✅ Publish & Export action buttons
- ✅ Content library page
- ✅ Loading states and skeleton screens
- ✅ Empty state designs
- ✅ Framer Motion animations throughout
- ✅ Fully responsive on mobile/tablet/desktop
- ✅ Live Vercel deployment

**Components to Build:**
- AnalyticsDashboard
- ContentPerformanceChart
- SEOScoreTrends
- KeywordPerformanceTable
- PublishingMetrics
- SettingsDashboard
- AccountSettings
- WorkspaceSettings
- APIKeysSection
- IntegrationsPanel
- ContentLibrary
- ContentCard
- LoadingSpinner
- EmptyStateBlock

**Enhancements:**
- Framer Motion entrance animations
- Smooth transitions between steps
- Hover effects on interactive elements
- Toast notifications for actions
- Confirmation dialogs for destructive actions
- Skeleton loaders for async content

**Time Estimate:** 2-3 hours

---

## 5. TECH STACK SUMMARY

| Layer | Technology | Notes |
|-------|-----------|-------|
| **Framework** | Next.js 15 | App Router, TypeScript |
| **Styling** | Tailwind CSS + shadcn/ui | Pre-built components, utility-first |
| **Forms** | React Hook Form | Lightweight form state |
| **Animations** | Framer Motion | Subtle, entrance animations |
| **Charts** | Recharts | React charting library |
| **State** | React Context + useState | No Redux for hackathon |
| **Icons** | Lucide React | Consistent icon set |
| **Database** | Mock JSON (Phase 1-2) → Supabase/Firebase | Minimal schema for demo |
| **Auth** | Mock Auth (Phase 1-3) → NextAuth.js or Supabase Auth | Protected routes |
| **Deployment** | Vercel | Native Next.js deployment |

---

## 6. FOLDER STRUCTURE

```
blogy-ai/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── signup/
│   │   └── forgot-password/
│   ├── (landing)/
│   │   └── page.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   ├── projects/
│   │   ├── analytics/
│   │   ├── settings/
│   │   └── layout.tsx
│   ├── generate/
│   │   └── page.tsx (Multi-step form)
│   ├── editor/
│   │   ├── [contentId]/
│   │   └── page.tsx
│   ├── content/
│   │   └── page.tsx
│   ├── layout.tsx (Root)
│   └── page.tsx (Redirect to landing)
│
├── components/
│   ├── layout/
│   ├── auth/
│   ├── landing/
│   ├── dashboard/
│   ├── workflow/
│   ├── editor/
│   ├── validation/
│   ├── analytics/
│   ├── content/
│   ├── settings/
│   ├── shared/
│   ├── charts/
│   └── integrations/
│
├── lib/
│   ├── utils.ts (Tailwind merge, cn utility)
│   ├── constants.ts (App-wide constants)
│   ├── mockData.ts (All mock data)
│   └── hooks/
│       ├── useAuth.ts
│       ├── useProject.ts
│       └── useContent.ts
│
├── services/
│   ├── api.ts (API client / mock responses)
│   ├── auth.ts (Auth mock service)
│   ├── blog.ts (Blog generation mock)
│   └── seo.ts (SEO scoring mock)
│
├── types/
│   ├── index.ts (All TypeScript interfaces)
│   └── api.ts (API response types)
│
├── public/
│   ├── images/
│   └── icons/
│
├── styles/
│   ├── globals.css
│   └── animations.css
│
├── .env.local (Config)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 7. KEY IMPLEMENTATION DETAILS

### Authentication Flow (Mock Initially)
```typescript
// App-wide auth context
- useAuth() hook provides: isAuthenticated, user, login(), logout()
- Protected routes redirect to /login
- Login stores JWT-like token in localStorage (for demo)
- User data stored in React Context
```

### Workflow State Management
```typescript
// Store current step, form data across steps
const [step, setStep] = useState(1);
const [formData, setFormData] = useState({
  projectDetails: {},
  keywords: [],
  serpAnalysis: {},
  promptArch: {},
  generatedBlog: {},
  seoScores: {},
});

// Navigate between steps with validation
```

### Mock Data Structure
```typescript
// lib/mockData.ts exports:
- mockProjects: Project[]
- mockContent: Content[]
- mockKeywords: Keyword[]
- mockSEOScores: SEOScore[]
- mockAnalytics: Analytics[]
- generateMockBlogContent(): string
- generateMockSEOScore(): SEOScore
```

### API Service Layer
```typescript
// services/api.ts provides abstract functions
- async getProjects(): Promise<Project[]>
- async generateBlogContent(): Promise<Content>
- async getSEOScore(contentId): Promise<SEOScore>
- async publishContent(): Promise<void>

// Initially calls mockData, ready to swap with real APIs
```

### Styling System
```typescript
// Color palette
- Primary: indigo / violet (#6366f1 or #8b5cf6)
- Neutral: slate with warm undertones
- Success: emerald (#10b981)
- Warning: amber (#f59e0b)
- Danger: rose (#f43f5e)

// Typography
- Headings: 3xl/4xl (landingpage), 2xl/3xl (UI)
- Body: base (16px)
- Small: sm (14px)
- Spacing: 4px baseline
```

---

## 8. HACKATHON DEMO FLOW

1. **Landing Page** → Show problem, solution, value proposition
2. **Login** → Pre-authenticated user, jump to dashboard
3. **Dashboard** → Show projects, overview metrics
4. **Start Generation** → Click "New Blog" → Multi-step workflow
5. **Walk Through Steps** → Show keyword clustering, SERP gaps, prompt architecture
6. **Show Generated Blog** → Display beautiful output
7. **Show SEO Validation** → Scorecard with 8 metrics, all scoring high
8. **Show Analytics** → Charts showing "content performance"
9. **Settings/Integrations** → Show future extensibility

**Key Demo Talking Points:**
- "No more keyword research in spreadsheets"
- "Structured workflow, not a chat box"
- "Every blog optimized for SEO and conversion"
- "Real-time validation and scoring"
- "Ready to integrate with any CMS or analytics tool"

---

## 9. SUCCESS CRITERIA FOR HACKATHON

- ✅ All pages navigate and are fully responsive
- ✅ Multi-step workflow flows smoothly with no errors
- ✅ Mock data feels realistic and in context
- ✅ UI is polished, modern, and trustworthy
- ✅ No console errors or broken links
- ✅ Fast load times (optimized images, lazy loading where needed)
- ✅ Animations are smooth and purposeful (not cheesy)
- ✅ Dashboard looks like real product (not wireframe)
- ✅ SEO scoring looks detailed and credible
- ✅ Can explain in 2 minutes what the product does
- ✅ Judges impressed by completeness and polish

---

## 10. NEXT STEPS AFTER HACKATHON

Once you advance beyond the hackathon:

1. **Connect Real Database** → Replace mockData with Supabase/Firebase queries
2. **Integrate AI APIs** → OpenAI for blog generation, use real LLM APIs
3. **Add Real Auth** → NextAuth.js or Supabase Auth with email verification
4. **Connect Third-party APIs** → Google Analytics, Stripe for payments, Webhook integrations
5. **Add User Subscriptions** → Stripe integration, usage tracking, rate limiting
6. **Real SEO Analysis** → Connect to SEO APIs (SerpAPI, Semrush, Ahrefs)
7. **Export/Publish** → WordPress API, Medium API, LinkedIn API integrations
8. **Email Notifications** → SendGrid for transactional emails
9. **Monitoring & Analytics** → Posthog or Mixpanel event tracking
10. **CI/CD Pipeline** → GitHub Actions, automated testing before deploy

---

## READY TO BUILD?

Once you approve this plan, I'll generate:

1. **Complete Next.js project structure**
2. **All component files with proper TypeScript**
3. **Mock data service**
4. **Complete styling with Tailwind + shadcn/ui**
5. **All pages linked and routable**
6. **Framer Motion animations**
7. **Responsive design working on all devices**
8. **Ready-to-deploy code**

Let me know if you'd like me to adjust the plan, add/remove components, or change any architectural decisions before I start coding!
