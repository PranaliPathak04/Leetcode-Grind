// ── Pattern-based Problem Sheet ──────────────────────────────
// A second, pattern-organized problem set (separate from the main
// 10-week roadmap). Grouped the way interviewers usually think:
// by technique, not by week.

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+-\s+/g, " ")
    .trim()
    .replace(/\s+/g, "-");
}

function mk(catPrefix, num, name, difficulty) {
  return {
    id: `${catPrefix}-${num}`,
    num,
    name,
    difficulty,
    leetcodeUrl: `https://leetcode.com/problems/${slugify(name)}/`,
  };
}

export const patternCategories = [
  {
    id: "arr-pointer",
    name: "Array & Pointer Patterns",
    icon: "🔗",
    color: "#22c55e",
    sections: [
      {
        id: "sliding-window-2",
        title: "Sliding Window",
        problems: [
          mk(
            "sw2",
            3,
            "Longest Substring Without Repeating Characters",
            "Medium",
          ),
          mk("sw2", 76, "Minimum Window Substring", "Hard"),
          mk("sw2", 209, "Minimum Size Subarray Sum", "Medium"),
          mk("sw2", 424, "Longest Repeating Character Replacement", "Medium"),
          mk("sw2", 567, "Permutation in String", "Medium"),
          mk("sw2", 904, "Fruit Into Baskets", "Medium"),
        ],
      },
      {
        id: "two-pointers-2",
        title: "Two Pointers",
        problems: [
          mk("tp2", 11, "Container With Most Water", "Medium"),
          mk("tp2", 15, "3Sum", "Medium"),
          mk("tp2", 16, "3Sum Closest", "Medium"),
          mk("tp2", 18, "4Sum", "Medium"),
          mk("tp2", 42, "Trapping Rain Water", "Hard"),
          mk("tp2", 167, "Two Sum II - Input Array Is Sorted", "Medium"),
        ],
      },
      {
        id: "fast-slow",
        title: "Fast / Slow Pointers",
        problems: [
          mk("fs", 141, "Linked List Cycle", "Easy"),
          mk("fs", 142, "Linked List Cycle II", "Medium"),
          mk("fs", 19, "Remove Nth Node From End of List", "Medium"),
          mk("fs", 876, "Middle of the Linked List", "Easy"),
          mk("fs", 160, "Intersection of Two Linked Lists", "Easy"),
          mk("fs", 234, "Palindrome Linked List", "Easy"),
        ],
      },
    ],
  },
  {
    id: "search-hash",
    name: "Search & Hashing Patterns",
    icon: "🔍",
    color: "#3b82f6",
    sections: [
      {
        id: "binary-search-sorted",
        title: "Binary Search — Sorted",
        problems: [
          mk("bss", 33, "Search in Rotated Sorted Array", "Medium"),
          mk(
            "bss",
            34,
            "Find First and Last Position of Element in Sorted Array",
            "Medium",
          ),
          mk("bss", 35, "Search Insert Position", "Easy"),
          mk("bss", 153, "Find Minimum in Rotated Sorted Array", "Medium"),
          mk("bss", 162, "Find Peak Element", "Medium"),
          mk("bss", 704, "Binary Search", "Easy"),
        ],
      },
      {
        id: "binary-search-answer",
        title: "Binary Search — Answer",
        problems: [
          mk("bsa", 875, "Koko Eating Bananas", "Medium"),
          mk("bsa", 1011, "Capacity To Ship Packages Within D Days", "Medium"),
          mk("bsa", 410, "Split Array Largest Sum", "Hard"),
          mk("bsa", 774, "Minimize Max Distance to Gas Station", "Hard"),
          mk(
            "bsa",
            1283,
            "Find the Smallest Divisor Given a Threshold",
            "Medium",
          ),
          mk(
            "bsa",
            1482,
            "Minimum Number of Days to Make m Bouquets",
            "Medium",
          ),
        ],
      },
      {
        id: "hashing-freq",
        title: "Hashing / Frequency Maps",
        problems: [
          mk("hf", 1, "Two Sum", "Easy"),
          mk("hf", 49, "Group Anagrams", "Medium"),
          mk("hf", 128, "Longest Consecutive Sequence", "Medium"),
          mk("hf", 217, "Contains Duplicate", "Easy"),
          mk("hf", 242, "Valid Anagram", "Easy"),
          mk("hf", 347, "Top K Frequent Elements", "Medium"),
        ],
      },
    ],
  },
  {
    id: "sum-stack-queue",
    name: "Sum, Stack & Queue Patterns",
    icon: "📚",
    color: "#f59e0b",
    sections: [
      {
        id: "prefix-sum",
        title: "Prefix Sum / Running Sum",
        problems: [
          mk("ps", 303, "Range Sum Query - Immutable", "Easy"),
          mk("ps", 560, "Subarray Sum Equals K", "Medium"),
          mk("ps", 724, "Find Pivot Index", "Easy"),
          mk("ps", 930, "Binary Subarrays With Sum", "Medium"),
          mk("ps", 974, "Subarray Sums Divisible by K", "Medium"),
          mk("ps", 523, "Continuous Subarray Sum", "Medium"),
        ],
      },
      {
        id: "diff-array",
        title: "Difference Array / Range Updates",
        problems: [
          mk("da", 370, "Range Addition", "Medium"),
          mk("da", 1094, "Car Pooling", "Medium"),
          mk("da", 1109, "Corporate Flight Bookings", "Medium"),
          mk(
            "da",
            1893,
            "Check if All the Integers in a Range Are Covered",
            "Easy",
          ),
          mk("da", 1943, "Describe the Painting", "Medium"),
          mk("da", 2381, "Shifting Letters II", "Medium"),
        ],
      },
      {
        id: "mono-stack",
        title: "Monotonic Stack",
        problems: [
          mk("ms", 739, "Daily Temperatures", "Medium"),
          mk("ms", 496, "Next Greater Element I", "Easy"),
          mk("ms", 503, "Next Greater Element II", "Medium"),
          mk("ms", 84, "Largest Rectangle in Histogram", "Hard"),
          mk("ms", 85, "Maximal Rectangle", "Hard"),
          mk("ms", 901, "Online Stock Span", "Medium"),
        ],
      },
      {
        id: "mono-queue",
        title: "Monotonic Queue / Deque",
        problems: [
          mk("mq", 239, "Sliding Window Maximum", "Hard"),
          mk("mq", 862, "Shortest Subarray with Sum at Least K", "Hard"),
          mk("mq", 1425, "Constrained Subsequence Sum", "Hard"),
          mk(
            "mq",
            1438,
            "Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit",
            "Medium",
          ),
          mk("mq", 1499, "Max Value of Equation", "Hard"),
          mk("mq", 1696, "Jump Game VI", "Medium"),
        ],
      },
    ],
  },
  {
    id: "heap-interval-ll",
    name: "Heap, Intervals & Linked List",
    icon: "🗂️",
    color: "#8b5cf6",
    sections: [
      {
        id: "heap-topk",
        title: "Heap / Top K",
        problems: [
          mk("hk", 215, "Kth Largest Element in an Array", "Medium"),
          mk("hk", 692, "Top K Frequent Words", "Medium"),
          mk("hk", 703, "Kth Largest Element in a Stream", "Easy"),
          mk("hk", 973, "K Closest Points to Origin", "Medium"),
          mk("hk", 1046, "Last Stone Weight", "Easy"),
        ],
      },
      {
        id: "intervals",
        title: "Intervals",
        problems: [
          mk("iv", 56, "Merge Intervals", "Medium"),
          mk("iv", 57, "Insert Interval", "Medium"),
          mk("iv", 252, "Meeting Rooms", "Easy"),
          mk("iv", 253, "Meeting Rooms II", "Medium"),
          mk("iv", 435, "Non-overlapping Intervals", "Medium"),
          mk("iv", 452, "Minimum Number of Arrows to Burst Balloons", "Medium"),
        ],
      },
      {
        id: "greedy-sched",
        title: "Greedy Scheduling",
        problems: [
          mk("gs", 45, "Jump Game II", "Medium"),
          mk("gs", 55, "Jump Game", "Medium"),
          mk("gs", 406, "Queue Reconstruction by Height", "Medium"),
          mk("gs", 621, "Task Scheduler", "Medium"),
          mk("gs", 763, "Partition Labels", "Medium"),
          mk("gs", 134, "Gas Station", "Medium"),
        ],
      },
      {
        id: "ll-manip",
        title: "Linked List Manipulation",
        problems: [
          mk("llm", 21, "Merge Two Sorted Lists", "Easy"),
          mk("llm", 23, "Merge k Sorted Lists", "Hard"),
          mk("llm", 24, "Swap Nodes in Pairs", "Medium"),
          mk("llm", 25, "Reverse Nodes in k-Group", "Hard"),
          mk("llm", 92, "Reverse Linked List II", "Medium"),
          mk("llm", 138, "Copy List with Random Pointer", "Medium"),
        ],
      },
    ],
  },
  {
    id: "tree-patterns",
    name: "Tree Patterns",
    icon: "🌳",
    color: "#10b981",
    sections: [
      {
        id: "tree-dfs",
        title: "Tree DFS",
        problems: [
          mk("tdfs", 104, "Maximum Depth of Binary Tree", "Easy"),
          mk("tdfs", 112, "Path Sum", "Easy"),
          mk("tdfs", 113, "Path Sum II", "Medium"),
          mk("tdfs", 543, "Diameter of Binary Tree", "Easy"),
          mk("tdfs", 124, "Binary Tree Maximum Path Sum", "Hard"),
          mk("tdfs", 226, "Invert Binary Tree", "Easy"),
        ],
      },
      {
        id: "tree-bfs",
        title: "Tree BFS / Level Order",
        problems: [
          mk("tbfs", 102, "Binary Tree Level Order Traversal", "Medium"),
          mk("tbfs", 103, "Binary Tree Zigzag Level Order Traversal", "Medium"),
          mk("tbfs", 199, "Binary Tree Right Side View", "Medium"),
          mk("tbfs", 515, "Find Largest Value in Each Tree Row", "Medium"),
          mk("tbfs", 637, "Average of Levels in Binary Tree", "Easy"),
          mk(
            "tbfs",
            116,
            "Populating Next Right Pointers in Each Node",
            "Medium",
          ),
        ],
      },
      {
        id: "bst-probs",
        title: "BST Problems",
        problems: [
          mk("bst", 98, "Validate Binary Search Tree", "Medium"),
          mk("bst", 99, "Recover Binary Search Tree", "Medium"),
          mk("bst", 230, "Kth Smallest Element in a BST", "Medium"),
          mk(
            "bst",
            235,
            "Lowest Common Ancestor of a Binary Search Tree",
            "Medium",
          ),
          mk("bst", 450, "Delete Node in a BST", "Medium"),
          mk("bst", 700, "Search in a Binary Search Tree", "Easy"),
        ],
      },
    ],
  },
  {
    id: "backtrack-graph",
    name: "Backtracking & Graph Patterns",
    icon: "🕸️",
    color: "#06b6d4",
    sections: [
      {
        id: "backtrack-basics",
        title: "Backtracking Basics",
        problems: [
          mk("bb", 46, "Permutations", "Medium"),
          mk("bb", 47, "Permutations II", "Medium"),
          mk("bb", 77, "Combinations", "Medium"),
          mk("bb", 78, "Subsets", "Medium"),
          mk("bb", 90, "Subsets II", "Medium"),
          mk("bb", 39, "Combination Sum", "Medium"),
        ],
      },
      {
        id: "backtrack-constraints",
        title: "Backtracking with Constraints",
        problems: [
          mk("bc", 40, "Combination Sum II", "Medium"),
          mk("bc", 17, "Letter Combinations of a Phone Number", "Medium"),
          mk("bc", 79, "Word Search", "Medium"),
          mk("bc", 131, "Palindrome Partitioning", "Medium"),
          mk("bc", 51, "N-Queens", "Hard"),
          mk("bc", 52, "N-Queens II", "Hard"),
        ],
      },
      {
        id: "graph-bfs-dfs",
        title: "Graph BFS / DFS",
        problems: [
          mk("gbd", 200, "Number of Islands", "Medium"),
          mk("gbd", 695, "Max Area of Island", "Medium"),
          mk("gbd", 733, "Flood Fill", "Easy"),
          mk("gbd", 994, "Rotting Oranges", "Medium"),
          mk("gbd", 1091, "Shortest Path in Binary Matrix", "Medium"),
          mk("gbd", 1254, "Number of Closed Islands", "Medium"),
        ],
      },
      {
        id: "topo-sort",
        title: "Topological Sort / DAG",
        problems: [
          mk("ts", 207, "Course Schedule", "Medium"),
          mk("ts", 210, "Course Schedule II", "Medium"),
          mk("ts", 802, "Find Eventual Safe States", "Medium"),
          mk("ts", 1462, "Course Schedule IV", "Medium"),
          mk(
            "ts",
            1203,
            "Sort Items by Groups Respecting Dependencies",
            "Hard",
          ),
          mk(
            "ts",
            2115,
            "Find All Possible Recipes from Given Supplies",
            "Medium",
          ),
        ],
      },
      {
        id: "union-find",
        title: "Union Find / DSU",
        problems: [
          mk("uf", 547, "Number of Provinces", "Medium"),
          mk("uf", 684, "Redundant Connection", "Medium"),
          mk(
            "uf",
            1319,
            "Number of Operations to Make Network Connected",
            "Medium",
          ),
          mk(
            "uf",
            1579,
            "Remove Max Number of Edges to Keep Graph Fully Traversable",
            "Hard",
          ),
          mk("uf", 990, "Satisfiability of Equality Equations", "Medium"),
          mk("uf", 1202, "Smallest String With Swaps", "Medium"),
        ],
      },
    ],
  },
  {
    id: "advanced-patterns",
    name: "Advanced Patterns",
    icon: "🚀",
    color: "#ef4444",
    sections: [
      {
        id: "shortest-path",
        title: "Shortest Path",
        problems: [
          mk("sp", 743, "Network Delay Time", "Medium"),
          mk("sp", 787, "Cheapest Flights Within K Stops", "Medium"),
          mk("sp", 1514, "Path with Maximum Probability", "Medium"),
          mk("sp", 1631, "Path With Minimum Effort", "Medium"),
          mk(
            "sp",
            1334,
            "Find the City With the Smallest Number of Neighbors at a Threshold Distance",
            "Medium",
          ),
          mk("sp", 1976, "Number of Ways to Arrive at Destination", "Medium"),
        ],
      },
      {
        id: "mst-greedy",
        title: "MST / Graph Greedy",
        problems: [
          mk("mst", 1584, "Min Cost to Connect All Points", "Medium"),
          mk("mst", 1135, "Connecting Cities With Minimum Cost", "Medium"),
          mk("mst", 1168, "Optimize Water Distribution in a Village", "Hard"),
          mk(
            "mst",
            1489,
            "Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree",
            "Hard",
          ),
          mk("mst", 778, "Swim in Rising Water", "Hard"),
          mk("mst", 1102, "Path With Maximum Minimum Value", "Medium"),
        ],
      },
      {
        id: "trie",
        title: "Trie",
        problems: [
          mk("tr", 208, "Implement Trie (Prefix Tree)", "Medium"),
          mk("tr", 211, "Design Add and Search Words Data Structure", "Medium"),
          mk("tr", 212, "Word Search II", "Hard"),
          mk("tr", 648, "Replace Words", "Medium"),
          mk("tr", 677, "Map Sum Pairs", "Medium"),
          mk("tr", 1268, "Search Suggestions System", "Medium"),
        ],
      },
      {
        id: "bit-manip",
        title: "Bit Manipulation",
        problems: [
          mk("bm", 136, "Single Number", "Easy"),
          mk("bm", 137, "Single Number II", "Medium"),
          mk("bm", 191, "Number of 1 Bits", "Easy"),
          mk("bm", 338, "Counting Bits", "Easy"),
          mk("bm", 268, "Missing Number", "Easy"),
          mk("bm", 190, "Reverse Bits", "Easy"),
        ],
      },
      {
        id: "1d-dp",
        title: "1D DP Basics",
        problems: [
          mk("dp1", 70, "Climbing Stairs", "Easy"),
          mk("dp1", 198, "House Robber", "Medium"),
          mk("dp1", 213, "House Robber II", "Medium"),
          mk("dp1", 322, "Coin Change", "Medium"),
          mk("dp1", 279, "Perfect Squares", "Medium"),
          mk("dp1", 300, "Longest Increasing Subsequence", "Medium"),
        ],
      },
    ],
  },
];

export const totalPatternProblems = patternCategories.reduce(
  (acc, cat) =>
    acc + cat.sections.reduce((a, sec) => a + sec.problems.length, 0),
  0,
);
