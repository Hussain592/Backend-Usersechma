import express from "express"

const app = express.Router()

const users = [
  {
    id: 1,
    name: "hussain",
    email: "hussain@gmail.com",
  }
]


app.get("/", (req, res) => {
  res.status(200).json({
    error: false,
    data: users,
    msg: "All users fetched successfully"
  })
})


app.post("/", (req, res) => {
  const { name, email } = req.body

  if (!name || !email) {
    return res.status(400).json({
      error: true,
      data: null,
      msg: "Name and email are required"
    })
  }

  const newUser = {
    id: users.length + 1,
    name,
    email
  }

  users.push(newUser)

  res.status(201).json({
    error: false,
    data: newUser,
    msg: "User added successfully"
  })
})


app.get("/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id)

  if (!user) {
    return res.status(404).json({
      error: true,
      data: null,
      msg: "User not found"
    })
  }

  res.status(200).json({
    error: false,
    data: user,
    msg: "User fetched successfully"
  })
})

export default app
