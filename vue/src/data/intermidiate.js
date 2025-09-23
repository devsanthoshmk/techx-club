export const questions = [
  // Data Structures
  {
    category: "Data Structures",
    question: "Which structure allows LIFO access to its elements?",
    code: "",
    options: { A: "Queue", B: "Stack", C: "Linked List", D: "Array" },
    ans: "B"
  },
  {
    category: "Data Structures",
    question: "Which sorting method is best for nearly sorted arrays?",
    code: "",
    options: { A: "Bubble Sort", B: "Selection Sort", C: "Insertion Sort", D: "Quick Sort" },
    ans: "C"
  },
  {
    category: "Data Structures",
    question: "Which graph traversal method can use recursion naturally?",
    code: "",
    options: { A: "Breadth-first search", B: "Depth-first search", C: "Topological sort", D: "Floyd's algorithm" },
    ans: "B"
  },
  {
    category: "Data Structures",
    question: "Which data structure is used for implementing undo operations in software?",
    code: "",
    options: { A: "Queue", B: "Stack", C: "List", D: "Tree" },
    ans: "B"
  },
  {
    category: "Data Structures",
    question: "Which tree balances itself by rotating nodes during insertion and deletion?",
    code: "",
    options: { A: "Binary search tree", B: "B-tree", C: "AVL tree", D: "Heap" },
    ans: "C"
  },
  {
    category: "Data Structures",
    question: "Which of the following is not a linear data structure?",
    code: "",
    options: { A: "Queue", B: "Tree", C: "Stack", D: "Array" },
    ans: "B"
  },
  {
    category: "Data Structures",
    question: "Which search algorithm works only on sorted lists?",
    code: "",
    options: { A: "Linear search", B: "Binary search", C: "Depth-first search", D: "Breadth-first search" },
    ans: "B"
  },
  {
    category: "Data Structures",
    question: "What is the time complexity of enqueue and dequeue operations in a queue?",
    code: "",
    options: { A: "O(1)", B: "O(n)", C: "O(log n)", D: "O(n^2)" },
    ans: "A"
  },
  {
    category: "Data Structures",
    question: "Which graph traversal is suitable for finding shortest path in unweighted graphs?",
    code: "",
    options: { A: "BFS", B: "DFS", C: "Dijkstra", D: "Floyd-Warshall" },
    ans: "A"
  },
  {
    category: "Data Structures",
    question: "Which sorting algorithm is recursive and has average time complexity of O(n log n)?",
    code: "",
    options: { A: "Bubble Sort", B: "Insertion Sort", C: "Merge Sort", D: "Selection Sort" },
    ans: "C"
  },

  // Object Oriented Programming
  {
    category: "OOP",
    question: "What principle allows objects to hide their internal state?",
    code: "",
    options: { A: "Polymorphism", B: "Encapsulation", C: "Inheritance", D: "Abstraction" },
    ans: "B"
  },
  {
    category: "OOP",
    question: "Which OOP concept allows code reuse through parent classes?",
    code: "",
    options: { A: "Inheritance", B: "Abstraction", C: "Polymorphism", D: "Association" },
    ans: "A"
  },
  {
    category: "OOP",
    question: "Which Java feature lets classes share a method signature but implement it differently?",
    code: "",
    options: { A: "Inheritance", B: "Encapsulation", C: "Overriding", D: "Overloading" },
    ans: "C"
  },
  {
    category: "OOP",
    question: "Which term describes creating objects from classes?",
    code: "",
    options: { A: "Instantiation", B: "Encapsulation", C: "Abstraction", D: "Overloading" },
    ans: "A"
  },
  {
    category: "OOP",
    question: "Which is a valid example of Java exception handling?",
    code: "",
    options: { A: "try-catch", B: "for loop", C: "while loop", D: "switch-case" },
    ans: "A"
  },
  {
    category: "OOP",
    question: "What interface provides the blueprint for a class in Java?",
    code: "",
    options: { A: "Abstract class", B: "Interface", C: "Public class", D: "Private class" },
    ans: "B"
  },
  {
    category: "OOP",
    question: "What is the superclass of all classes in Java?",
    code: "",
    options: { A: "Object", B: "Class", C: "String", D: "System" },
    ans: "A"
  },
  {
    category: "OOP",
    question: "What keyword is used for inheritance in Java?",
    code: "",
    options: { A: "extends", B: "implements", C: "inherits", D: "super" },
    ans: "A"
  },
  {
    category: "OOP",
    question: "Which class method can be declared static?",
    code: "",
    options: { A: "Only constructors", B: "Any method", C: "Only abstract methods", D: "Only final methods" },
    ans: "B"
  },
  {
    category: "OOP",
    question: "Which operator is used to reference members of an object?",
    code: "",
    options: { A: ".", B: "::", C: "->", D: "[]" },
    ans: "A"
  },

  // Design and Analysis of Algorithms
  {
    category: "Algorithms",
    question: "Which technique breaks problems into subproblems and solves recursively?",
    code: "",
    options: { A: "Brute force", B: "Divide and conquer", C: "Greedy", D: "Backtracking" },
    ans: "B"
  },
  {
    category: "Algorithms",
    question: "Which property is essential for dynamic programming to work?",
    code: "",
    options: { A: "Unique subproblems", B: "Overlapping subproblems", C: "Only recursion", D: "Random access" },
    ans: "B"
  },
  {
    category: "Algorithms",
    question: "Which algorithm design technique tries every possible solution?",
    code: "",
    options: { A: "Greedy", B: "Brute force", C: "Divide and conquer", D: "Dynamic programming" },
    ans: "B"
  },
  {
    category: "Algorithms",
    question: "Which is a characteristic of greedy algorithms?",
    code: "",
    options: { A: "Finds local optimum", B: "Evaluates all possibilities", C: "Works only for sorting", D: "Requires backtracking" },
    ans: "A"
  },
  {
    category: "Algorithms",
    question: "Which algorithm finds shortest paths in weighted graphs with no negative edges?",
    code: "",
    options: { A: "BFS", B: "Dijkstra", C: "Kruskal", D: "Floyd-Warshall" },
    ans: "B"
  },
  {
    category: "Algorithms",
    question: "Which recurrence arises in merge sort analysis?",
    code: "",
    options: { A: "T(n) = T(n/2) + n", B: "T(n) = T(n-1) + 1", C: "T(n) = 2T(n/2) + n", D: "T(n) = n^2" },
    ans: "C"
  },
  {
    category: "Algorithms",
    question: "What is memoization?",
    code: "",
    options: { A: "Storing solutions to subproblems", B: "Recursive function", C: "Greedy method", D: "Sorting algorithm" },
    ans: "A"
  },
  {
    category: "Algorithms",
    question: "Which method is used for NP-complete problems when exact algorithms are too slow?",
    code: "",
    options: { A: "Approximation algorithms", B: "Sorting", C: "Divide and conquer", D: "Dynamic programming" },
    ans: "A"
  },
  {
    category: "Algorithms",
    question: "Which algorithm is best for maximum flow problems?",
    code: "",
    options: { A: "Dijkstra", B: "Ford-Fulkerson", C: "Prim", D: "DFS" },
    ans: "B"
  },
  {
    category: "Algorithms",
    question: "What does the term 'efficiency' of an algorithm refer to?",
    code: "",
    options: { A: "Number of errors", B: "Resource usage", C: "Variable naming", D: "Code indentation" },
    ans: "B"
  },

  // Python Programming
  {
    category: "Python",
    question: 'What is the output of print("Python"[::-1])?',
    code: 'print("Python"[::-1])',
    options: { A: "Python", B: "nohtyP", C: "error", D: "P" },
    ans: "B"
  },
  {
    category: "Python",
    question: "Which of the following is immutable?",
    code: "",
    options: { A: "List", B: "Set", C: "Tuple", D: "Dictionary" },
    ans: "C"
  },
  {
    category: "Python",
    question: "Which Python data structure allows duplicate elements?",
    code: "",
    options: { A: "Set", B: "Dictionary", C: "List", D: "Tuple" },
    ans: "C"
  },
  {
    category: "Python",
    question: "In Python, which keyword is used to define functions?",
    code: "",
    options: { A: "define", B: "def", C: "function", D: "fun" },
    ans: "B"
  },
  {
    category: "Python",
    question: "What will a = {1,2,3}; a.add(2) do?",
    code: "a = {1,2,3}\na.add(2)",
    options: { A: "Adds another 2", B: "Raises error", C: "Does nothing", D: "Removes 2" },
    ans: "C"
  },
  {
    category: "Python",
    question: "Which method reads one line at a time from a file in Python?",
    code: "",
    options: { A: "read()", B: "readline()", C: "readlines()", D: "seek()" },
    ans: "B"
  },
  {
    category: "Python",
    question: "What does the expression a, b = b, a achieve in Python?",
    code: "",
    options: { A: "Duplicates values", B: "Swaps values", C: "Concatenates values", D: "Assigns zero" },
    ans: "B"
  },
  {
    category: "Python",
    question: "Which function returns the length of a Python list?",
    code: "",
    options: { A: "len()", B: "size()", C: "count()", D: "get_length()" },
    ans: "A"
  },
  {
    category: "Python",
    question: "What is the output of bool([]) in Python?",
    code: "",
    options: { A: "True", B: "False", C: "None", D: "0" },
    ans: "B"
  },
  {
    category: "Python",
    question: "Which method removes an item from a Python dictionary?",
    code: "",
    options: { A: "pop()", B: "delete()", C: "remove()", D: "discard()" },
    ans: "A"
  },

  // Mixed Topics
  {
    category: "Mixed",
    question: "Which traversal prints tree nodes in sorted order for a BST?",
    code: "",
    options: { A: "Preorder", B: "Inorder", C: "Postorder", D: "Level order" },
    ans: "B"
  },
  {
    category: "Mixed",
    question: "Which is a real-world application of queues?",
    code: "",
    options: { A: "Undo feature", B: "Printer scheduling", C: "Error handling", D: "Sorting numbers" },
    ans: "B"
  },
  {
    category: "Mixed",
    question: "What is the default value of an uninitialized instance variable in Java?",
    code: "",
    options: { A: "null", B: "0", C: "undefined", D: "-1" },
    ans: "A"
  },
  {
    category: "Mixed",
    question: "What does BFS use as a data structure for node tracking?",
    code: "",
    options: { A: "Stack", B: "Queue", C: "Array", D: "Heap" },
    ans: "B"
  },
  {
    category: "Mixed",
    question: "Which sorting algorithm performs best on random large datasets?",
    code: "",
    options: { A: "Bubble Sort", B: "Quick Sort", C: "Selection Sort", D: "Insertion Sort" },
    ans: "B"
  },
  {
    category: "Mixed",
    question: "Which OOP concept facilitates multiple forms of a method or operator?",
    code: "",
    options: { A: "Overloading", B: "Extension", C: "Hiding", D: "Abstracting" },
    ans: "A"
  },
  {
    category: "Mixed",
    question: "Which graph representation saves space for sparse graphs?",
    code: "",
    options: { A: "Adjacency matrix", B: "Adjacency list", C: "Incidence matrix", D: "Tree" },
    ans: "B"
  },
  {
    category: "Mixed",
    question: "In Python, which collection type maps keys to values?",
    code: "",
    options: { A: "List", B: "Tuple", C: "Dictionary", D: "Set" },
    ans: "C"
  },
  {
    category: "Mixed",
    question: "What is the result of 3 == 3.0 in Python?",
    code: "",
    options: { A: "True", B: "False", C: "Error", D: "None" },
    ans: "A"
  },
  {
    category: "Mixed",
    question: "Which algorithm finds a minimum spanning tree?",
    code: "",
    options: { A: "Kruskal", B: "DFS", C: "Floyd-Warshall", D: "BFS" },
    ans: "A"
  }
];
