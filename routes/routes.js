const router = require("express").Router();
const Todo = require("../models/todo");

// GET Request
router.get("/", (req, res) => {
    Todo.find({}).then((wholeToDo) => {

        let toDo = wholeToDo.filter(singleTodo => {
            return !singleTodo.done;
        });

        let completedToDO = wholeToDo.filter(singleTodo => {
            return singleTodo.done;
        });

        res.render("index", { todoData: toDo, completedTodoData: completedToDO });
    });
});

// POST Request
router.post("/todos", (req, res) => {
    let newTodo = new Todo({ desc: req.body.desc });

    newTodo.save()
        .then((result) => {
            console.log(result);
            res.redirect("/");
        }).catch((error) => {
            console.log(error);
            res.redirect("/");
        });
});

router.post("/todos/:id/completed", (req, res) => {
    let todoId = req.params.id;
    Todo.findById(todoId)
        .exec()
        .then(result => {
            result.done = !result.done;
            return result.save();
        }).then(result => {
            res.redirect("/");
        });
});

router.post("/todos/:id/deleted", (req, res) => {
    let todoId = req.params.id;
    Todo.findByIdAndDelete(todoId)
        .exec()
        .then(result => {
            res.redirect("/");
        });
});

module.exports = router;