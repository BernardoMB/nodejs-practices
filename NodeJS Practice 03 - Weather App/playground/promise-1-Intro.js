/*// Example. A very simple promise.
var somePromise = new Promise((resolve, reject) => {
    console.log('Starting 4 seconds delay (Something is happening).');
    setTimeout(() => {
        var resolveObject = {
            message: 'Promise resolved.',
            action: 'Something went well as expected.'
        }
        var rejectObject = {
            message: 'Promise rejected.',
            action: 'Something went wrong.'
        }
        var isResolved = true;
        if (isResolved) {
            resolve(resolveObject);
        } else {
            reject(rejectObject);
        }
    }, 4000);
});

// Call the promise code.
// Set isResolved to true or flase to see how then behaves.
somePromise.then((res) => {
    console.log(JSON.stringify(res, undefined, 2));
}, (res) => {
    console.log(JSON.stringify(res, undefined, 2));
});*/

// A practical example.
var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        console.log('Starting 6 seconds delay (Something is happening).');
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                // Entonces responde con a + b.
                resolve(a + b);
            } else {
                // Entonces responde con un error.
                var errorMessage = 'Error: arguments must be numbers.';
                reject(errorMessage);
            }
        }, 6000);
    });
}

// Uncommment just one of the following blocks.

/*
// Call the promise code.
asyncAdd(3, 3).then((res) => {
    console.log(`Result: ${res}`);
}, (res) => {
    console.log(res);
});
*/

/*
// Chain of promises.
// Call the promise code and then call the promise again without handling the second call.
asyncAdd(3, 3).then((res) => {
    console.log(`Result: ${res}`);
    return asyncAdd(res, 3);
}, (res) => {
    console.log(res)
});
*/

/*
// Chain of promises.
// Call the chain of promises handling both calls.
asyncAdd(3, 3).then((res) => {
    console.log(`Result: ${res}`);
    return asyncAdd(res, 3);
}, (res) => {
    console.log(res)
}).then((res) => {
    console.log(`Result: ${res}`);
}, (res) => {
    console.log(res)
});
*/


/*// Chain of promises.
// Call the chain of promises handling both calls with a bad argument on the first call.
asyncAdd(3, '3')
.then((res) => {
    console.log(`Result: ${res}`);
    return asyncAdd(res, 3);
}, (res) => {
    console.log('Entro');
    console.log(res)
})
.then((res) => {
    console.log(`Result: ${res}`);
}, (res) => {
    console.log(res)
});*/


// Chain of promises.
// Call the chain of promises handling both calls perfectly deleting both error handlers and putting a catch.
// To see error handling set some arguments to strings.
asyncAdd(3, 3)
.then((res) => {
    console.log(`Result: ${res}`);
    return asyncAdd(res, 3);
})
.then((res) => {
    console.log(`Result: ${res}`);
    return asyncAdd(res, '3');
})
.then((res) => {
    console.log(res + 3);
})
.catch((res) => {
    console.log(res);
});
