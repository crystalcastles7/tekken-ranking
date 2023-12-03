import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Calendar(props) {

    const [newSetData, setNewSetData] = useState({
        player_1_id: null,
        player_2_id: null,
        dateNonModified: null, // date, wont be used 
        date: null, // date, integer 
        hour: null, // saat, just string.
        player_1_character_id: null, // integer 
        player_2_character_id: null, // integer 
        score1: null, // integer, optional
        score2: null, // integer, optional
        youtube_id: null // string, optional
    });

    const matches = useSelector((state) => state.matches);
    const players = useSelector((state) => state.players);
    const characters = useSelector((state) => state.characters);
    const account = useSelector((state) => state.account);
    const [isFormActive, setIsFormActive] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [timeOptions, setTimeOptions] = useState([]);
    const [allAvailableBets, setAllAvailableBets] = useState([]);


    const determineBetOdd = (probability) => {

        /*
        if (probability > 96) probability = 96
        else if (probability < 4) probability = 4
        */

        probability /= 100
        // const houseMargin = -0.09;
        const houseMargin = 0
        let odds = 1 / probability + houseMargin;

        /* tmp start */
        let diff = odds - 1
        let margin = diff * 0.09
        odds -= margin
        /* tmp end */

        const roundedOdds = Math.round(odds * 100) / 100;

        if (roundedOdds < 1.01) return 1.01
        return roundedOdds;
    };

    const getCat2Odd = (initialOdd, neededHandicap) => {

        let difficulty
        if (neededHandicap === 7) difficulty = 2.15
        else if (neededHandicap === 6) difficulty = 1.65
        else if (neededHandicap === 5) difficulty = 1.3

        return initialOdd / difficulty

    }

    const getCat5Odd = (powerDifference, neededMatchCount) => {

        let difficulty
        if (neededMatchCount === 9) difficulty = 0.38
        else if (neededMatchCount === 8) difficulty = 0.60
        else if (neededMatchCount === 7) difficulty = 0.72
        else if (neededMatchCount === 6) difficulty = 0.79
        else if (neededMatchCount === 5) difficulty = 1

        if (powerDifference < 5) {
            return 82 * difficulty
        } else if (powerDifference < 10) {
            return 79 * difficulty
        } else if (powerDifference < 15) {
            return 76 * difficulty
        } else if (powerDifference < 20) {
            return 73 * difficulty
        } else if (powerDifference < 25) {
            return 70 * difficulty
        } else if (powerDifference < 30) {
            return 67 * difficulty
        } else if (powerDifference < 35) {
            return 64 * difficulty
        } else if (powerDifference < 40) {
            return 61 * difficulty
        } else if (powerDifference < 45) {
            return 59 * difficulty
        } else if (powerDifference < 50) {
            return 56 * difficulty
        } else if (powerDifference < 60) {
            return 53 * difficulty
        } else if (powerDifference < 70) {
            return 50 * difficulty
        } else if (powerDifference < 100) {
            return 35 * difficulty
        }
    }

    const getBetOdd = (betCategoryId, player_1_win_probability, player_2_win_probability, betOptionIndex) => {
        if (!player_1_win_probability || !player_2_win_probability) return "-"
        // different odds for different categories
        if (betCategoryId === "1") { // BET : WHO WINS
            if (betOptionIndex === 0) { // first player wins
                return determineBetOdd(player_1_win_probability).toFixed(2)
            } else if (betOptionIndex === 1) { // set bitmez
                return "10.00"
            } else if (betOptionIndex === 2) { // second player wins
                return determineBetOdd(player_2_win_probability).toFixed(2)
            }
        }

        else if (["2", "9", "10"].includes(betCategoryId)) { // BET : Ilk oyuncu X farkla kazanir

            let chosenHandicap
            if (betCategoryId === "2") chosenHandicap = 5
            else if (betCategoryId === "9") chosenHandicap = 6
            else if (betCategoryId === "10") chosenHandicap = 7

            const cat2Odd = getCat2Odd(player_1_win_probability, chosenHandicap)
            player_1_win_probability = cat2Odd

            if (betOptionIndex === 0) { // agree
                return determineBetOdd(player_1_win_probability).toFixed(2)
            } else if (betOptionIndex === 1) { // not agree
                return determineBetOdd(100 - player_1_win_probability).toFixed(2)
            }
        }

        else if (["3", "11", "12"].includes(betCategoryId)) { // BET : Ikinci oyuncu X farkla kazanir

            let chosenHandicap
            if (betCategoryId === "3") chosenHandicap = 5
            else if (betCategoryId === "11") chosenHandicap = 6
            else if (betCategoryId === "12") chosenHandicap = 7

            const cat2Odd = getCat2Odd(player_2_win_probability, chosenHandicap)
            player_2_win_probability = cat2Odd

            if (betOptionIndex === 0) { // agree
                return determineBetOdd(player_2_win_probability).toFixed(2)
            } else if (betOptionIndex === 1) { // not agree
                return determineBetOdd(100 - player_2_win_probability).toFixed(2)
            }
        }

        else if (["4", "5", "6", "7", "8"].includes(betCategoryId)) { // BET : Iki oyuncu da min. X mac alir
            let probabilityDifference = Math.abs(player_1_win_probability - player_2_win_probability);
            let chosenDifference
            if (betCategoryId === "4") chosenDifference = 5
            else if (betCategoryId === "5") chosenDifference = 6
            else if (betCategoryId === "6") chosenDifference = 7
            else if (betCategoryId === "7") chosenDifference = 8
            else if (betCategoryId === "8") chosenDifference = 9
            const cat5Odd = getCat5Odd(probabilityDifference, chosenDifference)
            if (betOptionIndex === 0) { // agree
                return determineBetOdd(cat5Odd).toFixed(2)
            } else if (betOptionIndex === 1) { // not agree
                return determineBetOdd(100 - cat5Odd).toFixed(2)
            }
        }

    }

    useEffect(() => {
        generateTimeOptions()

        /* bet related */

        let tmpBets = [
            {
                betCategoryId: "1",
                betText: "Kim kazanir?",
                betOptions: ["Ilk oyuncu", "Set bitmez", "Ikinci oyuncu"]
            },
            {
                betCategoryId: "2",
                betText: "Ilk oyuncu, en az 5 fark ile kazanir",
                betOptions: ["Evet", "Hayir"]
            },
            {
                betCategoryId: "9",
                betText: "Ilk oyuncu, en az 6 fark ile kazanir",
                betOptions: ["Evet", "Hayir"]
            },
            {
                betCategoryId: "10",
                betText: "Ilk oyuncu, en az 7 fark ile kazanir",
                betOptions: ["Evet", "Hayir"]
            },
            {
                betCategoryId: "3",
                betText: "Ikinci oyuncu, en az 5 fark ile kazanir",
                betOptions: ["Evet", "Hayir"]
            },
            {
                betCategoryId: "11",
                betText: "Ikinci oyuncu, en az 6 fark ile kazanir",
                betOptions: ["Evet", "Hayir"]
            },
            {
                betCategoryId: "12",
                betText: "Ikinci oyuncu, en az 7 fark ile kazanir",
                betOptions: ["Evet", "Hayir"]
            },
            {
                betCategoryId: "4",
                betText: "Iki oyuncu da en az 5 mac alir",
                betOptions: ["Evet", "Hayir"]
            },
            {
                betCategoryId: "5",
                betText: "Iki oyuncu da en az 6 mac alir",
                betOptions: ["Evet", "Hayir"]
            },
            {
                betCategoryId: "6",
                betText: "Iki oyuncu da en az 7 mac alir",
                betOptions: ["Evet", "Hayir"]
            },
            {
                betCategoryId: "7",
                betText: "Iki oyuncu da en az 8 mac alir",
                betOptions: ["Evet", "Hayir"]
            },
            {
                betCategoryId: "8",
                betText: "Iki oyuncu da en az 9 mac alir",
                betOptions: ["Evet", "Hayir"]
            }
        ]

        setAllAvailableBets(tmpBets)

    }, [])


    const addNewBet = async (currentBet) => {

        if (!account.account) {
            alert("You must be logged in to use this feature.")
            return false
        }

        const fetchUrl = `${process.env.REACT_APP_API_URL}/add-bet`
        fetch(fetchUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ betObject: currentBet, accountId: account.account._id })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                alert("Bet is added!")
                // console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    const setCurrentBetMain = (matchId, betCategoryId, betOptionIndex, pickedOdd) => {
        const currentBetObject = {
            accountId: account._id,
            matchId,
            betCategoryId,
            betOptionIndex,
            amount: 100,
            status: "waiting",
            pickedOdd
        }

        let answer = window.confirm("Confirm bet? ")
        if (answer) {
            // Saving the bet...
            addNewBet(currentBetObject)

        } else {

        }

    }

    const handleInputChange = (event) => {

        let { name, value } = event.target;
        // name: prop name (player_1_id etc.)
        // value: of the prop (s9aj38sh4kas35fg etc)

        let dateValue = undefined
        if (name === "dateNonModified") { // converting to integer if date
            dateValue = value ? new Date(value).getTime() : '';
        }

        if (name === "player_1_character_id" || name === "player_2_character_id") {
            value = parseInt(value)
        }

        if ((name === "score1" && value !== "") || (name === "score2" && value !== "")) {
            value = parseInt(value)
        }

        setNewSetData((prevData) => ({
            ...prevData,
            [name]: value,
            ...(dateValue && { date: dateValue })
        }));
    };

    const addNewSet = async (event) => {

        event.preventDefault();

        let validForm = true
        let missingProp = ""
        const entries = Object.entries(newSetData);
        for (let i = 0; i < entries.length; i++) {
            const [prop, value] = entries[i];
            if (!value && !["score1", "score2", "youtube_id"].includes(prop)) {
                missingProp = prop
                validForm = false;
                break;
            }
        }

        if (!validForm) {
            alert("Please fill all the required fields. Missing: " + missingProp)
            return false
        }

        const fetchUrl = `${process.env.REACT_APP_API_URL}/add-set`
        fetch(fetchUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ setObject: newSetData })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                alert("Set is added!")
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const toggleActiveClass = (elementId) => {

        const element = document.getElementById(elementId);

        if (element) {
            // Check if the element has the class
            if (element.classList.contains('active')) {
                // If it has the class, remove it
                element.classList.remove('active');
            } else {
                // If it doesn't have the class, add it
                element.classList.add('active');
            }
        }
    }

    const filterCalendar = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
    }

    const loadGame = (index) => {
        toggleActiveClass("match-id--" + index);
    }

    const loadBets = (index) => {
        toggleActiveClass("bet-match-id--" + index);
    }

    const generateTimeOptions = () => {
        const timeOptions = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
                const formattedHour = hour.toString().padStart(2, '0');
                const formattedMinute = minute.toString().padStart(2, '0');
                const timeValue = `${formattedHour}:${formattedMinute}`;
                timeOptions.push(timeValue);
            }
        }
        setTimeOptions(timeOptions)
    };

    const formatUnixTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    }

    const getYouTubeVideoId = (url) => {
        try {
            var youtubeUrl = new URL(url);
            var videoId = youtubeUrl.searchParams.get('v');
            return videoId || null;
        } catch (error) {
            console.error("Error parsing URL:", error);
            return null;
        }
    }

    const updateSetProp = async (setId, newPropName, newPropValue) => {

        const fetchUrl = `${process.env.REACT_APP_API_URL}/update-set`
        fetch(fetchUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ setId, newPropName, newPropValue })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                alert("Set is updated!")
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const handleSetUpdateChange = (event, setId) => {
        const { value } = event.target;
        if (!value) return false
        let data
        if (value !== "youtube_id") data = prompt("Enter the new value for: " + value)
        else data = prompt("Enter the youtube video link")
        if (!data) return false
        if (value === "youtube_id") {
            data = getYouTubeVideoId(data)
            if (!data) return false
        }
        updateSetProp(setId, value, data)
    }

    return (

        <div>
            <div className='query-calendar-container'>
                <input type="text" onChange={filterCalendar} id="query-calendar" placeholder="Search a set..." />
            </div>

            <div className="fixture">

                {matches && matches.matches.length > 0 && players && players.players.length > 0 && matches.matches.map((match, index) => {
                    let player_1_object = players.players.find(player => player._id === match.player_1_id)
                    let player_2_object = players.players.find(player => player._id === match.player_2_id)
                    return (

                        player_1_object && player_2_object &&

                        (player_1_object.name.toLowerCase().includes(inputValue) || player_2_object.name.toLowerCase().includes(inputValue)) &&

                        <div className='match-group-container'>

                            {account.account && account.account.isAdmin &&
                                <select
                                    id="updateSet"
                                    name="updateSet"
                                    onChange={(event) => handleSetUpdateChange(event, match._id)}
                                >
                                    <option value="">Update</option>
                                    <option value="score1">Score 1</option>
                                    <option value="score2">Score 2</option>
                                    <option value="youtube_id">Youtube link</option>
                                </select>
                            }

                            <div className="match">
                                <div className="date-container">
                                    <div className="date">{formatUnixTimestamp(match.date)}</div>
                                    <div className="hour">{match.hour}</div>
                                </div>

                                <div className="player-container p1">
                                    {/* <img src="" className="flag"></img> */}

                                    {match.score1 && <span className={`player-name ${match.score1 > match.score2 ? 'winner' : 'loser'}`} >{player_1_object.name}</span>}
                                    {!match.score1 && <span className='player-name'>{player_1_object.name}</span>}

                                    <img alt="" className="char-img" src={"../../tekken-ranking/images/characters/" + match.player_1_character_id + ".png"} />
                                </div>

                                {match.score1 != null && match.score2 != null &&
                                    <div className='vs-score-container'>
                                        <div className="score-container">
                                            <span className="score">{match.score1}</span>
                                            <span>-</span>
                                            <span className="score">{match.score2}</span>
                                        </div>
                                        <div className='watch-container'>
                                            <span onClick={() => loadGame(index)}>Watch</span>
                                        </div>
                                    </div>
                                }

                                {!match.score1 && !match.score2 &&
                                    <span className="vs" >
                                        <span onClick={() => loadBets(index)}>vs</span>
                                    </span>
                                }

                                <div className="player-container p2">
                                    <img alt="char img" className="char-img" src={"../../tekken-ranking/images/characters/" + match.player_2_character_id + ".png"} />
                                    {match.score1 && <span className={`player-name ${match.score1 > match.score2 ? 'loser' : 'winner'}`}>{player_2_object.name}</span>}
                                    {!match.score1 && <span className='player-name'>{player_2_object.name}</span>}
                                    {/* <img src="" className="flag"></img> */}
                                </div>

                            </div>
                            <div className='youtube-container' id={"match-id--" + index}>

                                <iframe
                                    src={`https://www.youtube.com/embed/${match.youtube_id}`}
                                    title="Tekken match"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>

                            </div>
                            <div className='bets-container' id={"bet-match-id--" + index}>

                                {allAvailableBets.map((bet, index) => {
                                    return (
                                        <div className='single-bet-container'>
                                            <div className='single-bet-title-container'>{bet.betText}</div>
                                            <div className='single-bet-options-container'>

                                                {bet.betOptions.map((betOption, betOptionIndex) => {
                                                    return (<div className='single-bet-option-container' onClick={() => {
                                                        setCurrentBetMain(
                                                            match._id,
                                                            bet.betCategoryId,
                                                            betOptionIndex,
                                                            parseFloat(getBetOdd(bet.betCategoryId, match.player_1_win_probability, match.player_2_win_probability, betOptionIndex)
                                                        )
                                                        )
                                                    }}>
                                                        <div className='single-bet-option-text'>{betOption}</div>
                                                        <div className='single-bet-option-value'>{
                                                            getBetOdd(bet.betCategoryId, match.player_1_win_probability, match.player_2_win_probability, betOptionIndex)
                                                        }</div>
                                                    </div>
                                                    )
                                                })}

                                            </div>
                                        </div>
                                    )
                                })
                                }

                            </div>
                        </div>
                    )
                })}
            </div>


            {account.account && account.account.isAdmin &&
                <div className='new-set-form-container'>

                    <div className='btn-container'>
                        <button onClick={() => {
                            setIsFormActive(!isFormActive)
                        }}>+ Add new set</button>
                    </div>
                    <div className={`container mt-4 form-container ${isFormActive ? 'active' : ''}`}>
                        <form onSubmit={addNewSet}>
                            <div className="mb-3">
                                <label htmlFor="player_1_id" className="form-label">Player 1:</label>
                                <select
                                    id="player_1_id"
                                    name="player_1_id"
                                    value={newSetData.player_1_id}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Player</option>
                                    {players && players.players.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1).map((player) => (
                                        <option key={player._id} value={player._id}>
                                            {player.name}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <div className="mb-3">
                                <label htmlFor="player_1_character_id" className="form-label">Player 1 Character:</label>
                                <select
                                    id="player_1_character_id"
                                    name="player_1_character_id"
                                    value={newSetData.player_1_character_id}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Character</option>
                                    {characters && characters.characters.sort((a, b) => a.character_name.toLowerCase() > b.character_name.toLowerCase() ? 1 : -1).map((character) => (
                                        <option key={character.char_id} value={character.char_id}>
                                            {character.character_name}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <div className="mb-3">
                                <label htmlFor="player_2_id" className="form-label">Player 2:</label>
                                <select
                                    id="player_2_id"
                                    name="player_2_id"
                                    value={newSetData.player_2_id}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Player</option>
                                    {players && players.players.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1).map((player) => (
                                        <option key={player._id} value={player._id}>
                                            {player.name}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <div className="mb-3">
                                <label htmlFor="player_2_character_id" className="form-label">Player 2 Character:</label>
                                <select
                                    id="player_2_character_id"
                                    name="player_2_character_id"
                                    value={newSetData.player_2_character_id}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Character</option>
                                    {characters && characters.characters.sort((a, b) => a.character_name.toLowerCase() > b.character_name.toLowerCase() ? 1 : -1).map((character) => (
                                        <option key={character.char_id} value={character.char_id}>
                                            {character.character_name}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <div className="mb-3">
                                <label htmlFor="dateNonModified">Set date:</label>
                                <input type="date" id="dateNonModified" name="dateNonModified" value={newSetData.dateNonModified} onChange={handleInputChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="hour" className="form-label">Hour:</label>
                                <select
                                    id="hour"
                                    name="hour"
                                    value={newSetData.hour}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Time</option>
                                    {timeOptions.map((hour, idx) => (
                                        <option key={idx} value={hour}>
                                            {hour}
                                        </option>
                                    ))}
                                </select>
                            </div>


                            <div className="mb-3">
                                <label htmlFor="classValue" className="form-label">First player score (optional):</label>

                                <select
                                    id="score1"
                                    name="score1"
                                    value={newSetData.score1}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Score</option>
                                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                                        <option key={value} value={value}>
                                            {value}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <div className="mb-3">
                                <label htmlFor="classValue" className="form-label">Second player score (optional):</label>

                                <select
                                    id="score2"
                                    name="score2"
                                    value={newSetData.score2}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Score</option>
                                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                                        <option key={value} value={value}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>

                </div>
            }


        </div>
    );

}


export default Calendar;
