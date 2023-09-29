import { RenderResult, waitFor } from '@testing-library/react'

const suspenseTestId = "i18n-suspense";

async function waitForI18n(r: RenderResult) {
  await waitFor(() => {
    expect(r.queryByTestId(suspenseTestId)).not.toBeInTheDocument();
  });
}
export * from '@testing-library/react'

export { waitForI18n };