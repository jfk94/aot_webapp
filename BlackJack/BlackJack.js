var player;
var dealer;
var deck;
var gameState = false;

//bet display count;
var betDisplayCount = 6;
var zindex = 1;
var lastTop = 0;
var moveTimes = 30;

//banker and player initialize money
var bankerMoney = 5000;
var initMoney = 1000;

//initialize bet
var initBet = 0;
var playerMoney = initMoney;
var playerBet = initBet;

//the bet for insurance method
var insuranceBet = 0;

//the message array for output
var alertMessage = new Array();
alertMessage[0] = 'You have not enough money.';
alertMessage[1] = 'Do you want to buy the insurance?';
alertMessage[2]	= 'Deck has empty, shuffle the cards now';

//card move length
var topInc = 0;
var leftInc = 15;
var isMoving = false;

/**
 * util method
 * 
 */
function initScreen(){

	setTimeout(closePopup, 5000);
}

function closePopup(){
	if($('popup').style.display != 'none')
		$('popup').style.display = 'none';
}

function initProgram(){
	$('PlayerMoney').innerHTML = playerMoney;
	$('BankerMoney').innerHTML = bankerMoney;
	
	$('betStack').innerHTML = '<div id="betStackCount" style="width: 100%; height: 1.2em; position: absolute; top: 0%; left: 2%; color: #FBDB03; font-size: 1.3em; line-height: 1.2em; text-align: center;">'
		+ '</div>'
	 + '<div id="betStackImages" style="width: 100%; height: 0%; position: absolute; top: 1.5em; left: 0%; text-align: center;">'
	+ '</div>';
	$('betStack').style.top = '40%;';
	
	leftInc = $('dealer').offsetWidth * 0.1;
}

function $(elementID){
	return document.getElementById(elementID);
}

/**
 * draw method
 */

function drawCard(){
	var spotPath, cardImage, fontColor;
	switch (this.suit) {
	  case "C" :
		spotPath = 'Club';
		fontColor = 'black';
		break;
	  case "D" :
		spotPath = 'Diamond';
		fontColor = '#B32621';
	    break;
	  case "H" :
		spotPath = 'Hearts';
		fontColor = '#B32621';
	    break;
	  case "S" :
		spotPath = 'spade';
		fontColor = 'black';
	    break;
	}
	if(this.rank == 'A' || this.rank == 'J' || this.rank == 'Q' || this.rank == 'K' || this.rank == '10'){
		cardImage = '<img id="cardImage" height= "100%" src="images/' + spotPath + '_' + this.rank.toLowerCase() + '.png">';
	}
//	else if(this.rank == '10'){
//		cardImage = '<div id="cardBg" style="position: absolute; left: 0px; top: 0px;width: 38px;height:56px;background-image: url(images/front.png);border-top-style: outset; border-top: 1px; border-right-style: outset; border-right: 1px;">'
//			+ '<div id="cardNum1" style="position: absolute; top: 0px; left: 2px; font-family: Arial; font-size: 12px;font-weight: bold;color: ' + fontColor + '">' + this.rank
//			+ '</div>'
//			+ '<div id="cardSpot1" style="position: absolute; top: 12px; left: 2px;width: 8px; height:10px; background-image: url(images/' + spotPath + '.png);">'
//			+ '</div>'
//			+ '<div id="cardSpotCenter" style="position:absolute; top: 23px; left: 15px;width: 8px; height:10px; background-image: url(images/' + spotPath + '.png);"></div>'
//			+ '<div id="cardSpot2" style="position: absolute; top: 34px; left: 27px; filter:filpv;">'
//				+ '<img style="filter:flipv;" src="images/' + spotPath + '.png">'
//			+ '</div>'
//			+ '<div id="cardNum2" style="position: absolute; top: 40px; left: 25px;font-family: Arial; font-size: 12px;font-weight: bold;color: ' + fontColor + ';filter:fliph()flipv()">' + this.rank
//			+ '</div>'
//		+ '</div>';
//	}
	else{
		cardImage = '<div id="cardBg" style="position: absolute; left: 0px; top: 0px; height: 100%; width: 100%;">'
			+ '<img src="images/front.png" height="100%" style="position: absolute;">'
			+ '<div id="cardNum1" style="position: absolute; top: 5%; left: 8%; font-size: 1.1em; font-weight: bold; color: ' + fontColor + '">' + this.rank
			+ '</div>'
			+ '<img id="cardSpot1" width="15%" style="position: absolute; top: 19%; left: 5%;" src="images/' + spotPath + '.png">'
			+ '<img id="cardSpotCenter" width = "30%" style="position: absolute; top: 42%; left: 42%;" src="images/' + spotPath + '.png">'
			+ '<div id="cardSpot2" style="position: absolute; top: 71%; left: 90%; width: 15%; filter:filpv;">'
				+ '<img width="100%" style="filter:flipv;" src="images/' + spotPath + '.png">'
			+ '</div>'
			+ '<div id="cardNum2" style="position: absolute; top: 80%; left: 94%; font-size: 1.1em; font-weight: bold; color: ' + fontColor + '; filter:FlipH(enabled = true);">' + this.rank
			+ '</div>'
		+ '</div>';
	}
	
	return cardImage;
}

/**
 * Display change
 */

function startGame(){
	clearTable();
	gameState = true;
	
	if((playerMoney - playerBet)>=0){
		deck = new Deck();
		
		//construct the player
		player = new Person('player');
		dealer = new Person('dealer');
		
		
		dealer.initCards();
		player.initCards();
		player.showScore();
	}
	else{
		showMessage(alertMessage[0]);
	}
}
 
function showMessage(message){
	$('message').style.display = 'block';
	$('messageText').innerText = message;
}

function closeMessage(){
	$('message').style.display = 'none';
}

function moveBet(direction){
	//hide button
	$('betStackCount').innerText = '';
	$('playerHit').style.display = 'none';
	$('playerStand').style.display = 'none';
	$('playerDouble').style.display = 'none';
	$('Deal').style.display = 'none';
	isMoving = true;
	
	if(direction)
		move(0, (-$('betStack').offsetTop) / moveTimes, ( (parseInt($('container').offsetWidth) / 2) - $('betStack').offsetLeft) / moveTimes, 30);
	else{
		var tempNode = $('betStackImages').innerHTML;
		$('betStack').innerHTML += tempNode;
		
		move(0, ((parseInt($('container').offsetWidth) * 0.5) - $('betStack').offsetTop) / moveTimes, ( (parseInt($('container').offsetWidth) / 2) - $('betStack').offsetLeft) / moveTimes, 20);
	}
}

function move(timeCount, stepY, stepX, time){
	if(timeCount == moveTimes){
		$('playerHit').style.display = 'none';
		$('playerStand').style.display = 'none';
		$('playerDouble').style.display = 'none';
		$('Deal').style.display = 'none';
		isMoving = false;

		//initialize the betStack position
		initBetStack();
	}
	else{
		$('betStack').style.top = (parseInt($('betStack').offsetTop) +stepY) +'px';
		$('betStack').style.left = (parseInt($('betStack').offsetLeft) +stepX) +'px';
		setTimeout(function(){move(timeCount+1, stepY, stepX, time);}, time);
	}
}

function changeBet(betNum){
	if(!gameState && !isMoving){
		if( (parseInt(betNum) + playerBet) <= playerMoney ){
			if($('Deal').style.display == 'none')
				$('Deal').style.display = 'block';
			
			var childNodesCount = $('betStackImages').childNodes.length;
			if( childNodesCount < betDisplayCount){
				var step = parseInt($('betStack').offsetWidth) * 0.1;
				zindex++; 
		
				var nodes = $('betStackImages').childNodes;
		
				for(var i = 0; i < nodes.length; i++){
					nodes[i].style.top = (parseInt(nodes[i].style.top) + step) + 'px';
				}
				
				var betNode = '<img width = "100%" style="position: absolute; top: 0px; left: 0px; z-index: ' + zindex + ';" src="images/' + betNum + 'x.png"></div>';
				
				$('betStack').style.height = (parseInt($('betStack').offsetHeight) + step) + 'px';
				$('betStack').style.top = (parseInt($('betStack').offsetTop) - step) + 'px';
				$('betStackImages').style.height = (parseInt($('betStackImages').offsetHeight) + step) + 'px';
				$('betStackImages').innerHTML += betNode;
			}
			
			//change player bet value
			playerBet += parseInt(betNum);
			$('betStackCount').innerText = '$' + playerBet;
			$('PlayerMoney').innerText = playerMoney - playerBet;
		}
		else{
			showMessage(alertMessage[0]);
		}
	}
	//alert($('betStackImages').innerHTML);
}

function showInsuranceDiv(){
	$('playerInvoke').style.display = 'none';
	$('showBackground').style.display = 'block';
}

function hideInsuranceDialog(){
	$('showBackground').style.display = 'none';
	$('playerInvoke').style.display = 'block';
}

function gameEnd(){
	$('dealerCards').removeChild($('cardBack'));
	$('playerHit').style.display = 'none';
	$('playerStand').style.display = 'none';
	$('playerDouble').style.display = 'none';
	$('Deal').style.display = 'none';
	setTimeout(function(){$('dealerCards').innerHTML = '';
	$('playerCards').innerHTML = '';}, 2000);
	playerBet = 0;
	gameState = false;
 }

/**
 * Methods of Game
 */
 
function passInsurance(){
	 // if banker has blackjack then banker will win the game
	 if(dealer.checkBlackJack()){
		bankerMoney += playerBet;
		playerMoney -= playerBet;
		$('BankerMoney').innerHTML = bankerMoney;
		$('PlayerMoney').innerHTML = playerMoney;
		showMessage('You lose.');
		gameEnd();
		setTimeout(function(){moveBet(true);}, 2000);
	 }
}
 
function initBetStack(){
	$('betStack').innerHTML = '<div id="betStackCount" style="width: 100%; height: 1.2em; position: absolute; top: 0%; left: 2%; color: #FBDB03; font-size: 1.3em; line-height: 1.2em; text-align: center;">'
		+ '</div>'
		 + '<div id="betStackImages" style="width: 100%; height: 0%; position: absolute; top: 1.5em; left: 0%; text-align: center;">'
		+ '</div>';
	$('betStack').style.top = '29%';
	$('betStack').style.left = '84%';
	$('betStack').style.height = '7.5%';
	zindex = 0;
}
 
function playerInsurance(){
	 insuranceBet = parseInt(playerBet) / 2;
	 //if banker has blackjack, player win the double insurance bet
	 if( dealer.checkBlackJack()){
		playerMoney += insuranceBet;
		bankerMoney -= insuranceBet;
		playerMoney -= playerBet;
		bankerMoney += playerBet;
		$('PlayerMoney').innerHTML = playerMoney;
		$('BankerMoney').innerHTML = bankerMoney;
		showMessage('You win the insurance!');
		moveBet(true);
		gameEnd();
	 }
	 else{
		 showMessage('Banker hasn\'t blackjack');
		 playerMoney -= insuranceBet;
		 bankerMoney += insuranceBet;
		 $('PlayerMoney').innerHTML = playerMoney;
		 $('BankerMoney').innerHTML = bankerMoney;
	 }
}
 
function playerDouble(){
	 playerBet *= 2;
	 $('PlayerMoney').innerHTML = playerMoney;
	 
	 //player only can get one card then make the winner
	 player.getNextCard();
	 $('playerCards').innerHTML += player.cardDiv(player.cards.length - 1);
	 player.showScore();
	 
	 if(player.getScore() > 21){
		 showMessage('You lose.');
		 calMoney(false);
		 dealer.showScore();
	 }
	 else
		 dealerInvoke();
	 
	 //show the deal button and hide other;
	 gameEnd();
}
 
function clearTable(){
	$('dealerCards').innerHTML = '';
	$('playerCards').innerHTML = '';
	$('dealerScores').innerHTML = '';
	$('playerScores').innerHTML = '';
}
 
function playerHit(){
	player.cards[player.cards.length] = deck.getCard();
	$('playerCards').innerHTML += player.cardDiv(player.cards.length - 1);
	player.showScore();
	
	//player get card, and if player's score is greater than 21 then make the player lose
	if(player.getScore() > 21){
		showMessage('You lose.');
		calMoney(false);
		gameEnd();
	}

	//if player hit then he can't click the double button
	$('playerDouble').style.display = 'none';
}

function playerStand(){
	player.showScore();
	dealerInvoke();
	gameEnd();
}

//banker get card
function dealerInvoke(){
	while(dealer.getScore() <= 16){
		dealer.getNextCard();
		$('dealerCards').innerHTML += dealer.cardDiv(dealer.cards.length - 1);
	};
	
	if (dealer.getScore() > 21) {
		calMoney(true);
		showMessage( 'You win!' );
	}
	else {
		checkWinner();
	}
	dealer.showScore();
	gameEnd();
}

function checkWinner(){
	if ((21 - parseInt(dealer.getScore())) > (21 - parseInt(player.getScore()))) {
		showMessage( 'You win!');
		calMoney(true);
	}
	else 
		if ((21 - parseInt(dealer.getScore())) < (21 - parseInt(player.getScore()))) {
			showMessage('You lose.');
			calMoney(false);
		}
		else {
			showMessage( 'Your hand matches dealers. Push.');
			initBetStack();
			$('PlayerMoney').innerHTML = playerMoney;
		}
}

function calMoney(isPlayerWin){
	if(isPlayerWin){
		playerMoney += playerBet;
		bankerMoney -= playerBet;
		moveBet(false);
	}
	else{
		bankerMoney += playerBet;
		playerMoney -= playerBet;
		moveBet(true);
	}
	
	$('PlayerMoney').innerHTML = playerMoney;
	$('BankerMoney').innerHTML = bankerMoney;
}

/***
 * Methods of Person
 */
function Person(divName){
	this.personName = divName;
	this.cards = new Array();
	this.getScore = getScore;
	this.initCards = initCards;
	this.showScore = showScore;
	this.getNextCard = personGetCard;
	this.checkBlackJack = checkBlackJack;
	this.cardDiv = createCardDiv;
}
 
function createCardDiv(index){
	var cardImageStr = this.cards[index].cardImage();
	var cardDiv;
	
	if(index != 0){
		cardDiv = '<div id="cardDiv" style=" height: 100%; width: 24%; position: absolute; top: ' + (parseInt($(this.personName + 'Cards').lastChild.offsetTop) + topInc) + 'px; left: ' + (parseInt($(this.personName + 'Cards').lastChild.offsetLeft) + leftInc) + 'px;">' + cardImageStr + '</div>';
	}
	else if(index ==0 && this.personName == 'dealer'){
		cardDiv = '<div id="cardDiv" style="position: absolute; top: 0px; left: 0px; height: 100%; width: 24%;">' + cardImageStr + '</div>';
		if(this.personName != 'player'){
			cardDiv += '<img id="cardBack" style="position: absolute; top: 0px; left: 0px;" src="images/back.png" height = "100%">';
		}
	}
	else
		cardDiv = '<div id="cardDiv" style="height: 100%; width: 24%; position: absolute; top: 0px; left: 0px;">' + cardImageStr + '</div>';
	
	return cardDiv;
}

function checkBlackJack(){
	var hasAce = false;
	var hasTenPoint = false; 
	
	if(this.cards.length == 2){
		for(var i = 0; i < 2 ; i++){
			if(this.cards[i].rank == 'A' || this.cards[i].rank == 'A')
				hasAce = true;
			else if(this.cards[i].rank == '10' || this.cards[i].rank == 'J' || this.cards[i].rank == 'Q' || this.cards[i].rank == 'K')
				hasTenPoint = true;
		}
	}

	if(hasAce && hasTenPoint)
		return true;
	else
		return false;
		
}
 
function personGetCard(){
	this.cards[this.cards.length] = deck.getCard();
}

function showScore(){
	document.getElementById(this.personName + 'Scores').innerHTML = this.getScore();
}

function initCards(){
	
	for(var i=0; i<2 ;i++)
		this.cards[i] = deck.getCard();
	
	//test codes
//	if(this.personName == 'player'){
//		this.cards[0]	= new Card('10', 'C');
//		this.cards[1] = new Card('A', 'C');
//	}
	
	for(var i=0; i< this.cards.length; i++){
		$(this.personName + 'Cards').innerHTML += this.cardDiv(i);
	}
	
	//if player has black jack and banker hasn't it when initialize game then make player win
	if(this.personName == 'player' && this.checkBlackJack())
		if(!dealer.checkBlackJack()){
			playerMoney += playerBet*1.5;
			bankerMoney -= playerBet*1.5;
			$('PlayerMoney').innerHTML = playerMoney;
			$('BankerMoney').innerHTML = bankerMoney;
			showMessage('You win!');
			moveBet(false);
			gameEnd();
			return;
		}
		else{ 
			showMessage( 'Your hand matches dealers. Push.');
			dealer.showScore();
			gameEnd();
			initBetStack();
			return;
		}
	
	if(this.personName == 'player' && dealer.cards[1].rank == 'A'){
		showInsuranceDiv();
	}
	
	$('Deal').style.display = 'none';
	$('playerHit').style.display = 'block';
	$('playerStand').style.display = 'block';
	if( ( playerBet * 2 ) <= playerMoney)
		$('playerDouble').style.display = 'block';
}

function getScore(){
	var score = 0;
	var existedA = new Array();
	
	for(var i=0;i<this.cards.length;i++){
		var cardScore = this.cards[i].rank;
		
		if(cardScore =='J' || cardScore == 'Q' || cardScore == 'K' || cardScore == '10')
			cardScore = '10';
		else if(cardScore == 'A'){
			cardScore = '11';
			existedA[existedA.length] = i; 
		}
		score += parseInt(cardScore);
	}
	
	//if score > 21 and player has ace the score will decrease ten
	for( var i = 0; score > 21 && i < existedA.length; i++)
		score -= 10;
	
	return score;
}

/**
 * methods of cards
 */

function Card(rank, suit){
	this.rank = rank;
	this.suit = suit;
	
	this.cardImage = drawCard;
}

function createCard(){
	var ranks = new Array("A", "2", "3", "4", "5", "6", "7", "8", "9",
            "10", "J", "Q", "K");
	var suits = new Array("C", "D", "H", "S");
	
	//create a deck of cards
	for(var i = 0;i<suits.length; i++)
		for(var j=0;j<ranks.length; j++)
			this.cards[ 13 * i + j ] = new Card(ranks[j], suits[i]);
}

function Deck(){
	this.cards = new Array();
	
	//constructs method
	this.init = createCard;
	//create deck;
	this.init();

	this.getCard = getNextCard;
}

function getNextCard(){
	if(this.cards.length != 0){
		var randomNum = Math.round(Math.random() * (this.cards.length - 1));
		var card = this.cards[randomNum];
		
		for(var i=randomNum; i< (this.cards.length - 1); i++)
			this.cards[i] = this.cards[i+1];
		this.cards.length = this.cards.length -1;
		return card;
	}
	else{
		this.init();
		return this.getCard();
	}
}