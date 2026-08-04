# GOR Diamonds

חנות ואתר תדמית ליהלומים ותכשיטים — בהשראת בתי היוקרה הגדולים (Graff, Tiffany).

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** — עיצוב יוקרתי, טיפוגרפיה סריפית, פלטת ivory / charcoal / champagne
- **next-intl** — דו-לשוני עברית (RTL) + אנגלית (LTR)
- **Prisma + PostgreSQL** — מוצרים, יהלומים, משתמשים, הזמנות, CRM
- **NextAuth** — הרשמה/כניסה (Credentials + כל provider שתרצי)
- **Stripe** — סליקה
- **Zustand** — עגלת קניות (persistence ב־localStorage)

## התחלה מהירה

```bash
npm install
cp .env.example .env.local
# ערכי את .env.local:
#   DATABASE_URL — Postgres מקומי או Neon/Supabase/Railway
#   NEXTAUTH_SECRET — openssl rand -base64 32
#   STRIPE_SECRET_KEY / NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY — Stripe Test Keys

npx prisma generate
npx prisma db push       # יוצר את כל הטבלאות
npm run dev
```

הפתחי את http://localhost:3000 — תופנה אוטומטית ל־`/he`.

## מבנה

```
src/
├── app/
│   ├── [locale]/          # כל הדפים דו-לשוניים
│   │   ├── page.tsx       # דף הבית
│   │   ├── collections/[category]/
│   │   ├── products/[slug]/
│   │   ├── about/
│   │   ├── appointment/
│   │   ├── cart/
│   │   ├── account/
│   │   └── auth/
│   ├── api/
│   │   ├── auth/          # NextAuth + signup
│   │   ├── appointment/   # שמירת בקשת פגישה + CRM lead
│   │   ├── checkout/      # Stripe Checkout Session
│   │   └── webhooks/stripe/
│   └── globals.css
├── components/
│   ├── layout/            # Header, Footer
│   ├── home/              # Hero, FeaturedCollections, SignatureStory, Craftsmanship, AppointmentCta
│   ├── product/, cart/, auth/, forms/, ui/
├── i18n/                  # next-intl routing & request config
├── lib/                   # prisma, stripe, auth, cart-store, sample-data, utils
├── middleware.ts          # locale routing
└── types/                 # next-auth augmentation
messages/
├── he.json
└── en.json
prisma/
└── schema.prisma          # User, Product, Diamond, Order, Lead, Appointment, CrmActivity...
```

## עיצוב

- פלטה: `ivory` (#FAF7F2), `charcoal` (#1A1A1A), `champagne` (#B8956A), `diamond` (#E8F0F5)
- טיפוגרפיה: **Cormorant Garamond** לכותרות אנגלית, **Frank Ruhl Libre** לכותרות עברית, **Inter** לגוף
- אנימציות עדינות: fade-up, hover fade בין תמונות מוצר, מעברים איטיים (700–1400ms)

## בסיס נתונים — CRM

הסכימה כוללת ניהול לידים מלא:
- `Lead` (סטטוסים: NEW → CONTACTED → QUALIFIED → WON/LOST, מקור, מוקצה למי)
- `Appointment` (בבוטיק / וידאו / טלפון)
- `CrmActivity` (הערות, שיחות, מיילים, פגישות, WhatsApp)
- כל בקשת פגישה נשמרת גם כליד ב־CRM אוטומטית

## מה חסר / הצעדים הבאים

- העלאת תמונות אמת (כרגע נעשה שימוש בתמונות Unsplash כ־placeholders)
- Seed script עם מוצרים אמיתיים ב־`prisma/seed.ts`
- פאנל ניהול (`/admin`) לצפייה בהזמנות, לידים, ופגישות
- אימות אימייל / איפוס סיסמה
- Google/Apple Sign-in (הוסיפי providers ל־`src/lib/auth.ts`)
- שילוב Stripe Webhook עם כתובת ציבורית (ngrok / Stripe CLI לפיתוח)

## סקריפטים

- `npm run dev` — פיתוח
- `npm run build` && `npm run start` — production
- `npm run db:push` — סנכרון סכימה עם ה־DB
- `npm run db:studio` — Prisma Studio (עורך DB ויזואלי)
- `npm run db:migrate` — יצירת מיגרציה חדשה
