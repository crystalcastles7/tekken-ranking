import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setPlayersList } from '../actions/players';
import { setMatchesList } from '../actions/matches';
import { setAccount } from '../actions/account';
import { setCharactersList } from '../actions/characters';
import { Link } from 'react-router-dom';

function Header() {

  const account = useSelector((state) => state.account);

  useEffect(() => {
    let authToken = localStorage.getItem("authToken")
    if (authToken) {
      const fetchUrl = `${process.env.REACT_APP_API_URL}/is-account-token`
      fetch(fetchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ authToken })
      })
        .then(response => response.json())
        .then(data => {
          if (data.account) {
            dispatch(setAccount(data.account));
          } else {
            // alert("Logged out because of outdated auth token.")
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [])

  
  const toggleLogin = () => {

    if (account.isAdmin) {
      localStorage.removeItem("authToken");
      window.location.reload();
      return false
    }

    let account_name = prompt("Username: ")
    let account_pass = prompt("Password: ")

    if (account_name.trim() === "" || account_pass.trim() === "") return false

    const fetchUrl = `${process.env.REACT_APP_API_URL}/is-account`
    fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ account_name, account_pass })
    })
      .then(response => response.json())
      .then(data => {
        if (data.exists === true) {
          dispatch(setAccount(data.account));
          localStorage.setItem("authToken", data.authToken)
          alert("Success! ")
        } else {
          alert("No")
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }

  const fetchAndSetPlayers = async () => {

    const fetchUrl = `${process.env.REACT_APP_API_URL}/get-all-players`
    fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data) dispatch(setPlayersList(data));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const fetchAndSetMatches = async () => {
    const fetchUrl = `${process.env.REACT_APP_API_URL}/get-all-matches`
    fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data) dispatch(setMatchesList(data));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const dispatch = useDispatch();

  useEffect(() => {

    fetchAndSetPlayers();
    fetchAndSetMatches();

    let charactersList = [
      {
        character_name: "Akuma",
        char_id: 1,
      },
      {
        character_name: "Alisa",
        char_id: 2,
      },
      {
        character_name: "Anna",
        char_id: 3,
      },
      {
        character_name: "Armor King",
        char_id: 4,
      },
      {
        character_name: "Asuka",
        char_id: 5,
      },
      {
        character_name: "Bob",
        char_id: 6,
      },
      {
        character_name: "Bryan",
        char_id: 7,
      },
      {
        character_name: "Claudio",
        char_id: 8,
      },
      {
        character_name: "Devil Jin",
        char_id: 9,
      },
      {
        character_name: "Dragunov",
        char_id: 10,
      },
      {
        character_name: "Eddy",
        char_id: 11,
      },
      {
        character_name: "Eliza",
        char_id: 12,
      },
      {
        character_name: "Fahkumram",
        char_id: 13,
      },
      {
        character_name: "Feng",
        char_id: 14,
      },
      {
        character_name: "Ganryu",
        char_id: 15,
      },
      {
        character_name: "Geese",
        char_id: 16,
      },
      {
        character_name: "Gigas",
        char_id: 17,
      },
      {
        character_name: "Heihachi",
        char_id: 18,
      },
      {
        character_name: "Hwoarang",
        char_id: 19,
      },
      {
        character_name: "Jack-7",
        char_id: 20,
      },
      {
        character_name: "Jin",
        char_id: 21,
      },
      {
        character_name: "Josie",
        char_id: 22,
      },
      {
        character_name: "Julia",
        char_id: 23,
      },
      {
        character_name: "Katarina",
        char_id: 24,
      },
      {
        character_name: "Kazumi",
        char_id: 25,
      },
      {
        character_name: "Kazuya",
        char_id: 26,
      },
      {
        character_name: "King",
        char_id: 27,
      },
      {
        character_name: "Kuma",
        char_id: 28,
      },
      {
        character_name: "Lars",
        char_id: 29,
      },
      {
        character_name: "Law",
        char_id: 30,
      },
      {
        character_name: "Lee",
        char_id: 31,
      },
      {
        character_name: "Lei",
        char_id: 32,
      },
      {
        character_name: "Leo",
        char_id: 33,
      },
      {
        character_name: "Leroy",
        char_id: 34,
      },
      {
        character_name: "Lidia",
        char_id: 35,
      },
      {
        character_name: "Lili",
        char_id: 36,
      },
      {
        character_name: "Lucky Chloe",
        char_id: 37,
      },
      {
        character_name: "Marduk",
        char_id: 38,
      },
      {
        character_name: "Master Raven",
        char_id: 39,
      },
      {
        character_name: "Miguel",
        char_id: 40,
      },
      {
        character_name: "Negan",
        char_id: 41,
      },
      {
        character_name: "Nina",
        char_id: 42,
      },
      {
        character_name: "Noctis",
        char_id: 43,
      },
      {
        character_name: "Panda",
        char_id: 44,
      },
      {
        character_name: "Paul",
        char_id: 45,
      },
      {
        character_name: "Shaheen",
        char_id: 46,
      },
      {
        character_name: "Steve",
        char_id: 47,
      },
      {
        character_name: "Xiaoyu",
        char_id: 48,
      },
      {
        character_name: "Yoshimitsu",
        char_id: 49,
      },
      {
        character_name: "Zafina",
        char_id: 50,
      },
      {
        character_name: "Kunimitsu",
        char_id: 51,
      }
    ]

    dispatch(setCharactersList(charactersList));

  }, [])



  return (
    <header>
      <ul>
        <li>
          <Link to={"/"}>LEADERBOARD</Link>
        </li>
        <li>
          <Link to={"/calendar"}>CALENDAR</Link>
        </li>
        <li>
          <a onClick={toggleLogin} style={{ cursor: "pointer" }}>
            {account.account && account.account.isAdmin === true && <span>LOGOUT</span>}
            {(!account || !account.account || (account.account && account.account.isAdmin !== true)) && <span>LOGIN</span>}
          </a>
        </li>


      </ul>
      {account.account && account.account.betPoints &&
        <div className='bet-points-container'>Bet points: <span>{account.account.betPoints}</span></div>
      }
    </header>
  );
}

export default Header;
