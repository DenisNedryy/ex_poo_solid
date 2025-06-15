export class EventsView {

    render() {
        const el = document.getElementById("root");
        if (el) {
            el.innerHTML = `
            <div class="events">
                <div class="events__header bg_head">
                    <h2>Events</h2>
                </div>
                <div class="events__content bg_main"> 
                <p>Page des events</p>
                   
                </div>
            </div>
            `;
        } 
    }
} 