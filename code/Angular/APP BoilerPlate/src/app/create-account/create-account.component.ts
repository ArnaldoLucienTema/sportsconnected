import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TeamService} from '../_services/team.service';
import {UserInfoService} from '../_services/user_info.service';
import {GenericUserService} from '../_services/generic_user.service';
import {SearchEntityViewmodel} from '../_models/search_entity_viewmodel';
import {TeamViewModel} from '../_models/team_viewmodel';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  teamService: TeamService;
  chosenPlayer;
  chosenLeague;
  chosenGender;
  chosenAgeGroup;
  chosenTeam;
  genericUserService: GenericUserService;
  teams: SearchEntityViewmodel[];
  age_groups;
  genders;
  leagues;
  players: SearchEntityViewmodel[];
  user;

  constructor(private router: Router,
              private userInfoService : UserInfoService) {
  }

  ngOnInit() {
    this.teamService = new TeamService();
    this.genericUserService = new GenericUserService();
    this.genders = [
      {
        id: '1',
        name: 'Masculino',
      },
      {
        id: '2',
        name: 'Feminino',
      }
    ]
  }

  loadAgeGroups() {
    // Todo: Get AgeGroups
    this.age_groups = [
      {
        id: '1',
        name: 'Petizes',
      },
      {
        id: '2',
        name: 'Traquinas',
      },
      {
        id: '3',
        name: 'Benjamins B',
      },
      {
        id: '4',
        name: 'Benjamins A',
      },      {
        id: '5',
        name: 'Infantis B',
      },
      {
        id: '6',
        name: 'Infantis A',
      },      {
        id: '7',
        name: 'Iniciados B',
      },
      {
        id: '8',
        name: 'Iniciados',
      },      {
        id: '9',
        name: 'Juvenis B',
      },
      {
        id: '10',
        name: 'Juvenis',
      },      {
        id: '11',
        name: 'Juniores B',
      },
      {
        id: '12',
        name: 'Juniores',
      },      {
        id: '13',
        name: 'Seniores',
      }
    ]
  }

  loadLeagues() {
    // Todo: Get Competitions
    this.leagues = [
      {
        id: '2',
        name: 'Liga Portuguesa'
      },
      {
        id: '3',
        name: 'II Liga'
      },
      {
        id: '2',
        name: 'AF Lisboa 1ª Divisão Série 1 2017/18'
      },
    ];  }

  loadTeam() {
    // Todo: Get Team based on chosenLeague
    this.genericUserService.searchUser('', '', 'team')
      .subscribe(teams => this.teams = teams);
  }

  loadPlayers() {
    // Todo: Get Players based on chosenTeam
    this.genericUserService.searchUser('', '', 'player')
      .subscribe(players => this.players = players);
  }

  loadPlayer(){
    this.router.navigate(['/edit-user-info']);
  }

  getTeam() {
    this.genericUserService.searchUser('', '', 'team')
      .subscribe(teams => this.teams = teams);
  }

  createPlayer() {

  }

}
