# Async Tic Tac Toe API

This api is part of Async Tic tac toe with MERN stack.

## How to use

- run `git clone ...`
- run `npm start`

Note: Make sure you have nodemon installed in your system otherwise you can install as dev dependencies in the project

## API Resources

### User API resources

All the user API router follows `/user/`

| #   | Routers       | verbs | Progress | Is Private | Description                               |
| --- | ------------- | ----- | -------- | ---------- | ----------------------------------------- |
| 2   | `/user`       | POST  | DONE     | No         | Create a user                             |
| 3   | `/user/login` | POST  | DONE     | No         | Verify user Authentication and return JWT |

### Game API resources

All the game API router follows `/game/`

| #   | Routers                 | verbs  | Progress | Is Private | Description                                        |
| --- | ----------------------- | ------ | -------- | ---------- | -------------------------------------------------- |
| 1   | `/game/`                | GET    | DONE     | Yes        | Get all games played by the user                   |
| 2   | `/game/{gameId}`        | GET    | DONE     | Yes        | Get a game details                                 |
| 3   | `/game`                 | POST   | DONE     | Yes        | Create a new game                                  |
| 4   | `/game/{id}`            | PUT    | DONE     | Yes        | Update game details ie. when a player makes a move |
| 5   | `/game/close_game/{id}` | PUT    | NOT DONE | Yes        | Update game status to close game                   |
| 6   | `/game/{id}`            | DELETE | NOT DONE | Yes        | Delete a game                                      |
