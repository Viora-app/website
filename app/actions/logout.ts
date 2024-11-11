
export const logout = async () => {
  const result = {success: false};

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/disconnect`);
  
    if (!res.ok) {
      throw new Error(`API call failed: ${res.status}`);
    }
  
    await res.json();
    result.success = true;
  } catch (error) {
    console.error('Failed to logout:', error);
  }

  return result;
};