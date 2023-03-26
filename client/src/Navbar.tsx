import { IconNotes, IconPhoneOff } from "@tabler/icons-react";
import {
    Navbar,
    createStyles,
    getStylesRef,
    ActionIcon,
    Stack,
    Tooltip,
    Text
} from '@mantine/core';
import { useState } from "react";

const routes = [
    { label: 'Call', icon: IconNotes }
] as const;

const useStyles = createStyles(theme => ({
    navbar: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },
    link: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,
    
        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        
            [`& .${getStylesRef('icon')}`]: {
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            },
        },
    },
    linkIcon: {
        ref: getStylesRef('icon'),
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
        marginRight: theme.spacing.sm,
    },
    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
            [`& .${getStylesRef('icon')}`]: {
                color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
            },
        },
    },
}))

interface NavbarProps {
    hasCall: boolean
}

export default function AppNavbar({ hasCall }: NavbarProps) {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState('Call');

    const Link = (item: typeof routes[number]) => (
        <a
            className={cx(classes.link, { [classes.linkActive]: item.label === active })}
            href='#'
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    )

    const links = routes.map((item) => <Link {...item} key={item.label} />);

    return (
        <Navbar height={840} width={{ sm: 300 }} p="md" className={classes.navbar}>
            <Navbar.Section grow mt="xl">
                {links}
            </Navbar.Section>
            {
                hasCall && 
                (
                    <Navbar.Section grow mb="md">
                        <Stack>
                            <Text fz="lg" fw={600}>Call with: </Text>
                            <Tooltip label="Hang Up">
                                <ActionIcon color="red" variant="filled" size="xl" w="100%">
                                    <IconPhoneOff stroke={1.5} />
                                </ActionIcon>
                            </Tooltip>
                        </Stack>
                    </Navbar.Section>
                )
            }
        </Navbar>
    )
}

