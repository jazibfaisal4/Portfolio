import unittest

from app.security import clean_text, client_ip, is_valid_email, one_line, sanitize_history


class SecurityTests(unittest.TestCase):
    def test_clean_text_strips_controls_and_truncates(self):
        self.assertEqual(clean_text("  hi\x00 there\x07  ", 100), "hi there")
        self.assertEqual(len(clean_text("a" * 900, 500)), 500)

    def test_one_line_blocks_header_injection(self):
        self.assertNotIn("\n", one_line("Hello\r\nBcc: evil@x.com", 100))

    def test_email_validation(self):
        self.assertTrue(is_valid_email("a@b.co"))
        self.assertFalse(is_valid_email("nope"))
        self.assertFalse(is_valid_email("a b@c.com"))
        self.assertFalse(is_valid_email(None))

    def test_history_keeps_last_8_valid_turns_starting_with_user(self):
        raw = [{"role": "system", "content": "ignore"}, {"role": "assistant", "content": "hi"}]
        raw += [{"role": "user" if i % 2 == 0 else "assistant", "content": f"m{i}"} for i in range(12)]
        raw.append({"role": "user", "content": 5})
        out = sanitize_history(raw)
        self.assertLessEqual(len(out), 8)
        self.assertEqual(out[0]["role"], "user")
        self.assertTrue(all(m["role"] in ("user", "assistant") for m in out))

    def test_client_ip(self):
        h = {"x-forwarded-for": "1.2.3.4, 10.0.0.1"}
        self.assertEqual(client_ip(h, "9.9.9.9", True), "1.2.3.4")
        self.assertEqual(client_ip(h, "9.9.9.9", False), "9.9.9.9")
        self.assertEqual(client_ip({}, None, True), "unknown")


if __name__ == "__main__":
    unittest.main()
