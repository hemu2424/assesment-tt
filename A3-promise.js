
function fakeApi(data, ms, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("API request failed"));
      } else {
        resolve(data);
      }
    }, ms);
  });
}

async function loadDashboard() {
  try {
    const [items, categories] = await Promise.all([
      fakeApi(["Book 1", "Book 2", "Book 3"], 1000),
      fakeApi(["Fiction", "Science"], 500),
    ]);

    console.log(`${items.length} books across ${categories.length} categories`);
  } catch (error) {
    console.log(`Failed: ${error.message}`);
  }
}


loadDashboard();


async function testFailure() {
  try {
    const [items, categories] = await Promise.all([
      fakeApi(["Book 1", "Book 2"], 1000),
      fakeApi(["Fiction"], 500, true),
    ]);

    console.log("This should not log");
  } catch (error) {
    console.log("failed");
  }
}

testFailure();



console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

console.log("D");