import { promises as fs } from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

const games = [];

async function generateGame(num_of_players) {
  const game = {
    id: Date.now(),
    categories: [],
    players: []
  };

  // Step 1: Read the file to find all unique categories
  const filePath = path.join(process.cwd(), "/lib/jeopardy/categories.tsv");
  const data = await fs.readFile(filePath, "utf8");
  const records = parse(data, {
    columns: true,
    skip_empty_lines: true,
    delimiter: "\t",
    relax_quotes: true,
  });

  const allCategories = [...new Set(records.map((record) => record.category))];

  // Select four random categories
  let selectedCategories = [];
  let i = 0;

  while (i < 4 && allCategories.length > 0) {
    const randomIndex = Math.floor(Math.random() * allCategories.length);
    const category = records.filter(
      (record) => record.category === allCategories[randomIndex]
    );
    if (category.length >= 5) {
      selectedCategories.push(allCategories.splice(randomIndex, 1)[0]);
      i++;
    }
  }

  //   for (let i = 0; i < 4 && allCategories.length > 0; i++) {
  //     const randomIndex = Math.floor(Math.random() * allCategories.length);
  //     selectedCategories.push(allCategories.splice(randomIndex, 1)[0]);
  //   }

  // Organize clues by category
  const categories = selectedCategories.map((categoryName) => {
    const seen = new Set();
    const clues = records
      .filter(
        (record) => {
          if (record.category === categoryName) {
            // while(seen.has(record.clue_value)){
            //     record.clue_value = (parseInt(record.clue_value, 10) + 100).toString();
            // }
            // seen.add(record.clue_value)
            return true
          } else {
            return false;
          }
        }
      )
      .map((record) => ({
        question: record.question.replaceAll('\\', ''),
        answer: record.answer,
        clue_value: parseInt(record.clue_value, 10),
        clue_bonus_value: parseInt(record.daily_double_value, 10),
        is_solved: false
      }))
      .sort(function (x, y) {
        if (x.clue_value < y.clue_value) {
          return -1;
        } else if (x.clue_value > y.clue_value) {
          return 1;
        } else {
          return 0;
        }
      }).slice(0, 5);

    clues.forEach((record, i) => {
      record.clue_value = (i + 1) * 100;
    })

    seen.clear()
    return { name: categoryName.replaceAll('\\', ''), clues: clues };
  });

  // generate players
  if (num_of_players <= 4 && num_of_players > 0) {
    const players = [];
    for (let i = 0; i < num_of_players; i++) {
      const player = {
        name: "player_" + (i + 1),
        score: 0,
        is_turn: false
      }

      if (i == 0) {
        player.is_turn = true
      }

      players.push(player);
    }

    game.players = players;
    game.categories = categories;

    games.push(game);

    console.log(JSON.stringify(game, null, 2));

    return game;
  } else {
    return "Players range: 1-4";
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


function gameToJSON(game) {
  return JSON.stringify({
    id: game.id,
    players: game.players.map((player) => {
      return {
        name: player.name,
        score: player.score,
        is_turn: player.is_turn
      }
    }),
    categories: game.categories.map(
      (category) => {
        const answers = category.clues.map((clue) => {
          return clue.answer
        })
        shuffleArray(answers)
        return {
          name: category.name, clues: category.clues.map(
            (clue) => {
              return {
                question: clue.question, clue_value: clue.clue_value, clue_bonus_value: clue.clue_bonus_value, is_solved: clue.is_solved
              }
            }),
          answers: answers,
        }
      })
  })
}

/* Make Move for front-end */
function makeMove(game_id, player_index, category, question, answer) {
  const found_game = games.filter((game) => game.id == game_id)[0];

  if (!found_game) {
    return "No Such Game!";
  }


  if (compareAnswer(found_game, category, question, answer)) {
    correctAnswer(found_game, player_index, category, question);
    return JSON.stringify({ msg: "Correct!", game_data: gameToJSON(found_game) });
  } else {
    wrongAnswer(found_game, player_index, category, question);
    return JSON.stringify({ msg: "Wrong!", game_data: gameToJSON(found_game) });
  }
}

/* getters for front-end */
function GetWinner(game) {
  const winner = game.players.reduce((prev, current) =>
    prev.score > current.score ? prev : current
  );
  return winner;
}

/* Player Answer Checking */
function compareAnswer(game, category, question, answer) {
  const found_category = getCategory(game, category);
  const found_question = found_category.clues.filter(
    (clue) => clue.question == question
  )[0];

  if (found_question.answer == answer) {
    found_question.is_solved = true
    return true;
  } else {
    return false;
  }
}

function correctAnswer(game, player_index, category, question) {
  const found_category = getCategory(game, category);
  const found_question = found_category.clues.filter(
    (clue) => clue.question == question
  )[0];

  game.players[player_index].score += found_question.clue_value;
}

function wrongAnswer(game, player_index, category, question) {
  const found_category = getCategory(game, category);
  const found_question = found_category.clues.filter(
    (clue) => clue.question == question
  )[0];

  game.players[player_index].score -= found_question.clue_value;
  game.players[player_index].is_turn = false;
  game.players[(player_index + 1) % 3].is_turn = true;
}

function getCategory(game, category) {
  return game.categories.filter((cat) => cat.name == category)[0];
}

export { generateGame, makeMove, gameToJSON };
