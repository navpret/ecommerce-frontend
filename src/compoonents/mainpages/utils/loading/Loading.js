import React from 'react'
import 'loading.css'

export default function Loading() {
    return (
        <div className="loading">
            <svg width="40" height="40" viewbox="0 0 40 40">
            <rect width="40" height="40" class="rect" />
            <polygon points="0 0 0 40 40 40 40 0" class="rect" />
            </svg>
        </div>
    )
}
