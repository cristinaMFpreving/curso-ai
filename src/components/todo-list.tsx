'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Edit2 } from 'lucide-react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 mb-6">
      <h1 className="text-2xl font-bold">Todo List App</h1>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-4 px-6 mt-6 text-center">
      <p>&copy; 2023 Todo List App. All rights reserved.</p>
    </footer>
  )
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo('')
    }
  }

  const updateTodo = (id: number, newText: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, text: newText } : todo))
    setEditingId(null)
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>My Todo List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex">
              <Input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task"
                className="mr-2"
                aria-label="New todo task"
              />
              <Button onClick={addTodo}>Add</Button>
            </div>
            <ul className="space-y-2">
              {todos.map(todo => (
                <li key={todo.id} className="flex items-center space-x-2 bg-muted p-2 rounded">
                  <Checkbox
                    id={`todo-${todo.id}`}
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                  />
                  <label
                    htmlFor={`todo-${todo.id}`}
                    className={`flex-grow ${todo.completed ? 'line-through text-muted-foreground' : ''}`}
                  >
                    {editingId === todo.id ? (
                      <Input
                        type="text"
                        value={todo.text}
                        onChange={(e) => updateTodo(todo.id, e.target.value)}
                        onBlur={() => setEditingId(null)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            updateTodo(todo.id, (e.target as HTMLInputElement).value)
                          }
                        }}
                        autoFocus
                      />
                    ) : (
                      todo.text
                    )}
                  </label>
                  <Button variant="ghost" size="icon" onClick={() => setEditingId(todo.id)} aria-label="Edit task">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteTodo(todo.id)} aria-label="Delete task">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

