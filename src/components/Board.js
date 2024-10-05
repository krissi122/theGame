import React, { useState } from 'react';
import Deck from "./Deck";
import Card from "./Card";
import IncreaseMat from "./IncreaseMat";
import DecreaseMat from "./DecreaseMat";
import './Board.css';
import PropTypes from 'prop-types';

const Board = () => {
    const [deckMessage, setDeckMessage] = useState('The game has not started.');
    const [cards, setCards] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [selectedCard, setSelectedCard] = useState(null)
    const [selectedCardIndex, setSelectedCardIndex] = useState(null)
    const [mats, setMats] = useState([1, 1, 100, 100])
    const [matMessage, setMatMessage] = useState(null)
    const tempDeck = Array.from({ length: 98 }, (_, i) => i + 2)
    let [deck, setDeck] = useState(tempDeck)
    let [playedCardCounter, setPlayedCardCounter] = useState(0)
    const [hideCard, setHideCard] = useState(false)
    const [lastMatPlayed, setLastMatPlayed] = useState(null)
    const [lastCardPlayedOn, setLastCardPlayedOn] = useState(null)
    const [lastCardPlayed, setLastCardPlayed] = useState(null)
    let [undoCounter, setUndoCounter] = useState(0)

    const shuffleDeck = () => {
        let currentIndex = deck.length;
        while (currentIndex != 0) {

            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [deck[currentIndex], deck[randomIndex]] = [
                deck[randomIndex], deck[currentIndex]];
        }
    }

    const startGame = () => {
        shuffleDeck()
        const newCardValues = [deck[0], deck[1], deck[2], deck[3], deck[4], deck[5], deck[6]];
        newCardValues.sort((a, b) => a - b)
        setCards(newCardValues);
        deck.splice(0, 7)
        setDeckMessage(`Remaining Cards ${deck.length}`);
    };

    const resetGame = () => {
        deck = Array.from({ length: 98 }, (_, i) => i + 2)
        setDeck(deck)
        shuffleDeck()
        const newCardValues = [deck[0], deck[1], deck[2], deck[3], deck[4], deck[5], deck[6]];
        newCardValues.sort((a, b) => a - b)
        setCards(newCardValues);
        setMats([1, 1, 100, 100])
        deck.splice(0, 7)
        setDeckMessage(`Reset game. Remaining Cards ${deck.length}`);
    }

    const refillCards = () => {
        if (playedCardCounter >= 2) {
            let deckCounter = 0
            for (let i = 0; i < cards.length; i++) {
                if (cards[i] == ' ') {
                    cards[i] = deck[deckCounter++] ?? '_'
                }
            }
            deck.splice(0, deckCounter)
            cards.sort((a, b) => a - b)
            if (deck.length === 0) {
                alert('You won!')
            } else {
                setDeckMessage(`Remaining Cards ${deck.length}`);
            }
            setPlayedCardCounter(0)
        } else {
            alert(`You need to play at least two cards. You\'ve only played ${playedCardCounter} cards`)
        }
    };

    const handleCardClick = (cardValue, matIndex) => {
        setSelectedCard(cards[cardValue])
        setSelectedCardIndex(cardValue)
        setLastMatPlayed(matIndex)
    }

    const tryApplyIncreasingValue = (selectedCardIndex, matValueIndex) => {
        let selectedCard = cards[selectedCardIndex]
        let matCard = mats[matValueIndex]
        if (selectedCard === ' ') {
            alert('not playable!')
        } else if (selectedCard > matCard) {
            mats[matValueIndex] = selectedCard
            cards[selectedCardIndex] = ' '
            setLastCardPlayed(selectedCard)
            setLastCardPlayedOn(matCard)
            setLastMatPlayed(matValueIndex)
            setPlayedCardCounter(playedCardCounter += 1)
            setUndoCounter(0)
        } else if ((matCard - 10) === selectedCard) {
            mats[matValueIndex] = selectedCard
            cards[selectedCardIndex] = ' '
            setLastCardPlayed(selectedCard)
            setPlayedCardCounter(playedCardCounter += 1)
            setLastCardPlayedOn(matCard)
            setLastMatPlayed(matValueIndex)
            setUndoCounter(0)
        } else {
            alert(`This is not a valid card to play. Please a card that is greater than ${matCard} or ${mats[matValueIndex] - 10}`)
        }
        handleCardClick(selectedCardIndex, matValueIndex)

    }

    const tryApplyDecreasingValue = (selectedCardIndex, matValueIndex) => {
        let selectedCard = cards[selectedCardIndex]
        let matCard = mats[matValueIndex]
        if (selectedCard === ' ') {
            alert('not playable!')
        } else if (selectedCard < matCard) {
            mats[matValueIndex] = selectedCard
            cards[selectedCardIndex] = ' '
            setLastCardPlayedOn(matCard)
            setPlayedCardCounter(playedCardCounter += 1)
            setLastMatPlayed(matValueIndex)
            setLastCardPlayed(selectedCard)
            setUndoCounter(0)
        } else if ((matCard + 10) === selectedCard) {
            mats[matValueIndex] = selectedCard
            cards[selectedCardIndex] = ' '
            setPlayedCardCounter(playedCardCounter += 1)
            setLastCardPlayedOn(matCard)
            setLastMatPlayed(matValueIndex)
            setLastCardPlayed(selectedCard)
            setUndoCounter(0)
        } else {
            alert(`This is not a valid card to play. Please a card that is less than ${matCard} or ${mats[matValueIndex] + 10}`)
        }

        handleCardClick(selectedCardIndex, matValueIndex)
    }

    const cardIsNotPlayable = (card) => {
        if (card > mats[0] || card === mats[0] - 10) {
            return false
        } else if (card > mats[1] || card === mats[1] - 10) {
            return false
        } else if (card < mats[2] || card === mats[2] + 10) {
            return false
        } else if (card < mats[3] || card === mats[3] - 10) {
            return false
        }
        return true
    }

    const undoLastMove = () => {
        if (undoCounter < 1) {
            cards[selectedCardIndex] = lastCardPlayed
            mats[lastMatPlayed] = lastCardPlayedOn
            handleCardClick(selectedCardIndex, lastMatPlayed)
            setUndoCounter(1)
        } else {
            alert('You can only undo once!')
        }

    }

    return (
        <section className="board_background">
            <div className="rules">
                You may only place cards that are greater than the previous card in the ascending deck, and cards less than the previous in the descending deck. The exception to this is if the value of your card is exactly +/- 10 of the topmost card on the pile.
            </div>
            <div onClick={refillCards}>
                <Deck id="deck" message={deckMessage} />
            </div>

            <div className="card_" id="card_1" onClick={() => handleCardClick(0)} > <Card card={cards[0]} hideCard={cardIsNotPlayable(cards[0])} /> </div>
            <div className="card_" id="card_2" onClick={() => handleCardClick(1)} > <Card card={cards[1]} hideCard={cardIsNotPlayable(cards[1])} /> </div>
            <div className="card_" id="card_3" onClick={() => handleCardClick(2)} > <Card card={cards[2]} hideCard={cardIsNotPlayable(cards[2])} /> </div>
            <div className="card_" id="card_4" onClick={() => handleCardClick(3)} > <Card card={cards[3]} hideCard={cardIsNotPlayable(cards[3])} /> </div>
            <div className="card_" id="card_5" onClick={() => handleCardClick(4)} > <Card card={cards[4]} hideCard={cardIsNotPlayable(cards[4])} /> </div>
            <div className="card_" id="card_6" onClick={() => handleCardClick(5)} > <Card card={cards[5]} hideCard={cardIsNotPlayable(cards[5])} /> </div>
            <div className="card_" id="card_7" onClick={() => handleCardClick(6)} > <Card card={cards[6]} hideCard={cardIsNotPlayable(cards[6])} /> </div>


            <div className="mats_" id='increase_one' onClick={() => tryApplyIncreasingValue(selectedCardIndex, 0)} > <IncreaseMat value={mats[0]} /> </div>
            <div className="mats_" id='increase_two' onClick={() => tryApplyIncreasingValue(selectedCardIndex, 1)} > <IncreaseMat value={mats[1]} /> </div>
            <div className="mats_" id='decrease_one' onClick={() => tryApplyDecreasingValue(selectedCardIndex, 2)} > <DecreaseMat value={mats[2]} /> </div>
            <div className="mats_" id='decrease_two' onClick={() => tryApplyDecreasingValue(selectedCardIndex, 3)} > <DecreaseMat value={mats[3]} /> </div>


            <input type='button' className='game_button' id='start_game_button' onClick={startGame} value='Start Game' />
            <input type='button' className='game_button' id='reset_game_button' onClick={resetGame} value='Reset Game' />
            <input type='button' className='game_button' id='undo_button' onClick={undoLastMove} value="undo" />


        </section>
    );
};

Board.propTypes = {
    deck: PropTypes.arrayOf(Number),
    increaseMatOne: PropTypes.instanceOf(IncreaseMat),
    increaseMatTwo: PropTypes.instanceOf(IncreaseMat),
    decreaseMatOne: PropTypes.instanceOf(DecreaseMat),
    decreaseMatTwo: PropTypes.instanceOf(DecreaseMat),
};

export default Board;
