export const ROUTES = {
  // Before login
  login: "/login",
  forgotPassword: "/forgot-password",
  alumniUpdate: (token: string) => `/alumni-update/${token}`,

  // Admin + Instructor
  dashboard: "/dashboard",
  students: "/students",
  student: (id: string) => `/students/${id}`,
  attendance: "/attendance",
  scores: "/scores",
  atRisk: "/at-risk",
  evaluations: "/evaluations",
  overtime: "/overtime",
  files: "/files",
  folder: (folderId: string) => `/files/${folderId}`,
  chat: "/chat",
  chatSession: (sessionId: string) => `/chat/${sessionId}`,
  notifications: "/notifications",
  changePassword: "/change-password",

  // Admin only
  scoreWeights: "/scores/weights",
  allowances: "/allowances",
  extraClass: "/allowances/extra-class",
  monthlyAllowance: "/allowances/monthly",
  allowanceRules: "/allowances/rules",
  allowanceHistory: "/allowances/history",
  alumni: "/alumni",
  newAlumni: "/alumni/new",
  alumnus: (id: string) => `/alumni/${id}`,
} as const;

// Pages anyone can open without logging in
export const PUBLIC_ROUTES = ["/login", "/forgot-password", "/alumni-update"] as const;

// Pages only the HRD Admin can open (sub-pages included)
export const ADMIN_ONLY_ROUTES = ["/scores/weights", "/allowances", "/alumni"] as const;