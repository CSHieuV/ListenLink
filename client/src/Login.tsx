import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
} from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const form = useForm({
        initialValues: {
            email: '',
            password: ''
        },
        validate: {
            email: (value) => (value === 'admin@listenlink.tech' ? null : 'Invalid email'),
            password: (value) => (value === 'admin' ? null : 'Invalid password')
        }
    })

    const signin = () => {
        const validation = form.validate();
        if (validation.hasErrors) return;
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate('/app');
        }, 2000)
    }

    return (
        <Container size={420} my={40}>
            <Title
                align="center"
                sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
            >
                Welcome to ListenLink!
            </Title>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput
                    label="Email"
                    placeholder="you@hoohacks.io"
                    required
                    {...form.getInputProps('email')}
                />
                <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    required
                    mt="md"
                    {...form.getInputProps('password')}
                />
                <Group position="apart" mt="lg">
                <Checkbox label="Remember me" />
                <Anchor component="button" size="sm">
                    Forgot password?
                </Anchor>
                </Group>
                <Button
                    fullWidth
                    mt="xl"
                    onClick={signin}
                    loading={isLoading}
                >
                    Sign in
                </Button>
            </Paper>
        </Container>
    )
}

export default Login;