let resultA, resultB, resultC;

function addAsync(num1, num2, callback) {
	return callback(num1 + num2);
}

addAsync(1, 2, (success) => {
	// callback 1
	resultA = success; // you get result = 3 here

	addAsync(resultA, 3, (success) => {
		// callback 2
		resultB = success; // you get result = 6 here

		addAsync(resultB, 4, (success) => {
			// callback 3
			resultC = success; // you get result = 10 here

			console.log('total ' + resultC);
			console.log(resultA, resultB, resultC);
		});
	});
});
