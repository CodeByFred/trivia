export async function getNewToken(): Promise<string> {
  try {
    const response = await fetch("https://opentdb.com/api_token.php?command=request");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    if (data.response_code !== 0) {
      throw new Error("Failure with getNewToken Function");
    }

    return data.token;
  } catch (e) {
    console.log(`Error fetching token: ${e}`);
    throw e;
  }
}
