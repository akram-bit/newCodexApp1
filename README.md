# نواة مشروع SaaS لإدارة الصيدليات (المرحلة 0)

## ماذا تقدم هذه المرحلة؟
هذه المرحلة تؤسس قاعدة المشروع فقط بدون ميزات أعمال:
- هيكل ملفات منظم وقابل للتوسع.
- واجهات أساسية عربية RTL (الرئيسية / تسجيل الدخول / المشرف العام).
- ربط Bootstrap 5 RTL بشكل صحيح.
- إعداد آمن ومبسط لاتصال Supabase باستخدام المفتاح العام (anon key) فقط.
- اختبار اتصال Supabase من الصفحة الرئيسية مع رسائل عربية واضحة.

## التقنية المستخدمة
- HTML5
- CSS3
- JavaScript (Vanilla + ES Modules)
- Bootstrap 5 RTL عبر CDN
- Supabase JS SDK عبر CDN (ESM)

## هيكل المشروع

```text
.
├── index.html
├── login.html
├── admin.html
├── README.md
├── .gitignore
├── assets
│   ├── css
│   │   ├── app.css
│   │   ├── components.css
│   │   └── utilities.css
│   └── js
│       ├── app.js
│       ├── config.example.js
│       ├── services
│       │   └── supabase-client.js
│       ├── ui
│       │   └── shell.js
│       └── utils
│           ├── constants.js
│           └── helpers.js
└── docs
    └── conventions.md
```

## التشغيل المحلي
1. افتح الطرفية داخل مجلد المشروع.
2. شغّل خادم ملفات ثابت بسيط (Python مثالًا):

```bash
python3 -m http.server 5500
```

3. افتح المتصفح على:

```text
http://localhost:5500
```

## إعداد Supabase
> مهم: لا تستخدم `service_role` في الواجهة الأمامية إطلاقًا.

1. انسخ الملف:

```bash
cp assets/js/config.example.js assets/js/config.local.js
```

2. افتح `assets/js/config.local.js` وعدل القيم:

```js
window.APP_CONFIG = {
  SUPABASE_URL: "https://YOUR_PROJECT_REF.supabase.co",
  SUPABASE_ANON_KEY: "YOUR_PUBLIC_ANON_KEY"
};
```

3. التطبيق يحاول تحميل `config.local.js` تلقائيًا إن كان موجودًا.

> إذا لم تضف `config.local.js` فلن يتعطل التطبيق؛ ستظهر رسالة إعداد عربية داخل الواجهة.

## اختبار الاتصال
1. افتح الصفحة الرئيسية.
2. اضغط زر **"اختبار الاتصال الآن"**.
3. النتيجة:
   - نجاح: تظهر رسالة تؤكد نجاح الاتصال.
   - فشل: تظهر رسالة خطأ واضحة (إعدادات ناقصة / شبكة / HTTP status).

## ما هو غير مطبق عمدًا في المرحلة 0
- تسجيل دخول فعلي.
- إدارة منتجات/مخزون/مبيعات.
- مخطط قاعدة البيانات.
- دعم Offline/PWA الفعلي (فقط تجهيز أساس هيكلي).
- منطق Multi-tenant الكامل.

هذه الحدود مقصودة للحفاظ على Phase 0 نظيفة ومستقرة قبل البدء في Phase 1.
