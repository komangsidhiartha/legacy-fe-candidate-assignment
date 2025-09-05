import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import React from 'react';

// Mock window.ethereum
Object.defineProperty(window, 'ethereum', {
    value: {
        isMetaMask: true,
        request: vi.fn(),
        on: vi.fn(),
        removeListener: vi.fn(),
    },
    writable: true,
});

// Mock the DynamicContextProvider
vi.mock('@dynamic-labs/sdk-react-core', () => ({
    useDynamicContext: vi.fn(() => ({
        primaryWallet: null,
        network: null,
        setShowAuthFlow: vi.fn(),
    })),
    DynamicContextProvider: ({ children }: { children: React.ReactNode }) => (
        { children }
    ),
    useConnectWithOtp: vi.fn(() => ({
        connectWithOtp: vi.fn(),
    })),
}));

// Mock ethers-v6
vi.mock('@dynamic-labs/ethers-v6', () => ({
    getSigner: vi.fn(() => ({
        signMessage: vi.fn(() => Promise.resolve('mocked-signature')),
    })),
}));
