export const rawData = {
  name: "Ujjawal Singh",
  birthYear: 2000,
  email: "Ujjw4l.singh@gmail.com",
  phone: "+91 9654736193",
  title: ["Senior Full-Stack Engineer", "Enterprise SaaS & AI"],
  address: {
    city: "New Delhi",
    state: "Delhi",
    pincode: "110030",
    country: "India",
  },
  experienceData: [
    {
      title: "Senior Full-Stack Engineer",
      date: "Aug 2025 - Present",
      company: "AppTestify",
      description:
        "Leading the development of an enterprise multi-tenant SaaS platform with authentication, hierarchical RBAC, subscription billing, AI-powered features, workflow automation, reporting, notifications, and core platform services. Responsible for system architecture, backend development, API design, AI integrations, and building scalable event-driven systems.",
    },
    {
      title: "Full-Stack Engineer",
      date: "Nov 2023 - Aug 2025",
      company: "The Yarn Bazaar",
      description:
        "Developed enterprise web and mobile applications while leading initiatives around CRM automation, AI-powered knowledge retrieval, and internal productivity tools. Built end-to-end features, modernized legacy systems, and delivered solutions that streamlined operations, improved customer engagement, and reduced manual effort.",
    },
    {
      title: "Full-Stack Developer Intern",
      date: "Aug 2023 - Oct 2023",
      company: "The Yarn Bazaar",
      description:
        "Completed a three-month internship focused on React, Node.js, MongoDB, and enterprise application development. Contributed to production features, collaborated closely with the engineering team, and earned a full-time role based on performance.",
    },
  ],
  educationData: [
    {
      title: "Full Stack Web Development",
      date: "June 2022 - Aug 2023",
      institution: "Masai School, Bengaluru, India",
      description:
        "Completed a year-long Full-Stack Web Development course, gaining proficiency in HTML, CSS, React, Redux, Node.js, MongoDB, and Java for data structures and algorithms.",
    },
    {
      title: "Bachelor of Technology",
      date: "Aug 2018 - May 2022",
      institution: "Lovely Professional University, Punjab, India",
      description:
        "Bachelor's degree in Electrical and Electronics Engineering with a strong foundation in circuits, power systems, control systems, and telecommunications.",
    },
  ],
  projects: [
    {
      title: "QUASR+",
      role: "Senior Full-Stack Engineer",
      duration: "Aug 2025 - Present",
      tags: ["SaaS", "AI", "Multi-Tenant", "Live"],
      description:
        "An enterprise multi-tenant SaaS platform providing authentication, hierarchical RBAC, subscription management, AI-powered workflows, reporting, notifications, and extensible platform services for large organizations.",
      techStack: [
        {
          name: "Next.js",
          icon: "/icons/next-js.svg",
        },
        {
          name: "TypeScript",
          icon: "/icons/typescript.svg",
        },
        {
          name: "Node.js",
        },
        {
          name: "MongoDB",
          icon: "/icons/mongodb.svg",
        },
        {
          name: "AWS",
        },
        {
          name: "Inngest",
        },
        {
          name: "Stripe",
        },
        {
          name: "OpenAI",
          icon: "/icons/openai.svg",
        },
        {
          name: "Vercel AI SDK",
        },
      ],
      detailedDescription: {
        desc: "Architected and developed an enterprise SaaS platform designed around reusable platform capabilities rather than domain-specific features. The platform provides secure multi-tenancy, scalable infrastructure, AI services, billing, workflow automation, real-time communication, and extensible administration tools that power multiple business applications.",
        keyPoints: [
          {
            label:
              "Designed a secure multi-tenant architecture with account-scoped data isolation and a six-level hierarchical RBAC system supporting organizations, facilities, and departments.",
            image: "/projects/quasr/rbac.png",
          },
          {
            label:
              "Implemented enterprise authentication using AWS Cognito, invitation workflows, onboarding, user provisioning, and role-based authorization.",
            image: "/projects/quasr/authentication.png",
          },
          {
            label:
              "Built an event-driven backend using Inngest to power notifications, reminders, scheduled jobs, AI processing, billing workflows, and asynchronous platform events.",
            image: "/projects/quasr/inngest.png",
          },
          {
            label:
              "Integrated Stripe subscriptions, customer portals, plan-based feature access, AI credit management, and automated billing lifecycle handling.",
            image: "/projects/quasr/billing.png",
          },
          {
            label:
              "Developed reusable platform services including audit history, reporting, dashboard customization, internationalization, file storage, notification center, and AI-powered semantic search.",
            image: "/projects/quasr/platform.png",
          },
        ],
      },
    },
    {
      title: "Bandhu",
      role: "Lead Full-Stack Engineer",
      duration: "Aug 2023 - Jan 2025",
      tags: ["Live", "Internal Tool"],
      description:
        "A three-sided platform serving buyers, vendors, and internal ops teams — combining a mobile app, WhatsApp-based price updates via LLM, real-time pricing, an operations system for managing events and clients, and a Slack-integrated AI workflow.",
      techStack: [
        {
          name: "Flutter",
          icon: "/icons/flutter.svg",
        },
        {
          name: "FastAPI",
          icon: "/icons/fastapi.svg",
        },
        {
          name: "TypeScript",
          icon: "/icons/typescript.svg",
        },
        {
          name: "Node.js",
          icon: "/icons/nodejs.svg",
        },
        {
          name: "MongoDB",
          icon: "/icons/mongodb.svg",
        },
        {
          name: "Python",
          icon: "/icons/python.svg",
        },
        {
          name: "Cohere",
        },
        {
          name: "Qdrant",
        },
        {
          name: "Google Cloud Run",
          icon: "/icons/google-cloud.svg",
        },
        {
          name: "Slack API",
        },
        {
          name: "WhatsApp API",
        },
        {
          name: "WebSockets / Realtime Updates",
        },
        {
          name: "AWS",
          icon: "/icons/aws-lambda.svg",
        },
        {
          name: "Vercel",
          icon: "/icons/vercel.svg",
        },
      ],
      detailedDescription: {
        desc: "Built a three-sided platform connecting buyers, vendors, and internal ops teams. Buyers get real-time product pricing, industry events, news, podcasts, and a textile calculator. Vendors update prices via mobile or a simple WhatsApp message — parsed by an LLM, structured, and queued for team approval. Built a centralized vendor management portal for operations teams to efficiently coordinate vendors, venues, events, and clients, with real-time public-facing webpage previews for live vendor updates. The internal ops/sales team receives live Slack notifications for price, event, or order changes, and can approve, update, or delegate tasks directly from Slack using AI prompts.",
        keyPoints: [
          {
            label:
              "Buyer app: Real-time product pricing from specific vendors, upcoming exhibitions, industry news, podcasts, blogs, and a custom textile calculator.",
            image: "/projects/tyb-chatbot/tracking.svg",
          },
          {
            label:
              "WhatsApp-to-DB pipeline: Vendors send price updates via plain WhatsApp text — parsed by an LLM to extract structured data and stored after team approval.",
            image: "/projects/tyb-chatbot/information.svg",
          },
          {
            label:
              "Centralized vendor & event management: Centralized management of vendors, venues, events, and client data with role-based access for operations teams, featuring live webpage previews that instantly reflect vendor updates.",
            image: "/projects/vms/ops-dashboard.png",
          },
          {
            label:
              "Slack-integrated ops workflow: Internal team receives real-time Slack alerts for mill/vendor updates and can approve, modify, or trigger actions via AI prompts directly from Slack.",
            image: "/projects/tyb-chatbot/information.svg",
          },
        ],
      },
    },
    {
      title: "Event Reach",
      role: "Senior Full-Stack Engineer",
      duration: "Sep 2025 - Oct 2025",
      tags: ["Internal Tool", "Live"],
      description:
        "A multi-channel event invitation platform enabling teams to send and manage automated Email and WhatsApp invites across multiple events.",
      techStack: [
        {
          name: "TypeScript",
          icon: "/icons/typescript.svg",
        },
        {
          name: "AWS Lambda",
          icon: "/icons/aws-lambda.svg",
        },
        {
          name: "MongoDB",
          icon: "/icons/mongodb.svg",
        },
        {
          name: "WhatsApp Web.js",
        },
        {
          name: "Email Services (SMTP / SES)",
        },
        {
          name: "Vercel",
          icon: "/icons/vercel.svg",
        },
      ],
      detailedDescription: {
        desc: "Built an internal e-invitation platform allowing event managers to create and manage multiple events while automating guest communications through both WhatsApp and Email using event-specific sender identities.",
        keyPoints: [
          {
            label:
              "Multi-event management: Create and manage multiple events with independent guest lists, templates, and communication settings.",
            image: "/projects/rsvp/multi-event.png",
          },
          {
            label:
              "Multi-channel communication: Send invitations and updates via both Email and WhatsApp from event-specific sender accounts or numbers.",
            image: "/projects/rsvp/multi-user.png",
          },
          {
            label:
              "Automated e-invites & follow-ups: Automated invitation delivery, reminders, and status tracking to reduce manual outreach and improve guest response rates.",
            image: "/projects/rsvp/automate-message.svg",
          },
        ],
      },
    },
    {
      title: "Snippet",
      role: "Senior Full-Stack Engineer",
      duration: "Oct 2025 - Dec 2025",
      tags: ["Productivity", "Live"],
      description:
        "A developer productivity tool for organizing, searching, and managing reusable code snippets by language, tags, and custom filters.",
      techStack: [
        {
          name: "TypeScript",
          icon: "/icons/typescript.svg",
        },
        {
          name: "Node.js",
          icon: "/icons/nodejs.svg",
        },
        {
          name: "MongoDB",
          icon: "/icons/mongodb.svg",
        },
        {
          name: "Full-Text Search",
        },
        {
          name: "Vercel",
          icon: "/icons/vercel.svg",
        },
      ],
      detailedDescription: {
        desc: "Built an internal code snippet repository to help developers efficiently manage, categorize, and discover reusable code across projects using advanced search, filtering, and sorting mechanisms.",
        keyPoints: [
          {
            label:
              "Centralized snippet collection: Store and manage reusable code snippets across multiple languages with rich metadata support.",
            image: "/projects/snippet/collection.png",
          },
          {
            label:
              "Advanced search & filtering: Quickly find snippets using full-text search, language, tags, and custom filters.",
            image: "/projects/snippet/search-filter.png",
          },
          {
            label:
              "Smart sorting & organization: Sort snippets by language, usage, creation date, or tags to improve discoverability and developer productivity.",
            image: "/projects/snippet/sorting.png",
          },
        ],
      },
    },
    {
      title: "Chatbot Builder",
      role: "Founder / Solo Developer",
      duration: "Jun 2025 - Present",
      tags: ["In Progress", "Side Project"],
      description:
        "A full-stack chatbot platform that allows users to upload files, embed knowledge, and chat with context-aware AI assistants.",
      techStack: [
        {
          name: "FastAPI",
          icon: "/icons/fastapi.svg",
        },
        {
          name: "Python",
          icon: "/icons/python.svg",
        },
        {
          name: "Cohere",
        },
        {
          name: "Qdrant",
        },
        {
          name: "Google Cloud Run",
          icon: "/icons/google-cloud.svg",
        },
        {
          name: "React",
          icon: "/icons/react.svg",
        },
        {
          name: "Tailwind CSS",
        },
        {
          name: "TypeScript",
          icon: "/icons/typescript.svg",
        },
        {
          name: "MongoDB",
          icon: "/icons/mongodb.svg",
        },
      ],
      detailedDescription: {
        desc: "Building a platform where users can register, upload knowledge files (PDF/TXT), and chat with an AI assistant that responds using contextually embedded data. Features include persistent chat history, user authentication, and incremental message loading.",
        keyPoints: [
          {
            label:
              "Each user's uploads are embedded and stored in a separate vector collection using Qdrant.",
            image: "/projects/chatbot-builder/embedding.svg",
          },
          {
            label:
              "Implemented persistent chat storage in MongoDB with lazy loading and scroll-based pagination.",
            image: "/projects/chatbot-builder/chat.svg",
          },
          {
            label:
              "Secured endpoints and frontend routes with JWT-based auth including token persistence and protected route guards.",
            image: "/projects/chatbot-builder/authentication.svg",
          },
        ],
      },
    },
    /*
    {
      "title": "RGBi",
      "role": "Founder / Solo Developer",
      "duration": "May 2025 - Present",
      "tags": ["In Progress", "Side Project"],
      "description": "A MERN-stack powered tool that recommends PC parts based on performance, aesthetics, budget, and noise preferences.",
      "techStack": [
        {
          "name": "React",
          "icon": "/icons/react.svg"
        },
        {
          "name": "TypeScript",
          "icon": "/icons/typescript.svg"
        },
        {
          "name": "Tailwind CSS"
        },
        {
          "name": "Node.js",
          "icon": "/icons/nodejs.svg"
        },
        {
          "name": "Express.js"
        },
        {
          "name": "MongoDB",
          "icon": "/icons/mongodb.svg"
        },
        {
          "name": "Vercel",
          "icon": "/icons/vercel.svg"
        },
        {
          "name": "Cohere"
        },
        {
          "name": "Qdrant"
        },
        {
          "name": "Google Cloud Run",
          "icon": "/icons/google-cloud.svg"
        }
      ],
      "detailedDescription": {
        "desc": "Built a personalized PC part recommendation engine that ranks hardware based on user-defined parameters like noise levels, performance scores, and budget, using semantic vector search with Cohere and Qdrant.",
        "keyPoints": [
          {
            "label": "Smart ranking: Used Cohere's Rerank API for intelligent sorting of component options.",
            "image": "/projects/rgbi/ranking.svg"
          },
          {
            "label": "Fast search: Integrated Qdrant vector database for quick and accurate similarity search.",
            "image": "/projects/rgbi/search.svg"
          },
          {
            "label": "Serverless backend: Deployed API endpoints via Google Cloud Functions for cost-efficient scaling.",
            "image": "/projects/rgbi/api.svg"
          }
        ]
      }
    },
    */
    {
      title: "The Yarn Bazaar Website",
      role: "Full-Stack Engineer",
      tags: ["Live", "Open to Public"],
      duration: "Jan 2025 - Jul 2025",
      description:
        "A high-performance website built with Next.js to improve SEO, content management, and overall user experience.",
      techStack: [
        {
          name: "TypeScript",
          icon: "/icons/typescript.svg",
        },
        {
          name: "Next.js",
          icon: "/icons/next-js.svg",
        },
        {
          name: "DynamoDB",
          icon: "/icons/aws-dynamodb.svg",
        },
        {
          name: "AWS Lambda",
          icon: "/icons/aws-lambda.svg",
        },
        {
          name: "AWS API Gateway",
        },
        {
          name: "AWS Cognito",
        },
        {
          name: "AWS S3",
          icon: "/icons/aws.svg",
        },
        {
          name: "AWS CloudFront",
        },
      ],
      detailedDescription: {
        desc: "Directed a team of developers and a designer in transforming a static HTML/CSS/JS site into a performant Next.js architecture, boosting SEO and content agility.",
        keyPoints: [
          {
            label:
              "Content Management: Built a CMS for the marketing team to manage blogs, news, and podcasts without dev intervention—reduced developer dependency by 70%.",
            image: "projects/tyb-website/cms.svg",
          },
          {
            label:
              "SEO & Performance: Leveraged Next.js SSR and caching, resulting in a 40% improvement in page load speed and search visibility.",
            image: "projects/tyb-website/seo.svg",
          },
        ],
      },
    },
    {
      title: "The Yarn Bazaar CRM",
      role: "Full-Stack Developer",
      duration: "Dec 2023 - Jan 2025",
      tags: ["Deprecated", "Internal Tool"],
      description:
        "A centralized CRM system streamlining lead management, communication, and order tracking through WhatsApp automation, email integration, and internal tools.",
      techStack: [
        {
          name: "TypeScript",
          icon: "/icons/typescript.svg",
        },
        {
          name: "React",
          icon: "/icons/react.svg",
        },
        {
          name: "DynamoDB",
          icon: "/icons/aws-dynamodb.svg",
        },
        {
          name: "AWS Lambda",
          icon: "/icons/aws-lambda.svg",
        },
        {
          name: "AWS API Gateway",
        },
        {
          name: "AWS Cognito",
        },
        {
          name: "AWS S3",
          icon: "/icons/aws.svg",
        },
        {
          name: "AWS CloudFront",
        },
      ],
      detailedDescription: {
        desc: "Built a full-featured CRM enabling better customer visibility, automated communication, and operational efficiency.",
        keyPoints: [
          {
            label:
              "Communication: Integrated WhatsApp bot, email, and call automation for instant alerts and faster lead follow-up.",
            image: "/projects/tyb-crm/communication.svg",
          },
          {
            label:
              "Sales Support: Added Google Maps for location tagging and visit planning, improving sales team efficiency.",
            image: "/projects/tyb-crm/support.svg",
          },
          {
            label:
              "Document Automation: Used OCR to extract structured data from invoices and forms—cutting manual entry time by 70%.",
            image: "/projects/tyb-crm/ocr.svg",
          },
        ],
      },
    },
    {
      title: "One Click Download",
      role: "Solo Developer",
      duration: "Apr 2023 - May 2023",
      tags: ["Side Project", "Live"],
      description:
        "A lightweight utility web app for quickly accessing and downloading frequently used applications with a single click.",
      techStack: [
        {
          name: "React",
          icon: "/icons/react.svg",
        },
        {
          name: "TypeScript",
          icon: "/icons/typescript.svg",
        },
        {
          name: "Tailwind CSS",
        },
        {
          name: "Node.js",
          icon: "/icons/nodejs.svg",
        },
        {
          name: "MongoDB",
          icon: "/icons/mongodb.svg",
        },
      ],
      detailedDescription: {
        desc: "Created a dynamic download portal where users can bookmark or search for commonly-used software, updated in real-time through a backend CMS.",
        keyPoints: [
          {
            label:
              "Dynamic linking: Admin backend allows updating and adding download links on the fly.",
            image: "/projects/ocd/dynamic.svg",
          },
          {
            label:
              "Fast access: Optimized UI for one-click navigation and download start.",
            image: "/projects/ocd/ui.svg",
          },
          {
            label:
              "Lightweight stack: Simple but efficient stack to ensure fast load times and responsiveness.",
            image: "/projects/ocd/lightweight.svg",
          },
        ],
      },
    },
  ],
  socialLinks: [
    {
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/ujjw4l/",
      imageUrl: "/icons/linkedin.svg",
    },
    {
      title: "GitHub",
      url: "https://github.com/Lucverse",
      imageUrl: "/icons/github.svg",
    },
    {
      title: "Stack Overflow",
      url: "https://stackoverflow.com/users/21086050/lucverse",
      imageUrl: "/icons/stackoverflow.svg",
    },
    {
      title: "Email",
      url: "mailto:ujjw4l.singh@gmail.com",
      imageUrl: "/icons/email.svg",
    },
  ],
};

export default rawData;
