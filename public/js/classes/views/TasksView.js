export class TasksView {

    render() {
        const el = document.getElementById("root");
        if (el) {
            el.innerHTML = `
            <div class="tasks">
                <div class="tasks__header bg_head">
                    <h2>Tâches</h2>
                </div>
                <div class="tasks__content bg_main"> 
                <p>Page des tâches</p>
                   
                </div>
            </div>
            `;
        }
    }
} 