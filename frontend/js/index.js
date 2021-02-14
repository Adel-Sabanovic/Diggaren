const API_URL = "http://localhost:8000/api";

setSelectorContent();

async function setSelectorContent() {

    const response = await fetch(`${API_URL}/all-channels`);

    const { data: channels } = await response.json();

    const selector = document.getElementById("radio");

    selector.addEventListener("change", onSelectorChange);

    for (const channel of channels) {

        const option = document.createElement("option");

        option.setAttribute("value", channel);

        selector.appendChild(option)
    }
}

async function onSelectorChange(event) {
    
    const response = await fetch(`${API_URL}/channel/${channel}`);

    const { 
        success,
        message,
        data: song,
        httpStatusCode
    } = await response.json();

    const song = await fetchSong(event.target.value)
}