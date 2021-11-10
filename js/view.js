class PlayView {
	_btnHit = document.querySelector('.btn--hit');
	_btnReset = document.querySelector('.btn--reset');
	_btnRules = document.querySelector('.btn--rules');
	_btnCloseModal = document.querySelector('.close-modal');
	_hitResult = document.querySelector('.player--hit');
	_state1 = document.querySelector('.player--state--1');
	_state2 = document.querySelector('.player--state--2');
	_inn = document.querySelector('.inn');
	_bases = document.querySelectorAll('.base');
	_modal = document.querySelector('.modal');
	_overlay = document.querySelector('.overlay');

	addHandlerHit(handler) {
		this._btnHit.addEventListener('click', handler);
	}

	addHandlerReset(handler) {
		this._btnReset.addEventListener('click', handler);
	}

	addHandlerOpenModal(handler) {
		this._btnRules.addEventListener('click', handler);
	}

	addHandlerCloseModal(handler) {
		this._btnCloseModal.addEventListener('click', handler);
		this._overlay.addEventListener('click', handler);
	}

	renderHitResult(state) {
		document.querySelector(`.player--score--${state.player}`).textContent = state.score;
		document.querySelector(`.player--out--${state.player}`).textContent = state.out;
		this._hitResult.textContent = state.currentHit;
		this._inn.textContent = `inn : ${Math.ceil(state.inn / 2)}`;

		//homerun base
		if (state.currentHit === 'homerun') {
			this._bases.forEach(el => {
				setTimeout(() => (el.style.background = 'green'));
				setTimeout(() => (el.style.background = ''), 500);
			});
		}
		//render base
		this._renderBases(state);
	}

	_renderBases(state) {
		//clear base
		this._clearBase();

		for (let i = 1; i <= 3; i++) {
			if (state.base.find(el => el === i)) {
				this._bases.forEach(el => {
					if (el.classList.contains(`base--${i}`)) {
						el.style.background = 'green';
					}
				});
			}
		}
	}

	renderWinner(winner) {
		if (winner === 0) {
			this._clearBackground();
			this._hitResult.textContent = 'draw';
		}

		if (winner === 1) {
			this._clearBackground();
			this._state1.classList.add('player--winner');
			this._hitResult.textContent = 'player 1 win';
		}

		if (winner === 2) {
			this._clearBackground();
			this._state2.classList.add('player--winner');
			this._hitResult.textContent = 'player 2 win';
		}

		this._btnHit.disabled = true;
	}

	renderInitialize(state) {
		this._btnHit.disabled = false;
		//reset out
		document.querySelector('.player--out--1').textContent = state.out;
		document.querySelector('.player--out--2').textContent = state.out;
		//reset score
		document.querySelector('.player--score--1').textContent = state.score;
		document.querySelector('.player--score--2').textContent = state.score;
		//reset inn and hit result
		this._inn.textContent = `inn : ${state.inn}`;
		this._hitResult.textContent = 'go!';
		//reset base
		this._clearBase();
		//reset background
		this._clearBackground();
		this._state1.classList.add('player--curr');
	}

	renderModal() {
		this._modal.classList.toggle('hidden');
		this._overlay.classList.toggle('hidden');
	}

	clearOut(player) {
		document.querySelector(`.player--out--${player}`).textContent = 0;
	}

	_clearBase() {
		this._bases.forEach(el => {
			el.style.background = '';
		});
	}

	_clearBackground() {
		this._state1.classList.remove('player--curr');
		this._state2.classList.remove('player--curr');
		this._state1.classList.remove('player--winner');
		this._state2.classList.remove('player--winner');
	}

	changeBackground() {
		this._state1.classList.toggle('player--curr');
		this._state2.classList.toggle('player--curr');
	}

	getScore(player) {
		return document.querySelector(`.player--score--${player}`).textContent;
	}
}

export default new PlayView();
