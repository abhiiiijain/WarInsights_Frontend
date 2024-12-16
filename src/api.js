export const fetchWarlog = async (clanTag) => {
        const response = await fetch('http://localhost:5000/api/warlog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clanTag }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }
        return response.json();
      };
      