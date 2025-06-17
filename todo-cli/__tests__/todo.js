const todoList = require("../todo");

describe("Todo List Test Suite", () => {
  let todos;
  const fixedToday = "2025-06-14"; // fixed date for testing

  beforeEach(() => {
    todos = todoList(fixedToday); // pass today to the todoList instance
  });

  test("adds a new todo", () => {
    todos.add({ title: "Test todo", dueDate: fixedToday, completed: false });
    expect(todos.all.length).toBe(1);
  });

  test("marks a todo as complete", () => {
    todos.add({ title: "Test todo", dueDate: fixedToday, completed: false });
    todos.markAsComplete(0);
    expect(todos.all[0].completed).toBe(true);
  });

  test("retrieves overdue items", () => {
    const yesterday = "2025-06-13";
    todos.add({ title: "Overdue todo", dueDate: yesterday, completed: false });
    expect(todos.overdue().length).toBe(1);
  });

  test("retrieves due today items", () => {
    todos.add({ title: "Today todo", dueDate: fixedToday, completed: false });
    expect(todos.dueToday().length).toBe(1);
  });

  test("retrieves due later items", () => {
    const tomorrow = "2025-06-15";
    todos.add({ title: "Later todo", dueDate: tomorrow, completed: false });
    expect(todos.dueLater().length).toBe(1);
  });

  test("toDisplayableList formats todos correctly", () => {
    todos.add({
      title: "Incomplete todo",
      dueDate: fixedToday,
      completed: false,
    });
    todos.add({ title: "Complete todo", dueDate: fixedToday, completed: true });
    const list = todos.toDisplayableList(todos.dueToday());
    expect(list).toBe("[ ] Incomplete todo\n[x] Complete todo");
  });
});
