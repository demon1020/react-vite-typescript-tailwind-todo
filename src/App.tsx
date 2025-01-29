import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import TodoSummary from "./components/TodoSummary";
import useTodos from "./hooks/useTodos";

function App() {
  const { todos, addTodo, deleteTodo, setTodoCompleted, deleteAllCompleted } =
    useTodos();
  return (
    <main className="py-10 bg-slate-200 h-screen space-y-5 overflow-y-auto">
      <h1 className="font-bold text-3xl text-center">Todos</h1>
      <div className="max-w-lg mx-auto bg-slate-100 rounded-md p-5 space-y-6">
        <AddTodoForm onSubmit={addTodo} />
        <TodoSummary todos={todos} deleteAllCompleted={deleteAllCompleted} />
        <TodoList
          todos={todos}
          onCompletedChange={setTodoCompleted}
          onDelete={deleteTodo}
        />
      </div>
    </main>
  );
}

export default App;
