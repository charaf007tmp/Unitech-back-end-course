const express = require("express");
const pgp = require("pg-promise")();
const app = express();
const port = 3000;

//DataBase connection link
const db = pgp(
  "postgresql://neondb_owner:npg_vWfO7jkbw9Yh@ep-crimson-frog-ag1szc6z-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
);

app.use(express.json());

//To add student to the database 
async function AddStudent(
  Name,
  LastName,
  TelegramUsername,
  GithubUsername,
  Idea
) {
  try {
    const student = await db.one(
      "INSERT INTO students(name, last_name, telegram_username, github_username, idea) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [Name, LastName, TelegramUsername, GithubUsername, Idea]
    );
    return student;
  } catch (err) {
    throw err;
  }
}

// GET route 
app.get("/", (_, res) => {
  res.send("Hello World!");
});

// POST route
app.post("/v1/student", async (req, res) => {
  const { Name, LastName, TelegramUsername, GithubUsername, Idea } = req.body;

  // check the data type's  
    if (
    typeof Name !== "string" ||
    typeof LastName !== "string" ||
    typeof TelegramUsername !== "string" ||
    typeof GithubUsername !== "string" ||
    typeof Idea !== "string"
  ) {
    return res
      .status(400)
      .json({ error: "Invalid input. All fields must be strings and not not empty." });
  }

  try {
    const student = await AddStudent(
      Name,
      LastName,
      TelegramUsername,
      GithubUsername,
      Idea
    );
    res
      .status(201)
      .json({ message: `User created successfully`, data: student });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not create user", error: error.message });
  }
});

// Run the server 
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
