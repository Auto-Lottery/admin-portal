"use client"
import React from 'react'
import AuthProvider from '@/contexts/auth-context'
import ClientRequestProvider from '@/contexts/client-request-context'
import { Notifications } from '@mantine/notifications'
import { AdminUserWithToken } from '@/types/user'

export const Providers = ({ children, loggedUserData }: { children: React.ReactNode, loggedUserData: AdminUserWithToken | null }) => {

    return (
        <>
            <Notifications position="top-right" />
            <ClientRequestProvider>
                <AuthProvider loggedUserData={loggedUserData}>{children}</AuthProvider>
            </ClientRequestProvider>
        </>
    )
}
