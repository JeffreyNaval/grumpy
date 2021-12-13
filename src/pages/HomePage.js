import React from 'react'
import { Link } from 'react-router-dom'


export default function HomePage() {
    return (
        <div>
            This is the homepage
            <Link to="/cat">Cat</Link>
        </div>
    )
}
