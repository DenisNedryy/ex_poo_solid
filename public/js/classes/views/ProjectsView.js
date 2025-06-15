export class ProjectsView {

    render() {
        const el = document.getElementById("root");
        if (el) {
            el.innerHTML = `
            <div class="projects">
                <div class="projects__header bg_head">
                    <h2>Projects</h2>
                </div>
                <div class="projects__content bg_main"> 
                <p>Page des projects</p>
                </div>
            </div>
            `;
        }
    }
} 