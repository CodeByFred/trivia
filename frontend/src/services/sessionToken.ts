export async function getOrCreateToken(): Promise<string> {
  const existing = localStorage.getItem("token");
  if (existing) return existing;

  const response = await fetch("https://opentdb.com/api_token.php?command=request");
  const data = await response.json();

  if (data.response_code !== 0) {
    throw new Error("Failed to get session token.");
  }

  localStorage.setItem("token", data.token);
  return data.token;
}

export async function resetToken(token: string): Promise<void> {
  await fetch(`https://opentdb.com/api_token.php?command=reset&token=${token}`);
}
