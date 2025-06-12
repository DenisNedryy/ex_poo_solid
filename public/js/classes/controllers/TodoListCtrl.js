export class TodoListCtrl {

    constructor(view) {
        this.view = view;
    }

    show() {
        this.view.render();
    }
}