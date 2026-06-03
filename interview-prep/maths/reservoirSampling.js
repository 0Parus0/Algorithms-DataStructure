// ========================================================================
// 1. Reservoir Sampling for k = 1
// ========================================================================

function getRandom(arr) {
  let chosen = arr[0]; // reservoir size = 1

  for (let i = 1; i < arr.length; i++) {
    // pick current element with probability 1/(i+1)
    if (Math.random() < 1 / (i + 1)) {
      chosen = arr[i];
    }
  }

  return chosen;
}

function getRandom(arr) {
  let chosen;

  for (let i = 0; i < arr.length; i++) {
    if (Math.random() < 1 / (i + 1)) {
      chosen = arr[i];
    }
  }

  return chosen;
}

// ========================================================================
// 2. Reservoir Sampling for any size k
// ========================================================================
function reservoirSampling(arr, k = 5) {
  const reservoir = arr.slice(0, k);

  for (let i = k; i < arr.length; i++) {
    const r = Math.floor(Math.random() * (i + 1));

    if (r < k) {
      reservoir[r] = arr[i];
    }
  }

  return reservoir;
}
