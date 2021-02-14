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

    const artist = document.getElementById("artist");

    const title = document.getElementById("title");

    const channelName = document.getElementById("channelname");

    const image = document.getElementById("image");

    const btn = document.getElementById("btn");

    artist.innerHTML = artist;

    title.innerHTML = title;

    channelName.innerHTML = channelName;

    image.setAttribute("src", imageUrl);

    btn.setAttribute("href", songUrl)
}