const editJsonFile = require("edit-json-file");
function addQuestiontoJSON() {
    // If the file doesn't exist, the content will be an empty object by default.
let file = editJsonFile(`${__dirname}/question.json`);

// Set a couple of fields
file.set("question", "question");

// Output the content
console.log(file.get());
// { planet: 'Earth',
//   city.name: 'anytown',
//   name: { first: 'Johnny', last: 'B.' },
//   is_student: false }

// Save the data to the disk
file.save();

// Reload it from the disk
file = editJsonFile(`${__dirname}/questions.json`, {
    autosave: true
});

// Get one field
console.log(file.get("question.question"));
// => Johnny

// This will save it to disk
file.set("question.question", {
    question: "collected.first().content"
});

// Output the whole thing
console.log(file.toObject());
// { planet: 'Earth',
//   name: { first: 'Johnny', last: 'B.' },
//   is_student: false,
//   a: { new: { field: [Object] } } }
}