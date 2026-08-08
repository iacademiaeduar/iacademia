import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

jest.mock('./firebase', () => ({
  auth: {},
  db: {},
}));

jest.mock('firebase/auth', () => ({
  onAuthStateChanged: (auth, callback) => {
    callback(null); // sin sesión activa
    return () => {};
  },
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
}));

test('sin sesión activa, muestra la pantalla de login (no se queda en la pantalla de carga)', async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText(/iniciar sesión/i)).toBeInTheDocument();
  });
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
});
