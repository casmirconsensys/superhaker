import { useHuddle01 } from '@huddle01/react';
 
function App() {
  const { initialize } = useHuddle01();
 
  initialize("YOUR_PROJECT_ID")
}