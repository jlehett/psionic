import React from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import delay from 'delay';
import { TextField, Form } from '../dist';

test('is able to create simple forms', async () => {
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

    await act(() => {
        fireEvent.change(nameInput, { target: { value: 'Tanner' } });
    });

    expect(nameInput.value).toBe('Tanner');

    await act(() => {
        fireEvent.change(emailInput, { target: { value: 'john@gmail.com' } });
    });

    expect(emailInput.value).toBe('john@gmail.com');

    fireEvent.click(submitButton);

    expect(data).toEqual({
        name: {
            value: 'Tanner',
            valid: true,
            message: null,
        },
        email: {
            value: 'john@gmail.com',
            valid: true,
            message: null,
        }
    });
});