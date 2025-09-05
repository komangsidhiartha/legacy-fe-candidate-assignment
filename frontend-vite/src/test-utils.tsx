import React from "react";
import { render } from "@testing-library/react";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";

type ProviderProps = {
  children: React.ReactNode;
};

// mock env key (not actually used in tests)
const DUMMY_ENV_ID = "test-env-id";

const AllProviders = ({ children }: ProviderProps) => {
  return (
    <DynamicContextProvider settings={{ environmentId: DUMMY_ENV_ID }}>
  {children}
  </DynamicContextProvider>
);
};

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
