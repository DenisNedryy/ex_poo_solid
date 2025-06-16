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
        
                   <div class="tasks__content__console">
                      <form>
                          <label>Ajouter une tâche</label>
                          <div>
                             <input type="text" name="task" placeholder="nouvelle tâche"/>
                             <button class="btn-add">Ajouter</button>
                          </div>
                     
                      </form>
                      <div class="tasks__content__console__tasks">
                            <div class="tasks__content__console__tasks--task">
                                 <p>Acheter du lait</p>
                                 <i class="fa-solid fa-circle-xmark"></i>
                            </div> 
                            <div class="tasks__content__console__tasks--task">
                                <p>Acheter du lait</p>
                                <i class="fa-solid fa-circle-xmark"></i>
                           </div> 
                          <div class="tasks__content__console__tasks--task">
                            <p>Acheter du lait</p>
                            <i class="fa-solid fa-circle-xmark"></i>
                          </div> 
                      </div>
                   </div>
                </div>
            </div>
            `;
        }
    }
} 