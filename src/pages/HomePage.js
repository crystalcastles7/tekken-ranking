import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';


function HomePage(props) {

  const players = useSelector((state) => state.players);

  return (

    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Class</th>
          <th>Name</th>
          <th>Record</th>
          <th>Character</th>
          {/* <th>Rank</th> */}
          <th>Last Played</th>
        </tr>
      </thead>
      <tbody>

        {players && players.players.length > 0 && players.players.map(((player, index) => {
          return (
            <tr key={index}>
              <td>#{index+1}</td>
              <td>{player.class}</td>
              <td>{player.name}</td>
              <td>{player.win} - {player.lose}</td>
              <td className="main-char-container">
                <img className="char-img" src={"../../tekken-ranking/images/characters/" + player.mainCharacterId + ".png"} />
              </td>
              {/* <td>{player.rank}</td> */}
              <td>{player.lastPlayed}</td>
            </tr>
          )
        }))

        }
      </tbody>
    </table>

  );

}

const mapStateToProps = (state) => {
  return {
    // characters: state.characters,
    // move_results: selectMoves(state.characters, state.filters)
  }
}

export default connect(mapStateToProps)(HomePage);
