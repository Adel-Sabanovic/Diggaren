const API_URL = "http://localhost:8000/api";


setInterval(updateContent, 40000);

setSelectorContent();

async function updateContent() {

    const selector = document.getElementById("radio");

    const channel = selector.value;

    await setContent(channel);
}

async function setSelectorContent() {

    const response = await fetch(`${API_URL}/all-channels`);

    const { data: channels } = await response.json();

    const selector = document.getElementById("radio");

    selector.addEventListener("change", onSelectorChange);

    for (const channel of channels) {

        const option = document.createElement("option");

        option.innerHTML = nameStr(channel);

        option.setAttribute("value", channel);

        selector.appendChild(option)
    }

    await setContent(channels[0]);
}

async function onSelectorChange(event) {
    
    const channelName = event.target.value;
    
    await setContent(channelName);
}

async function setContent(channelName) {
    
    const response = await fetch(`${API_URL}/channel/${channelName}`);
    
    const { 
        success,
        message,
        data,
    } = await response.json();;

    if (!success) {
        
        await setErrorContent(channelName, message, data);
    }

    if (success) {
        
        await setSuccessContent(channelName, data);
    }
}

async function setSuccessContent(channelName, {
    title,
    artist,
    url,
    image
}) {

    const errorTitle = document.getElementById("errortitle");

    errorTitle.style.display = "none";

    const btn = document.getElementById("btn");

    btn.setAttribute("target", "_blank");

    btn.setAttribute("href", url);

    btn.classList.remove("disabled");

    setTemplate({
        title,
        artist,
        imageUrl: image,
        channelName
    });
}

async function setErrorContent(channelName, message, { 
    title, 
    artist
} = {}) {
    
    const errorTitle = document.getElementById("errortitle");

    errorTitle.innerHTML = message;

    errorTitle.style.display = "block";

    const btn = document.getElementById("btn");

    btn.removeAttribute("target");

    btn.removeAttribute("href");

    btn.classList.add("disabled");

    setTemplate({
        title, 
        artist,
        imageUrl: "album.png",
        channelName,
    });
}

const defaultTemplateArgument = {
    title: "",
    artist: "",
    songUrl: "",
    imageUrl: "",
    channelName: ""
}

function setTemplate(data = defaultTemplateArgument) {

    data = {
        ...defaultTemplateArgument,
        ...data
    }

    const {
        title,
        artist,
        imageUrl,
        channelName
    } = data;

    const artistElement = document.getElementById("artist");

    const titleElement = document.getElementById("title");

    const channelNameElement = document.getElementById("channelname");

    const imageElement = document.getElementById("image");

    

    artistElement.innerHTML = artist || "";

    titleElement.innerHTML = title || "";

    channelNameElement.innerHTML = nameStr(channelName || "");

    imageElement.setAttribute("src", imageUrl || "");
}


function nameStr(str) {

    return str.replace(/_/g, " ");
}

