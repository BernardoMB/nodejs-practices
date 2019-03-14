const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

// 1

/* [1, 2, 3].forEach(async (num) => {
  await waitFor(50);
  console.log(num);
});

console.log('Done'); */

// 2

/* customForEach = function(array, callback) {
	for (let index = 0; index < array.length; index++) {
		callback(array[index], index, array);
	}
}

customForEach([1, 2, 3], async (num) => {
  await waitFor(50);
  console.log(num);
});

console.log('Done'); */

// 3 

/* const array = [1, 2, 3];
const callback = async (num) => {
	await waitFor(50);
  	console.log(num);
} 
for (let index = 0; index < array.length; index++) {
	callback(array[index], index, array);
}
console.log('Done'); */

// 4

/* async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

asyncForEach([1, 2, 3], async (num) => {
  await waitFor(2000);
  console.log(num);
});

console.log('Done'); */

// 5

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const start = async () => {
  await asyncForEach([1, 2, 3], async (num) => {
    await waitFor(50);
    console.log(num);
  });
  console.log('Done');
}

start();