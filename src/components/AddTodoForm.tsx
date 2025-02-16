import { useState } from "react"

interface AddTodoFormProps {
    onSubmit: (title: string) => void;
}

export default function AddTodoForm({onSubmit}:AddTodoFormProps){
    const [input, setInput] = useState("")

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    if(!input.trim()) return;

    onSubmit(input);
    setInput("");
    }

    return (
        <form className="flex" onSubmit={handleSubmit}>
            <input type="text" value={input} onChange={(e)=> setInput(e.target.value)} placeholder="What to do?" className="rounded-s-md  grow border border-gray-200 p-2"/>
            <button type="submit" className="w-16 rounded-e-md bg-slate-900 text-white hover:bg-slate-700"> Add</button>
        </form>
    )
}