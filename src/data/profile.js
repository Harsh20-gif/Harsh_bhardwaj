// Single source of truth for Harsh Bhardwaj's portfolio content.
// Grounded strictly in the attached Java Full Stack & Laravel/Java Backend resumes.
// Update placeholder GitHub & live demo URLs inside PROJECT_LINKS below.

const BASE_URL = import.meta.env.BASE_URL || '/';

export const PROJECT_LINKS = {
  'job-application-tracker': {
    github: 'https://github.com/Harsh20-gif/job-application-tracker',
    live: 'https://harsh20-gif.github.io/job-application-tracker',
  },
  'student-management-system': {
    github: 'https://github.com/Harsh20-gif/student-management-system',
    live: 'https://harsh20-gif.github.io/student-management-system',
  },
  'e-commerce-management-system': {
    github: 'https://github.com/Harsh20-gif/ecommerce-management-system',
    live: 'https://harsh20-gif.github.io/ecommerce-management-system',
  },
  'learning-management-system': {
    github: 'https://github.com/Harsh20-gif/learning-management-system',
    live: 'https://harsh20-gif.github.io/learning-management-system',
  },
  'ai-quiz-assessment-engine': {
    github: 'https://github.com/Harsh20-gif/ai-quiz-assessment-engine',
    live: 'https://harsh20-gif.github.io/ai-quiz-assessment-engine',
  },
  'online-shopping-cart': {
    github: 'https://github.com/Harsh20-gif/online-shopping-cart',
    live: 'https://harsh20-gif.github.io/online-shopping-cart',
  },
  'news-portal-website': {
    github: 'https://github.com/Harsh20-gif/news-portal-website',
    live: 'https://harsh20-gif.github.io/news-portal-website',
  },
  'cms-admin-panel': {
    github: 'https://github.com/Harsh20-gif/cms-admin-panel',
    live: 'https://harsh20-gif.github.io/cms-admin-panel',
  },
  'inventory-management-system': {
    github: 'https://github.com/Harsh20-gif/inventory-management-system',
    live: 'https://harsh20-gif.github.io/inventory-management-system',
  },
  'crm-application': {
    github: 'https://github.com/Harsh20-gif/crm-application',
    live: 'https://harsh20-gif.github.io/crm-application',
  },
  'kuhu-kids-learning-platform': {
    github: 'https://github.com/Harsh20-gif/kuhu-kids-learning-platform',
    live: 'https://harsh20-gif.github.io/kuhu-kids-learning-platform',
  },
  'car-pool-app': {
    github: 'https://github.com/Harsh20-gif/car-pool-app',
    live: 'https://harsh20-gif.github.io/car-pool-app',
  },
};

export const PROFILE = {
  personal: {
    name: 'Harsh Bhardwaj',
    monogram: 'HB',
    rolePrimary: 'Java Backend Developer | Spring Boot',
    rolesTyped: [
      'Java Backend Developer | Spring Boot',
      'Java Full Stack Developer',
      'Spring Security & REST API Engineer',
      'Laravel & Java Backend Developer',
    ],
    tagline:
      'Building JWT-secured Spring Boot REST APIs, relational MySQL architectures, and React.js frontends from database schema to user interface.',
    location: 'Ghaziabad, Uttar Pradesh',
    email: 'harsh.bhardwaj.dev@gmail.com',
    phone: '+91 7505150687',
    phoneHref: 'tel:+917505150687',
    linkedin: 'https://www.linkedin.com/in/harsh-bhardwaj-java',
    linkedinDisplay: 'linkedin.com/in/harsh-bhardwaj-java',
    github: 'https://github.com/Harsh20-gif',
    githubDisplay: 'github.com/Harsh20-gif',
    resumeUrl: `${BASE_URL}resume.pdf`,
    portraitUrl: `${BASE_URL}portrait.webp`,
    portraitAlt: 'Harsh Bhardwaj, Java Backend Developer wearing a navy blazer and white shirt',
    availability: 'Open to Entry-Level Java / Spring Boot Roles',
  },

  navLinks: [
    { id: 'about', label: 'About' },
    { id: 'tech-stack', label: 'Stack' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'coding-lab', label: 'Lab' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ],

  about: {
    summary:
      'Java Backend & Full Stack Developer with hands-on experience building REST APIs using Spring Boot, Spring Data JPA, and MySQL, alongside responsive frontends with React.js, HTML5, CSS3, Bootstrap, and JavaScript. Built two Spring Boot backend systems featuring JWT-secured, role-based authorization, and shipped end-to-end CMS, inventory, CRM, e-learning, and carpool systems across internships using Java, Laravel, and MySQL.',
    highlights: [
      'REST API design with Spring Boot, Hibernate & Spring Data JPA',
      'Stateless authentication with Spring Security, JWT & RBAC',
      'End-to-end database schema modeling to React.js UI delivery',
    ],
    stats: [
      {
        id: 'page-load',
        value: 25,
        suffix: '%',
        label: 'Faster Page Load',
        context: 'NOU-e-Gyan Portal optimization at Softpro India',
        accent: 'cyan',
      },
      {
        id: 'content-work',
        value: 40,
        suffix: '%',
        label: 'Less Manual Content Work',
        context: 'Dynamic CMS features in News Portal Website',
        accent: 'amber',
      },
      {
        id: 'catalog-size',
        value: 50,
        suffix: '+',
        label: 'Product Catalog Entries',
        context: 'Real-time filtering & checkout in Online Shopping Cart',
        accent: 'cyan',
      },
      {
        id: 'bugs-fixed',
        value: 20,
        suffix: '+',
        label: 'Bugs Resolved in Prod',
        context: 'Tested & debugged Java/JSP modules at Softpro India',
        accent: 'amber',
      },
    ],
  },

  // Skill list anchored on the Java Full Stack resume and merged without duplicates
  // with additional skills from the Laravel & Java Backend resume.
  skillGroups: [
    {
      category: 'Languages',
      tag: 'CORE',
      items: [
        { name: 'Java (Core, Advanced)', iconKey: 'java', note: 'OOP, Collections, Multithreading' },
        { name: 'JavaScript', iconKey: 'javascript', note: 'ES6+, DOM & Async APIs' },
        { name: 'SQL', iconKey: 'sql', note: 'Relational Queries & Joins' },
        { name: 'PHP', iconKey: 'php', note: 'Server-side & Laravel Apps' },
        { name: 'Python', iconKey: 'python', note: 'Flask APIs & Scripting' },
        { name: 'C', iconKey: 'c', note: 'DSA & Systems Foundations' },
      ],
    },
    {
      category: 'Backend',
      tag: 'API & ORM',
      items: [
        { name: 'Spring Boot', iconKey: 'springboot', note: 'Production REST Services' },
        { name: 'Spring Data JPA', iconKey: 'jpa', note: 'Repositories & Entity Mapping' },
        { name: 'Hibernate', iconKey: 'hibernate', note: 'ORM & Relations' },
        { name: 'REST APIs', iconKey: 'rest', note: 'JSON CRUD & Validation' },
        { name: 'JDBC / Servlets / JSP', iconKey: 'java', note: 'Classic Java Web Stack' },
        { name: 'JUnit', iconKey: 'junit', note: 'Service & Controller Tests' },
        { name: 'Laravel', iconKey: 'laravel', note: 'MVC, Auth & CRUD Systems' },
        { name: 'Flask', iconKey: 'flask', note: 'Lightweight Python Backend' },
      ],
    },
    {
      category: 'Frontend',
      tag: 'CLIENT UI',
      items: [
        { name: 'React.js', iconKey: 'react', note: 'SPA Views & API Integration' },
        { name: 'HTML5', iconKey: 'html5', note: 'Semantic Markup' },
        { name: 'CSS3', iconKey: 'css3', note: 'Responsive Grid & Flexbox' },
        { name: 'Bootstrap', iconKey: 'bootstrap', note: 'Rapid Responsive Layouts' },
      ],
    },
    {
      category: 'Database',
      tag: 'PERSISTENCE',
      items: [
        { name: 'MySQL', iconKey: 'mysql', note: 'Schemas, Keys & Indexing' },
        { name: 'XAMPP', iconKey: 'xampp', note: 'Local MySQL & Apache Stack' },
      ],
    },
    {
      category: 'Security',
      tag: 'AUTH & RBAC',
      items: [
        { name: 'Spring Security', iconKey: 'springsecurity', note: 'Filter Chain & Endpoints' },
        { name: 'JWT', iconKey: 'jwt', note: 'Stateless Bearer Tokens' },
        { name: 'Role-Based Authorization', iconKey: 'rbac', note: 'Customer & Admin Access' },
      ],
    },
    {
      category: 'Tools',
      tag: 'WORKFLOW',
      items: [
        { name: 'Git & GitHub', iconKey: 'git', note: 'Version Control & Hosting' },
        { name: 'Maven', iconKey: 'maven', note: 'Builds & Dependency Mgmt' },
        { name: 'Postman', iconKey: 'postman', note: 'API Testing & Payloads' },
        { name: 'IntelliJ IDEA', iconKey: 'intellij', note: 'Primary Java IDE' },
        { name: 'Eclipse', iconKey: 'eclipse', note: 'Java EE & Servlets IDE' },
        { name: 'VS Code', iconKey: 'vscode', note: 'Frontend & AI-Assisted Dev' },
        { name: 'Jira', iconKey: 'jira', note: 'Sprint & Issue Tracking' },
        { name: 'Figma', iconKey: 'figma', note: 'UI & User Flow Design' },
        { name: 'Windows & Linux', iconKey: 'linux', note: 'OS & Basic CLI Environments' },
      ],
    },
  ],

  architecture: {
    endpointSample: 'POST /api/v1/orders',
    authHeaderSample: 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...',
    nodes: [
      {
        id: 'client',
        step: '01',
        title: 'React Client',
        subtitle: 'UI & HTTP Request',
        protocol: 'HTTPS / JSON',
        iconKey: 'react',
        description:
          'Captures user action (cart checkout, job stage update, or student enrollment) and dispatches a REST request with Bearer token.',
        payload: '{ "productId": 42, "quantity": 2 }',
        badge: 'FETCH / STATE',
      },
      {
        id: 'controller',
        step: '02',
        title: 'REST API (Spring Boot)',
        subtitle: '@RestController',
        protocol: 'DispatcherServlet',
        iconKey: 'springboot',
        description:
          'Routes HTTP endpoints, deserializes request DTOs, and enforces bean validation rules before handing off to security and services.',
        payload: '@PostMapping("/api/v1/orders")',
        badge: '201 CREATED',
      },
      {
        id: 'security',
        step: '03',
        title: 'Spring Security (JWT + Roles)',
        subtitle: 'Auth Filter & RBAC',
        protocol: 'Stateless JWT',
        iconKey: 'springsecurity',
        description:
          'Validates JWT signature and expiration, hydrates SecurityContext, and enforces role-based access (CUSTOMER / ADMIN).',
        payload: '@PreAuthorize("hasRole(\'CUSTOMER\')")',
        badge: 'HS256 VERIFIED',
      },
      {
        id: 'service',
        step: '04',
        title: 'Service Layer',
        subtitle: '@Service & @Transactional',
        protocol: 'Business Rules',
        iconKey: 'java',
        description:
          'Executes core domain logic (stock calculation, grade rules, stage transitions) and handles exceptions consistently.',
        payload: 'orderService.placeOrder(user, dto)',
        badge: 'ACID BOUNDARY',
      },
      {
        id: 'jpa',
        step: '05',
        title: 'Spring Data JPA',
        subtitle: 'Hibernate & Repositories',
        protocol: 'ORM / JPQL',
        iconKey: 'hibernate',
        description:
          'Maps Java entities (@ManyToOne, @OneToMany) to relational records via JpaRepository without boilerplate SQL.',
        payload: 'orderRepository.save(orderEntity)',
        badge: 'ENTITY MAPPED',
      },
      {
        id: 'mysql',
        step: '06',
        title: 'MySQL',
        subtitle: 'Relational Persistence',
        protocol: 'JDBC Pool',
        iconKey: 'mysql',
        description:
          'Persists normalized tables for users, products, orders, enrollments, and job stages with foreign-key integrity.',
        payload: 'COMMIT; -- 1 row inserted (orders)',
        badge: 'TX COMMITTED',
      },
    ],
  },

  codingLab: {
    workspace: 'harsh-backend-showcase',
    files: [
      {
        id: 'controller',
        filename: 'OrderController.java',
        path: 'src/main/java/com/harsh/ecommerce/controller/OrderController.java',
        language: 'Java · Spring Boot',
        code: `@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<OrderResponse> placeOrder(
            @AuthenticationPrincipal UserDetails principal,
            @Valid @RequestBody OrderRequest request) {

        OrderResponse created = orderService.createOrder(
                principal.getUsername(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PatchMapping("/{orderId}/cancel")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<OrderResponse> cancelOrder(
            @PathVariable Long orderId,
            @AuthenticationPrincipal UserDetails principal) {

        return ResponseEntity.ok(
                orderService.cancelOrder(orderId, principal.getUsername()));
    }
}`,
      },
      {
        id: 'entity',
        filename: 'Order.java',
        path: 'src/main/java/com/harsh/ecommerce/entity/Order.java',
        language: 'Java · Spring Data JPA',
        code: `@Entity
@Table(name = "orders")
@Getter @Setter
@NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private OrderStatus status = OrderStatus.PLACED;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items = new ArrayList<>();
}`,
      },
      {
        id: 'test',
        filename: 'JobApplicationServiceTest.java',
        path: 'src/test/java/com/harsh/tracker/JobApplicationServiceTest.java',
        language: 'Java · JUnit 5',
        code: `@ExtendWith(MockitoExtension.class)
class JobApplicationServiceTest {

    @Mock
    private JobApplicationRepository repository;

    @InjectMocks
    private JobApplicationService service;

    @Test
    void shouldUpdateStageFromAppliedToInterview() {
        JobApplication app = new JobApplication(
                1L, "Backend Engineer", ApplicationStage.APPLIED);
        when(repository.findById(1L)).thenReturn(Optional.of(app));
        when(repository.save(any())).thenReturn(app);

        JobApplication updated = service.updateStage(
                1L, ApplicationStage.INTERVIEW);

        assertEquals(ApplicationStage.INTERVIEW, updated.getStage());
        verify(repository).save(app);
    }
}`,
      },
    ],
    terminalLines: [
      { type: 'cmd', text: '$ mvn test' },
      { type: 'info', text: '[INFO] Scanning for projects...' },
      { type: 'info', text: '[INFO] --- surefire:3.2.5:test (default-test) @ ecommerce-api ---' },
      { type: 'info', text: '[INFO] Running com.harsh.ecommerce.OrderControllerTest' },
      { type: 'pass', text: '[INFO] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0 - PASS' },
      { type: 'info', text: '[INFO] Running com.harsh.tracker.JobApplicationServiceTest' },
      { type: 'pass', text: '[INFO] Tests run: 4, Failures: 0, Errors: 0, Skipped: 0 - PASS' },
      { type: 'info', text: '[INFO] -------------------------------------------------------' },
      { type: 'success', text: 'mvn test ✓ BUILD SUCCESS  (9/9 passed · 2.41 s)' },
    ],
  },

  projectCategories: [
    { id: 'all', label: 'All Projects' },
    { id: 'java', label: 'Spring Boot & Java' },
    { id: 'laravel', label: 'Laravel Systems' },
    { id: 'web', label: 'React & Python' },
  ],

  projects: [
    {
      id: 'job-application-tracker',
      title: 'Job Application Tracker',
      year: '2025',
      category: 'java',
      featured: true,
      summary:
        'Spring Boot REST API and React.js application tracking job applications across Applied, Interview, Offer, and Rejected pipeline stages with JUnit coverage.',
      tech: ['Java', 'Spring Boot', 'Spring Data JPA', 'React.js', 'JUnit', 'MySQL'],
      bullets: [
        'Built a Spring Boot REST API with Spring Data JPA to create, update, and track job applications through stages such as Applied, Interview, Offer, and Rejected.',
        'Wrote JUnit unit tests for the service and controller layers to verify application logic and API responses.',
      ],
      links: PROJECT_LINKS['job-application-tracker'],
    },
    {
      id: 'e-commerce-management-system',
      title: 'E-Commerce Management System',
      year: '2025',
      category: 'java',
      featured: true,
      summary:
        'JWT-secured Spring Boot backend managing product catalogs, categories, shopping carts, and order placement/cancellation with customer and admin RBAC.',
      tech: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'Spring Data JPA', 'MySQL'],
      bullets: [
        'Built REST APIs for product, category, shopping cart, and order management, including order placement and cancellation.',
        'Secured endpoints with Spring Security and JWT, with role-based access for customers and administrators.',
        'Designed relational database schemas for products, categories, customers, and orders.',
      ],
      links: PROJECT_LINKS['e-commerce-management-system'],
    },
    {
      id: 'student-management-system',
      title: 'Student Management System',
      year: '2025',
      category: 'java',
      featured: true,
      summary:
        'RESTful CRUD backend handling student records, course enrollments, marks entry, and automated grade calculation with consistent validation errors.',
      tech: ['Java', 'Spring Boot', 'Spring Data JPA', 'Hibernate', 'MySQL', 'REST APIs'],
      bullets: [
        'Developed RESTful CRUD APIs for student records, course enrollments, and marks entry.',
        'Designed MySQL schemas and JPA entity relationships for students, courses, and grades.',
        'Implemented grade calculation with input validation and exception handling to return consistent error responses.',
      ],
      links: PROJECT_LINKS['student-management-system'],
    },
    {
      id: 'learning-management-system',
      title: 'Learning Management System',
      year: '2026',
      category: 'java',
      featured: true,
      summary:
        'Web-based LMS built with Spring Boot REST APIs and MySQL to manage courses, learning content, users, role-based access, enrollments, and student progress.',
      tech: ['Spring Boot', 'REST APIs', 'MySQL'],
      bullets: [
        'Web-based LMS to manage courses, content, users and student progress, with role-based access, enrollment and progress tracking.',
      ],
      links: PROJECT_LINKS['learning-management-system'],
    },
    {
      id: 'ai-quiz-assessment-engine',
      title: 'AI-Driven Quiz & Assessment Engine',
      year: '2026',
      category: 'web',
      featured: false,
      summary:
        'Assessment platform built with Python and Flask featuring authentication, question bank management, automated quiz scoring, and result tracking.',
      tech: ['Python', 'Flask', 'MySQL'],
      bullets: [
        'Platform to create, manage and attempt quizzes with authentication, question management, automated scoring and result tracking.',
      ],
      links: PROJECT_LINKS['ai-quiz-assessment-engine'],
    },
    {
      id: 'online-shopping-cart',
      title: 'Online Shopping Cart',
      year: '2024',
      category: 'java',
      featured: false,
      summary:
        'Java web e-commerce platform using JSP, Servlets, JDBC, and XAMPP supporting 50+ product entries with real-time filtering and checkout flow.',
      tech: ['Java', 'JSP', 'JDBC', 'Servlets', 'XAMPP'],
      bullets: [
        'E-commerce site with product filtering and checkout flow, supporting 50+ product entries with real-time updates.',
      ],
      links: PROJECT_LINKS['online-shopping-cart'],
    },
    {
      id: 'news-portal-website',
      title: 'News Portal Website',
      year: '2023',
      category: 'web',
      featured: false,
      summary:
        'Dynamic React.js news portal with content management workflows that reduced manual content handling effort by 40%.',
      tech: ['React.js', 'HTML', 'CSS', 'Bootstrap', 'JavaScript'],
      bullets: [
        'Dynamic news website with content management features, reducing manual content handling by 40%.',
      ],
      links: PROJECT_LINKS['news-portal-website'],
    },
    {
      id: 'cms-admin-panel',
      title: 'CMS Admin Panel',
      year: '2026',
      category: 'laravel',
      featured: false,
      summary:
        'Full-featured Laravel admin console enabling non-technical updates to courses, gallery, placements, and testimonials across mobile, tablet, and desktop.',
      tech: ['Laravel', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
      bullets: [
        'Built a Laravel admin panel to manage all website content (courses, gallery, placements, testimonials) without code changes.',
        'Fixed image upload/display bugs and improved responsiveness across mobile, tablet and desktop.',
      ],
      links: PROJECT_LINKS['cms-admin-panel'],
    },
    {
      id: 'inventory-management-system',
      title: 'Inventory Management System',
      year: '2026',
      category: 'laravel',
      featured: false,
      summary:
        'Authenticated Laravel and MySQL system automating stock tracking, product catalogs, purchases, and sales records to improve data accuracy.',
      tech: ['Laravel', 'MySQL', 'Authentication', 'CRUD'],
      bullets: [
        'Developed a system for products, stock levels, purchases, sales and records using Laravel and MySQL, with authentication, CRUD and automated stock tracking that reduces manual record-keeping and improves data accuracy.',
      ],
      links: PROJECT_LINKS['inventory-management-system'],
    },
    {
      id: 'crm-application',
      title: 'CRM Application',
      year: '2026',
      category: 'laravel',
      featured: false,
      summary:
        'Customer relationship management platform managing customers, leads, follow-ups, and business interactions with database-driven workflows.',
      tech: ['Laravel', 'MySQL', 'Authentication'],
      bullets: [
        'Built a CRM to manage customers, leads, follow-ups and business interactions with authentication and database-driven workflows (Laravel, MySQL).',
      ],
      links: PROJECT_LINKS['crm-application'],
    },
    {
      id: 'kuhu-kids-learning-platform',
      title: 'Kuhu Kids Learning Platform',
      year: '2026',
      category: 'laravel',
      featured: false,
      summary:
        'Interactive learning web app for children covering alphabets, phonics, tracing, and educational games backed by child profiles and reward tracking.',
      tech: ['Laravel', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
      bullets: [
        'Developed an interactive learning platform for children (alphabets, phonics, tracing, games) with child profiles, progress tracking and rewards (Laravel, MySQL, HTML, CSS, JavaScript).',
      ],
      links: PROJECT_LINKS['kuhu-kids-learning-platform'],
    },
    {
      id: 'car-pool-app',
      title: 'Car Pool App',
      year: '2026',
      category: 'laravel',
      featured: false,
      summary:
        'Shared-transport coordination platform built with Laravel and MySQL to offer and search rides with user management and ride details.',
      tech: ['Laravel', 'MySQL'],
      bullets: [
        'Developed a carpool application to offer and find rides and coordinate shared transport, with user management, ride details and search (Laravel, MySQL).',
      ],
      links: PROJECT_LINKS['car-pool-app'],
    },
  ],

  experience: [
    {
      id: 'dashandots',
      role: 'Laravel Developer Intern',
      company: 'Dashandots',
      location: 'Remote / India',
      period: 'Feb 2026 – Sep 2026',
      stack: ['Laravel', 'MySQL', 'Figma', 'HTML/CSS/JS', 'Antigravity', 'VS Code'],
      bullets: [
        'Built five end-to-end applications: CMS Admin Panel, Inventory Management System, CRM Application, Kuhu Kids Learning Platform, and Car Pool App using Laravel and MySQL.',
        'Resolved image upload/display defects and improved responsive layouts across mobile, tablet, and desktop breakpoints.',
        'Designed UI and user flows in Figma for a Health App and conceptualised an AI-assisted personalised health suggestion feature.',
        'Utilized AI-assisted tools (Antigravity, VS Code) to accelerate code generation, debugging, and refactoring while maintaining code quality.',
      ],
    },
    {
      id: 'skilledup',
      role: 'Web Development Intern',
      company: 'SkilledUp Technologies Pvt. Ltd.',
      location: 'India',
      period: 'Jul 2025 – Aug 2025',
      stack: ['HTML5', 'CSS3', 'JavaScript', 'Web Development'],
      bullets: [
        'Completed a two-month web development internship, delivering assigned projects and technical tasks under mentor guidance while meeting team quality standards.',
      ],
    },
    {
      id: 'softpro',
      role: 'Java Developer Intern (Junior Java Developer)',
      company: 'Softpro India Computer Technology Pvt. Ltd.',
      location: 'Lucknow',
      period: 'Jul 2022 – Sep 2022',
      stack: ['Java', 'JSP', 'Servlets', 'JDBC', 'MySQL', 'XAMPP', 'Bootstrap'],
      bullets: [
        'Built and tested modules for the NOU-e-Gyan Portal (web-based Learning Management System with login, registration, About Us, and Contact Us pages) using Java, JSP, Servlets, JDBC, HTML, CSS, JavaScript, and Bootstrap.',
        'Created and managed MySQL database tables via XAMPP, performed testing and debugging, fixed 20+ bugs, and improved page load speed by 25%.',
      ],
    },
  ],

  education: [
    {
      id: 'btech',
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'Raj Kumar Goel Institute of Technology and Management (RKGIT)',
      location: 'Ghaziabad, U.P.',
      period: '2023 – 2026',
    },
    {
      id: 'diploma',
      degree: 'Diploma in Computer Science & Engineering',
      institution: 'Government Polytechnic Bijnor',
      location: 'Bijnor, U.P.',
      period: '2020 – 2023',
    },
  ],

  certifications: [
    {
      id: 'saylor-java',
      title: 'Introduction to Java and Object-Oriented Programming',
      issuer: 'Saylor Academy',
      date: 'Apr 2025',
      details: 'Object-oriented principles, class hierarchies, and Java programming.',
    },
    {
      id: 'fullstack-java',
      title: 'Full Stack Development using Java',
      issuer: 'Professional Training',
      date: 'Jul 2023',
      details: 'Spring Boot, React, MySQL, REST APIs.',
    },
    {
      id: 'softpro-core-java',
      title: 'Summer Training in Core Java',
      issuer: 'Softpro India',
      date: 'Jul – Aug 2022',
      details: 'OOP, Exception Handling, Collections, Multithreading, JDBC.',
    },
  ],
};
