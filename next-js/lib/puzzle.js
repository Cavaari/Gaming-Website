import { generateWord } from './wordle';

// IDEA: three mini games
// 1: wordle
// 2: color wires 
// 3: switches

const puzzle_games = []

function createNewPuzzleGame(socket_session_id) {
  const { switchesAnswer, switchesHint } = generateSwithes()
  const { personaAnswer, personaHint } = wirePersona()
  const { buttonsAnswer, buttonsHint } = generateColourPoem()

  const game = {
    id: socket_session_id,
    buttons: {
      answer: buttonsAnswer,
      hint: buttonsHint,
      is_win: false
    },
    color_wires: { // make generation function
      answer: personaAnswer,
      hint: personaHint,
      is_win: false
    },
    switches: { // make generation function, code is called hint for this game
      answer: switchesAnswer,
      hint: switchesHint,
      is_win: false
    },
    timeout: false
  }
  puzzle_games.push(game)

  return game
}

function findPuzzleGame(socket_session_id) {
  // find game
  const game = puzzle_games.filter(game => game.id == socket_session_id)[0]

  if (!game) {
    return false
  }

  return game
}

function timeoutPuzzle(socket_session_id) {
  const game = puzzle_games.filter(game => game.id == socket_session_id)[0]

  if (!game) {
    return "No Such Game"
  }

  game.timeout = true
  return "Puzzle Is Timed Out"
}

function isGameTimedOut(socket_session_id) {
  const game = puzzle_games.filter(game => game.id == socket_session_id)[0]

  if (!game) {
    return "No Such Game"
  }

  return game.timeout
}

function generateSwithes() {
  const codes = [];
  const answers = [];

  // Ensure generated number divided by position is a whole number and determine if it's odd or even
  for (let i = 1; i <= 5; i++) {
    // Generate a random multiplier (1-6 for diversity) and multiply by the position
    const multiplier = Math.floor(Math.random() * 6) + 1;
    const num = i * multiplier;
    codes.push(num);

    // Check if the result (already a whole number) is odd (01) or even (10)
    const answer = num % 2 === 0 ? '10' : '01';
    answers.push(answer);
  }

  // Creating an object to match your specified output format
  const output = {};
  output[`(${codes.join(', ')})`] = `(${answers.join(', ')})`;

  const switchesAnswer = answers
  const switchesHint = codes
  return { switchesAnswer, switchesHint }
}

function generateColourPoem() {
  const scenarios = ["In the quiet before dawn, light breaks first, painting all in the calmness of peace. From the untouched canvas of purity, life springs forth, flourishing under the emerald's embrace. Only after growth takes hold does the heart's passion ignite, setting the stage for golden rays to close the day's tale.",
    "Through the verdant expanse where life's essence thrives, a trail blazes forth, marking the path of valor and sacrifice. Upon this journey, the sun's embrace offers warmth and light, guiding towards purity's end where all beginnings are clothed in silence.",
    "In the realm where daybreak and night's end meet, the first herald shines with a golden light, promising new tales and wisdom. Following, a veil of silence descends, a canvas untouched by the day's strife. Upon this stage, a heartbeat of courage pulses, a vivid reminder of the strength within. Finally, life's chorus echoes, a verdant symphony renewing the cycle of beginnings.",
    "In the heart of turmoil, where every second counts, the first spark ignites with a fiery zeal, urging action against the ticking clock. Soon, the beacon of wisdom shines, casting light on paths once hidden, guiding decisions with its golden glow. As progress is made, the verdant sign of success emerges, marking the journey's penultimate victory. At the end, tranquility prevails, the pure light of resolution illuminating the path to safety, where all is calm and clear.",
    "Amidst the canvas of challenge, the first light dawns, a golden beacon of inspiration and intellect, guiding the way forward. Following this enlightenment, growth emerges, a verdant promise of progress and renewal under the sun's nurturing gaze. In the wake of expansion, a blank slate appears, offering purity and a chance for reflection, preparing for the final act. The journey culminates in a passionate declaration, a fiery resolve that ignites the path to triumph and resolution.",
    "In the heart of the wilderness, where life's essence thrives unbound, the journey begins with nature's verdant cloak. Amidst this growth, a canvas of serenity unveils, untouched and pure, offering a moment of clarity and peace. Guided by this tranquility, the light of wisdom shines forth, a beacon of hope and insight in the unfolding path. The voyage concludes with a fiery crescendo, a burst of passion and urgency, igniting the courage to face destiny's final chapter."
  ]
  const answers = ["white, green, red, yellow", "green, red, yellow, white", "yellow, white, red, green", "red, yellow, green white", "yellow, green, white, red", "green, white, yellow red"]
  const random = Math.floor(Math.random() * scenarios.length)
  const buttonsHint = scenarios[random]
  const buttonsAnswer = answers[random]
  return {buttonsHint, buttonsAnswer}
}

function wirePersona() {
  const wireMessage = ["In the quiet before dawn, light breaks first, painting all in the calmness of peace. From the untouched canvas of purity, life springs forth, flourishing under the emerald's embrace. Only after growth takes hold does the heart's passion ignite, setting the stage for golden rays to close the day's tale",
    "Through the verdant expanse where life's essence thrives, a trail blazes forth, marking the path of valor and sacrifice. Upon this journey, the sun's embrace offers warmth and light, guiding towards purity's end where all beginnings are clothed in silence.",
    "In the realm where daybreak and night's end meet, the first herald shines with a golden light, promising new tales and wisdom. Following, a veil of silence descends, a canvas untouched by the day's strife. Upon this stage, a heartbeat of courage pulses, a vivid reminder of the strength within. Finally, life's chorus echoes, a verdant symphony renewing the cycle of beginnings.",
    "In the heart of turmoil, where every second counts, the first spark ignites with a fiery zeal, urging action against the ticking clock.Soon, the beacon of wisdom shines, casting light on paths once hidden, guiding decisions with its golden glow.As progress is made, the verdant sign of success emerges, marking the journey's penultimate victory. At the end, tranquility prevails, the pure light of resolution illuminating the path to safety, where all is calm and clear.",
  "Amidst the canvas of challenge, the first light dawns, a golden beacon of inspiration and intellect, guiding the way forward.Following this enlightenment, growth emerges, a verdant promise of progress and renewal under the sun's nurturing gaze. In the wake of expansion, a blank slate appears, offering purity and a chance for reflection, preparing for the final act.The journey culminates in a passionate declaration, a fiery resolve that ignites the path to triumph and resolution.",
  "In the heart of the wilderness, where life's essence thrives unbound, the journey begins with nature's verdant cloak. Amidst this growth, a canvas of serenity unveils, untouched and pure, offering a moment of clarity and peace. Guided by this tranquility, the light of wisdom shines forth, a beacon of hope and insight in the unfolding path. The voyage concludes with a fiery crescendo, a burst of passion and urgency, igniting the courage to face destiny's final chapter.",
  ]
  const answers = ["white, green, red, yellow", "green, red, yellow, white", "yellow, white, red, green", "red, yellow, green, white", "yellow, green, white, red", "green, white, yellow, red"]
  const random = Math.floor(Math.random() * wireMessage.length)

  const personaHint = wireMessage[random]
  const personaAnswer = answers[random]
  return { personaAnswer, personaHint}
}

// function for user input of color wordle game
function handlePuzzleUserInput(socket_session_id, game_type, input) {
  if (!input) {
    return "Input must have a message"
  }

  const game = findPuzzleGame(socket_session_id)
  if (game) {
    switch(game_type){
      case 'switch':
        if(game.switches.answer == input){
          game.switches.is_win = true
          return "Winner Wires"
        }else{
          return "Try More"
        }
      case 'wire':
        if(game.color_wires.answer == input){
          game.color_wires.is_win = true
          return "Winner Wires"
        }else{
          return "Try More"
        }
      case 'color poem':
        if(game.buttons.answer == input){
          game.buttons.is_win = true
          return "Winner Buttons"
        }else{
          return "Try More"
        }
    }
  }

  return "No Such Game!"
}



export { createNewPuzzleGame, findPuzzleGame, handlePuzzleUserInput, timeoutPuzzle, isGameTimedOut }