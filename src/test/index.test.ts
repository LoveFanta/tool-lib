import { isNull } from '../index'

describe('isNull', () => {
    it('should return true if the value is null', () => {
        const result = isNull(null);
        expect(result).toBe(true);
    });
});
