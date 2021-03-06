import { Component } from '@angular/core';
import { LowerCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Socket } from 'ng-socket-io';
import { DeckService } from '../deck.service';
import { Card } from '../card';
import { Deck } from '../deck';
import { Player } from '../player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nickname: string = '';
  player: Player = new Player('Player 1');
  dealer: Player = new Player('Dealer');
  players: Array<Player> = [];
  deck: Deck = new Deck();
  shoes: number;
  numPlayers: number;

  constructor (
    public router: Router, 
    private socket: Socket,
    private deckService: DeckService,
    private playerService: PlayerService
    ) {}

  ngOnInit() {
    this.shoes = 2; //Math.floor(Math.random()*8) + 1;
    this.load(this.shoes);
    console.log(this.deck);
    this.dealer.isDealer = true;
    this.deal();
    this.player.isNext = true;
    this.setTurn();
    this.bet(this.player, 1000);
  }

  load(shoeSize:number): void {
    this.deckService.load(this.deck, shoeSize);
  }

  shuffle(): void {
    this.deckService.shuffle(this.deck);
    console.log(this.deck);
  }

  deal(number:number = 2): void {
    this.playerService.deal(this.player, this.deck, number);
    console.log(this.player);
    for (let player of this.players) {
      this.playerService.deal(player, this.deck, number);
    }
    this.playerService.deal(this.dealer, this.deck, number);
    console.log(this.deck);
  }

  hit(player:Player): void {
    this.playerService.deal(player, this.deck, 1);
    console.log(player);
    console.log(this.deck);
  }

  bet(bettor: Player, amount:number): void {
    bettor.money -= amount;
    bettor.bet += amount;
  }

  flipCard(card:Card): void {
    if(card.isFaceUp == false) {
      card.isFaceUp = true;
    } else {
      card.isFaceUp = false;
    }
  }

  setTurn(): void {
    if(this.player.isNext == true && this.players.length == 0) {
      this.playerService.setTurn(this.player, this.dealer);
    } else if (this.player.isNext == true) {
      this.playerService.setTurn(this.player, this.players[0]);
    } else if (this.player.isNext == false && this.dealer.isNext == false) {
      for (let i = 0; i < this.players.length; i++) {
        let j = i+1;
        if (this.players[i].isNext == true && j < this.players.length){
          this.playerService.setTurn(this.players[i], this.players[j]);
          break;
        } else if (this.players[i].isNext == true) {
          this.playerService.setTurn(this.players[i], this.dealer);
        }
      }
    } else {
      this.playerService.setTurn(this.dealer, this.player);
    }
  }

  endTurn(): void {
    if (this.player.isTurn == true){
      this.player.isTurn = false;
    } else if (this.dealer.isTurn == true){
      this.dealer.isTurn = false;
    } else {
      for (let player of this.players) {
        if (player.isTurn == true){
          player.isTurn = false;
          break;
        }
      }
    }
    this.setTurn();
    console.log(this.player);
    console.log(this.players);
    console.log(this.dealer);
  }

  split(player: Player): void {
    if(!player.hasSplit) {
      player.hasSplit = true;
      player.splitBet = player.bet;
      player.money -= player.splitBet;
      this.playerService.split(player, this.deck);
    } else {
      alert("You have already split your cards.");
    }
    
    console.log(player);

  }

  joinChat() {
    this.socket.connect();
    this.socket.emit('set-nickname', this.nickname);
    this.router.navigate(['/chat', this.nickname]);
  }

}
