import React, { useEffect, useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TextField, Form } from '../dist';

test('is able to handle the "submit" button event', async () => {
    let data = null;

    const FormComponent = () => {

        const handleSubmit = (formData) => {
            data = formData;
        };

        return (
            <Form onSubmit={handleSubmit}>
                <TextField
                    fieldKey="name"
                    initialValue="John"
                    label="Name"
                    InputProps={{
                        "data-testid": 'name',
                    }}
                />
                <TextField
                    fieldKey="email"
                    label="Email"
                    InputProps={{
                        "data-testid": 'email',
                    }}
                />
                <button type="submit">
                    Submit
                </button>
            </Form>
        );
    };

    render(<FormComponent/>);

    const nameInput = screen.getByTestId('name');
    const emailInput = screen.getByTestId('email');
    const submitButton = screen.getByRole('button');

    expect(data).toBeNull();
    expect(nameInput.value).toBe('John');
    expect(emailInput.value).toBe('');

    fireEvent.change(nameInput, { target: { value: 'Tanner' } });

    expect(nameInput.value).toBe('Tanner');

    fireEvent.change(emailInput, { target: { value: 'john@gmail.com' } });

    expect(emailInput.value).toBe('john@gmail.com');

    fireEvent.click(submitButton);

    delete data.name.unmodifiedSinceLastSubmission;
    delete data.email.unmodifiedSinceLastSubmission;

    expect(data).toEqual({
        name: {
            type: 'text',
            value: 'Tanner',
            valid: true,
            message: null,
            required: false,
        },
        email: {
            type: 'text',
            value: 'john@gmail.com',
            valid: true,
            message: null,
            required: false,
        }
    });
});

test('is able to handle the "reset" button event', async () => {
    let data = null;

    const FormComponent = () => {

        const handleSubmit = (formData) => {
            data = formData;
        };

        return (
            <Form onSubmit={handleSubmit}>
                <TextField
                    fieldKey="name"
                    initialValue="John"
                    label="Name"
                    InputProps={{
                        "data-testid": 'name',
                    }}
                />
                <TextField
                    fieldKey="email"
                    label="Email"
                    InputProps={{
                        "data-testid": 'email',
                    }}
                />
                <button type="reset">
                    Reset
                </button>
                <button type="submit">
                    Submit
                </button>
            </Form>
        );
    };

    render(<FormComponent/>);

    const nameInput = screen.getByTestId('name');
    const emailInput = screen.getByTestId('email');
    const submitButton = screen.getByText('Submit');
    const resetButton = screen.getByText('Reset');

    expect(data).toBeNull();
    expect(nameInput.value).toBe('John');
    expect(emailInput.value).toBe('');

    fireEvent.change(emailInput, { target: { value: 'john@gmail.com' } });

    expect(emailInput.value).toBe('john@gmail.com');

    fireEvent.click(submitButton);

    delete data.name.unmodifiedSinceLastSubmission;
    delete data.email.unmodifiedSinceLastSubmission;

    expect(data).toEqual({
        name: {
            type: 'text',
            value: 'John',
            valid: true,
            message: null,
            required: false,
        },
        email: {
            type: 'text',
            value: 'john@gmail.com',
            valid: true,
            message: null,
            required: false,
        }
    });

    fireEvent.click(resetButton);
    fireEvent.click(submitButton);

    delete data.name.unmodifiedSinceLastSubmission;
    delete data.email.unmodifiedSinceLastSubmission;

    expect(data).toEqual({
        name: {
            type: 'text',
            value: '',
            valid: true,
            message: null,
            required: false,
        },
        email: {
            type: 'text',
            value: '',
            valid: true,
            message: null,
            required: false,
        }
    });
});

test('is able to handle the "submit" button w/ invalid data', async () => {
    let data = null;

    const FormComponent = () => {

        const handleSubmit = (formData) => {
            data = formData;
        };

        return (
            <Form onSubmit={handleSubmit}>
                <TextField
                    fieldKey="name"
                    label="Name"
                    initialValue="John"
                    required
                    InputProps={{
                        "data-testid": 'name'
                    }}
                />
                <TextField
                    fieldKey="password"
                    label="Password"
                    type="password"
                    required
                    validator={(value) => {
                        if (value.length < 8) {
                            return 'Password must be at least 8 characters.';
                        }
                        return null;
                    }}
                    InputProps={{
                        "data-testid": 'password',
                    }}
                />
                <button type="submit">
                    Submit
                </button>
            </Form>
        );
    };

    render(<FormComponent/>);

    const nameInput = screen.getByTestId('name');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByText('Submit');

    expect(data).toBeNull();
    expect(nameInput.value).toBe('John');
    expect(passwordInput.value).toBe('');

    fireEvent.click(submitButton);

    expect(data).toEqual(null);

    fireEvent.change(passwordInput, { target: { value: '1234' } });
    fireEvent.click(submitButton);

    expect(data).toEqual(null);
    expect(nameInput.value).toBe('John');
    expect(passwordInput.value).toBe('1234');

    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: '12341234' } });
    fireEvent.click(submitButton);

    expect(data).toEqual(null);
    expect(nameInput.value).toBe('');
    expect(passwordInput.value).toBe('12341234');

    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.click(submitButton);

    delete data.name.unmodifiedSinceLastSubmission;
    delete data.password.unmodifiedSinceLastSubmission;

    expect(data).toEqual({
        name: {
            type: 'text',
            value: 'John',
            valid: true,
            message: null,
            required: true,
        },
        password: {
            type: 'password',
            value: '12341234',
            valid: true,
            message: null,
            required: true,
        },
    });
});

test('is able to respond to the form data changing from outside of a submission', async () => {
    let data = null;

    const FormComponent = () => {

        const [formData, setFormData] = useState({});

        useEffect(() => {
            data = formData;
        }, [formData]);

        const onChange = (_formData) => {
            setFormData(_formData);
        };

        return (
            <Form onSubmit={() => {}} onChange={onChange}>
                <TextField
                    fieldKey="name"
                    label="Name"
                    initialValue="John"
                    required
                    InputProps={{
                        "data-testid": 'name'
                    }}
                />
                <TextField
                    fieldKey="password"
                    label="Password"
                    type="password"
                    required
                    validator={(value) => {
                        if (value.length < 8) {
                            return 'Password must be at least 8 characters';
                        }
                        return null;
                    }}
                    InputProps={{
                        "data-testid": 'password',
                    }}
                />
                <button type="submit">
                    Submit
                </button>
                <button type="reset">
                    Reset
                </button>
            </Form>
        );
    };

    render(<FormComponent/>);

    const nameInput = screen.getByTestId('name');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByText('Submit');
    const resetButton = screen.getByText('Reset');

    expect(data).toEqual({
        name: {
            message: null,
            required: true,
            type: 'text',
            unmodifiedSinceLastSubmission: false,
            valid: true,
            value: 'John',
        },
        password: {
            message: 'This field is required',
            required: true,
            type: 'password',
            unmodifiedSinceLastSubmission: false,
            valid: false,
            value: '',
        },
    });

    fireEvent.click(submitButton);

    expect(data).toEqual({
        name: {
            message: null,
            required: true,
            type: 'text',
            unmodifiedSinceLastSubmission: true,
            valid: true,
            value: 'John',
        },
        password: {
            message: 'This field is required',
            required: true,
            type: 'password',
            unmodifiedSinceLastSubmission: true,
            valid: false,
            value: '',
        },
    });

    fireEvent.change(nameInput, { target: { value: 'Tanner' } });

    expect(data).toEqual({
        name: {
            message: null,
            required: true,
            type: 'text',
            unmodifiedSinceLastSubmission: false,
            valid: true,
            value: 'Tanner',
        },
        password: {
            message: 'This field is required',
            required: true,
            type: 'password',
            unmodifiedSinceLastSubmission: true,
            valid: false,
            value: '',
        },
    });

    fireEvent.change(passwordInput, { target: { value: '1234' } });

    expect(data).toEqual({
        name: {
            message: null,
            required: true,
            type: 'text',
            unmodifiedSinceLastSubmission: false,
            valid: true,
            value: 'Tanner',
        },
        password: {
            message: 'Password must be at least 8 characters',
            required: true,
            type: 'password',
            unmodifiedSinceLastSubmission: false,
            valid: false,
            value: '1234',
        },
    });

    fireEvent.change(passwordInput, { target: { value: '12341234' } });

    expect(data).toEqual({
        name: {
            message: null,
            required: true,
            type: 'text',
            unmodifiedSinceLastSubmission: false,
            valid: true,
            value: 'Tanner',
        },
        password: {
            message: null,
            required: true,
            type: 'password',
            unmodifiedSinceLastSubmission: false,
            valid: true,
            value: '12341234',
        },
    });

    fireEvent.click(resetButton);

    expect(data).toEqual({
        name: {
            message: 'This field is required',
            required: true,
            type: 'text',
            unmodifiedSinceLastSubmission: false,
            valid: false,
            value: '',
        },
        password: {
            message: 'This field is required',
            required: true,
            type: 'password',
            unmodifiedSinceLastSubmission: false,
            valid: false,
            value: '',
        },
    });
});
