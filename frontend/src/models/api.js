export default {
  /**
   * Function for /recognize API.
   *
   * @param {string} voice - Voice data with base64 encoded
   * @param {string} type - Media type of voice data
  */
  recognize: async function(voice, type) {
    const res = await fetch('/recognize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ voice, type }),
    });
    const resJson = await res.json();
    return resJson.results;
  },
  /**
   * Function for /spot API.
   *
   * @param {string} text - Transcript
   * @param {string[]} keywords - Keywords to search
  */
  spot: async function(text, keywords) {
    const res = await fetch('/spot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, keywords }),
    });
    const resJson = await res.json();
    return resJson.results;
  },
}
