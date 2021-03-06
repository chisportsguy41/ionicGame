import { Card } from './card';

export class Player {
    hand: Array<Card> = [];
    splitHand: Array<Card>;
    name: string;
    bet: number = 0;
    splitBet: number = 0;
    money: number = 10000;
    isTurn: boolean = false;
    isNext: boolean = false;
    isDealer: boolean = false;
    totalValue: number = 0;
    splitValue: number = 0;
    numAces: number = 0;
    numSplitAces: number = 0;
    numTwos: number = 0;
    numThrees: number = 0;
    numFours: number = 0;
    numFives: number = 0;
    numSixes: number = 0;
    numSevens: number = 0;
    numEights: number = 0;
    numNines: number = 0;
    numTens: number = 0;
    numJacks: number = 0;
    numQueens: number = 0;
    numKings: number = 0;
    numHearts: number = 0;
    numDiamonds: number = 0;
    numSpades: number = 0;
    numClubs: number = 0;
    addedAce: boolean = false;
    subbedAce: boolean = false;
    addedSplitAce: boolean = false;
    subbedSplitAce: boolean = false;
    hasBlackjack: boolean = false;
    hasDoubledDown: boolean = false;
    hasSplit: boolean = false;
    splitBlackjack: boolean = false;
    isHuman = true;

    constructor(name: string = '') {
        this.name = name;
    }
}