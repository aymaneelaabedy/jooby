"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  CheckCircle2,
  Clock3,
  FileText,
  Filter,
  Heart,
  Home,
  Languages,
  LayoutDashboard,
  LogIn,
  LogOut,
  MapPin,
  Menu,
  ScanText,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserPlus,
  UserRound,
  X,
} from "lucide-react";

const STORAGE_KEY = "jooby_public_mvp_v3";

const seedJobs = [
  {
    id: 1,
    title: "Farm Worker / عامل فلاحي",
    company: "Atlas Harvest",
    location: "Meknes, Morocco",
    type: "Seasonal",
    salary: "3,200–4,500 MAD/month",
    remote: "On-site",
    posted: "2h ago",
    tags: ["Arabic", "French", "Physical Work"],
    level: "No degree needed",
    category: "Farming",
    match: 91,
    featured: true,
    description: "Harvest support, crop handling, packing, and general field work.",
  },
  {
    id: 2,
    title: "Plumber / Plombier / سباك",
    company: "FixFast Services",
    location: "Casablanca, Morocco",
    type: "Full-time",
    salary: "5,500–8,000 MAD/month",
    remote: "On-site",
    posted: "5h ago",
    tags: ["Handyman", "Field Work", "Arabic"],
    level: "Skill-based",
    category: "Handyman",
    match: 94,
    featured: true,
    description: "Install and repair water systems, fittings, and emergency maintenance tasks.",
  },
  {
    id: 3,
    title: "Warehouse Helper",
    company: "NorthHub Logistics",
    location: "Tangier, Morocco",
    type: "Full-time",
    salary: "4,000–5,500 MAD/month",
    remote: "On-site",
    posted: "1d ago",
    tags: ["Loading", "Packing", "French"],
    level: "Entry level",
    category: "Logistics",
    match: 88,
    featured: false,
    description: "Receiving goods, sorting products, loading orders, and preparing shipments.",
  },
  {
    id: 4,
    title: "House Cleaner / Aide ménagère",
    company: "HomeShine",
    location: "Rabat, Morocco",
    type: "Part-time",
    salary: "2,500–4,000 MAD/month",
    remote: "On-site",
    posted: "3d ago",
    tags: ["Cleaning", "Arabic", "Flexible"],
    level: "No degree needed",
    category: "Cleaning",
    match: 86,
    featured: false,
    description: "Home cleaning, organization, sanitization, and support for residential clients.",
  },
  {
    id: 5,
    title: "Senior Full-Stack Engineer",
    company: "NovaHire",
    location: "Remote",
    type: "Full-time",
    salary: "$2.8k–$4.2k/mo",
    remote: "Remote",
    posted: "6h ago",
    tags: ["React", "Node.js", "English"],
    level: "Experienced",
    category: "Engineering",
    match: 93,
    featured: true,
    description: "Build and maintain web platforms, APIs, and scalable product experiences.",
  },
  {
    id: 6,
    title: "Car Washer / Laveur de voitures",
    company: "Spark Mobile Wash",
    location: "Marrakech, Morocco",
    type: "Full-time",
    salary: "3,500–5,000 MAD/month",
    remote: "On-site",
    posted: "8h ago",
    tags: ["Outdoor", "Manual Work", "Arabic"],
    level: "No degree needed",
    category: "Car Care",
    match: 90,
    featured: true,
    description: "Mobile car cleaning, detailing basics, and customer-facing field service.",
  },
  {
    id: 7,
    title: "Electrician / Électricien / كهربائي",
    company: "VoltPro",
    location: "Agadir, Morocco",
    type: "Contract",
    salary: "6,000–9,500 MAD/month",
    remote: "On-site",
    posted: "1d ago",
    tags: ["Technical", "Field", "French"],
    level: "Skill-based",
    category: "Handyman",
    match: 92,
    featured: false,
    description: "Wiring, installation, electrical troubleshooting, and client-site maintenance.",
  },
  {
    id: 8,
    title: "Delivery Rider",
    company: "QuickDrop",
    location: "Casablanca, Morocco",
    type: "Flexible",
    salary: "Per delivery + bonuses",
    remote: "On-site",
    posted: "4h ago",
    tags: ["Driver", "Flexible", "Arabic"],
    level: "Entry level",
    category: "Delivery",
    match: 84,
    featured: false,
    description: "Deliver orders fast, communicate with customers, and manage local routes.",
  },
];

const categories = ["All Jobs", "Farming", "Handyman", "Cleaning", "Logistics", "Delivery", "Car Care", "Engineering", "Hospitality"];

const translations = {
  English: {
    home: "Home",
    jobs: "Jobs",
    cv: "AI CV Maker",
    workers: "Workers",
    employers: "Employers",
    dashboard: "Dashboard",
    createCv: "Create CV",
    postJob: "Post Job",
    signIn: "Sign In",
    signOut: "Sign Out",
    heroTitle1: "Find real work faster.",
    heroTitle2: "Built for everyone, not only degree holders.",
    heroText: "Jobs for workers, handymen, drivers, farms, logistics, and companies.",
    publicMvp: "Public MVP",
    trilingual: "English • Français • العربية",
    searchPlaceholder: "Job title, task, or skill",
    locationPlaceholder: "City or region",
    workModePlaceholder: "Work mode",
    searchButton: "Search",
    allModes: "All modes",
    remote: "Remote",
    hybrid: "Hybrid",
    onsite: "On-site",
    popular: "Popular:",
    popularTags: ["Farm jobs", "Handyman", "No degree", "Arabic speaking", "Delivery", "Warehouse"],
    previewEyebrow: "New brand preview",
    previewTitle: "A clean Jooby public launch direction",
    previewBadge: "Preview",
    previewMainLabel: "Main message",
    previewMainText: "One platform for workers, handymen, drivers, farms, logistics, and companies.",
    feature1Title: "Trilingual",
    feature1Text: "English, French, and Arabic for workers and employers.",
    feature2Title: "AI CV",
    feature2Text: "Build a CV from simple answers and real field experience.",
    feature3Title: "Open market",
    feature3Text: "Professional roles and manual labor jobs live together.",
    feature4Title: "Launch-ready",
    feature4Text: "Structured like a real public product.",
    whyWorkersStay: "Why workers stay",
    whyWorkersTitle: "Built for practical people with skills, effort, and ambition.",
    whyWorkersPoints: [
      "Create a CV without writing it yourself",
      "Apply fast in your own language",
      "Find jobs for farming, handyman work, delivery, warehouse, cleaning, and office roles",
      "Show real-world skills even without diplomas",
      "Get matched based on work ability and availability",
      "Track applications in one simple dashboard"
    ],
    forEmployers: "For employers",
    forEmployersTitle: "Find workers, technicians, labor, operators, and professionals in one place.",
    forEmployersPoints: [
      "Post jobs for offices, farms, workshops, warehouses, sites, homes, and field operations",
      "Search by language, city, category, skill, availability, and experience level",
      "Use AI summaries to review worker profiles faster and hire with confidence"
    ],
    startHiring: "Start hiring",
    workerSetupTitle: "Worker profile setup",
    workerSetupText: "Create a simple profile so companies can find you faster.",
    employerSetupTitle: "Employer tools",
    employerSetupText: "Post jobs and reach workers, technicians, operators, and skilled candidates.",
    dashboardTitle: "Worker dashboard",
    dashboardText: "Track applications, saved jobs, and your profile progress.",
  },
  Français: {
    home: "Accueil",
    jobs: "Emplois",
    cv: "Créateur de CV IA",
    workers: "Travailleurs",
    employers: "Employeurs",
    dashboard: "Tableau de bord",
    createCv: "Créer un CV",
    postJob: "Publier une offre",
    signIn: "Se connecter",
    signOut: "Se déconnecter",
    heroTitle1: "Trouvez un vrai travail plus vite.",
    heroTitle2: "Pensé pour tous, pas seulement pour les diplômés.",
    heroText: "Des emplois pour travailleurs, artisans, chauffeurs, fermes, logistique et entreprises.",
    publicMvp: "MVP public",
    trilingual: "English • Français • العربية",
    searchPlaceholder: "Métier, tâche ou compétence",
    locationPlaceholder: "Ville ou région",
    workModePlaceholder: "Mode de travail",
    searchButton: "Rechercher",
    allModes: "Tous les modes",
    remote: "À distance",
    hybrid: "Hybride",
    onsite: "Sur site",
    popular: "Populaire :",
    popularTags: ["Travail agricole", "Artisan", "Sans diplôme", "Arabe", "Livraison", "Entrepôt"],
    previewEyebrow: "Aperçu",
    previewTitle: "Une direction Jooby propre pour le lancement public",
    previewBadge: "Aperçu",
    previewMainLabel: "Message principal",
    previewMainText: "Une seule plateforme pour travailleurs, artisans, chauffeurs, fermes, logistique et entreprises.",
    feature1Title: "Trilingue",
    feature1Text: "Anglais, français et arabe pour les travailleurs et les employeurs.",
    feature2Title: "CV IA",
    feature2Text: "Créez un CV à partir de réponses simples et d’une expérience réelle.",
    feature3Title: "Marché ouvert",
    feature3Text: "Les emplois qualifiés et manuels vivent sur la même plateforme.",
    feature4Title: "Prêt au lancement",
    feature4Text: "Structuré comme un vrai produit public.",
    whyWorkersStay: "Pourquoi les travailleurs restent",
    whyWorkersTitle: "Pensé pour ceux qui travaillent avec leurs mains, leurs compétences et leur ambition.",
    whyWorkersPoints: [
      "Créer un CV sans l’écrire soi-même",
      "Postuler rapidement dans sa propre langue",
      "Trouver des emplois agricoles, artisanaux, de livraison, d’entrepôt, de nettoyage et de bureau",
      "Montrer ses vraies compétences même sans diplôme",
      "Obtenir un matching selon la capacité de travail et la disponibilité",
      "Suivre ses candidatures dans un tableau de bord simple"
    ],
    forEmployers: "Pour les employeurs",
    forEmployersTitle: "Trouvez ouvriers, techniciens, opérateurs et professionnels au même endroit.",
    forEmployersPoints: [
      "Publiez des offres pour bureaux, fermes, ateliers, entrepôts, chantiers, maisons et opérations terrain",
      "Recherchez par langue, ville, catégorie, compétence, disponibilité et niveau d’expérience",
      "Utilisez les résumés IA pour examiner plus vite les profils et recruter avec confiance"
    ],
    startHiring: "Commencer à recruter",
    workerSetupTitle: "Profil travailleur",
    workerSetupText: "Créez un profil simple pour être trouvé plus vite.",
    employerSetupTitle: "Outils employeur",
    employerSetupText: "Publiez des offres et atteignez ouvriers, techniciens et profils qualifiés.",
    dashboardTitle: "Tableau de bord travailleur",
    dashboardText: "Suivez vos candidatures, offres sauvegardées et progression du profil.",
  },
  العربية: {
    home: "الرئيسية",
    jobs: "الوظائف",
    cv: "صانع السيرة الذاتية بالذكاء الاصطناعي",
    workers: "العمال",
    employers: "المشغلون",
    dashboard: "لوحة التحكم",
    createCv: "إنشاء السيرة الذاتية",
    postJob: "نشر وظيفة",
    signIn: "تسجيل الدخول",
    signOut: "تسجيل الخروج",
    heroTitle1: "اعثر على عمل حقيقي بشكل أسرع.",
    heroTitle2: "مصممة للجميع، وليس فقط لأصحاب الشهادات.",
    heroText: "وظائف للعمال والحرفيين والسائقين والفلاحة واللوجستيك والشركات.",
    publicMvp: "نسخة تجريبية عامة",
    trilingual: "English • Français • العربية",
    searchPlaceholder: "المهنة أو المهمة أو المهارة",
    locationPlaceholder: "المدينة أو المنطقة",
    workModePlaceholder: "نمط العمل",
    searchButton: "بحث",
    allModes: "كل الأنماط",
    remote: "عن بُعد",
    hybrid: "هجين",
    onsite: "في عين المكان",
    popular: "الأكثر طلباً:",
    popularTags: ["وظائف فلاحية", "حرفي", "بدون شهادة", "ناطق بالعربية", "توصيل", "مستودع"],
    previewEyebrow: "معاينة",
    previewTitle: "اتجاه Jooby نظيف للإطلاق العام",
    previewBadge: "معاينة",
    previewMainLabel: "الرسالة الأساسية",
    previewMainText: "منصة واحدة للعمال والحرفيين والسائقين والفلاحة واللوجستيك والشركات.",
    feature1Title: "ثلاثي اللغة",
    feature1Text: "الإنجليزية والفرنسية والعربية للعمال والمشغلين.",
    feature2Title: "سيرة ذاتية بالذكاء الاصطناعي",
    feature2Text: "أنشئ سيرة ذاتية من إجابات بسيطة وخبرة حقيقية.",
    feature3Title: "سوق مفتوح",
    feature3Text: "الوظائف المهنية واليدوية معاً في نفس المنصة.",
    feature4Title: "جاهزة للإطلاق",
    feature4Text: "مبنية كمنتج عام حقيقي.",
    whyWorkersStay: "لماذا يفضّل العمال المنصة",
    whyWorkersTitle: "مصممة لمن يشتغل بيديه ومهارته وجهده وطموحه.",
    whyWorkersPoints: [
      "إنشاء سيرة ذاتية بدون كتابتها بنفسك",
      "التقديم بسرعة بلغتك الخاصة",
      "العثور على وظائف الفلاحة والحرف والتوصيل والمستودعات والتنظيف والمكاتب",
      "إظهار المهارات الحقيقية حتى بدون دبلوم",
      "الحصول على مطابقة حسب القدرة على العمل والتوفر",
      "تتبّع الطلبات داخل لوحة بسيطة"
    ],
    forEmployers: "للمشغلين",
    forEmployersTitle: "اعثر على العمال والتقنيين واليد العاملة والمشغلين والمهنيين في مكان واحد.",
    forEmployersPoints: [
      "انشر وظائف للمكاتب والضيعات والورشات والمستودعات والأوراش والمنازل والعمليات الميدانية",
      "ابحث حسب اللغة والمدينة والفئة والمهارة والتوفر ومستوى الخبرة",
      "استعمل ملخصات الذكاء الاصطناعي لمراجعة الملفات بسرعة والتوظيف بثقة"
    ],
    startHiring: "ابدأ التوظيف",
    workerSetupTitle: "إعداد ملف العامل",
    workerSetupText: "أنشئ ملفاً بسيطاً حتى تجدك الشركات بسرعة أكبر.",
    employerSetupTitle: "أدوات المشغل",
    employerSetupText: "انشر الوظائف ووصل إلى العمال والتقنيين وأصحاب المهارات.",
    dashboardTitle: "لوحة العامل",
    dashboardText: "تتبّع طلباتك والوظائف المحفوظة وتقدم ملفك الشخصي.",
  },
};

function getDefaultState() {
  return {
    userRole: "guest",
    workerProfile: {
      name: "",
      phone: "",
      email: "",
      city: "",
      language: "English",
      category: "Handyman",
      education: "No degree",
      experience: "",
      skills: "",
      availability: "Immediate",
      profileStrength: 62,
    },
    employerProfile: {
      companyName: "",
      recruiterName: "",
      email: "",
      phone: "",
      city: "",
    },
    generatedCv: null,
    savedIds: [],
    applications: [],
    postedJobs: [],
  };
}

function mergeState(raw) {
  const defaults = getDefaultState();
  return {
    ...defaults,
    ...raw,
    workerProfile: { ...defaults.workerProfile, ...(raw?.workerProfile || {}) },
    employerProfile: { ...defaults.employerProfile, ...(raw?.employerProfile || {}) },
    generatedCv: raw?.generatedCv || null,
    savedIds: Array.isArray(raw?.savedIds) ? raw.savedIds : [],
    applications: Array.isArray(raw?.applications) ? raw.applications : [],
    postedJobs: Array.isArray(raw?.postedJobs) ? raw.postedJobs : [],
  };
}

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Card({ className = "", children }) {
  return <div className={cn("rounded-3xl border border-sky-100 bg-white shadow-sm", className)}>{children}</div>;
}

function CardHeader({ className = "", children }) {
  return <div className={cn("px-6 pt-6", className)}>{children}</div>;
}

function CardTitle({ className = "", children }) {
  return <h3 className={cn("text-xl font-semibold tracking-tight text-slate-900", className)}>{children}</h3>;
}

function CardContent({ className = "", children }) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

function Button({ className = "", variant = "default", size = "default", children, ...props }) {
  const variants = {
    default: "bg-sky-600 text-white hover:bg-sky-700",
    outline: "border border-sky-200 bg-white text-sky-700 hover:bg-sky-50",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
    secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200",
  };
  const sizes = {
    default: "h-11 px-4 py-2",
    icon: "h-11 w-11",
    sm: "h-9 px-3",
  };
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-sky-200 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function Input({ className = "", ...props }) {
  return <input className={cn("h-11 w-full rounded-2xl border border-sky-100 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-sky-300", className)} {...props} />;
}

function Textarea({ className = "", ...props }) {
  return <textarea className={cn("w-full rounded-2xl border border-sky-100 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-sky-300", className)} {...props} />;
}

function Badge({ className = "", children, ...props }) {
  return <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-medium", className)} {...props}>{children}</span>;
}

function Progress({ value }) {
  return (
    <div className="h-2 rounded-full bg-slate-100">
      <div className="h-2 rounded-full bg-sky-600" style={{ width: `${Math.max(0, Math.min(100, value || 0))}%` }} />
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="space-y-2 text-sm text-slate-600">
      <span className="block font-medium">{label}</span>
      {children}
    </label>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <Field label={label}>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="h-11 w-full rounded-2xl border border-sky-100 bg-white px-4 text-sm text-slate-900 outline-none focus:border-sky-300">
        {options.map((item) => (
          <option key={item.value ?? item} value={item.value ?? item}>
            {item.label ?? item}
          </option>
        ))}
      </select>
    </Field>
  );
}

function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.98, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="w-full max-w-2xl rounded-[28px] border border-sky-100 bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-sky-100 px-6 py-4">
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          <Button type="button" variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5" /></Button>
        </div>
        <div className="max-h-[80vh] overflow-auto p-6">{children}</div>
      </motion.div>
    </div>
  );
}

function SectionTitle({ title, text }) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
      <p className="mt-1 text-slate-500">{text}</p>
    </div>
  );
}

function JoobyWordmark({ dark = false, large = false }) {
  return <div className={cn("font-semibold tracking-[-0.05em]", dark ? "text-white" : "text-slate-950", large ? "text-6xl sm:text-7xl lg:text-8xl" : "text-2xl")}>jooby</div>;
}

function JobCard({ job, onApply, onSave, savedIds, onViewDetails, setActivePage }) {
  const isSaved = savedIds.includes(job.id);
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
      <Card className="transition-all hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-lg">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                {job.featured ? <Badge className="bg-sky-600 text-white">Featured</Badge> : null}
                <Badge className="bg-sky-50 text-sky-700">{job.remote}</Badge>
                <Badge className="border border-sky-200 bg-white text-sky-700">{job.type}</Badge>
                <Badge className="border border-emerald-200 bg-white text-emerald-700">{job.level}</Badge>
              </div>
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-slate-900">{job.title}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-1"><Building2 className="h-4 w-4 text-sky-600" /> {job.company}</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4 text-sky-600" /> {job.location}</span>
                  <span className="inline-flex items-center gap-1"><Clock3 className="h-4 w-4 text-sky-600" /> {job.posted}</span>
                </div>
              </div>
              <p className="text-sm leading-7 text-slate-600">{job.description}</p>
              <div className="flex flex-wrap gap-2">
                {(job.tags || []).map((tag) => <Badge key={`${job.id}-${tag}`} className="bg-slate-100 text-slate-700">{tag}</Badge>)}
              </div>
              <div className="grid gap-4 pt-1 sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">Salary</p>
                  <p className="font-semibold">{job.salary}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">Category</p>
                  <p className="font-semibold">{job.category}</p>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-xs uppercase tracking-wide text-slate-500">AI match</p>
                    <span className="text-sm font-semibold">{job.match}%</span>
                  </div>
                  <Progress value={job.match} />
                </div>
              </div>
            </div>
            <div className="hidden flex-col gap-2 sm:flex">
              <Button type="button" size="icon" variant="outline" onClick={() => onSave(job.id)}><Heart className={cn("h-4 w-4", isSaved && "fill-sky-600 text-sky-600")} /></Button>
              <Button type="button" variant="outline" onClick={() => onViewDetails(job)}>Details</Button>
              <Button type="button" onClick={() => onApply(job)}>Apply</Button>
              <Button type="button" variant="ghost" onClick={() => setActivePage("dashboard")}>Track</Button>
            </div>
          </div>
          <div className="mt-4 flex gap-2 sm:hidden">
            <Button type="button" size="icon" variant="outline" onClick={() => onSave(job.id)}><Heart className={cn("h-4 w-4", isSaved && "fill-sky-600 text-sky-600")} /></Button>
            <Button type="button" variant="outline" onClick={() => onViewDetails(job)}>Details</Button>
            <Button type="button" className="flex-1" onClick={() => onApply(job)}>Apply</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function WorkerSignup({ profile, setProfile, onFinish }) {
  return (
    <div className="mx-auto max-w-4xl">
      <Card>
        <CardHeader><CardTitle>Create your worker profile</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Full name"><Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} /></Field>
            <Field label="Phone number"><Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} /></Field>
            <Field label="Email"><Input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} /></Field>
            <Field label="City"><Input value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })} /></Field>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <SelectField label="Language" value={profile.language} onChange={(value) => setProfile({ ...profile, language: value })} options={["English", "Français", "العربية"]} />
            <SelectField label="Main category" value={profile.category} onChange={(value) => setProfile({ ...profile, category: value })} options={categories.filter((item) => item !== "All Jobs")} />
            <SelectField label="Education" value={profile.education} onChange={(value) => setProfile({ ...profile, education: value })} options={["No degree", "High school", "Technical diploma", "Bachelor", "Other"]} />
          </div>
          <Field label="Experience"><Textarea rows={6} value={profile.experience} onChange={(e) => setProfile({ ...profile, experience: e.target.value, profileStrength: Math.min(98, 58 + Math.floor(e.target.value.length / 4)) })} /></Field>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Skills"><Input value={profile.skills} onChange={(e) => setProfile({ ...profile, skills: e.target.value })} /></Field>
            <Field label="Availability"><Input value={profile.availability} onChange={(e) => setProfile({ ...profile, availability: e.target.value })} /></Field>
          </div>
          <Button type="button" onClick={onFinish}>Save profile</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function EmployerSetup({ employerProfile, setEmployerProfile, onFinish }) {
  return (
    <div className="mx-auto max-w-4xl">
      <Card>
        <CardHeader><CardTitle>Create employer account</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Company name"><Input value={employerProfile.companyName} onChange={(e) => setEmployerProfile({ ...employerProfile, companyName: e.target.value })} /></Field>
            <Field label="Recruiter name"><Input value={employerProfile.recruiterName} onChange={(e) => setEmployerProfile({ ...employerProfile, recruiterName: e.target.value })} /></Field>
            <Field label="Email"><Input value={employerProfile.email} onChange={(e) => setEmployerProfile({ ...employerProfile, email: e.target.value })} /></Field>
            <Field label="Phone"><Input value={employerProfile.phone} onChange={(e) => setEmployerProfile({ ...employerProfile, phone: e.target.value })} /></Field>
          </div>
          <Field label="City"><Input value={employerProfile.city} onChange={(e) => setEmployerProfile({ ...employerProfile, city: e.target.value })} /></Field>
          <Button type="button" onClick={onFinish}>Save employer profile</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function CvMakerPage({ profile, cvData, setCvData, onGenerate, generatedCv, onExport }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <Card>
        <CardHeader><CardTitle>AI CV Builder</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Full name"><Input value={cvData.name} onChange={(e) => setCvData({ ...cvData, name: e.target.value })} /></Field>
            <Field label="Target job"><Input value={cvData.targetJob} onChange={(e) => setCvData({ ...cvData, targetJob: e.target.value })} /></Field>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Phone"><Input value={cvData.phone} onChange={(e) => setCvData({ ...cvData, phone: e.target.value })} /></Field>
            <Field label="City"><Input value={cvData.city} onChange={(e) => setCvData({ ...cvData, city: e.target.value })} /></Field>
          </div>
          <SelectField label="CV language" value={cvData.language} onChange={(value) => setCvData({ ...cvData, language: value })} options={["English", "Français", "العربية"]} />
          <Field label="Experience"><Textarea rows={5} value={cvData.experience} onChange={(e) => setCvData({ ...cvData, experience: e.target.value })} /></Field>
          <Field label="Skills"><Textarea rows={4} value={cvData.skills} onChange={(e) => setCvData({ ...cvData, skills: e.target.value })} /></Field>
          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={onGenerate}>Generate CV</Button>
            <Button type="button" variant="outline" onClick={() => setCvData({ name: profile.name, targetJob: profile.category, phone: profile.phone, city: profile.city, language: profile.language, experience: profile.experience, skills: profile.skills })}>Use worker profile</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Generated CV preview</CardTitle></CardHeader>
        <CardContent>
          {!generatedCv ? (
            <div className="rounded-2xl border border-dashed border-sky-200 bg-sky-50 p-6 text-sm text-slate-600">Fill the form and generate. Your CV preview will appear here.</div>
          ) : (
            <div className="space-y-4 rounded-[24px] border border-sky-100 bg-sky-50 p-6">
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-slate-900">{generatedCv.name}</h3>
                <p className="text-sm text-slate-500">{generatedCv.city} • {generatedCv.phone}</p>
              </div>
              <div><p className="text-xs uppercase tracking-wide text-sky-700">Target role</p><p className="font-semibold text-slate-900">{generatedCv.targetJob}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-sky-700">Professional summary</p><p className="mt-1 leading-7 text-slate-700">{generatedCv.summary}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-sky-700">Experience</p><p className="mt-1 leading-7 text-slate-700">{generatedCv.experience}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-sky-700">Skills</p><p className="mt-1 leading-7 text-slate-700">{generatedCv.skills}</p></div>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-white text-sky-700">{generatedCv.language} CV ready</Badge>
                <Button type="button" variant="outline" onClick={onExport}>Copy CV</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function EmployersPage({ companyDraft, setCompanyDraft, postedJobs, onPostJob, setActivePage, onDeletePostedJob }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <Card>
        <CardHeader><CardTitle>Post a job</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Company name"><Input value={companyDraft.company} onChange={(e) => setCompanyDraft({ ...companyDraft, company: e.target.value })} /></Field>
            <Field label="Job title"><Input value={companyDraft.title} onChange={(e) => setCompanyDraft({ ...companyDraft, title: e.target.value })} /></Field>
            <Field label="City or location"><Input value={companyDraft.location} onChange={(e) => setCompanyDraft({ ...companyDraft, location: e.target.value })} /></Field>
            <Field label="Salary or rate"><Input value={companyDraft.salary} onChange={(e) => setCompanyDraft({ ...companyDraft, salary: e.target.value })} /></Field>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <SelectField label="Category" value={companyDraft.category} onChange={(value) => setCompanyDraft({ ...companyDraft, category: value })} options={categories.filter((item) => item !== "All Jobs")} />
            <SelectField label="Type" value={companyDraft.type} onChange={(value) => setCompanyDraft({ ...companyDraft, type: value })} options={["Full-time", "Part-time", "Seasonal", "Flexible", "Contract"]} />
            <SelectField label="Language" value={companyDraft.language} onChange={(value) => setCompanyDraft({ ...companyDraft, language: value })} options={["English", "Français", "العربية", "Mixed"]} />
          </div>
          <Field label="Description"><Textarea rows={6} value={companyDraft.description} onChange={(e) => setCompanyDraft({ ...companyDraft, description: e.target.value })} /></Field>
          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={onPostJob}>Publish job</Button>
            <Button type="button" variant="outline" onClick={() => setActivePage("jobs")}>See marketplace</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Your live jobs</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {postedJobs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-sky-200 bg-sky-50 p-6 text-sm text-slate-600">No jobs posted yet. Publish one from the form.</div>
          ) : (
            postedJobs.map((job) => (
              <div key={job.id} className="rounded-2xl border border-sky-100 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{job.title}</p>
                    <p className="text-sm text-slate-500">{job.company} • {job.location}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-sky-100 text-sky-700">Live</Badge>
                    <Button type="button" size="icon" variant="ghost" className="text-rose-600 hover:bg-rose-50 hover:text-rose-700" onClick={() => onDeletePostedJob(job.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
                <p className="mt-2 text-sm text-slate-600">{job.description}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function WorkerDashboard({ applications, savedJobs, profile, setActivePage, onDeleteApplication }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={() => setActivePage("jobs")}>Browse jobs</Button>
        <Button type="button" variant="outline" onClick={() => setActivePage("cv")}>Update CV</Button>
        <Button type="button" variant="outline" onClick={() => setActivePage("workers")}>Edit profile</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Applications", applications.length],
          ["Saved jobs", savedJobs.length],
          ["CV language", profile.language],
          ["Profile strength", `${profile.profileStrength}%`],
        ].map(([label, value]) => (
          <Card key={label}>
            <CardContent className="p-5">
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Recent applications</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {applications.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-sky-200 bg-sky-50 p-6 text-sm text-slate-600">No applications yet. Apply to a job and it will appear here.</div>
            ) : (
              applications.map((item) => (
                <div key={item.id} className="rounded-2xl border border-sky-100 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{item.jobTitle}</p>
                      <p className="text-sm text-slate-500">{item.company}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-emerald-100 text-emerald-700">Submitted</Badge>
                      <Button type="button" size="icon" variant="ghost" className="text-rose-600 hover:bg-rose-50 hover:text-rose-700" onClick={() => onDeleteApplication(item.id)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">Applied with {item.cvLanguage} CV</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Saved jobs</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {savedJobs.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-sky-200 bg-sky-50 p-6 text-sm text-slate-600">No saved jobs yet. Tap the heart button on any role.</div>
            ) : (
              savedJobs.map((job) => (
                <div key={job.id} className="rounded-2xl border border-sky-100 p-4">
                  <p className="font-semibold text-slate-900">{job.title}</p>
                  <p className="text-sm text-slate-500">{job.company} • {job.location}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function JobSearchWebsiteConcept() {
  const [hydrated, setHydrated] = useState(false);
  const [appState, setAppState] = useState(getDefaultState());
  const [activePage, setActivePage] = useState("home");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [workMode, setWorkMode] = useState("all");
  const [category, setCategory] = useState("All Jobs");
  const [language, setLanguage] = useState("English");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [jobDetailOpen, setJobDetailOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [copied, setCopied] = useState(false);
  const toastTimerRef = useRef(null);
  const copiedTimerRef = useRef(null);

  const [cvData, setCvData] = useState({
    name: "",
    targetJob: "",
    phone: "",
    city: "",
    language: "English",
    experience: "",
    skills: "",
  });

  const [companyDraft, setCompanyDraft] = useState({
    company: "",
    title: "",
    location: "",
    salary: "",
    category: "Handyman",
    type: "Full-time",
    language: "Mixed",
    description: "",
  });

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const next = mergeState(parsed);
        setAppState(next);
        if (next.workerProfile.language) setLanguage(next.workerProfile.language);
      }
    } catch {
      setAppState(getDefaultState());
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  }, [appState, hydrated]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
      if (copiedTimerRef.current) window.clearTimeout(copiedTimerRef.current);
    };
  }, []);

  const t = translations[language] || translations.English;
  const isArabic = language === "العربية";
  const workerProfile = appState.workerProfile;
  const employerProfile = appState.employerProfile;
  const generatedCv = appState.generatedCv;
  const savedIds = appState.savedIds;
  const applications = appState.applications;
  const postedJobs = appState.postedJobs;
  const userRole = appState.userRole;

  const allJobs = useMemo(() => [...postedJobs, ...seedJobs], [postedJobs]);

  const filteredJobs = useMemo(() => allJobs.filter((job) => {
    const q = query.trim().toLowerCase();
    const l = location.trim().toLowerCase();
    const matchesQuery = !q || [job.title, job.company, job.category, job.level || "", ...(job.tags || [])].join(" ").toLowerCase().includes(q);
    const matchesLocation = !l || job.location.toLowerCase().includes(l);
    const matchesMode = workMode === "all" || String(job.remote || "").toLowerCase() === workMode;
    const matchesCategory = category === "All Jobs" || job.category === category;
    return matchesQuery && matchesLocation && matchesMode && matchesCategory;
  }), [allJobs, query, location, workMode, category]);

  const savedJobs = useMemo(() => allJobs.filter((job) => savedIds.includes(job.id)), [allJobs, savedIds]);

  const showToast = (message) => {
    setToast(message);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(""), 2200);
  };

  const persist = (updater) => setAppState((prev) => updater(prev));
  const setWorkerProfile = (next) => persist((prev) => ({ ...prev, workerProfile: next }));
  const setEmployerProfile = (next) => persist((prev) => ({ ...prev, employerProfile: next }));
  const setGeneratedCv = (next) => persist((prev) => ({ ...prev, generatedCv: next }));

  const clearFilters = () => {
    setQuery("");
    setLocation("");
    setWorkMode("all");
    setCategory("All Jobs");
    showToast("Filters reset");
  };

  const signInAs = (role) => {
    persist((prev) => ({ ...prev, userRole: role }));
    setAuthModalOpen(false);
    setMobileMenuOpen(false);
    setActivePage(role === "worker" ? "workers" : "employers");
    showToast(role === "worker" ? "Signed in as worker" : "Signed in as employer");
  };

  const signOut = () => {
    persist((prev) => ({ ...prev, userRole: "guest" }));
    setActivePage("home");
    setMobileMenuOpen(false);
    setApplyModalOpen(false);
    setJobDetailOpen(false);
    setAuthModalOpen(false);
    showToast("Signed out");
  };

  const onSaveJob = (id) => {
    persist((prev) => {
      const exists = prev.savedIds.includes(id);
      showToast(exists ? "Job removed from saved list" : "Job saved successfully");
      return { ...prev, savedIds: exists ? prev.savedIds.filter((item) => item !== id) : [...prev.savedIds, id] };
    });
  };

  const onApplyClick = (job) => {
    if (userRole === "guest") {
      setAuthModalOpen(true);
      return;
    }
    setSelectedJob(job);
    setApplyModalOpen(true);
  };

  const submitApplication = () => {
    if (!selectedJob) return;
    let alreadyApplied = false;
    persist((prev) => {
      alreadyApplied = prev.applications.some((item) => item.jobId === selectedJob.id);
      if (alreadyApplied) return prev;
      return {
        ...prev,
        applications: [
          {
            id: Date.now(),
            jobId: selectedJob.id,
            jobTitle: selectedJob.title,
            company: selectedJob.company,
            cvLanguage: prev.generatedCv?.language || prev.workerProfile.language,
          },
          ...prev.applications,
        ],
      };
    });
    showToast(alreadyApplied ? "You already applied to this job" : `Application sent to ${selectedJob.company}`);
    setApplyModalOpen(false);
    setActivePage("dashboard");
  };

  const onGenerateCv = () => {
    const name = cvData.name || workerProfile.name || "Your Name";
    const city = cvData.city || workerProfile.city || "Your City";
    const phone = cvData.phone || workerProfile.phone || "+212...";
    const targetJob = cvData.targetJob || workerProfile.category || "General Worker";
    const experience = cvData.experience || workerProfile.experience || "Reliable worker with practical field experience.";
    const skills = cvData.skills || workerProfile.skills || "Hard work, teamwork, punctuality, adaptability";
    const summaries = {
      English: `Motivated and dependable worker with hands-on experience relevant to ${targetJob}. Ready to contribute quickly, follow instructions, and deliver consistent work quality.`,
      Français: `Travailleur motivé et fiable avec une expérience pratique liée au poste de ${targetJob}. Prêt à contribuer rapidement, suivre les consignes et fournir un travail constant.`,
      العربية: `عامل جاد ويمكن الاعتماد عليه، لديه خبرة عملية مناسبة لوظيفة ${targetJob}، وجاهز للاندماج بسرعة واحترام التعليمات وتقديم عمل بجودة ثابتة.`,
    };
    const nextCv = { name, city, phone, targetJob, language: cvData.language, summary: summaries[cvData.language] || summaries.English, experience, skills };
    setGeneratedCv(nextCv);
    setWorkerProfile({ ...workerProfile, language: cvData.language, profileStrength: Math.max(workerProfile.profileStrength, 88) });
    setLanguage(cvData.language);
    showToast("AI CV generated successfully");
  };

  const exportCv = async () => {
    if (!generatedCv) return;
    const text = `${generatedCv.name}\n${generatedCv.city} • ${generatedCv.phone}\n\nTarget role: ${generatedCv.targetJob}\n\nProfessional summary:\n${generatedCv.summary}\n\nExperience:\n${generatedCv.experience}\n\nSkills:\n${generatedCv.skills}\n\nLanguage: ${generatedCv.language}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showToast("CV copied to clipboard");
      if (copiedTimerRef.current) window.clearTimeout(copiedTimerRef.current);
      copiedTimerRef.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      showToast("Copy failed on this browser");
    }
  };

  const onPostJob = () => {
    if (!companyDraft.company || !companyDraft.title || !companyDraft.location) {
      showToast("Please complete the main job fields");
      return;
    }
    const newJob = {
      id: Date.now(),
      title: companyDraft.title,
      company: companyDraft.company,
      location: companyDraft.location,
      type: companyDraft.type,
      salary: companyDraft.salary || "To be discussed",
      remote: "On-site",
      posted: "Just now",
      tags: [companyDraft.language, companyDraft.category, "New job"],
      level: "Open to all",
      category: companyDraft.category,
      match: 89,
      featured: true,
      description: companyDraft.description || "Company posted a new opportunity.",
    };
    persist((prev) => ({ ...prev, postedJobs: [newJob, ...prev.postedJobs] }));
    setCompanyDraft({ company: employerProfile.companyName || companyDraft.company, title: "", location: employerProfile.city || companyDraft.location, salary: "", category: "Handyman", type: "Full-time", language: "Mixed", description: "" });
    setActivePage("jobs");
    showToast("Job published successfully");
  };

  const deletePostedJob = (id) => {
    persist((prev) => ({ ...prev, postedJobs: prev.postedJobs.filter((job) => job.id !== id) }));
    showToast("Posted job removed");
  };

  const deleteApplication = (id) => {
    persist((prev) => ({ ...prev, applications: prev.applications.filter((item) => item.id !== id) }));
    showToast("Application removed");
  };

  const resetDemoData = () => {
    setAppState(getDefaultState());
    setLanguage("English");
    setCvData({ name: "", targetJob: "", phone: "", city: "", language: "English", experience: "", skills: "" });
    setCompanyDraft({ company: "", title: "", location: "", salary: "", category: "Handyman", type: "Full-time", language: "Mixed", description: "" });
    setQuery("");
    setLocation("");
    setWorkMode("all");
    setCategory("All Jobs");
    setActivePage("home");
    setSelectedJob(null);
    setApplyModalOpen(false);
    setJobDetailOpen(false);
    setAuthModalOpen(false);
    setCopied(false);
    showToast("Demo data reset");
  };

  const navItems = [
    { id: "home", label: t.home, icon: Home },
    { id: "jobs", label: t.jobs, icon: BriefcaseBusiness },
    { id: "cv", label: t.cv, icon: FileText },
    { id: "workers", label: t.workers, icon: UserPlus },
    { id: "employers", label: t.employers, icon: Building2 },
    { id: "dashboard", label: t.dashboard, icon: LayoutDashboard },
  ];

  const NavButtons = () => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activePage === item.id;
        return (
          <Button key={item.id} type="button" variant={isActive ? "default" : "ghost"} className={cn("rounded-xl px-4", !isActive && "text-slate-700 hover:bg-sky-50 hover:text-sky-700")} onClick={() => { setActivePage(item.id); setMobileMenuOpen(false); }}>
            <Icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Button>
        );
      })}
    </>
  );

  if (!hydrated) {
    return <div className="grid min-h-screen place-items-center bg-sky-50 text-slate-600">Loading Jooby...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-cyan-50 text-slate-900" dir={isArabic ? "rtl" : "ltr"}>
      <section className="relative overflow-hidden border-b border-sky-100 bg-white/80 backdrop-blur">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.15),transparent_30%),radial-gradient(circle_at_top_left,rgba(125,211,252,0.18),transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <button type="button" className="flex items-center gap-3 text-left" onClick={() => setActivePage("home")}>
              <JoobyWordmark />
            </button>
            <div className="hidden items-center gap-2 lg:flex">
              <NavButtons />
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="h-11 rounded-xl border border-sky-100 bg-white px-4 text-sm text-slate-900 outline-none">
                <option value="English">English</option>
                <option value="Français">Français</option>
                <option value="العربية">العربية</option>
              </select>
              {userRole === "guest" ? (
                <Button type="button" onClick={() => setAuthModalOpen(true)}><LogIn className="h-4 w-4" /> {t.signIn}</Button>
              ) : (
                <Button type="button" variant="outline" onClick={signOut}><LogOut className="h-4 w-4" /> {t.signOut}</Button>
              )}
            </div>
            <div className="flex items-center gap-2 lg:hidden">
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="h-11 rounded-xl border border-sky-100 bg-white px-4 text-sm text-slate-900 outline-none">
                <option value="English">English</option>
                <option value="Français">Français</option>
                <option value="العربية">العربية</option>
              </select>
              <Button type="button" variant="outline" size="icon" onClick={() => setMobileMenuOpen((prev) => !prev)}>{mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</Button>
            </div>
          </div>
          {mobileMenuOpen ? (
            <div className="mt-4 space-y-3 rounded-2xl border border-sky-100 bg-white p-3 lg:hidden">
              <div className="flex flex-wrap gap-2"><NavButtons /></div>
              <div className="flex flex-wrap gap-2">
                {userRole === "guest" ? <Button type="button" onClick={() => setAuthModalOpen(true)}><LogIn className="h-4 w-4" /> {t.signIn}</Button> : <Button type="button" variant="outline" onClick={signOut}><LogOut className="h-4 w-4" /> {t.signOut}</Button>}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <AnimatePresence mode="wait">
        {activePage === "home" ? (
          <motion.div key="home" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
            <section className="mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 lg:px-8">
              <div className="grid items-center gap-10 lg:grid-cols-2">
                <div>
                  <div className="mb-6 flex flex-wrap gap-3">
                    <div className="rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-medium text-sky-800 shadow-sm">{t.publicMvp}</div>
                    <div className="rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">{t.trilingual}</div>
                  </div>
                  <div className="mb-5"><JoobyWordmark large /></div>
                  <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                    {t.heroTitle1}
                    <span className="block text-sky-700">{t.heroTitle2}</span>
                  </h1>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{t.heroText}</p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button type="button" className="px-6" onClick={() => setActivePage("jobs")}>{t.jobs}</Button>
                    <Button type="button" variant="outline" className="px-6" onClick={() => setActivePage("cv")}>{t.createCv}</Button>
                    <Button type="button" variant="outline" className="px-6" onClick={() => setActivePage("employers")}>{t.postJob}</Button>
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm"><p className="text-sm text-slate-500">Coverage</p><p className="mt-1 text-lg font-semibold text-slate-900">12+ cities</p></div>
                    <div className="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm"><p className="text-sm text-slate-500">Job types</p><p className="mt-1 text-lg font-semibold text-slate-900">Field + office</p></div>
                    <div className="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm"><p className="text-sm text-slate-500">Access</p><p className="mt-1 text-lg font-semibold text-slate-900">3 languages</p></div>
                  </div>
                  <Card className="mt-8 shadow-xl">
                    <CardContent className="p-4 sm:p-5">
                      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_180px_180px_140px]">
                        <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.searchPlaceholder} className="pl-9" /></div>
                        <div className="relative"><MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder={t.locationPlaceholder} className="pl-9" /></div>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-11 rounded-2xl border border-sky-100 bg-white px-4 text-sm text-slate-900 outline-none">{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select>
                        <select value={workMode} onChange={(e) => setWorkMode(e.target.value)} className="h-11 rounded-2xl border border-sky-100 bg-white px-4 text-sm text-slate-900 outline-none"><option value="all">{t.allModes}</option><option value="remote">{t.remote}</option><option value="hybrid">{t.hybrid}</option><option value="on-site">{t.onsite}</option></select>
                        <Button type="button" onClick={() => setActivePage("jobs")}>{t.searchButton}</Button>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 pt-4 text-sm text-slate-500">
                        <span className="inline-flex items-center gap-1"><Filter className="h-4 w-4 text-sky-600" /> {t.popular}</span>
                        {t.popularTags.map((item) => <Badge key={item} className="cursor-pointer bg-slate-100 text-slate-700 hover:bg-sky-100" onClick={() => { setQuery(item); setActivePage("jobs"); }}>{item}</Badge>)}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <Card className="overflow-hidden border border-sky-200 bg-[linear-gradient(135deg,#38bdf8_0%,#0ea5e9_48%,#0284c7_100%)] text-white shadow-2xl">
                  <CardContent className="p-7 sm:p-8">
                    <div className="flex items-center justify-between">
                      <div><p className="text-sm text-sky-100">{t.previewEyebrow}</p><h2 className="mt-1 text-2xl font-semibold">{t.previewTitle}</h2></div>
                      <Badge className="bg-white text-sky-700">{t.previewBadge}</Badge>
                    </div>
                    <div className="mt-8 rounded-[28px] border border-white/50 bg-white p-5 text-slate-950 shadow-[0_24px_80px_rgba(2,132,199,0.22)]">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-4"><JoobyWordmark /><div className="flex items-center gap-2"><div className="h-2.5 w-2.5 rounded-full bg-slate-200" /><div className="h-2.5 w-2.5 rounded-full bg-slate-200" /><div className="h-2.5 w-2.5 rounded-full bg-slate-200" /></div></div>
                      <div className="mt-5 grid gap-4">
                        <div className="rounded-3xl bg-slate-50 p-5 text-center"><p className="text-sm font-medium text-slate-500">{t.previewMainLabel}</p><p className="mt-2 text-2xl font-semibold leading-tight text-slate-950">{t.previewMainText}</p></div>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="rounded-2xl border border-slate-100 p-4"><p className="text-xs text-slate-500">Workers</p><p className="mt-1 text-lg font-semibold text-slate-900">Practical</p></div>
                          <div className="rounded-2xl border border-slate-100 p-4"><p className="text-xs text-slate-500">Hiring</p><p className="mt-1 text-lg font-semibold text-slate-900">Fast</p></div>
                          <div className="rounded-2xl border border-slate-100 p-4"><p className="text-xs text-slate-500">Access</p><p className="mt-1 text-lg font-semibold text-slate-900">Inclusive</p></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="grid gap-5 lg:grid-cols-4">
                {[
                  { icon: Languages, title: t.feature1Title, text: t.feature1Text },
                  { icon: ScanText, title: t.feature2Title, text: t.feature2Text },
                  { icon: BriefcaseBusiness, title: t.feature3Title, text: t.feature3Text },
                  { icon: ShieldCheck, title: t.feature4Title, text: t.feature4Text },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <Card key={item.title} className="transition-all hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-lg">
                      <CardContent className="p-5">
                        <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-sky-100 text-sky-700"><Icon className="h-5 w-5" /></div>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="mt-2 leading-7 text-slate-600">{item.text}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          </motion.div>
        ) : null}

        {activePage === "jobs" ? (
          <motion.section key="jobs" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <SectionTitle title={t.jobs} text="Explore jobs for professionals, field workers, handymen, logistics, and more." />
            <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
              <Card>
                <CardHeader><CardTitle>Search & filters</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder={t.searchPlaceholder} value={query} onChange={(e) => setQuery(e.target.value)} />
                  <Input placeholder={t.locationPlaceholder} value={location} onChange={(e) => setLocation(e.target.value)} />
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-11 w-full rounded-2xl border border-sky-100 bg-white px-4 text-sm text-slate-900 outline-none">{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select>
                  <select value={workMode} onChange={(e) => setWorkMode(e.target.value)} className="h-11 w-full rounded-2xl border border-sky-100 bg-white px-4 text-sm text-slate-900 outline-none"><option value="all">{t.allModes}</option><option value="remote">{t.remote}</option><option value="hybrid">{t.hybrid}</option><option value="on-site">{t.onsite}</option></select>
                  <div className="flex gap-3">
                    <Button type="button" className="flex-1" onClick={() => showToast("Filters applied")}>Apply</Button>
                    <Button type="button" variant="outline" onClick={clearFilters}>Reset</Button>
                  </div>
                </CardContent>
              </Card>
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-slate-500">{filteredJobs.length} jobs matching your search</p>
                  <Button type="button" variant="outline" onClick={() => showToast("Sorted by relevance")}>Sort by relevance</Button>
                </div>
                {filteredJobs.length === 0 ? (
                  <Card className="border-dashed border-sky-200">
                    <CardContent className="p-8 text-center">
                      <p className="text-lg font-semibold text-slate-900">No jobs found</p>
                      <p className="mt-2 text-slate-500">Try another category, city, or keyword.</p>
                      <Button type="button" className="mt-4" onClick={clearFilters}>Reset filters</Button>
                    </CardContent>
                  </Card>
                ) : filteredJobs.map((job) => <JobCard key={job.id} job={job} onApply={onApplyClick} onSave={onSaveJob} savedIds={savedIds} onViewDetails={(item) => { setSelectedJob(item); setJobDetailOpen(true); }} setActivePage={setActivePage} />)}
              </div>
            </div>
          </motion.section>
        ) : null}

        {activePage === "cv" ? (
          <motion.section key="cv" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <SectionTitle title={t.cv} text="Generate a job-ready CV from simple answers in your own language." />
            <CvMakerPage profile={workerProfile} cvData={cvData} setCvData={setCvData} onGenerate={onGenerateCv} generatedCv={generatedCv} onExport={exportCv} />
          </motion.section>
        ) : null}

        {activePage === "workers" ? (
          <motion.section key="workers" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <SectionTitle title={t.workerSetupTitle} text={t.workerSetupText} />
            <WorkerSignup profile={workerProfile} setProfile={setWorkerProfile} onFinish={() => { setLanguage(workerProfile.language); persist((prev) => ({ ...prev, userRole: "worker" })); showToast("Worker profile saved"); setActivePage("dashboard"); }} />
          </motion.section>
        ) : null}

        {activePage === "employers" ? (
          <motion.section key="employers" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <SectionTitle title={t.employerSetupTitle} text={t.employerSetupText} />
            <div className="mb-6">
              <Card>
                <CardContent className="p-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">Employer account</p>
                      <p className="text-sm text-slate-500">{employerProfile.companyName || "No company profile saved yet"}</p>
                    </div>
                    <Button type="button" variant="outline" onClick={() => setActivePage("employer-setup")}>Setup employer account</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <EmployersPage companyDraft={companyDraft} setCompanyDraft={setCompanyDraft} postedJobs={postedJobs} onPostJob={onPostJob} setActivePage={setActivePage} onDeletePostedJob={deletePostedJob} />
          </motion.section>
        ) : null}

        {activePage === "employer-setup" ? (
          <motion.section key="employer-setup" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <SectionTitle title="Employer account setup" text="Add your company info before publishing jobs publicly." />
            <EmployerSetup employerProfile={employerProfile} setEmployerProfile={setEmployerProfile} onFinish={() => { persist((prev) => ({ ...prev, userRole: "employer" })); setCompanyDraft((draft) => ({ ...draft, company: employerProfile.companyName || draft.company, location: employerProfile.city || draft.location })); showToast("Employer profile saved"); setActivePage("employers"); }} />
          </motion.section>
        ) : null}

        {activePage === "dashboard" ? (
          <motion.section key="dashboard" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <SectionTitle title={t.dashboardTitle} text={t.dashboardText} />
            <WorkerDashboard applications={applications} savedJobs={savedJobs} profile={workerProfile} setActivePage={setActivePage} onDeleteApplication={deleteApplication} />
          </motion.section>
        ) : null}
      </AnimatePresence>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="overflow-hidden">
            <CardContent className="p-7">
              <Badge className="mb-4 bg-sky-100 text-sky-800">{t.whyWorkersStay}</Badge>
              <h2 className="text-3xl font-bold tracking-tight">{t.whyWorkersTitle}</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {t.whyWorkersPoints.map((point) => (
                  <div key={point} className="flex gap-2 rounded-2xl border border-sky-100 bg-sky-50 p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-sky-700" />
                    <p className="text-sm text-slate-700">{point}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden border border-sky-200 bg-gradient-to-br from-sky-600 to-cyan-500 text-white">
            <CardContent className="p-7">
              <Badge className="mb-4 bg-white text-sky-700">{t.forEmployers}</Badge>
              <h2 className="text-3xl font-bold tracking-tight">{t.forEmployersTitle}</h2>
              <div className="mt-6 space-y-4 text-sky-50">
                {t.forEmployersPoints.map((point) => <div key={point} className="rounded-2xl bg-white/10 p-4">{point}</div>)}
              </div>
              <Button type="button" className="mt-6 bg-white text-sky-700 hover:bg-sky-50" onClick={() => setActivePage("employers")}>{t.startHiring} <ArrowRight className="h-4 w-4" /></Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t border-sky-100 bg-white/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <JoobyWordmark />
          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="outline" onClick={() => setActivePage("jobs")}>Browse jobs</Button>
            <Button type="button" variant="outline" onClick={() => setActivePage("cv")}>Build CV</Button>
            <Button type="button" variant="outline" onClick={() => setActivePage("workers")}>Worker signup</Button>
            <Button type="button" onClick={() => setActivePage("employers")}>Post a job</Button>
            <Button type="button" variant="ghost" className="text-slate-600" onClick={resetDemoData}>Reset demo</Button>
          </div>
        </div>
      </section>

      <Modal open={authModalOpen} onClose={() => setAuthModalOpen(false)} title="Choose account type">
        <div className="grid gap-4 md:grid-cols-2">
          <button type="button" className="rounded-[28px] border border-sky-100 bg-sky-50 p-6 text-left transition hover:border-sky-300 hover:bg-sky-100" onClick={() => signInAs("worker")}>
            <UserPlus className="h-8 w-8 text-sky-700" />
            <p className="mt-4 text-xl font-semibold text-slate-900">Worker account</p>
            <p className="mt-2 text-sm leading-7 text-slate-600">Create a profile, build a CV, save jobs, and apply.</p>
          </button>
          <button type="button" className="rounded-[28px] border border-sky-100 bg-sky-50 p-6 text-left transition hover:border-sky-300 hover:bg-sky-100" onClick={() => signInAs("employer")}>
            <Building2 className="h-8 w-8 text-sky-700" />
            <p className="mt-4 text-xl font-semibold text-slate-900">Employer account</p>
            <p className="mt-2 text-sm leading-7 text-slate-600">Set up your company and publish job offers publicly.</p>
          </button>
        </div>
      </Modal>

      <Modal open={jobDetailOpen} onClose={() => setJobDetailOpen(false)} title="Job details">
        {selectedJob ? (
          <div className="space-y-5">
            <div>
              <p className="text-2xl font-bold tracking-tight text-slate-900">{selectedJob.title}</p>
              <p className="mt-1 text-slate-500">{selectedJob.company} • {selectedJob.location}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-sky-100 p-4"><p className="text-xs uppercase tracking-wide text-sky-700">Compensation</p><p className="mt-1 font-semibold text-slate-900">{selectedJob.salary}</p></div>
              <div className="rounded-2xl border border-sky-100 p-4"><p className="text-xs uppercase tracking-wide text-sky-700">Work setup</p><p className="mt-1 font-semibold text-slate-900">{selectedJob.type} • {selectedJob.remote}</p></div>
            </div>
            <div className="rounded-2xl border border-sky-100 p-4"><p className="text-xs uppercase tracking-wide text-sky-700">Description</p><p className="mt-2 leading-7 text-slate-700">{selectedJob.description}</p></div>
            <div className="flex flex-wrap gap-2">{(selectedJob.tags || []).map((tag) => <Badge key={`${selectedJob.id}-${tag}`} className="bg-slate-100 text-slate-700">{tag}</Badge>)}</div>
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="outline" onClick={() => onSaveJob(selectedJob.id)}><Heart className="h-4 w-4" /> Save</Button>
              <Button type="button" onClick={() => { setJobDetailOpen(false); onApplyClick(selectedJob); }}>Apply now</Button>
            </div>
          </div>
        ) : null}
      </Modal>

      <Modal open={applyModalOpen} onClose={() => setApplyModalOpen(false)} title="Apply to job">
        {selectedJob ? (
          <div className="space-y-6">
            <div className="rounded-2xl border border-sky-100 bg-sky-50 p-4"><p className="text-lg font-semibold text-slate-900">{selectedJob.title}</p><p className="text-sm text-slate-500">{selectedJob.company} • {selectedJob.location}</p></div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-sky-100 p-4"><div className="mb-2 flex items-center gap-2"><UserRound className="h-4 w-4 text-sky-700" /><p className="font-medium">Profile ready</p></div><p className="text-sm text-slate-600">{workerProfile.name || "No name added yet"}</p><p className="text-sm text-slate-600">{workerProfile.phone || "No phone yet"}</p><p className="text-sm text-slate-600">{workerProfile.city || "No city yet"}</p></div>
              <div className="rounded-2xl border border-sky-100 p-4"><div className="mb-2 flex items-center gap-2"><FileText className="h-4 w-4 text-sky-700" /><p className="font-medium">CV status</p></div><p className="text-sm text-slate-600">{generatedCv ? `${generatedCv.language} CV generated` : "No generated CV yet"}</p><p className="text-sm text-slate-600">{generatedCv?.targetJob || "General profile"}</p></div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Button type="button" variant="outline" onClick={() => { setApplyModalOpen(false); setActivePage("cv"); }}>Improve CV first</Button>
              <Button type="button" onClick={submitApplication}>Submit application</Button>
            </div>
          </div>
        ) : null}
      </Modal>

      <AnimatePresence>
        {toast ? (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="fixed bottom-4 right-4 z-50 rounded-2xl bg-slate-900 px-4 py-3 text-sm text-white shadow-xl">
            <div className="flex items-center gap-2">
              {copied ? <Check className="h-4 w-4" /> : null}
              <span>{toast}</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
