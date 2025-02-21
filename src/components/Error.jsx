import React from 'react'
import { Link } from 'react-router-dom'

export const Error = () => {
    return (
        <div>
            <h1>Página de Error 404</h1>
            <p>Esta es la página no existe</p>
            <Link to="/">Vover al inicio</Link>
        </div>
    )
}