import React from 'react'
import { Link, useParams } from 'react-router-dom'

export default function DetailPage() {
    let params = useParams();

    return (
        <div>
            <Link to="/">Back</Link>
            <p>
                Detail page for {params.catId} 
            </p>
        </div>
    )
}
