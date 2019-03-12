// This file is going to store our test cases.

// Using expect library to make assertions.
const expect = require('expect');

const utils = require('./utils');

// Create the test case.
it('should add two numbers summing greater than 100', () => {
    var res = utils.add(33, 22);

    // This will make the test fail. 
    //throw new Error('Test failed');

    // But the test should only fail given certain condition.
    if (res <= 100) {
        throw new Error(`Expected something greater than 100, but got ${res}`);
    }
});

it('should square a number getting something greater than 100', () => {
    var res = utils.square(3);
    if (res <= 100) {
        throw new Error(`Expected something greater than 100, but got ${res}`);
    }
});

// Examples:

// The following should fail.
it('should add two numbers getting 100', () => {
    var res = utils.add(10, 30);
    // Make the assertion.
    expect(res).toBe(100);
});

// The following should pass.
it('should add two numbers getting something equal or greater than 100', () => {
    var res = utils.add(80, 30);
    // Make the assertion.
    expect(res).toBeGreaterThan(100);
});

// The following should pass.
it('should square a number getting a number', () => {
    var res = utils.square(3);
    expect(res).toBeA('number');
});

// The following should fail.
it('should not be equal', () => {
    expect(11).toNotBe(12);
})

// We can use describe to make the testing output more readable.

describe('Objects', () => {
    // The following should fail. 
    it('objects should be the same', () => {
        // With object things are different.
        // This test will fail because the following objects are referenced from different memory addresses.
        expect({
            name: 'Bernardo'
        }).toBe({
            name: 'Bernardo'
        });
    })

    // Should pass.
    it('objects should be equal/identical (but not the same)', () => {
        // Use toEqual to compare the two different objects to see if they are identical.
        expect({
            name: 'Bernardo'
        }).toEqual({
            name: 'Bernardo'
        });
    })

    // Should pass.
    it('objects should not be equal/identical', () => {
        expect({
            name: 'bernardo'
        }).toNotEqual({
            name: 'Bernardo'
        });
    })

    // Should pass.
    it('object should include specified propperty', () => {
        expect({
            name: 'Bernardo',
            age: 23,
            location: 'Not found'
        }).toInclude({
            location: 'Not found'
        });
    })

    it('object should exclude specified propperty', () => {
        expect({
            name: 'Bernardo',
            age: 23,
            location: 'Not found'
        }).toExclude({
            location: 'Not found'
        });
    })

    // Visit https://github.com/mjackson/expect for more assertions and other great functionalities.

    it('should have name and last name set', () => {
        var person = {
            age: '23'
        }
        var res = utils.setName(person, 'Bernardo Mondragon');
        // This should not fail because 'utils.setName' is overriding the variable person.
        expect(person).toEqual(res);
        // This should not fail.
        expect(utils.setName(person, 'Bernardo Mondragon')).toInclude({
            firstName: 'Bernardo',
            lastName: 'Mondragon'
        });
    })
});

describe('Arrays', () => {
    // Should fail.
    it('arrray should include 3', () => {
        expect([1, 2, 4, 5, 6, 7, 8, 9]).toInclude(3);
    })

    // Should pass.
    it('array should exclude 10', () => {
        expect([1, 2, 4, 5, 6, 7, 8, 9]).toExclude(10);
    })

    // Nesting describe.
    describe('Arrays sub', () => {
        // Should fail.
        it('arrray should include 0', () => {
            expect([1, 2]).toInclude(0);
        })

        // Should pass.
        it('array should exclude 0', () => {
            expect([1, 2]).toExclude(0);
        })
    });

});

/*describe('Async testing', () => {

    // Examples of async testing:

    // The following is going to pass no mater what because the function is returning 
    // by the moment it is called and not after the timeout because its async. 
    it('should async add two numbers', () => {
        // This test is passing because 'utils.asyncAdd' is returning (throwing no errors) before the callback gets fired.
        utils.asyncAdd(4, 3, (sum) => {
            expect(sum).toBe(7).toBeA('string');
        });
    });

    // Better do the following:
    // Passing done means async testing.
    it('should async add two numbers (passing done)', (done) => {
        utils.asyncAdd(4, 3, (sum) => {
            expect(sum).toBe(7).toBeA('number');
            // Call done indicating where the test ends.
            done();
        });
    });

});*/
