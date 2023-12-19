"use client"
import React from 'react'
import AuthProvider from '@/contexts/auth-context'
import ClientRequestProvider from '@/contexts/client-request-context'
import { Notifications } from '@mantine/notifications'

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Notifications position="top-right" />
            <ClientRequestProvider>
                <AuthProvider>{children}</AuthProvider>
            </ClientRequestProvider>
        </>
    )
}
