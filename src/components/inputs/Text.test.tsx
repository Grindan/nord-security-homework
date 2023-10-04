import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { Field, Form, Formik } from 'formik';
import Text from './Text';

describe('<Text />', () => {
  it('renders without crashing', () => {
    const { getByLabelText } = render(
      <Formik initialValues={{ username: '' }} onSubmit={jest.fn()}>
        <Form>
          <Field name="username" label="Username" component={Text} />
        </Form>
      </Formik>,
    );
    expect(getByLabelText('Username')).toBeInTheDocument();
  });

  it('sets the input placeholder according to the label prop', () => {
    const { getByPlaceholderText } = render(
      <Formik initialValues={{ username: '' }} onSubmit={jest.fn()}>
        <Form>
          <Field name="username" label="Username" component={Text} />
        </Form>
      </Formik>,
    );
    expect(getByPlaceholderText('Username')).toBeInTheDocument();
  });

  it('accepts user input', async () => {
    const { getByLabelText } = render(
      <Formik initialValues={{ username: '' }} onSubmit={jest.fn()}>
        <Form>
          <Field name="username" label="Username" component={Text} />
        </Form>
      </Formik>,
    );

    const inputElement = getByLabelText('Username');
    const input = inputElement as HTMLInputElement;

    await act(async () => {
      fireEvent.change(input, { target: { value: 'john_doe' } });
    });

    expect(input.value).toBe('john_doe');
  });

  it('shows error message when passed an error prop', () => {
    const errorMessage = 'This field is required';
    const { getByText } = render(
      <Formik initialValues={{ username: '' }} onSubmit={jest.fn()}>
        <Form>
          <Field
            name="username"
            label="Username"
            component={Text}
            error={errorMessage}
          />
        </Form>
      </Formik>,
    );

    expect(getByText(errorMessage)).toBeInTheDocument();
  });
});
