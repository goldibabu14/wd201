const todoList = require("../todo");

describe("Todo List Test Suite", () => {
  let todos;

  beforeEach(() => {
    todos = todoList(); // create a new todoList instance for each test
  });

  test("adds a new todo", () => {
    todos.add({ title: "Test todo", dueDate: "2025-06-14", completed: false });
    expect(todos.all.length).toBe(1);
  });

  test("marks a todo as complete", () => {
    todos.add({ title: "Test todo", dueDate: "2025-06-14", completed: false });
    todos.markAsComplete(0);
    expect(todos.all[0].completed).toBe(true);
  });

  test("retrieves overdue items", () => {
    const yesterday = "2025-06-13";
    todos.add({ title: "Overdue todo", dueDate: yesterday, completed: false });
    expect(todos.overdue().length).toBe(1);
  });

  test("retrieves due today items", () => {
    const today = "2025-06-14";
    todos.add({ title: "Today todo", dueDate: today, completed: false });
    expect(todos.dueToday().length).toBe(1);
  });

  test("retrieves due later items", () => {
    const tomorrow = "2025-06-15";
    todos.add({ title: "Later todo", dueDate: tomorrow, completed: false });
    expect(todos.dueLater().length).toBe(1);
  });

  test("toDisplayableList formats todos correctly", () => {
    const today = "2025-06-14";
    todos.add({ title: "Incomplete todo", dueDate: today, completed: false });
    todos.add({ title: "Complete todo", dueDate: today, completed: true });
    const list = todos.toDisplayableList(todos.dueToday());
    expect(list).toBe("[ ] Incomplete todo\n[x] Complete todo");
  });
});
