// ── CS Fundamentals tracker data ─────────────────────────────
// Each subject has sections; each section has questions (checkable items).
// Source: GeeksforGeeks interview-prep pages.

export const csSubjects = [
  {
    id: "oops",
    name: "OOPs",
    icon: "🧩",
    color: "#a855f7",
    sourceUrl:
      "https://www.geeksforgeeks.org/interview-prep/oops-interview-questions/",
    sections: [
      {
        id: "oops-basics",
        title: "Core Concepts",
        questions: [
          { id: "oops-1", text: "What is Object Oriented Programming (OOPs)?" },
          { id: "oops-2", text: "Why OOPs? What advantages does it give?" },
          {
            id: "oops-3",
            text: "What other programming paradigms exist besides OOPs?",
          },
          {
            id: "oops-4",
            text: "Difference between Structured Programming and OOP",
          },
          { id: "oops-5", text: "Commonly used OOP languages" },
          { id: "oops-6", text: "Advantages and disadvantages of OOPs" },
          { id: "oops-7", text: "What is a Class?" },
          { id: "oops-8", text: "What is an Object?" },
        ],
      },
      {
        id: "oops-pillars",
        title: "4 Pillars of OOPs",
        questions: [
          {
            id: "oops-9",
            text: "What are the main features (4 pillars) of OOPs?",
          },
          { id: "oops-10", text: "What is Encapsulation?" },
          { id: "oops-11", text: "What is Abstraction?" },
          { id: "oops-12", text: "What is Inheritance? What is its purpose?" },
          {
            id: "oops-13",
            text: "What is Polymorphism? Types of Polymorphism?",
          },
          {
            id: "oops-14",
            text: "What are access specifiers? Their significance?",
          },
          {
            id: "oops-15",
            text: "Difference between overloading and overriding",
          },
        ],
      },
      {
        id: "oops-inheritance",
        title: "Inheritance & Interfaces",
        questions: [
          { id: "oops-16", text: "Are there any limitations on Inheritance?" },
          {
            id: "oops-17",
            text: "What different types of Inheritance are there?",
          },
          { id: "oops-18", text: "What is an interface?" },
          {
            id: "oops-19",
            text: "How is an abstract class different from an interface?",
          },
          { id: "oops-20", text: "How much memory does a class occupy?" },
          {
            id: "oops-21",
            text: "Is it always necessary to create objects from a class?",
          },
          {
            id: "oops-22",
            text: "Difference between a structure and a class in C++",
          },
        ],
      },
      {
        id: "oops-constructors",
        title: "Constructors & Destructors",
        questions: [
          { id: "oops-23", text: "What is a Constructor?" },
          { id: "oops-24", text: "Various types of constructors in C++" },
          { id: "oops-25", text: "What is a destructor?" },
          {
            id: "oops-26",
            text: "Can we overload the constructor in a class?",
          },
          { id: "oops-27", text: "Can we overload the destructor in a class?" },
        ],
      },
      {
        id: "oops-advanced",
        title: "Friend, Virtual & Abstract",
        questions: [
          {
            id: "oops-28",
            text: "What are friend functions and friend classes?",
          },
          {
            id: "oops-29",
            text: "What is a virtual function and pure virtual function?",
          },
          { id: "oops-30", text: "What is an abstract class?" },
        ],
      },
    ],
  },
  {
    id: "os",
    name: "Operating Systems",
    icon: "🖥️",
    color: "#3b82f6",
    sourceUrl:
      "https://www.geeksforgeeks.org/operating-systems/operating-systems-interview-questions/",
    sections: [
      {
        id: "os-process",
        title: "Process & Threads",
        questions: [
          { id: "os-1", text: "What is a process and process table?" },
          { id: "os-2", text: "What are the different states of a process?" },
          { id: "os-3", text: "What is a Thread?" },
          { id: "os-4", text: "Differences between process and thread" },
          { id: "os-5", text: "Benefits of multithreaded programming" },
          { id: "os-6", text: "What is Context Switching?" },
          { id: "os-7", text: "What is PCB?" },
          {
            id: "os-8",
            text: "What is a zombie process? What is an orphan process?",
          },
        ],
      },
      {
        id: "os-scheduling",
        title: "CPU Scheduling",
        questions: [
          {
            id: "os-9",
            text: "What are the different scheduling algorithms? (FCFS, SJN, Priority, SRT, RR, MLQ)",
          },
          { id: "os-10", text: "Briefly explain FCFS" },
          {
            id: "os-11",
            text: "What is the Round Robin scheduling algorithm?",
          },
          {
            id: "os-12",
            text: "Difference between preemptive and non-preemptive scheduling",
          },
          { id: "os-13", text: "What are the goals of CPU scheduling?" },
          {
            id: "os-14",
            text: "What is a dispatcher? What is dispatch latency?",
          },
          { id: "os-15", text: "What is starvation and aging in OS?" },
        ],
      },
      {
        id: "os-memory",
        title: "Memory Management",
        questions: [
          { id: "os-16", text: "What is virtual memory?" },
          { id: "os-17", text: "What is demand paging and how does it work?" },
          { id: "os-18", text: "What is thrashing? When does it occur?" },
          {
            id: "os-19",
            text: "Difference between logical and physical address",
          },
          {
            id: "os-20",
            text: "What is fragmentation? Internal vs external fragmentation",
          },
          { id: "os-21", text: "Basic function of paging" },
          { id: "os-22", text: "Difference between paging and segmentation" },
          {
            id: "os-23",
            text: "How does swapping result in better memory management?",
          },
          {
            id: "os-24",
            text: "What is the best page size when designing an OS?",
          },
          { id: "os-25", text: "Advantages of virtual memory" },
        ],
      },
      {
        id: "os-sync",
        title: "Synchronization & Deadlock",
        questions: [
          {
            id: "os-26",
            text: "Classic synchronization problems (bounded-buffer, readers-writers, dining philosophers, sleeping barber)",
          },
          { id: "os-27", text: "What is a critical section?" },
          {
            id: "os-28",
            text: "Synchronization techniques (mutexes, semaphores, condition variables, file locks)",
          },
          { id: "os-29", text: "Advantages and drawbacks of semaphores" },
          { id: "os-30", text: "What is Peterson's approach?" },
          { id: "os-31", text: "What is bounded waiting?" },
          {
            id: "os-32",
            text: "Necessary conditions for deadlock (mutual exclusion, hold & wait, no preemption, circular wait)",
          },
          { id: "os-33", text: "What is Banker's algorithm?" },
          { id: "os-34", text: "What is a resource allocation graph?" },
          { id: "os-35", text: "How to recover from a deadlock?" },
        ],
      },
      {
        id: "os-ipc",
        title: "IPC & Kernel",
        questions: [
          {
            id: "os-36",
            text: "What is IPC? Different IPC mechanisms (pipes, message queuing, shared memory, sockets)",
          },
          { id: "os-37", text: "What is a kernel? Monolithic kernel?" },
          {
            id: "os-38",
            text: "Difference between Operating System and Kernel",
          },
          {
            id: "os-39",
            text: "Difference between user-level thread and kernel-level thread",
          },
          {
            id: "os-40",
            text: "What are interrupts? What is a trap/trapdoor?",
          },
        ],
      },
      {
        id: "os-file-disk",
        title: "File Systems & Disk",
        questions: [
          {
            id: "os-41",
            text: "Basic concept of a file system, operations on files",
          },
          { id: "os-42", text: "What is a File Allocation Table (FAT)?" },
          {
            id: "os-43",
            text: "What is rotational latency? What is seek time?",
          },
          { id: "os-44", text: "What is spooling?" },
          { id: "os-45", text: "What is Belady's Anomaly?" },
        ],
      },
    ],
  },
  {
    id: "dbms",
    name: "DBMS",
    icon: "🗄️",
    color: "#22c55e",
    sourceUrl:
      "https://www.geeksforgeeks.org/dbms/commonly-asked-dbms-interview-questions/",
    sections: [
      {
        id: "dbms-basics",
        title: "Basics & Keys",
        questions: [
          { id: "dbms-1", text: "What is a DBMS? Advantages of using a DBMS" },
          { id: "dbms-2", text: "Difference between DBMS and RDBMS" },
          {
            id: "dbms-3",
            text: "Different types of DBMS (Hierarchical, Network, Relational, Object-Oriented)",
          },
          {
            id: "dbms-4",
            text: "What is a relation / table in DBMS? Rows vs columns",
          },
          { id: "dbms-5", text: "What is a primary key? Give an example" },
          { id: "dbms-6", text: "What is a foreign key? Give an example" },
          {
            id: "dbms-7",
            text: "What is a candidate key? Superkey vs candidate key",
          },
          { id: "dbms-8", text: "Primary key vs Unique key" },
        ],
      },
      {
        id: "dbms-sql",
        title: "SQL Queries & Joins",
        questions: [
          { id: "dbms-9", text: "What is the SQL SELECT statement used for?" },
          {
            id: "dbms-10",
            text: "What is a view? How does it differ from a table?",
          },
          {
            id: "dbms-11",
            text: "Types of joins (INNER, LEFT, RIGHT, FULL, CROSS, SELF)",
          },
          {
            id: "dbms-12",
            text: "What is a subquery? Single-row vs multiple-row",
          },
          {
            id: "dbms-13",
            text: "Aggregate functions (COUNT, SUM, AVG, MAX, MIN)",
          },
          { id: "dbms-14", text: "Difference between UNION and UNION ALL" },
          { id: "dbms-15", text: "Difference between DELETE and TRUNCATE" },
          { id: "dbms-16", text: "Purpose of the GROUP BY clause" },
        ],
      },
      {
        id: "dbms-design",
        title: "Schema, Normalization & ER",
        questions: [
          {
            id: "dbms-17",
            text: "What are the different types of relationships (1:1, 1:M, M:M)?",
          },
          { id: "dbms-18", text: "What is a schema in DBMS?" },
          {
            id: "dbms-19",
            text: "What are constraints in DBMS? (NOT NULL, PK, FK, UNIQUE, CHECK, DEFAULT)",
          },
          {
            id: "dbms-20",
            text: "What is denormalization? How does it differ from normalization?",
          },
          {
            id: "dbms-21",
            text: "Explain normalization and normal forms (1NF, 2NF, 3NF, BCNF)",
          },
          {
            id: "dbms-22",
            text: "What is an ER diagram? Entities, attributes, relationships",
          },
          {
            id: "dbms-23",
            text: "Difference between ER diagram and relational schema",
          },
          {
            id: "dbms-24",
            text: "What is data redundancy? How can it be reduced?",
          },
        ],
      },
      {
        id: "dbms-transactions",
        title: "Transactions & Concurrency",
        questions: [
          { id: "dbms-25", text: "What is a transaction in DBMS?" },
          { id: "dbms-26", text: "What is the ACID property? Explain each" },
          { id: "dbms-27", text: "Importance of COMMIT and ROLLBACK" },
          {
            id: "dbms-28",
            text: "How does DBMS handle concurrency control? (locking, timestamp ordering, 2PL)",
          },
          {
            id: "dbms-29",
            text: "What is a deadlock in DBMS? How can it be prevented?",
          },
          {
            id: "dbms-30",
            text: "Different types of database locks (shared, exclusive, intent, update)",
          },
          { id: "dbms-31", text: "What is referential integrity?" },
          { id: "dbms-32", text: "What is a transaction log?" },
        ],
      },
      {
        id: "dbms-indexing",
        title: "Indexing & Storage",
        questions: [
          {
            id: "dbms-33",
            text: "What is an index? Types of indexes (single-column, composite, unique)",
          },
          { id: "dbms-34", text: "Clustered vs non-clustered index" },
          { id: "dbms-35", text: "What is a B-tree and B+ tree in DBMS?" },
          { id: "dbms-36", text: "What is hashing in DBMS? How does it work?" },
          {
            id: "dbms-37",
            text: "What is data partitioning? (Horizontal, Vertical, Range, Hash)",
          },
          { id: "dbms-38", text: "What is a materialized view?" },
        ],
      },
      {
        id: "dbms-advanced",
        title: "Procedures, Triggers & Admin",
        questions: [
          {
            id: "dbms-39",
            text: "What is a stored procedure? Give an example",
          },
          {
            id: "dbms-40",
            text: "What are triggers? Trigger vs stored procedure",
          },
          {
            id: "dbms-41",
            text: "What is a database cursor? Implicit vs explicit cursors",
          },
          { id: "dbms-42", text: "Role of a Database Administrator (DBA)" },
          { id: "dbms-43", text: "Phases of the DBMS query processing cycle" },
          {
            id: "dbms-44",
            text: "Types of backups (Full, Incremental, Differential, Transaction log)",
          },
          { id: "dbms-45", text: "DBMS vs file-based system" },
        ],
      },
    ],
  },
  {
    id: "cn",
    name: "Computer Networks",
    icon: "🌐",
    color: "#06b6d4",
    sourceUrl:
      "https://www.geeksforgeeks.org/blogs/networking-interview-questions/",
    sections: [
      {
        id: "cn-basics",
        title: "OSI Model & Basics",
        questions: [
          { id: "cn-1", text: "What is internetworking?" },
          {
            id: "cn-2",
            text: "Software layers (user support layers) in OSI model",
          },
          {
            id: "cn-3",
            text: "Hardware layers (network support layers) in OSI model",
          },
          {
            id: "cn-4",
            text: "What happens as a data packet moves up/down the OSI layers? (header add/remove)",
          },
          { id: "cn-5", text: "Services provided by the application layer" },
          { id: "cn-6", text: "Position of transmission media in OSI model" },
          { id: "cn-7", text: "Importance of twisting in twisted-pair cable" },
        ],
      },
      {
        id: "cn-protocols",
        title: "Protocols & Addressing",
        questions: [
          { id: "cn-8", text: "Define HTTPS protocol" },
          {
            id: "cn-9",
            text: "What is the main purpose of a DNS server? Protocol & port",
          },
          { id: "cn-10", text: "Two categories of DNS messages" },
          { id: "cn-11", text: "Why do we need the POP3 protocol for e-mail?" },
          {
            id: "cn-12",
            text: "How to identify a private vs public IP address",
          },
          { id: "cn-13", text: "How to get an IP address from a domain name?" },
          {
            id: "cn-14",
            text: "What is the role of address in a packet in a datagram network?",
          },
        ],
      },
      {
        id: "cn-security",
        title: "Security & VPN",
        questions: [
          { id: "cn-15", text: "What is a zone-based firewall?" },
          {
            id: "cn-16",
            text: "CIA Triad — Confidentiality, Integrity, Availability",
          },
          { id: "cn-17", text: "What is VPN? What is Tunnel mode?" },
          { id: "cn-18", text: "Symmetric vs Asymmetric Encryption" },
          { id: "cn-19", text: "At what layer does IPsec work?" },
          { id: "cn-20", text: "What are Digital Signatures?" },
          { id: "cn-21", text: "What is Authorization?" },
          { id: "cn-22", text: "Difference between IPS and a firewall" },
          { id: "cn-23", text: "What is IP Spoofing?" },
          { id: "cn-24", text: "Threat vs Vulnerability vs Risk" },
        ],
      },
      {
        id: "cn-transmission",
        title: "Transmission & Multiplexing",
        questions: [
          {
            id: "cn-25",
            text: "What kind of error is undetectable by checksum?",
          },
          {
            id: "cn-26",
            text: "Which multiplexing technique is used in fiber-optic links?",
          },
          { id: "cn-27", text: "Advantages of Fiber Optics" },
          {
            id: "cn-28",
            text: "Multiplexing techniques for combining analog vs digital signals",
          },
          { id: "cn-29", text: "Difference between Bluetooth and Wi-Fi" },
          {
            id: "cn-30",
            text: "What is OFDM (Orthogonal Frequency Division Multiplexing)?",
          },
          { id: "cn-31", text: "How is flow control achieved in TCP?" },
        ],
      },
      {
        id: "cn-routing",
        title: "Routing & Advanced",
        questions: [
          { id: "cn-32", text: "Can IP Multicast be load-balanced?" },
          { id: "cn-33", text: "What is Multicast? What is CGMP?" },
          {
            id: "cn-34",
            text: "Can a routing table have two entries with the same destination address?",
          },
          { id: "cn-35", text: "Why is OSPF faster than RIP?" },
          { id: "cn-36", text: "What is a transparent bridge?" },
          { id: "cn-37", text: "What is a reverse proxy?" },
          {
            id: "cn-38",
            text: "What is piggybacking? Advantages and disadvantages",
          },
          {
            id: "cn-39",
            text: "What is Jitter? Why is Bandwidth important to network performance?",
          },
        ],
      },
    ],
  },
];

export const totalCsQuestions = csSubjects.reduce(
  (acc, s) => acc + s.sections.reduce((a, sec) => a + sec.questions.length, 0),
  0,
);
