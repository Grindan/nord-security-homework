import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { Field, Form, Formik } from 'formik';
import Password from './Password';

describe('<Password />', () => {
  it('renders without crashing', () => {
    const { getByLabelText } = render(
      <Formik initialValues={{ password: '' }} onSubmit={jest.fn()}>
        <Form>
          <Field name="password" label="Password" component={Password} />
        </Form>
      </Formik>,
    );
    expect(getByLabelText('Password')).toBeInTheDocument();
  });

  it('toggles visibility when EyeIcon is clicked', () => {
    const { getByLabelText, getByRole } = render(
      <Formik initialValues={{ password: '' }} onSubmit={jest.fn()}>
        <Form>
          <Field name="password" label="Password" component={Password} />
        </Form>
      </Formik>,
    );

    const inputElement = getByLabelText('Password');
    const input = inputElement as HTMLInputElement;

    const toggleButton = getByRole('button');

    expect(input.type).toBe('password');

    fireEvent.click(toggleButton);

    expect(input.type).toBe('text');

    fireEvent.click(toggleButton);

    expect(input.type).toBe('password');
  });

  it('shows error message when passed an error prop', () => {
    const errorMessage = 'This field is required';
    const { getByText } = render(
      <Formik initialValues={{ password: '' }} onSubmit={jest.fn()}>
        <Form>
          <Field
            name="password"
            label="Password"
            component={Password}
            error={errorMessage}
          />
          ,
        </Form>
      </Formik>,
    );

    expect(getByText(errorMessage)).toBeInTheDocument();
  });

  it('toggles visibility when EyeIcon receives an Enter keydown event', () => {
    const { getByLabelText, getByRole } = render(
      <Formik initialValues={{ password: '' }} onSubmit={jest.fn()}>
        <Form>
          <Field name="password" label="Password" component={Password} />
        </Form>
      </Formik>,
    );

    const inputElement = getByLabelText('Password');
    const input = inputElement as HTMLInputElement;
    const toggleButton = getByRole('button');

    expect(input.type).toBe('password');

    fireEvent.keyDown(toggleButton, { key: 'Enter' });

    expect(input.type).toBe('text');
  });

  it('sets the input placeholder according to the label prop', () => {
    const { getByPlaceholderText } = render(
      <Formik initialValues={{ password: '' }} onSubmit={jest.fn()}>
        <Form>
          <Field name="password" label="Password" component={Password} />
        </Form>
      </Formik>,
    );

    expect(getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('accepts user input', async () => {
    const { getByLabelText } = render(
      <Formik initialValues={{ password: '' }} onSubmit={jest.fn()}>
        <Form>
          <Field name="password" label="Password" component={Password} />
        </Form>
      </Formik>,
    );

    const inputElement = getByLabelText('Password');
    const input = inputElement as HTMLInputElement;

    await act(async () => {
      fireEvent.change(input, { target: { value: 'testValue' } });
    });

    expect(input.value).toBe('testValue');
  });
});
