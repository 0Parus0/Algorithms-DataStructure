// ========================================================================
//   Method 1: Precomputation with Factorials and Inverse Factorials (When m is prime)
// ========================================================================

const MOD = 1000000007;

function precompute(n) {
  fact = new Array(n + 1);
  invFact = new Array(n + 1);

  // Factorials
  fact[0] = 1;
  for (let i = 1; i <= n; i++) {
    fact[i] = (fact[i - 1] * i) % MOD;
  }

  // Inverse factorials using Fermat's Little Theorem
  invFact[n] = modPow(fact[n], MOD - 2, MOD);
  for (let i = n - 1; i >= 0; i--) {
    invFact[i] = (invFact[i + 1] * (i + 1)) % MOD;
  }
}

function nCr(n, r) {
  if (r < 0 || r > n) return 0;
  return (((fact[n] * invFact[r]) % MOD) * invFact[n - r]) % MOD;
}

// Modular exponentiation
function modPow(base, exp, mod) {
  let result = 1;
  base = base % mod;
  while (exp > 0) {
    if (exp & 1) result = (result * base) % mod;
    base = (base * base) % mod;
    exp >>= 1;
  }
  return result;
}

// ========================================================================
// Method 2: Using Pascal's Identity (For smaller n, up to ~5000)
// ========================================================================
function nCrMod(n, r, mod) {
  const dp = new Array(n + 1);
  for (let i = 0; i <= n; i++) {
    dp[i] = new Array(r + 1).fill(0);
  }

  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= Math.min(i, r); j++) {
      if (j === 0 || j === i) {
        dp[i][j] = 1;
      } else {
        dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j]) % mod;
      }
    }
  }
  return dp[n][r];
}

// ========================================================================
// Method 3: Lucas Theorem (When m is prime and n, r are very large)
// ========================================================================
function nCrModLucas(n, r, p) {
  if (r === 0) return 1;
  return (
    (nCrModLucas(Math.floor(n / p), Math.floor(r / p), p) *
      nCrMod(n % p, r % p, p)) %
    p
  );
}

// ========================================================================
// Method 4: Fermat's Little Theorem
// ========================================================================
class ModularNCR {
  constructor(mod = 1000000007n) {
    this.MOD = mod;
    this.fact = [];
    this.invFact = [];
  }

  // Precompute factorials and inverse factorials up to n
  precompute(n) {
    n = Number(n); // Convert to number for array indexing
    this.fact = new Array(n + 1);
    this.invFact = new Array(n + 1);

    // Calculate factorials
    this.fact[0] = 1n;
    for (let i = 1; i <= n; i++) {
      this.fact[i] = (this.fact[i - 1] * BigInt(i)) % this.MOD;
    }

    // Calculate inverse factorials using Fermat's Little Theorem
    // invFact[n] = (fact[n])^(MOD-2) % MOD
    this.invFact[n] = this.modPow(this.fact[n], this.MOD - 2n);

    // Calculate inverse factorials backwards
    for (let i = n - 1; i >= 0; i--) {
      this.invFact[i] = (this.invFact[i + 1] * BigInt(i + 1)) % this.MOD;
    }
  }

  // Modular exponentiation using binary exponentiation
  modPow(base, exponent) {
    let result = 1n;
    base = base % this.MOD;

    while (exponent > 0) {
      // If exponent is odd, multiply result with base
      if (exponent & 1n) {
        result = (result * base) % this.MOD;
      }
      // Square the base
      base = (base * base) % this.MOD;
      // Divide exponent by 2
      exponent >>= 1n;
    }

    return result;
  }

  // Calculate nCr % MOD using Fermat's Little Theorem
  nCr(n, r) {
    // Convert inputs to BigInt
    n = BigInt(n);
    r = BigInt(r);

    // Handle edge cases
    if (r < 0 || r > n) return 0n;
    if (r === 0n || r === n) return 1n;

    // Ensure we have precomputed up to n
    if (this.fact.length <= Number(n)) {
      this.precompute(Number(n));
    }

    // Using Fermat's Little Theorem:
    // nCr = n! * (r!)^(MOD-2) * ((n-r)!)^(MOD-2) % MOD
    const numerator = this.fact[Number(n)];
    const denominator =
      (this.invFact[Number(r)] * this.invFact[Number(n - r)]) % this.MOD;

    return (numerator * denominator) % this.MOD;
  }

  // Alternative: Calculate directly without precomputation
  nCrDirect(n, r) {
    n = BigInt(n);
    r = BigInt(r);

    if (r < 0 || r > n) return 0n;
    if (r === 0n || r === n) return 1n;

    // Take smaller of r and n-r for efficiency
    if (r > n - r) {
      r = n - r;
    }

    let numerator = 1n;
    let denominator = 1n;

    // Calculate numerator: n * (n-1) * ... * (n-r+1)
    // Calculate denominator: r!
    for (let i = 0n; i < r; i++) {
      numerator = (numerator * (n - i)) % this.MOD;
      denominator = (denominator * (i + 1n)) % this.MOD;
    }

    // Use Fermat's theorem for division: a/b = a * b^(MOD-2) % MOD
    const denominatorInverse = this.modPow(denominator, this.MOD - 2n);

    return (numerator * denominatorInverse) % this.MOD;
  }
}

// Usage example
const calculator = new ModularNCR(MOD);

// Example 1: Small numbers
console.log("Example 1: C(10, 3)");
console.log(calculator.nCr(10, 3).toString()); // 120

// Example 2: Large numbers with precomputation
console.log("\nExample 2: C(100, 50)");
calculator.precompute(100);
console.log(calculator.nCr(100, 50).toString()); // 538992043

// Example 3: Very large numbers using direct method
console.log("\nExample 3: C(1000, 500)");
console.log(calculator.nCrDirect(1000, 500).toString());

// Example 4: Multiple queries efficiently
console.log("\nExample 4: Multiple queries with precomputation");
calculator.precompute(1000);
console.log("C(1000, 200):", calculator.nCr(1000, 200).toString());
console.log("C(1000, 300):", calculator.nCr(1000, 300).toString());
console.log("C(1000, 400):", calculator.nCr(1000, 400).toString());

// Example 5: Edge cases
console.log("\nExample 5: Edge cases");
console.log("C(5, 0):", calculator.nCr(5, 0).toString()); // 1
console.log("C(5, 5):", calculator.nCr(5, 5).toString()); // 1
console.log("C(5, 6):", calculator.nCr(5, 6).toString()); // 0 (r > n)
