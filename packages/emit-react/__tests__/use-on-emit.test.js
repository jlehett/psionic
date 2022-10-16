import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

console.log(expect);
describe('useOnEmit Hook Tests', () => {

    it('is able to create a listener', async () => {
        let value = 0;

        const ComponentWithListener = () => {
            return <button onClick={() => value++}>
                Hello there!
            </button>
        };

        render(<ComponentWithListener/>);

        fireEvent.click(screen.getByText('Hello there!'));

        expect(screen.getByRole('heading')).toHaveTextContent('Hello there!');

    });

});