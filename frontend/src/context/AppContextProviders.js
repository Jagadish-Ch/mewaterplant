import { AuthContextProvider } from './AuthContext';
import { ActiveContextProvider } from './ActiveCansContext';

const providers = [
  AuthContextProvider,
  ActiveContextProvider,
];

export const AppContextProviders = ({ children }) =>
  providers.reduceRight((acc, Provider) => <Provider>{acc}</Provider>, children);