export async function getNewToken(): Promise<string> {
  const response = await fetch("https://opentdb.com/api_token.php?command=request");
  const data = await response.json();

  if (data.response_code !== 0) {
    throw new Error("Failure with getNewToken Function");
  }
  return data.token;
}

// Might need a try/catch here...
