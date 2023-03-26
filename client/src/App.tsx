import { MantineProvider, Group, Modal, Button, Container, Text } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useStore } from './stores';
import { useEffect } from 'react';
import Navbar from './Navbar';
import { useDisclosure } from '@mantine/hooks';
import Emotions from './Emotions';

const App = observer(() => {
  const [opened, { open, close }] = useDisclosure(false);
  const appStore = useStore('appStore');
  useEffect(() => {
    appStore.init({ open, close });
  }, [])

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      {
        appStore.hasCall ?
        <Group align="flex-start">
          <Navbar />
          <Emotions />
        </Group> :
        <Container my={40} sx={{ textAlign: 'center' }}>
          <Text fz="xl" fw={700}>Welcome to ListenLink! Keep your ears out while waiting for the next call.</Text>
        </Container>
      }
      <Modal
        centered
        opened={opened}
        onClose={close}
        withCloseButton={false}
        closeOnClickOutside={false}
        closeOnEscape={false}
        title={`Incoming call from ${appStore.twilioIncomingPhoneNo}`}
      >
        <Group>
          <Button color="red" onClick={() => appStore.rejectCall(close)}>Cancel</Button>
          <Button onClick={() => appStore.acceptCall(close)}>Confirm</Button>
        </Group>
      </Modal>
    </MantineProvider>
  )
})

export default App
