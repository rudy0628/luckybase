import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

export const state = {
	base: [],
	out: 0,
	currentHit: '',
	score: 0,
	player: 1,
	inn: 1,
	winner: -1,
};
const baseDescription = ['out', '1-base', '2-base', '3-base', 'homerun', 'ballfour'];

const calcBase = function (hitNum) {
	if (hitNum >= 1 && hitNum <= 3) {
		if (!state.base.length) state.base.push(hitNum);
		else {
			calcHit(hitNum);
		}
	}
	if (hitNum === 0) {
		state.out += 1;
	}

	if (hitNum === 4) {
		calcHomerun();
	}

	if (hitNum === 5) {
		calcBallfour();
	}
};

const calcHit = function (hitNum) {
	//base is current base + hitNum, e.g. current base = 1, 1base-hit, current base = 1, 2
	state.base = state.base.map(b => (b += hitNum));
	state.base.push(hitNum);

	const filterState = state.base.filter(b => b <= 3);

	state.score += state.base.length - filterState.length;
	state.base = filterState;
};

const calcHomerun = function () {
	const baseAmount = state.base.length;
	state.score += baseAmount + 1;
	state.base = [];
};

const calcBallfour = function () {
	const sortedBase = Array.from(state.base).sort((a, b) => a - b);
	// calculate if is ball four
	if (sortedBase.length < 3) {
		for (let i = 0; i < 3; i++) {
			if (sortedBase[i] !== i + 1) {
				sortedBase.push(i + 1);
				break;
			}
		}
	} else {
		state.score += 1;
	}
	state.base = sortedBase;
};

export const hitResult = function () {
	//0: out, 1 : 1 base, 2 : 2 base, 3 : 3 base, 4 : homerun : 5 : fourball
	const hitNum = Math.trunc(Math.random() * 6);
	state.currentHit = baseDescription[hitNum];

	calcBase(hitNum);
};

/////////////////////////////////////////////////////////

export const isChangeInn = function (getScore) {
	state.player === 1 ? state.player++ : state.player--;
	state.score = +getScore(state.player);
	state.out = 0;
	state.base = [];
	state.currentHit = 'go!';
	state.inn += 1;
};

/////////////////////////////////////////////////////////

export const calcWinner = function (getScore) {
	let player1Score = +getScore(1);
	let player2Score = +getScore(2);

	state.winner = player1Score > player2Score ? 1 : player1Score === player2Score ? 0 : 2;
};

/////////////////////////////////////////////////////////
export const initializeState = function () {
	state.base = [];
	state.out = 0;
	state.currentHit = '';
	state.score = 0;
	state.player = 1;
	state.inn = 1;
	state.winner = -1;
};
