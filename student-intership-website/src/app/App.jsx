import { useEffect } from 'react';
import { AppRoutes } from './routes';
import { refreshTokens } from '../shared/api/httpClien';

function App() {
  return <AppRoutes />;
}

export default App;