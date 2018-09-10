module.exports = {
    // COMPETITIONS
    ALL_COMPETITIONS: 'http://www.zerozero.pt/compet.php?continente=0&mod=1&gen=0&esc=0&stats=0&idpais=1',
    COMPETITION: 'http://www.zerozero.pt/competicao.php?id_comp={competition_id}',
    COMPETITION_EDITION: 'http://www.zerozero.pt/edition.php?team_id={edition_id}',
    COMPETITION_EDITION_MATCHES: 'http://www.zerozero.pt/edition_matches.php?team_id={edition_id}&page={page}',
    // TEAMS
    TEAM_INFO: 'http://www.zerozero.pt/equipa.php?team_id={team_id}&epoca_id={season_id}',
    TEAM_MATCHES: 'http://www.zerozero.pt/team_matches.php?team_id={team_id}&epoca_id={season_id}',
    //PLAYERS
    PLAYER_INFO: 'http://www.zerozero.pt/player.php?team_id={player_id}',
    //MATCHES
    MATCH_INFO: 'http://www.zerozero.pt/jogo.php?team_id={match_id}'
}