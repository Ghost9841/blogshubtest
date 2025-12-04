# 🧪 BlogHub – Frontend Developer Test  
**Clone → Install → Hack → Ship**

---

## 1.  Clone the repo
```bash
git clone https://github.com/Ghost9841/blogshubtest.git
cd blogshubtest
```

---

## 2.  Install dependencies
```bash
npm i
# or pnpm install / yarn install
```

---

## 3.  Pick your back-end flavour (choose **ONE**)

| Mode | When to use | Setup steps |
|---|---|---|
| A.  **Mock API** (zero-setup) | Quick start / no DB | `cp .env.example .env.local` ➜ done |
| B.  **Supabase + Prisma** (full-stack) | Real DB / relations | see section 4 |

---

## 4.  (Optional) Supabase + Prisma setup
> Skip if you stayed on mock mode.

a.  Create free project → https://supabase.com  
b.  grab these values from **Settings ➜ Database ➜ Connection pooling**
```
SUPABASE_URL="https://<your-ref>.supabase.co"
DATABASE_URL="postgresql://postgres.<your-ref>:[YOUR-PASSWORD]@aws-0-<region>.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.<your-ref>:[YOUR-PASSWORD]@aws-0-<region>.pooler.supabase.com:5432/postgres"
```

c.  paste into `.env.local`
```bash
cp .env.example .env.local
# open .env.local and fill the three lines above
```

d.  push schema
```bash
npx prisma generate
npx prisma db push
```

e.  seed sample data (optional)
```bash
npm run seed
```

---

## 5.  Run the dev server
```bash
npm run dev
# → http://localhost:3000
```

---

## 6.  Test drive
| Route | Purpose |
|---|---|
| `/` | Landing |
| `/register` | Create account |
| `/login` | JWT login |
| `/dashboard` | Protected – your posts |
| `/createblog` | Rich-text editor |
| `/editblog/[id]` | Edit with preview |
| `/allblogs` | Public feed (published only) |
| `/search?q=nextjs` | Blogs + users |
| `/profile` | Avatar, stats, recent posts |
| `/settings` | Edit name / email / avatar |

---

## 7.  Folder cheat-sheet
```
├─ app                 ← Next.js 13+ App Router
│  ├─ (auth)           ← login / register
│  ├─ (dashboard)      ← protected routes
│  ├─ allblogs         ← public list
│  ├─ search           ← blogs + users
│  ├─ profile          ← own profile
│  ├─ settings         ← edit profile
├─ components
│  ├─ RichEditor.tsx   ← TipTap editor
│  ├─ Navbar.tsx       ← auth + search
├─ hooks
│  ├─ useAuth.ts       ← login / logout / token
│  ├─ usePosts.ts      ← CRUD + paginate
│  ├─ useUsers.ts      ← user list
├─ prisma
│  ├─ schema.prisma    ← Post / User / Tag tables
├─ styles
│  ├─ globals.css      ← Tailwind + prose
├─ .env.example        ← copy to .env.local
```

---

## 8.  Tech stack (already wired)
- **Framework**: Next.js 14 (App Router)  
- **Auth**: JWT in localStorage + Zustand  
- **State**: Zustand (Auth, Posts)  
- **DB ORM**: Prisma (optional)  
- **UI**: shadcn/ui + TailwindCSS  
- **Editor**: TipTap (rich-text)  
- **Icons**: Lucide  
- **Fetch**: Axios + React-Query (hooks)  

---

## 9.  Test tasks (pick any)
1. Add **infinite scroll** to `/allblogs`.  
2. Implement **dark/light** theme toggle.  
3. Add **comment** system under posts.  
4. Replace mock with **real Supabase** rows.  
5. Add **category** filter in search.  

---

## 10.  Scripts
```bash
npm run dev        # start dev
npm run build      # production build
npm run lint       # ESLint
npm run seed       # insert sample data (Supabase mode)
```

**Happy hacking!** 🚀  
Open a PR when you’re done – we’ll review & merge.

Now need to let go of this project sigh