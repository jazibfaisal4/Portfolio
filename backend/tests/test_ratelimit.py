import unittest

from app.ratelimit import SlidingWindowLimiter


class RateLimitTests(unittest.TestCase):
    def test_blocks_after_limit_and_recovers(self):
        rl = SlidingWindowLimiter()
        for i in range(3):
            self.assertEqual(rl.check("ip", 3, 60, now=100 + i), (True, 0))
        allowed, retry = rl.check("ip", 3, 60, now=103)
        self.assertFalse(allowed)
        self.assertGreaterEqual(retry, 1)
        self.assertLessEqual(retry, 60)
        self.assertTrue(rl.check("ip", 3, 60, now=161)[0])

    def test_keys_are_independent(self):
        rl = SlidingWindowLimiter()
        self.assertTrue(rl.check("a", 1, 60, now=0)[0])
        self.assertFalse(rl.check("a", 1, 60, now=1)[0])
        self.assertTrue(rl.check("b", 1, 60, now=1)[0])

    def test_purges_when_too_many_keys(self):
        rl = SlidingWindowLimiter(max_keys=5)
        for i in range(10):
            rl.check(f"k{i}", 1, 1, now=float(i * 10))
        self.assertLessEqual(len(rl._hits), 6)


if __name__ == "__main__":
    unittest.main()
