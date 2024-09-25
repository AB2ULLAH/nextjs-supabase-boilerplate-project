import React, { Suspense } from 'react'
import AuthComponent from './compnent/AuthComponent'

export default function page() {
    return (
        <Suspense>

            <AuthComponent />
        </Suspense>
    )
}
