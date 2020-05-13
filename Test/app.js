// const INIT_VALUE = 0;
// const END_VALUE = 100;

// const function1 = (num) => (num + 3) * 4;

// const function2 = () => {
// 	for (let i = 0; i < 101; i++) {
// 		let numIndicted = function1(i);
// 		console.log('=>', numIndicted);
// 	}
// };

// let asdfas = 'Lone Start Steackhouse';
// // function2();
// console.log(asdfas.length);
const piramide = (number) => {
	for (let i = 1; i <= number; i++) {
		let hhh = '';
		for (let j = 1; j <= i; j++) {
			if (i > 0 && i < 10) {
				hhh = hhh + ' ' + i;
			}
			else {
				hhh = hhh + i;
			}
		}
		let spaces = number - i;
		let spacesStr = '';
		for (let k = 1; k <= spaces; k++) {
			spacesStr = spacesStr + ' ';
		}
		console.log(spacesStr + hhh);
	}
};

piramide(50);
