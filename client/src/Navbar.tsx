import { IconPhoneOff } from "@tabler/icons-react";
import {
    Navbar,
    createStyles,
    getStylesRef,
    ActionIcon,
    Stack,
    Tooltip,
    Text
} from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useStore } from "./stores";

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

const AppNavbar = observer(() => {
    const { classes } = useStyles();
    const appStore = useStore('appStore');

    return (
        <Navbar height={840} width={{ sm: 300 }} p="md" className={classes.navbar}>
            <Navbar.Section grow mt="xl">
                <Stack>
                    <Text fz="lg" fw={600}>Call with: {appStore.twilioIncomingPhoneNo}</Text>
                    <Tooltip label="Hang Up">
                        <ActionIcon
                            color="red"
                            variant="filled"
                            size="xl"
                            w="100%"
                            onClick={() => appStore.disconnectCall()}
                        >
                            <IconPhoneOff stroke={1.5} />
                        </ActionIcon>
                    </Tooltip>
                </Stack>
            </Navbar.Section>
        </Navbar>
    )
})

export default AppNavbar;