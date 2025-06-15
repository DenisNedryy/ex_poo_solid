export class RdvsView {

    render() {
        const el = document.getElementById("root");
        if (el) {
            el.innerHTML = `
            <div class="rdvs">
                <div class="rdvs__header bg_head">
                    <h2>Rdvs</h2>
                </div>
                <div class="rdvs__content bg_main"> 
                <p>Page des rdvs</p>
                   
                </div>
            </div>
            `;
        }
    }
} 