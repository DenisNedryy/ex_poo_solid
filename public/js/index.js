import { TodoListCtrl } from "./classes/controllers/TodoListCtrl.js";

import { TodoListView } from "./classes/views/TodoListView.js";


const todoListView = new TodoListView();

const todoListCtrl = new TodoListCtrl(todoListView);