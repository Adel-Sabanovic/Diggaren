const API_URL = "http://localhost:8000/api";

setSelectorContent();

let channel;

async function setSelectorContent() {

    const response = await fetch(`${API_URL}/all-channels`);

    const { data: channels } = await response.json();

    const selector = document.getElementById("radio");

    selector.addEventListener("change", onSelectorChange);

    for (const channel of channels) {

        const option = document.createElement("option");

        option.innerHTML = channel;

        option.setAttribute("value", channel);

        selector.appendChild(option)
    }
}

async function onSelectorChange(event) {

    const channelName = event.target.value;

    const response = await fetch(`${API_URL}/channel/${channelName}`);

    const { 
        success,
        message,
        httpStatusCode,
        data: {
            title,
            artist,
            url,
            image
        },
    } = await response.json();

    if (!success) {

    }

    if (success) {
        
        setContent({
            title,
            artist,
            songUrl: url,
            iamgeUrl: image,
            channelName
        });
    }
}


function setContent({ 
    title,
    artist,
    songUrl,
    imageUrl,
    channelName
}) {

    const artistElement = document.getElementById("artist");

    const titleElement = document.getElementById("title");

    const channelNameElement = document.getElementById("channelname");

    const imageElement = document.getElementById("image");

    const btnElement = document.getElementById("btn");

    artistElement.innerHTML = artist;

    titleElement.innerHTML = title;

    channelNameElement.innerHTML = channelName;

    imageElement.setAttribute("src", imageUrl);

    btnElement.setAttribute("href", songUrl)
}