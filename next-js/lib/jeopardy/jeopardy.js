import { promises as fs } from 'fs';
import path from "path";
import { parse } from 'csv-parse/sync';



const games = []


export default async function generateGame(num_of_players){
    const game = {
        id: Date.now(),
        board: 
            [
                {
                    name: "",
                    clues : []
                }
            ]
        ,
        players: [],
        turn_index: 0
    }


    // Step 1: Read the file to find all unique categories
    const filePath = path.join(process.cwd(), '/lib/jeopardy/categories.tsv');
    const data = await fs.readFile(filePath, 'utf8');
    const records = parse(data, {
        columns: true,
        skip_empty_lines: true,
        delimiter: '\t',
        relax_quotes: true
    });


    const allCategories = [...new Set(records.map(record => record.category))];

    // Select four random categories
    let selectedCategories = [];
    for (let i = 0; i < 4 && allCategories.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * allCategories.length);
        selectedCategories.push(allCategories.splice(randomIndex, 1)[0]);
    }

    // Organize clues by category
    const categories = selectedCategories.map(categoryName => {
        const clues = records.filter(record => record.category === categoryName)
                            .map(record => ({question: record.question, answer: record.answer, clue_value: parseInt(record.clue_value, 10), clue_bonus_value: parseInt(record.daily_double_value, 10)}));
        return {name: categoryName, clues: clues}
    });

    // generate players 
    if(num_of_players <=3 && num_of_players > 0){
        const players = []
        for(let i = 0; i < num_of_players;i++){
            players.push();
        }

        game.board = categories;

        return game
    }else{
        return "Players range: 1-3"
    }
}