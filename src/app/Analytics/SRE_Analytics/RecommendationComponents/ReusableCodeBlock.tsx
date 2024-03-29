import React, { useState } from 'react';
import { CodeBlock, CodeBlockAction, CodeBlockCode, ClipboardCopyButton } from '@patternfly/react-core';

const ReusableCodeBlock: React.FunctionComponent<{ code; includeActions: boolean }> = ({ code, includeActions }) => {
  const [copied, setCopied] = useState(false);

  const clipboardCopyFunc = (event, text) => {
    navigator.clipboard.writeText(text.toString());
  };

  const onClick = (event, textToCopy) => {
    clipboardCopyFunc(event, textToCopy);
    setCopied(true);
  };

  const actions = (
    <CodeBlockAction>
      {includeActions ? (
        <ClipboardCopyButton
          id="copy-button"
          textId="code-content"
          aria-label="Copy to clipboard"
          onClick={(e) => onClick(e, code)}
          exitDelay={copied ? 1500 : 600}
          maxWidth="110px"
          variant="plain"
          onTooltipHidden={() => setCopied(false)}
        >
          {copied ? 'Successfully copied to clipboard!' : 'Copy to clipboard'}
        </ClipboardCopyButton>
      ) : (
        <div style={{ borderBottomWidth: '--pf-v5-global--BorderWidth--lg', width: '300px', height: '37px' }}> </div>
      )}
    </CodeBlockAction>
  );

  return (
    <CodeBlock actions={actions}>
      <CodeBlockCode id="code-content">{code}</CodeBlockCode>
    </CodeBlock>
  );
};

export default ReusableCodeBlock;
