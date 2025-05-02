// src/__tests__/Default.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock Syncfusion DocumentEditor to avoid runtime and ref errors
jest.mock('@syncfusion/ej2-react-documenteditor', () => {
  const React = require('react');
  return {
    Toolbar: {},
    DocumentEditorContainerComponent: React.forwardRef((props, ref) => {
      // Provide a dummy documentEditor on the ref for handler functions
      React.useImperativeHandle(ref, () => ({
        documentEditor: {
          selection: {
            text: '',
            selectAll: () => {},
            moveToDocumentEnd: () => {},
            getText: (_flag: boolean) => '',
          },
          editor: { insertText: (_text: string) => {} },
          search: {
            clearSearchHighlight: () => {},
            findAll: (_w: string, _t: string) => {},
          },
        },
        resize: (_w: number, _h: number) => {},
      }));
      return <div data-testid="editor-container" {...props} />;
    }),
  };
});

// Polyfill crypto.getRandomValues for Jest environment
global.crypto = {
  getRandomValues: (arr: Uint8Array) => require('crypto').randomFillSync(arr),
};

import Default, { User } from '../Default';

describe('Default Component', () => {
  const dummyUser: User = { username: 'testuser', email: 'test@example.com' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders user info and toolbar buttons', () => {
    render(<Default currentUser={dummyUser} onLogout={() => {}} />);
    expect(screen.getByText(/👤 testuser/)).toBeInTheDocument();
    expect(screen.getByText(/📝 Words:/)).toBeInTheDocument();
    expect(screen.getByText(/🔤 Chars:/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /🔊 Read Aloud/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /😛 Stop/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /🧠 Sentiment/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /📛 Grammar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /🗘 Format/i })).toBeInTheDocument();
    expect(screen.getByTestId('logout-button')).toBeInTheDocument();
  });

  it('calls onLogout when logout button is clicked', () => {
    const onLogoutMock = jest.fn();
    render(<Default currentUser={dummyUser} onLogout={onLogoutMock} />);
    screen.getByTestId('logout-button').click();
    expect(onLogoutMock).toHaveBeenCalled();
  });

  it('renders at least one editor container', () => {
    render(<Default currentUser={dummyUser} onLogout={() => {}} />);
    const containers = screen.getAllByTestId('editor-container');
    expect(containers.length).toBeGreaterThan(0);
  });

  it('alerts when no text is selected for speech', () => {
    window.alert = jest.fn();
    render(<Default currentUser={dummyUser} onLogout={() => {}} />);
    screen.getByRole('button', { name: /🔊 Read Aloud/i }).click();
    expect(window.alert).toHaveBeenCalledWith('Select some text first.');
  });

  it('alerts when sentiment is invoked on empty document', () => {
    window.alert = jest.fn();
    render(<Default currentUser={dummyUser} onLogout={() => {}} />);
    screen.getByRole('button', { name: /🧠 Sentiment/i }).click();
    expect(window.alert).toHaveBeenCalledWith('Document is empty.');
  });

  it('alerts after grammar check', () => {
    window.alert = jest.fn();
    render(<Default currentUser={dummyUser} onLogout={() => {}} />);
    screen.getByRole('button', { name: /📛 Grammar/i }).click();
    expect(window.alert).toHaveBeenCalledWith('🔍 Highlighted simple spelling errors.');
  });
});
