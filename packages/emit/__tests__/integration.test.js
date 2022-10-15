import { expect } from 'chai';
import {
    emit,
    onEmit,
} from '../lib';
import { _UNSAFE_nukeEmitManager } from '../lib/emit-manager/emit-manager';

describe('Integration Tests', () => {

    beforeEach(() => {
        _UNSAFE_nukeEmitManager();
    });

    it('is able to emit an event even if no listeners are present', async () => {
        let errorFound = false;
        try {
            emit('some-event');
        } catch (err) {
            errorFound = true;
        }
        expect(errorFound).to.equal(false);
    });

    it('is able to emit and receive a single event on a single listener', async () => {
        let i = 0;

        onEmit(
            'test',
            () => i++
        );

        emit('test');

        expect(i).to.equal(1);
    });

    it('is able to differentiate between different event names when listening', async () => {
        let result = null;

        onEmit('good', () => result = 'good');
        onEmit('bad', () => result = 'bad');

        emit('good');

        expect(result).to.equal('good');
    });

    it('is able to handle multiple listeners and emissions', async () => {
        let result1 = 0;
        let result2 = 0;
        let total = 0;

        onEmit('increment-result-1', () => result1++);
        onEmit('increment-result-1', () => total++);
        onEmit('increment-result-2', () => result2++);
        onEmit('increment-result-2', () => total++);
        onEmit('decrement-result-1', () => result1--);
        onEmit('decrement-result-1', () => total--);
        onEmit('decrement-result-2', () => result2--);
        onEmit('decrement-result-2', () => total--);

        emit('increment-result-1');
        emit('decrement-result-2');
        emit('decrement-result-2');
        emit('some-random-event');

        expect(result1).to.equal(1) &&
        expect(result2).to.equal(-2) &&
        expect(total).to.equal(-1);
    });

    it('is able to handle canceling an emit listener', async () => {
        let value = 0;

        const incrementListener = onEmit('increment', () => value++);
        const decrementListener = onEmit('decrement', () => value--);

        emit('increment');
        emit('increment');
        emit('increment');
        incrementListener.cancel();
        emit('increment');
        emit('increment');
        emit('increment');
        emit('decrement');

        expect(value).to.equal(2);
    });

});