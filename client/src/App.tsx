import { MantineProvider, Group, Text, Modal, Button } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { observer } from 'mobx-react-lite';
import { useStore } from './stores';
import { useEffect } from 'react';
import Navbar from './Navbar';
import { useDisclosure } from '@mantine/hooks';

const App = observer(() => {
  const [opened, { open, close }] = useDisclosure(false);
  const appStore = useStore('appStore');
  useEffect(() => {
    appStore.init({ open, close });
  }, [])

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ModalsProvider>
        <Group>
          <Navbar hasCall={appStore.hasCall}/>
          <Text>Welcome to Mantine!</Text>
        </Group>
        <Modal
          centered
          opened={opened}
          onClose={close}
          withCloseButton={false}
          closeOnClickOutside={false}
          closeOnEscape={false}
          title={`Incoming call from ${appStore.twilioIncomingPhoneNo}`}
        >
          <Button onClick={() => appStore.rejectCall(close)}>Cancel</Button>
          <Button onClick={() => appStore.acceptCall(close)}>Confirm</Button>
        </Modal>
      </ModalsProvider>
    </MantineProvider>
  )
})

export default App
