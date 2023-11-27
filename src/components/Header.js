import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setPlayersList } from '../actions/players';
import { setMatchesList } from '../actions/matches';
import { setCharactersList } from '../actions/characters';
import { Link } from 'react-router-dom';
function Header() {

  const dispatch = useDispatch();

  useEffect(() => {

    const playersList = [
      { name: "RavenHaze", win: 0, lose: 0, mainCharacterId: 46, rank: "Tekken God Omega", class: "S+", lastPlayed: "-" },
      { name: "Big Boss", win: 0, lose: 0, mainCharacterId: 21, rank: "Tekken God Omega", class: "S+", lastPlayed: "-" },
      { name: "crystalcastlesss", win: 1, lose: 0, mainCharacterId: 42, rank: "Tekken God", class: "S", lastPlayed: "26 Kasim 2023" },
      { name: "Eternal", win: 0, lose: 0, mainCharacterId: 18, rank: "Tekken God Omega", class: "S", lastPlayed: "-" },
      { name: "Kicking Machine", win: 0, lose: 0, mainCharacterId: 19, rank: "Tekken God", class: "S", lastPlayed: "-" },
      { name: "ilayakreb", win: 0, lose: 0, mainCharacterId: 31, rank: "Tekken God", class: "S", lastPlayed: "-" },
      { name: "Naustrazer", win: 0, lose: 0, mainCharacterId: 8, rank: "Tekken God", class: "A", lastPlayed: "-" },
      { name: "Emrah-Kjl", win: 0, lose: 0, mainCharacterId: 26, rank: "Tekken God", class: "A", lastPlayed: "-" },
      { name: "LahmacunKappa", win: 0, lose: 0, mainCharacterId: 47, rank: "Yaksa", class: "A", lastPlayed: "-" },
      { name: "Dalzker", win: 1, lose: 0, mainCharacterId: 21, rank: "Tekken King", class: "A", lastPlayed: "26 Kasim 2023" },
      { name: "MishimaBay", win: 0, lose: 0, mainCharacterId: 26, rank: "Emperor", class: "A", lastPlayed: "-" },
      { name: "Egecan", win: 0, lose: 0, mainCharacterId: 25, rank: "Emperor", class: "A", lastPlayed: "-" },
      { name: "TheRevivalWisdom", win: 0, lose: 0, mainCharacterId: 50, rank: "Emperor", class: "A", lastPlayed: "-" },
      { name: "UTQ", win: 0, lose: 0, mainCharacterId: 36, rank: "Tekken God", class: "B", lastPlayed: "-" },
      { name: "King Kao", win: 0, lose: 0, mainCharacterId: 21, rank: "Tekken God", class: "B", lastPlayed: "-" },
      { name: "KaTkOoT", win: 0, lose: 0, mainCharacterId: 26, rank: "Tekken God", class: "B", lastPlayed: "-" },
      { name: "musicianofall", win: 0, lose: 0, mainCharacterId: 19, rank: "Tekken God", class: "B", lastPlayed: "-" },
      { name: "Baris", win: 0, lose: 0, mainCharacterId: 7, rank: "Tekken God", class: "B", lastPlayed: "-" },
      { name: "HasanPamuk", win: 0, lose: 0, mainCharacterId: 32, rank: "Tekken God", class: "B", lastPlayed: "-" },
      { name: "Turkishxiayou", win: 0, lose: 0, mainCharacterId: 48, rank: "Tekken God", class: "B", lastPlayed: "-" },
      { name: "Unsweetdream", win: 0, lose: 1, mainCharacterId: 11, rank: "Tekken God", class: "B", lastPlayed: "26 Kasim 2023" },
      { name: "Flark", win: 0, lose: 0, mainCharacterId: 47, rank: "Tekken God", class: "B", lastPlayed: "-" },
      { name: "Aeolo", win: 0, lose: 0, mainCharacterId: 48, rank: "Tekken God", class: "B", lastPlayed: "-" },
      { name: "Züzü", win: 0, lose: 0, mainCharacterId: 47, rank: "Tekken God", class: "B", lastPlayed: "-" },
      { name: "Morde93", win: 0, lose: 0, mainCharacterId: 41, rank: "Tekken God", class: "B", lastPlayed: "-" },
      { name: "ChaosWarrior", win: 0, lose: 1, mainCharacterId: 5, rank: "Tekken God", class: "B", lastPlayed: "26 Kasim 2023" },
      { name: "LixeraMe", win: 0, lose: 0, mainCharacterId: 27, rank: "Tekken God", class: "B", lastPlayed: "-" },
      { name: "Neoratt", win: 0, lose: 0, mainCharacterId: 27, rank: "Tekken God", class: "B", lastPlayed: "-" },
      { name: "ByTury", win: 0, lose: 0, mainCharacterId: 7, rank: "Tekken God", class: "B", lastPlayed: "-" },
      { name: "dodekaman", win: 0, lose: 0, mainCharacterId: 51, rank: "Tekken God", class: "B", lastPlayed: "-" },
      { name: "homicidal ocean panda", win: 0, lose: 0, mainCharacterId: 4, rank: "Tekken God", class: "B", lastPlayed: "-" },
      { name: "volkan_yildiz_tr", win: 0, lose: 0, mainCharacterId: 42, rank: "Tekken God", class: "B", lastPlayed: "-" },
      { name: "stremagod", win: 0, lose: 0, mainCharacterId: 34, rank: "Tekken God", class: "B", lastPlayed: "-" },
      { name: "NoPain_TR", win: 0, lose: 0, mainCharacterId: 45, rank: "Tekken God", class: "B", lastPlayed: "-" },
      { name: "Züzü", win: 0, lose: 0, mainCharacterId: 47, rank: "Tekken God", class: "B", lastPlayed: "-" },
      { name: "Qwerly", win: 0, lose: 0, mainCharacterId: 27, rank: "Tekken God", class: "B", lastPlayed: "-" },
      { name: "Ersin_1910", win: 0, lose: 0, mainCharacterId: 27, rank: "Tekken God", class: "B", lastPlayed: "-" },
      { name: "Astroth_tr", win: 0, lose: 0, mainCharacterId: 18, rank: "Tekken God", class: "B", lastPlayed: "-" },
      { name: "İzzetju", win: 0, lose: 0, mainCharacterId: 7, rank: "Tekken God", class: "B", lastPlayed: "-" },
      { name: "Göksal", win: 0, lose: 0, mainCharacterId: 3, rank: "Tekken God", class: "B", lastPlayed: "-" },
      { name: "Falcon", win: 0, lose: 0, mainCharacterId: 29, rank: "Tekken God", class: "B", lastPlayed: "-" },
      { name: "ViruSick", win: 0, lose: 0, mainCharacterId: 27, rank: "Tekken God", class: "B", lastPlayed: "-" },
      { name: "Breaky", win: 0, lose: 0, mainCharacterId: 4, rank: "Tekken God", class: "B", lastPlayed: "-" },
      { name: "A06Z", win: 0, lose: 0, mainCharacterId: 34, rank: "Tekken God", class: "C", lastPlayed: "-" },
      { name: "OkumuşPaul", win: 0, lose: 0, mainCharacterId: 45, rank: "Tekken God", class: "C", lastPlayed: "-" },
      { name: "Atunn", win: 0, lose: 0, mainCharacterId: 18, rank: "Tekken God", class: "C", lastPlayed: "-" },
      { name: "YasOnline", win: 0, lose: 0, mainCharacterId: 5, rank: "Tekken God", class: "C", lastPlayed: "-" },
      { name: "ByAbu", win: 0, lose: 0, mainCharacterId: 9, rank: "Tekken God", class: "C", lastPlayed: "-" },
      { name: "By_Gofrettin", win: 0, lose: 0, mainCharacterId: 29, rank: "Tekken God", class: "C", lastPlayed: "-" },
      { name: "Xenacial", win: 0, lose: 0, mainCharacterId: 14, rank: "Tekken God", class: "C", lastPlayed: "-" },
      { name: "Alecia", win: 0, lose: 0, mainCharacterId: 9, rank: "Tekken God", class: "C", lastPlayed: "-" },
      { name: "MetinHwo", win: 0, lose: 0, mainCharacterId: 19, rank: "Tekken God", class: "C", lastPlayed: "-" },
      { name: "Yachiru662", win: 0, lose: 0, mainCharacterId: 29, rank: "Tekken God", class: "C", lastPlayed: "-" },
      { name: "Mokujin", win: 0, lose: 0, mainCharacterId: 1, rank: "Tekken God", class: "C", lastPlayed: "-" },
      { name: "Prometisycl", win: 0, lose: 0, mainCharacterId: 21, rank: "Tekken God", class: "C", lastPlayed: "-" },
      { name: "TariKazama", win: 0, lose: 0, mainCharacterId: 48, rank: "Tekken God", class: "C", lastPlayed: "-" },
      { name: "SoulActive", win: 0, lose: 0, mainCharacterId: 18, rank: "Tekken God", class: "C", lastPlayed: "-" },
      { name: "Burak_can", win: 0, lose: 0, mainCharacterId: 29, rank: "Tekken God", class: "C", lastPlayed: "-" },
      { name: "CENK_Games", win: 0, lose: 0, mainCharacterId: 45, rank: "Tekken God", class: "C", lastPlayed: "-" },
      { name: "LoCo54", win: 0, lose: 0, mainCharacterId: 38, rank: "Tekken God", class: "C", lastPlayed: "-" },
      { name: "Killerfrostmehmet", win: 0, lose: 0, mainCharacterId: 36, rank: "Tekken God", class: "C", lastPlayed: "-" },
      { name: "Hopdediks", win: 0, lose: 0, mainCharacterId: 17, rank: "Tekken God", class: "C", lastPlayed: "-" }
    ];

    dispatch(setPlayersList(playersList));

    /* matches */
    const matchesList = [
      {
        playerName1: "crystalcastlesss",
        playerName2: "Unsweetdream",
        date: "26.11.2023",
        hour: "17:30",
        flag1: "https://cdn.countryflags.com/thumbs/germany/flag-400.png",
        flag2: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAFVBMVEX///8AI5XtKTkAGJJfcLfzdH3tHzGd6CeVAAAA/klEQVR4nO3QSQ0AIAADs",
        characterId1: 42,
        characterId2: 11,
        score1: 10,
        score2: 7,
        youtube_id: "cgckFGVv194"
      },
      {
        playerName1: "Dalzker",
        playerName2: "ChaosWarrior",
        date: "26.11.2023",
        hour: "18:30",
        flag1: "https://cdn.countryflags.com/thumbs/germany/flag-400.png",
        flag2: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAFVBMVEX///8AI5XtKTkAGJJfcLfzdH3tHzGd6CeVAAAA/klEQVR4nO3QSQ0AIAADs",
        characterId1: 21,
        characterId2: 5,
        score1: 10,
        score2: 2,
        youtube_id: "lqOuJOa26RE"
      },
      {
        playerName1: "UTQ",
        playerName2: "MishimAbay",
        date: "27.11.2023",
        hour: "19.45",
        flag1: "https://cdn.countryflags.com/thumbs/germany/flag-400.png",
        flag2: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAFVBMVEX///8AI5XtKTkAGJJfcLfzdH3tHzGd6CeVAAAA/klEQVR4nO3QSQ0AIAADs",
        characterId1: 36,
        characterId2: 26,
        score1: 7,
        score2: 10
      },
      {
        playerName1: "Okumus",
        playerName2: "ByTury",
        date: "TBA",
        hour: "????",
        flag1: "https://cdn.countryflags.com/thumbs/germany/flag-400.png",
        flag2: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAFVBMVEX///8AI5XtKTkAGJJfcLfzdH3tHzGd6CeVAAAA/klEQVR4nO3QSQ0AIAADs",
        characterId1: 45,
        characterId2: 7
      },
    ]

    dispatch(setMatchesList(matchesList.reverse()));

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
      </ul>
    </header>
  );
}

export default Header;
