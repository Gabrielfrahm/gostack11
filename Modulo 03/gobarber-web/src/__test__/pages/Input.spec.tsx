import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';

import Input from '../../components/Input';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-Mail" />,
    );

    expect(getByPlaceholderText('E-Mail')).toBeTruthy();
  });

  it('should render highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-Mail" />,
    );

    const inputElement = getByPlaceholderText('E-Mail');

    const containerElement = getByTestId('input-container');

    fireEvent.focus(inputElement);

    await wait(() => {
      expect(containerElement).toHaveStyle('border-color: #ff9000;');
      expect(containerElement).toHaveStyle('color: #ff9000;');
    });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(containerElement).not.toHaveStyle('border-color: #ff9000;');
      expect(containerElement).not.toHaveStyle('color: #ff9000;');
    });
  });

  it('should keep input border highlight when input field', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-Mail" />,
    );

    const inputElement = getByPlaceholderText('E-Mail');

    const containerElement = getByTestId('input-container');

    fireEvent.change(inputElement, {
      target: { value: 'johndoe@example.com' },
    });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(containerElement).toHaveStyle('color: #ff9000;');
    });
  });
});
