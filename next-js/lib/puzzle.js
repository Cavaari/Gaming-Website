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
  console.log(game);
  
  return game
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
  const answers = ["white, green, red, yellow", "green, red, yellow, white", "yellow, white, red, green", "red, yellow, green, white", "yellow, green, white, red", "green, white, yellow, red"]
  const random = Math.floor(Math.random() * scenarios.length)
  const buttonsHint = scenarios[random]
  const buttonsAnswer = answers[random]
  return {buttonsHint, buttonsAnswer}
}

function wirePersona() {
  const wireMessage = ["In a world where truths are masked and innocence tasked, look beyond the surface where deceit is vast. Not the envy that grows, nor the passion that flows, not the crown of the corrupt, nor the wisdom that's abrupt, nor the twilight of ambition. Seek the depth of conviction, where silence is golden but the truth is unspoken.",
  "In the garden of choices, where each voice disguises, the path to redemption seldom rises. Not the depth where secrets drown, nor the heart where truths are bound, not the regal robe worn with pride, nor the light that guides the stride, nor the fire of desire. Find the growth amidst the mire, where integrity's seed sprouts from the liar.",
  "In the tapestry of fate, where threads intertwine in hate, a single strand must liberate. Not the abyss that swallows light, nor the envy of the night, not the illusion of noble fight, nor the dawn that breaks the plight, nor the dusk that ends the quest. Seek the pulse within the chest, where the truth beats, undressed.",
  "Where power is masked and trust is tasked, through the charades where the truth is unasked. Not in the depths where silence sleeps, nor in the envy that quietly creeps. Not where the heart's rhythm dares to tread, nor in the light where clarity is spread. Nor in the final glow of the setting sun. Seek what's hidden under the guise of one, in the shadows of grandeur, the deed is done.",
  "Under the bright gaze where secrets haze, clarity and deception in the light's maze. Not where the depths hide the unseen, nor where growth covers what has been. Not in the beat of the passionate drum, nor in the cloak of the night to come. Nor where the evening's fire softly dies. Find the ray that truth never denies, in the brilliance that overshadows the lies.",
  "As the horizon blends and the day ends, in balance truth transcends. Not in the abyss where whispers float, nor in the fields where desires gloat. Not in the pulse of the veiled heart, nor where shadows and illusions start. Nor in the beacon that guides the way. Between the extremes, where the honest say, in the twilight's embrace, the truth will stay."
  ]
  const answers = ["Blue", "Green", "Red", "Purple", "Yellow", "Orange"]
  const random = Math.floor(Math.random() * wireMessage.length)

  const personaHint = wireMessage[random]
  const personaAnswer = answers[random]
  return { personaAnswer, personaHint}
}

function findPuzzleGame(socket_session_id) {
  // find game
  const found_game = puzzle_games.filter(game => game.id == socket_session_id)[0]

  if (!found_game) {
    return false
  }

  return found_game
}


// function for user input of color wordle game
function handlePuzzleUserInput(socket_session_id, game_type, input) {
  console.log(puzzle_games);

  if (!input) {
    return "Input must have a message"
  }

  const game = findPuzzleGame(socket_session_id)
  if (game) {
    switch(game_type){
      case 'switch':
        if(game.switches.answer == input){
          game.switches.is_win = true
          return "Winner Switches"
        }else{
          return "Try Again"
        }
      case 'wire':
        if(game.color_wires.answer == input){
          game.color_wires.is_win = true
          return "Winner Wires"
        }else{
          return "Try Again"
        }
      case 'color poem':
        if(game.buttons.answer == input){
          game.buttons.is_win = true
          return "Winner Buttons"
        }else{
          return "Try Again"
        }
    }
  }

  return "No Such Game!"
}



export { createNewPuzzleGame, findPuzzleGame, handlePuzzleUserInput }