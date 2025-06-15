export class CoursesView {

    render() {
        const el = document.getElementById("root");
        if (el) {
            el.innerHTML = `
            <div class="courses">
                <div class="courses__header bg_head">
                    <h2>Courses</h2>
                </div>
                <div class="courses__content bg_main">  
                <p>Page des courses</p>
                   
                </div>
            </div>
            `;
        }
    }
} 