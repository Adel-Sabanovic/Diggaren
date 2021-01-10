const API_URL = "http://localhost:8000/api";


/**
 * Fetches from the server
 * 
 * @param {"p1" | "p2" | "din_gata"} channel
 */
async function fetchChannel(channel) {

    const fetchUrl = `${API_URL}/channel/${channel}`;

    const response = await fetch(fetchUrl);

    const data = await response.json();
}

fetchChannel("din_gata");