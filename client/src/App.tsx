import { MantineProvider, Group, Text } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { observer } from 'mobx-react-lite';
import { useStore } from './stores';
import { useEffect } from 'react';
import Navbar from './Navbar';

const App = observer(() => {
  const appStore = useStore('appStore');
  useEffect(() => {
    appStore.init();
  }, [])

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ModalsProvider>
        <Group>
          <Navbar hasCall/>
          <Text>Welcome to Mantine!</Text>
        </Group>
      </ModalsProvider>
    </MantineProvider>
  )
})

export default App
