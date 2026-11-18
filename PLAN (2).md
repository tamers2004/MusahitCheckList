# PLAN.md — Musahit Installation Control Center

## 1. Project Overview

Build a premium, modern, local-first web application for managing and tracking Musahit software installations.

The application replaces the traditional installation checklist with an interactive Installation Control Center.

The goal is to ensure that technicians never miss an installation step, automatically hide irrelevant tasks, save progress locally, and provide a clear overview of every installation.

### Core Principles

- Frontend only — absolutely no backend.
- React + Vite.
- Tailwind CSS for styling.
- Three.js / React Three Fiber for 3D elements.
- Fully Hebrew user interface.
- Full RTL support.
- Local data persistence.
- Responsive desktop-first design.
- Professional enterprise-grade UI.
- No external database or account requirement.

---

## 2. Technology Stack

| Technology | Purpose |
|---|---|
| React | UI and component architecture |
| Vite | Development and build tooling |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Three.js | 3D graphics |
| React Three Fiber | Three.js integration with React |
| Drei | 3D helpers and controls |
| Framer Motion | UI animations |
| Lucide React | Icons |
| Zustand | Application state management |
| Dexie.js | IndexedDB data persistence |
| React Router | Navigation |
| React Hook Form | Forms and validation |
| Zod | Data validation |

Use stable, compatible package versions.

---

## 3. Application Language and Direction — Hebrew-Only User Interface

The actual website must be built in Hebrew from the beginning. Hebrew is the application's user-facing language, not an optional translation and not a secondary language.

The website must retain the complete design, layout, visual quality, animations, dashboard, 3D experience, navigation, functionality and features described in this plan. The language requirement must not be used as a reason to simplify the design or remove functionality.

### Mandatory requirements

- Set the document language to `lang="he"` and direction to `dir="rtl"`.
- Every user-facing page and every visible UI element must be in Hebrew.
- This includes navigation, page titles, section headings, buttons, menus, forms, field labels, placeholders, helper text, validation messages, notifications, dialogs, tooltips, empty states, loading states, progress labels, filters, sorting options, reports and error messages.
- Use a professional Hebrew-compatible font, preferably Heebo; Assistant is an acceptable alternative.
- Use correct Hebrew punctuation, spelling and natural Israeli product terminology.
- English technical terms may remain only when they are standard technical names, such as SQL, SSMS, Windows, AnyDesk, PDF, JSON, Firewall, or exact file names, commands, paths and product names.
- Source code, component names, variables, function names, types, interfaces, file names, folder names, package names and developer documentation remain in English.
- Do not show English UI text just because a component library, browser API or third-party package provides English defaults. Override those defaults with Hebrew labels.
- Do not build an English interface first and translate it later. Implement Hebrew UI text and RTL behavior as part of the initial components.

### RTL implementation

- Apply RTL globally at the document/application root.
- Ensure the sidebar, navigation, page layout, cards, forms, tables, dialogs, dropdowns and progress components are visually arranged for RTL.
- Use CSS logical properties (`margin-inline`, `padding-inline`, `inset-inline`, `border-inline`, etc.) instead of hard-coded left/right properties wherever practical.
- Verify icon placement, chevrons, breadcrumbs, form alignment, text alignment and navigation direction.
- Keep technical values that are conventionally LTR (for example file paths, SQL commands, IP addresses, serial numbers and code snippets) readable in LTR containers without breaking the surrounding RTL layout.

### Language examples

Use Hebrew labels in the actual website, for example:

| Internal concept / English reference | Visible Hebrew UI text |
|---|---|
| Dashboard | לוח בקרה |
| New Installation | התקנה חדשה |
| Installation History | היסטוריית התקנות |
| Settings | הגדרות |
| Start Installation | התחל התקנה |
| Completed | הושלם |
| In Progress | בתהליך |
| Pending | ממתין לביצוע |
| Save | שמור |
| Cancel | ביטול |
| Search | חיפוש |
| Technician | טכנאי |
| Garage Name | שם המוסך |
| Garage Number | מספר מוסך |
| Installation Type | סוג התקנה |
| Workstations | עמדות עבודה |
| Progress | התקדמות |
| Notes | הערות |

These are examples, not an exhaustive translation list. All other visible text must also be written naturally in Hebrew.

The application must never look like an English product with only a few Hebrew headings. It must feel like a complete, professionally designed Israeli software product for Hebrew-speaking technicians.

---

## 4. Design System

### Visual Direction

Create a premium enterprise dashboard inspired by modern SaaS applications.

Design references:
- Linear
- Vercel
- Raycast
- Modern Apple interfaces
- Premium dark developer dashboards

### Color Palette

Use a sophisticated dark theme as the default.

- Background: Deep navy / near-black.
- Secondary background: Dark charcoal.
- Cards: Subtle elevated surfaces.
- Primary accent: Electric blue.
- Secondary accent: Cyan.
- Success: Emerald green.
- Warning: Amber.
- Error: Red.
- Text: Soft white and muted gray.

Support a light theme as an optional feature.

### UI Requirements

- Glassmorphism used selectively.
- Subtle gradients.
- Soft shadows.
- Thin borders.
- Smooth transitions.
- Rounded cards.
- Clear typography hierarchy.
- Consistent spacing.
- Micro-interactions.
- Animated progress indicators.
- Hover states.
- Skeleton loading where appropriate.
- No excessive visual clutter.

The interface should feel professional, fast and easy to use.

---

## 5. Three.js / 3D Experience

Use Three.js to create a premium visual identity.

Important: 3D should enhance the interface, not interfere with usability.

### 3D Dashboard Hero

Create an interactive 3D installation visualization.

Concept:
- A floating 3D computer/server installation environment.
- Animated network connections.
- Subtle glowing connection points.
- Slow rotation and floating animations.
- Dynamic lighting.
- Dark environment with blue and cyan accents.

### Performance Requirements

- Use React Three Fiber.
- Lazy-load the 3D scene.
- Limit unnecessary geometry and effects.
- Provide a static fallback.
- Respect reduced-motion preferences.
- Do not use 3D animations inside every checklist item.

The checklist itself must remain fast and lightweight.

---

## 6. Application Structure

The application should have the following pages:

### A. Dashboard — לוח בקרה

The main overview screen.

Display:
- Welcome section.
- New installation button.
- Total installations.
- Installations in progress.
- Completed installations.
- Recently opened installations.
- Overall completion statistics.
- Quick access to saved installations.

Include a premium 3D hero visualization.

### B. New Installation — התקנה חדשה

When creating an installation, collect:

1. Garage name.
2. Garage number.
3. Technician name.
4. Installation type.
5. Number of workstations.
6. Garage classification.
7. Installation date.
8. Optional notes.

Installation options:

**Installation type**
- New installation.
- Existing installation upgrade.

**Workstations**
- Single workstation.
- Multiple workstations.

**Garage classification**
- Regular garage.
- Authorized garage.
- Importer garage.

Important: Importer garage is an additional classification, and must also receive the applicable authorized-garage file configuration.

### C. Installation Workspace — סביבת התקנה

This is the main application feature.

Each installation receives its own workspace.

Layout:

- Installation information at the top.
- Overall progress indicator.
- Left or right navigation for installation sections.
- Main checklist content.
- Section completion indicators.
- Notes and troubleshooting area.
- Save status indicator.

Each checklist item should include:

- Checkbox.
- Task title.
- Optional description.
- Optional technical instructions.
- Optional warning.
- Completion status.
- Optional notes.

Allow the technician to expand a task to see additional instructions.

### D. Installation History — היסטוריית התקנות

Display all locally saved installations.

Features:
- Search by garage name.
- Search by garage number.
- Filter by installation type.
- Filter by status.
- Sort by date.
- Reopen an existing installation.
- Duplicate an installation template.
- Delete an installation with confirmation.

### E. Settings — הגדרות

Include:
- Theme selection.
- Technician name.
- Application preferences.
- Export local data.
- Import local data.
- Reset application data with confirmation.

---

## 7. Dynamic Checklist Logic

This is one of the most important parts of the application.

Checklist sections and tasks must be dynamically generated based on the installation configuration.

Never display irrelevant tasks.

### Rule 1 — Installation Type

**New installation:**
- Show the empty database restoration task.
- Show initial database configuration.

**Upgrade:**
- Hide the empty database restoration task.
- Do not restore a blank database during an upgrade.
- Keep all other applicable installation and verification tasks.

### Rule 2 — Workstation Count

**Single workstation:**
- Hide network drive sharing tasks.
- Hide additional workstation mapping tasks.
- Hide multi-workstation SQL protocol configuration unless specifically required.
- Keep applicable local SQL configuration and verification.

**Multiple workstations:**
- Show SQL network protocol configuration.
- Show server firewall configuration.
- Show shared drive configuration.
- Show additional workstation setup.
- Show network connectivity verification.

### Rule 3 — Garage Classification

**Regular garage:**
- Show the general garage file configuration.
- Show MOFIL012 and MOFIL053 tasks.

**Authorized garage:**
- Show authorized garage configuration.
- Show price list file copying.
- Show MOFIL349.
- Show the relevant MOFIL170 manufacturer file.
- Hide the regular garage file-copying task where it is replaced by authorized garage configuration.

**Importer garage:**
- Show authorized garage configuration.
- Show importer-specific manufacturer configuration.
- Show manufacturer image configuration.
- Show vehicle type configuration.
- Show claim form configuration.
- Show manufacturer transmission shortcut configuration.

### Rule 4 — Task Dependencies

Some tasks depend on previous tasks.

Examples:
- Importer configuration must be performed after the required version update.
- Manufacturer transmission shortcut should be configured after importer settings.
- Final verification should happen after the applicable installation tasks.

Use dependency metadata to control warnings and completion status.

Do not automatically mark dependent tasks as completed.

---

## 8. Installation Checklist Content

Build the checklist using the following sections.

### Section 1 — הכנות והגדרות SQL

- Connect to the client computer using AnyDesk as administrator.
- Download SQL Express 2022.
- Verify Windows administrative regional language is Hebrew (Israel).
- Install SQL Express using Basic.
- Download SSMS and the required installation files.
- Run SQL Express Custom installation.
- Select Add Features.
- Configure the required components.
- Disable Azure Server installation.
- Complete installation.

### Section 2 — הגדרות SQL ו-SSMS

- Enable SQL network protocols when required.
- Restart SQL Server service.
- Configure SQL Browser startup mode to Automatic.
- Start SQL Browser.
- Install SSMS.
- Connect to the local SQL Server instance.
- Configure Encryption and Trust Server Certificate.
- Enable SQL and Windows Authentication.
- Configure Connection settings according to the internal guide.
- Set SQL Memory to 4096.
- Restart SQL Server.

### Section 3 — בסיס נתונים

- Verify installation type.
- New installation only: restore the empty database from F:\EXE\BLANCKDB.
- Verify database name.
- Create the musahit login.
- Configure the required password policy settings.
- Assign sysadmin role.

Never show the empty database restoration task during upgrades.

### Section 4 — הכנת תיקיות והתקנת מוסכית

- Create MG7.0 directory.
- For Windows 11, create DATA directory and configure sharing where applicable.
- Map DATA to drive M where required.
- Copy MUSAHITINSTALLER.
- Copy MAGIC.
- Run MUSAHITINSTALLER and install.
- Run MUSAHITINSTALLER again and create shortcut.
- Configure SQL Server address.
- Verify server name and instance.
- Install the required font.
- Open Musahit.
- Perform the initial login.
- Verify the software opens correctly.

### Section 5 — הגדרות ראשוניות במוסכית

- Create the control file.
- Enter the garage details from the service system.
- Verify fields 3, 5 and 6 according to the guide.
- Perform the required elevated configuration.
- Configure unified numbering.
- Set unified counter numbering to YES.
- Save and verify configuration.

### Section 6 — עדכון גרסה וטבלאות

- Download the current version from the service system.
- Execute the update using F6.
- Verify the installed version.
- Regular garage: copy MOFIL012 and MOFIL053.
- Authorized garage: copy the price list files.
- Authorized garage: copy MOFIL349.
- Authorized garage: copy the relevant MOFIL170 manufacturer file.
- Verify file names and destination paths.

### Section 7 — הגדרות מוסך יבואן

- Add the manufacturer's image.
- Configure the correct vehicle manufacturer.
- Configure the vehicle type.
- Enter garage number.
- Enter claim customer number.
- Configure the correct claim form.
- Save using Ctrl+S.
- Create manufacturer transmission shortcut.
- Configure Terminal 50.
- Configure the appropriate StartProgram value.
- Verify manufacturer transmission environment.

### Section 8 — הגדרות Firewall בשרת

For multiple workstations:

- Create the SQL Server inbound firewall rule.
- Configure the required SQL Server program path.
- Configure the required permissions.
- Enable Allow Edge Traversal according to the guide.
- Create the additional rule for Program Files (x86).
- Verify firewall configuration.

### Section 9 — שיתוף והוספת עמדות

For multiple workstations:

- Share the relevant installation drive.
- Enable Share This Folder.
- Configure Full Control sharing permissions.
- Configure the required Security permissions.
- Verify network access from the secondary computer.
- Access the main computer using its network name.
- Map the shared drive.
- Create the Musahit shortcut.
- Verify application access from every workstation.

### Section 10 — בדיקות סיום

- Verify Musahit opens on the main computer.
- Verify Musahit opens on every workstation.
- Verify SQL database connection.
- Verify control file.
- Verify unified numbering.
- Verify software version.
- Verify required tables.
- Verify network connectivity.
- Verify importer configuration when applicable.
- Verify manufacturer transmission environment when applicable.
- Verify the client can work with the system.
- Record installation completion.

---

## 9. Checklist Interaction

Every task must be interactive.

Features:
- Mark completed.
- Undo completion.
- Add a note to a task.
- Expand technical instructions.
- Show completed and pending tasks.
- Display section progress.
- Display overall progress.
- Show warnings for incomplete dependencies.

### Completion States

Use three visual states:

1. Pending.
2. Completed.
3. Requires attention.

Do not automatically mark tasks as completed.

### Progress Calculation

Calculate progress using only the tasks relevant to the selected installation configuration.

Example:

If an installation has 80 applicable tasks and 40 are completed:

Progress = 50%.

Hidden tasks must not count toward progress.

---

## 10. Local Data Persistence

All data must stay on the user's computer.

No backend.
No remote database.
No cloud synchronization.
No mandatory login.

Use IndexedDB through Dexie.js.

### Data Structure

**Installation**

- id
- garageName
- garageNumber
- technician
- installationType
- workstationCount
- garageClassification
- createdAt
- updatedAt
- status
- notes

**TaskProgress**

- installationId
- taskId
- completed
- completedAt
- notes

**ApplicationSettings**

- theme
- defaultTechnician
- preferences

### Persistence Requirements

- Automatically save every checkbox change.
- Automatically save notes.
- Save installation configuration.
- Restore the last open installation.
- Preserve data after browser refresh.
- Preserve data after browser restart.
- Allow exporting all installations to JSON.
- Allow importing previously exported JSON.
- Validate imported files before applying changes.
- Confirm destructive operations.

Important: IndexedDB data is browser-local, not a shared database. Data does not automatically synchronize between different computers or browsers.

---

## 11. Export and Reporting

Allow technicians to generate an installation completion report.

Report should include:

- Garage name.
- Garage number.
- Technician.
- Installation type.
- Number of workstations.
- Garage classification.
- Completion percentage.
- Completed tasks.
- Pending tasks.
- Technician notes.
- Installation date.

Provide:
- Print-friendly report.
- PDF export.
- JSON backup and restore.

PDF and print reports should be fully Hebrew RTL.

---

## 12. Recommended Project Structure

```text
musahit-installation-center/
│
├── public/
│   ├── images/
│   └── icons/
│
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   └── router.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── MainLayout.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── DashboardHero.tsx
│   │   │   ├── StatsCards.tsx
│   │   │   └── RecentInstallations.tsx
│   │   │
│   │   ├── checklist/
│   │   │   ├── ChecklistSection.tsx
│   │   │   ├── ChecklistItem.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── TaskDetails.tsx
│   │   │
│   │   ├── three/
│   │   │   └── InstallationScene.tsx
│   │   │
│   │   └── ui/
│   │
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── NewInstallation.tsx
│   │   ├── InstallationWorkspace.tsx
│   │   ├── InstallationHistory.tsx
│   │   └── Settings.tsx
│   │
│   ├── data/
│   │   ├── checklist.ts
│   │   ├── installationRules.ts
│   │   └── installationTemplates.ts
│   │
│   ├── db/
│   │   ├── database.ts
│   │   └── installationRepository.ts
│   │
│   ├── store/
│   │   └── installationStore.ts
│   │
│   ├── hooks/
│   │
│   ├── types/
│   │   ├── installation.ts
│   │   └── checklist.ts
│   │
│   ├── utils/
│   │   ├── progress.ts
│   │   ├── export.ts
│   │   └── validation.ts
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   └── main.tsx
│
├── PLAN.md
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 13. Development Phases

### Phase 1 — Project Foundation

- Initialize React + Vite + TypeScript.
- Configure Tailwind CSS.
- Configure RTL and Hebrew typography.
- Install required dependencies.
- Create application layout.
- Establish design system.

### Phase 2 — UI Development

- Build dashboard.
- Build sidebar navigation.
- Build installation creation flow.
- Build installation workspace.
- Build checklist components.
- Build progress indicators.
- Build installation history.

### Phase 3 — Checklist Engine

- Create checklist data structure.
- Implement installation configuration rules.
- Implement conditional task visibility.
- Implement task dependencies.
- Implement dynamic progress calculation.
- Implement section completion states.

### Phase 4 — Local Database

- Configure IndexedDB.
- Implement automatic saving.
- Implement installation management.
- Implement notes persistence.
- Implement JSON export/import.
- Test browser refresh and restart persistence.

### Phase 5 — 3D Experience

- Build the Three.js installation scene.
- Add lighting and animations.
- Add subtle interactions.
- Implement lazy loading.
- Add static fallback.

### Phase 6 — Reports

- Build installation summary.
- Add print layout.
- Implement Hebrew PDF export.
- Implement backup and restore.

### Phase 7 — Quality Assurance

Test all combinations:

1. New installation + single workstation + regular garage.
2. New installation + multiple workstations + regular garage.
3. New installation + multiple workstations + authorized garage.
4. New installation + multiple workstations + importer garage.
5. Upgrade + single workstation + regular garage.
6. Upgrade + multiple workstations + regular garage.
7. Upgrade + multiple workstations + authorized garage.
8. Upgrade + multiple workstations + importer garage.

Also test:
- Refresh during an active installation.
- Close and reopen the browser.
- Multiple saved installations.
- Export and import.
- Missing task completion.
- Dependency warnings.
- Mobile and desktop layouts.

---

## 14. Definition of Done

The application is considered complete only when:

- All installation tasks are implemented.
- Conditional visibility works correctly.
- Irrelevant tasks are hidden.
- Progress is calculated correctly.
- Every installation is saved locally.
- Browser refresh does not lose progress.
- Multiple installations can be managed independently.
- Export and import work.
- Reports display Hebrew correctly.
- The interface is fully RTL.
- The dashboard is responsive.
- The 3D scene performs smoothly.
- No backend or external database is required.
- No critical console errors remain.

---

## 15. Instructions to the AI Developer

Build the application as a complete, production-quality frontend project.

Do not create a static mockup.

Do not put the entire application in one component.

Do not hardcode checklist logic inside UI components.

Keep checklist content, task dependencies and conditional rules in separate data files.

Use reusable components and TypeScript interfaces.

All user-facing content must be Hebrew.

Prioritize usability and functional correctness over decorative animations.

Use Three.js selectively to create a premium experience without sacrificing performance.

Never lose locally saved installation data.

Do not silently change installation procedures from the original internal installation guide. If a technical instruction appears inconsistent, flag it for review instead of inventing a correction.

The final result should look and feel like a premium commercial SaaS product, even though it operates entirely locally.

**Build the actual application, not just the design.**

---

## 16. Final Non-Negotiable Requirement — Same Product, Entirely in Hebrew

This section clarifies and reinforces the language and product requirements. Follow it together with every section above.

### What to build

Build the complete Musahit Installation Control Center described in this plan: a premium, modern, interactive local-first website with the planned dashboard, installation creation flow, installation workspace, dynamic checklist, installation history, settings, local persistence, reporting, export/import, responsive behavior, animations and 3D dashboard experience.

Do not replace the planned application with a basic checklist, a static HTML page, a generic admin template or a reduced prototype. Do not remove the 3D hero, visual design system, animations or any planned functionality merely to make implementation easier.

### The language rule

The website itself must be Hebrew-only for all user-facing content. The fact that this plan and the source code are written in English does not mean the website should display English.

- Website pages, navigation, buttons, labels, forms, menus, messages, dialogs, tooltips, notifications, empty states, validation errors, reports and PDF output: Hebrew.
- Layout and reading direction: RTL.
- Technical identifiers that must remain unchanged (SQL, SSMS, file names, commands, paths, IP addresses, product names and code): preserve their exact spelling and present them in a readable LTR area when needed.
- Code, identifiers, file/folder names and developer-facing comments: English.

### Required Hebrew page and navigation labels

Use these Hebrew labels in the visible application:

- Dashboard: לוח בקרה
- New Installation: התקנה חדשה
- Installation Workspace: סביבת התקנה
- Installation History: היסטוריית התקנות
- Settings: הגדרות
- Start Installation: התחל התקנה
- Save: שמור
- Cancel: ביטול
- Delete: מחיקה
- Search: חיפוש
- Filter: סינון
- Export: ייצוא
- Import: ייבוא
- Print: הדפסה
- Completed: הושלם
- In Progress: בתהליך
- Pending: ממתין לביצוע
- Requires Attention: דורש טיפול
- Overall Progress: התקדמות כללית
- Completed Tasks: משימות שהושלמו
- Remaining Tasks: משימות שנותרו
- Technician: טכנאי
- Garage Name: שם המוסך
- Garage Number: מספר מוסך
- Installation Date: תאריך התקנה
- Installation Type: סוג התקנה
- Number of Workstations: מספר עמדות
- Garage Classification: סיווג מוסך
- Notes: הערות

Do not expose the English terms above as visible labels; they are included only to map the implementation concepts to their Hebrew UI wording.

### Before completion — Hebrew UI audit

Before declaring the application complete, inspect every screen and state, including desktop and mobile layouts, and verify:

1. No English navigation items, buttons, headings, labels or placeholder text remain.
2. All dialogs, confirmations, alerts, toasts, validation messages and error states are Hebrew.
3. All checklist sections and task descriptions are displayed in Hebrew, preserving the technical wording and identifiers supplied in the installation guide.
4. RTL alignment and flow are correct across the entire application.
5. LTR technical content such as paths and commands remains readable and does not reverse or corrupt.
6. Print and PDF reports render Hebrew correctly in RTL.
7. Third-party components do not leak default English text into the interface.

If any user-facing English text is found, replace it with appropriate Hebrew before considering the project complete.

### Final acceptance criterion

The finished result must be the exact planned product in terms of features and visual ambition, but when a technician opens the website, the experience must be entirely in Hebrew and RTL. Only the implementation/code layer remains in English.
