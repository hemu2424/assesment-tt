function createLimiter(max) {
  let used = 0;

  return {
    use() {
      if (used >= max) return false;
      used += 1;
      return true;
    },
    reset() {
      used = 0;
    },
    remaining() {
      return max - used;
    },
  };
}

const couponLimiter = createLimiter(5);
console.log("Coupon uses:", Array.from({ length: 7 }, () => couponLimiter.use()));
