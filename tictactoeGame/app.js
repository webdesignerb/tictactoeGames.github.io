@@ -4,20 +4,30 @@ const oplay = document.getElementById('ochoice');
const winText = document.querySelector('.winner>p');
const userScoreElement = document.getElementById('user-score');
const compScoreElement = document.getElementById('comp-score');
const turn = document.getElementById('turn');

var boxes = document.querySelectorAll('.box');
var body = document.querySelector('.game-board');

var user = '';
var comp = '';
var first = '';
var moveCount = 0;
var values = [];
var winner = '';
var winningLine = [];
var userScore = 0;
var compScore = 0;

(function() {
	for (let i = 0; i < 3; i++) {
		winningLine.push([ i * 3, i * 3 + 1, i * 3 + 2 ]);
		winningLine.push([ i, i + 3, i + 6 ]);
	}
	winningLine.push([ 0, 4, 8 ]);

	winningLine.push([ 2, 4, 6 ]);
})();

main();

xplay.addEventListener('click', () => {
@@ -26,15 +36,20 @@ xplay.addEventListener('click', () => {
user = 'X';
	comp = 'O';
	initiateGame(user, comp);
	first = Math.random() < 0.5 ? comp : user;
	let first = Math.random() < 0.5 ? comp : user;
	if (first == comp) {
		moveCount++;
		setTurn(comp);
		setTimeout(() => {
			let val = findBestMove(values);
			boxes[val].innerHTML = comp;
			values[val] = comp;
			setTurn(user);
		}, 100);
	}
	else {
		setTurn(user);
	}
});

oplay.addEventListener('click', () => {
@@ -43,60 +58,76 @@ oplay.addEventListener('click', () => {
	comp = 'X';
	user = 'O';
	initiateGame(user, comp);
	first = Math.random() < 0.5 ? comp : user;
	let first = Math.random() < 0.5 ? comp : user;
	if (first == comp) {
		moveCount++;
		setTurn(comp);
		setTimeout(() => {
			let val = findBestMove(values);
			boxes[val].innerHTML = comp;
			values[val] = comp;
			setTurn(user);
		}, 100);
	}
	else {
		setTurn(user);
	}
});

reset.addEventListener('click', () => {
	boxes.forEach((box) => {
		box.innerHTML = '';
		box.classList.remove('box-win');
	});
	setTurn('');
	comp = '';
	user = '';
	first = '';
	winText.innerHTML = '';
	xplay.disabled = false;
	oplay.disabled = false;
	moveCount = 0;
	values = [];
	winner = '';
	winningLine = [];
	main();
});

function init() {
	for (let i = 0; i < 3; i++) {
		winningLine.push([ i * 3, i * 3 + 1, i * 3 + 2 ]);
		winningLine.push([ i, i + 3, i + 6 ]);
	for (let i = 0; i < 9; i++) {
		values.push('');
	}
	winningLine.push([ 0, 4, 8 ]);
}

	winningLine.push([ 2, 4, 6 ]);
function setTurn(current) {
	if (current == user && current != '') {
		turn.innerHTML = `Turn : user - \'${current}\'`;
	}
	else if (current == comp && current != '') {
		turn.innerHTML = `Turn : computer - \'${current}\'`;
	}
	else {
		turn.innerHTML = 'Turn :';
	}
}

function main() {
	init();

	boxes.forEach((box) => {
		box.addEventListener('click', () => {
			if (box.innerHTML === '' && user != '') {
				moveCount++;
				box.innerHTML = user;
				values[parseInt(box.id)] = user;
				getResults();
				if (winner == '') {
				if (winner == '' && moveCount < 9) {
					moveCount++;
					setTurn(comp);
					setTimeout(() => {
						let val = findBestMove(values);
						boxes[val].innerHTML = comp;
						values[val] = comp;
						setTurn(user);

						getResults();
					}, 100);
				}
@@ -127,17 +158,19 @@ function win(line) {
function getResults() {
	if (moveCount == 9 && winner == '') {
		winText.innerHTML = 'The game is a Draw';
		setTurn('');
	}
	winLine = null;
	for (let i = 0; i < winningLine.length; i++) {
		let line = winningLine[i];
		if (values[line[0]] == values[line[1]] && values[line[1]] == values[line[2]] && values[line[0]] != undefined) {
		if (values[line[0]] == values[line[1]] && values[line[1]] == values[line[2]] && values[line[0]] != '') {
			winner = values[line[0]];
			winLine = line;
			break;
		}
	}
	if (winner != '') {
		setTurn('');
		if (winner == user) {
			userScoreElement.innerHTML = ++userScore;
		}
		else {
			compScoreElement.innerHTML = ++compScore;
		}
		win(winLine);
	}
}
