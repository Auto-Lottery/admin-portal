"use client";
import React from 'react'
import {
    Paper,
    TextInput,
    PasswordInput,
    Button,
    Title,
} from '@mantine/core';
import classes from "./index.module.css";
import { useForm } from '@mantine/form';
import { useClientRequest } from '@/contexts/client-request-context';
import { useAuth } from '@/contexts/auth-context';

const LoginPage = () => {
    const { postRequest } = useClientRequest();
    const { login } = useAuth();

    const form = useForm({
        initialValues: {
            phoneNumber: '',
            password: ''
        },
        validate: {
            phoneNumber: (value) => {
                if (!value) {
                    return "Талбар хоосон байна."
                }
                const trimed = value.trim();
                if (!/\d{8,}/.test(trimed)) {
                    return "Утасны дугаарын формат буруу байна."
                }
                if (trimed.length > 8) {
                    return "Утасны дугаарын формат буруу байна."
                }
                return null
            },
            password: (value) => {
                if (!value) {
                    return "Талбар хоосон байна."
                }
                const trimed = value.trim();
                if (trimed !== value) {
                    return "Нууц үгэнд хоосон зай орсон байна."
                }
                if (trimed.length < 4) {
                    return "Нууц үг хамгийн багадаа 4 урттай байна."
                }
                return null;
            }
        }
    });

    const handleLogin = async (values: {
        phoneNumber: string,
        password: string
    }) => {
        const res = await postRequest("/backend/admin/login", values);
        login(res);
    }

    return (
        <div className={classes.wrapper}>
            <form onSubmit={form.onSubmit(handleLogin)}>
                <Paper className={classes.form} radius={0} p={30}>
                    <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
                        Сайн байна уу
                    </Title>

                    <TextInput withAsterisk label="Утасны дугаар" placeholder="XXXXXXXX" size="md"  {...form.getInputProps('phoneNumber')} />
                    <PasswordInput label="Нууц үг" placeholder="Нууц үг оруулна уу" mt="md" size="md" {...form.getInputProps('password')} />
                    <Button type="submit" fullWidth mt="xl" size="md">
                        Нэвтрэх
                    </Button>
                </Paper>
            </form>
            <div className={classes.bg}></div>
        </div>
    )
}

export default LoginPage