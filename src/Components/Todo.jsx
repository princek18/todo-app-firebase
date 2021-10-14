import React from 'react'

export const Todo = ({todos}) => {
    return (
        <div>
            {todos.map((todo, index) => {
                return <h1 key={index}>{todo}</h1>
            })}
        </div>
    )
}
