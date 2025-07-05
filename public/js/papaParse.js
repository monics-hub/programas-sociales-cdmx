// Read the CSV
export async function loadCSV(filePath) {
  try {
      const response = await fetch(filePath);
      const csvText = await response.text();

      return new Promise((resolve, reject) => {
          Papa.parse(csvText, {
              header: true,
              skipEmptyLines: true,
              complete: function(results) {
                 resolve(results.data);
              },
              error: function(err) {
                 reject(err);
              }
          });
      });
  } 
  
  catch (error) {
      console.error("Fetch error:", error);
      throw error; // Re-throw to let caller handle it
  }
}