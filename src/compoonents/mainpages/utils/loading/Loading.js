import React from 'react'
import './loading.css'

export default function Loading() {
    return (
        <div className="loading">
            <svg width="40" height="40" viewBox="0 0 40 40">
            <rect width="40" height="40" className="rect" />
            <polygon points="0 0 0 40 40 40 40 0" className="rect" />
            </svg>
        </div>
    )
}
