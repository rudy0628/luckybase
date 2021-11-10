import * as model from './model.js';
import view from './view.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

const controlHit = function () {
	//hit baseball
	model.hitResult();

	//if the out is 3(change inn)
	if (model.state.out === 3) {
		//clear the current player out
		view.clearOut(model.state.player);

		//if game is end
		if (model.state.inn === 6) {
			//set the winner
			model.calcWinner(view.getScore);
			//render the winner and stop the hit button
			view.renderWinner(model.state.winner);
			return;
		}

		//change the player, and clear the state
		model.isChangeInn(view.getScore);

		//change current player background
		view.changeBackground();
	}

	//render the current player state
	view.renderHitResult(model.state);
};

const controlReset = function () {
	//initialize the state
	model.initializeState();

	//initialize UI
	view.renderInitialize(model.state);
};

const controlModal = function () {
	view.renderModal();
};

const init = function () {
	view.addHandlerHit(controlHit);
	view.addHandlerReset(controlReset);
	view.addHandlerOpenModal(controlModal);
	view.addHandlerCloseModal(controlModal);
};
init();
