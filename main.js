//Game dialog
const gameDialog = document.getElementById('game-dialog');
const gameDialogClose = gameDialog.querySelector('#game-dialog-close');
const gameDialogTitle = gameDialog.querySelector('#game-dialog-title');
const gameDialogBtns = gameDialog.querySelector('#create-lobby-buttons');
const gameDialogErrMsg = gameDialog.querySelector('#connection-error-message');
const gameJoinBtn = gameDialog.querySelector('#game-join-button');
const gameHostBtn = gameDialog.querySelector('#game-host-button');
let joinAction = function(){};
let hostAction = function(){};

gameDialogClose.addEventListener('click', () => {gameDialog.close(); document.activeElement.blur();});
gameJoinBtn.addEventListener('click', () => joinAction());
gameHostBtn.addEventListener('click', () => hostAction());


//Join dialog
const joinDialog = document.getElementById('join-dialog');
const joinDialogClose = joinDialog.querySelector('#join-dialog-close');
const joinDialogTitle = joinDialog.querySelector('#join-dialog-title');
const joinStartBtn = joinDialog.querySelector('#join-start-button');
const joinCancelBtn = joinDialog.querySelector('#join-cancel-button');
const joinForm = joinDialog.querySelector('#join-form');
const joinUsername = joinDialog.querySelector('#username');

joinDialogClose.addEventListener('click', () => {joinDialog.close(); document.activeElement.blur();});
joinCancelBtn.addEventListener('click', () => {joinDialog.close(); gameDialog.showModal();});
joinStartBtn.addEventListener('click', (event) => {
	//TODO
	event.preventDefault();
	if (!joinForm.checkValidity()) {
		console.log('invalid');
		return false;
	}
	console.log(gameHref);
});



//Host dialog
const hostDialog = document.getElementById('host-dialog');
const hostDialogClose = hostDialog.querySelector('#host-dialog-close');
const hostDialogTitle = hostDialog.querySelector('#host-dialog-title');
const hostStartBtn = hostDialog.querySelector('#host-start-button');
const hostCancelBtn = hostDialog.querySelector('#host-cancel-button');
const hostForm = hostDialog.querySelector('#host-form');

hostDialogClose.addEventListener('click', () => {hostDialog.close(); document.activeElement.blur();});
hostCancelBtn.addEventListener('click', () => {hostDialog.close(); gameDialog.showModal();});
hostStartBtn.addEventListener('click', (event) => {
	//TODO
	event.preventDefault();
	if (!hostForm.checkValidity()) {
		console.log('invalid');
		return false;
	}
	console.log(window.location.href + gameHref + '/index.html')
});


//Other
let gameHref;
document.addEventListener('keyup', (k) => {
	if (k.key == 'Escape') {
		document.activeElement.blur();
		joinForm.reset();
		hostForm.reset();
	}
});

document.querySelectorAll('.card').forEach(card => {
	const title = card.querySelectorAll('.card-title')[0].firstChild.nodeValue;
	const href = card.dataset.href;
	
	const setGameDialog = function() {
		gameHref = href;
		gameDialog.showModal();
		gameDialogTitle.innerText = title;
		if (card.classList.contains('inactive')) {
			gameDialogBtns.style.display = 'none';
			gameDialogErrMsg.style.display = 'grid';
		} else {
			gameDialogBtns.style.display = 'grid';
			gameDialogErrMsg.style.display = 'none';
		}
		
		joinAction = function () {
			gameDialog.close();
			joinDialog.showModal();
		}
		hostAction = function () {
			gameDialog.close();
			hostDialog.showModal();
		}
	}
	
	card.addEventListener('click', () => setGameDialog());
	card.addEventListener('keyup', (k) => {if (k.key == 'Enter') setGameDialog()});
});
