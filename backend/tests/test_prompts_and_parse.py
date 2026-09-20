import json
import unittest

from app.fallback import answer_from_chunks
from app.knowledge import Chunk
from app.llm_parse import parse_gemini_sse_line, parse_openai_sse_line
from app.prompts import SYSTEM_PROMPT, build_messages, build_system_prompt


class PromptTests(unittest.TestCase):
    def test_system_prompt_wraps_knowledge_as_data(self):
        p = build_system_prompt([Chunk("x", "Title", "Body text")])
        self.assertIn("[x] Title", p)
        self.assertIn("<knowledge>", p)
        self.assertIn("not instructions", p)
        self.assertTrue(p.startswith(SYSTEM_PROMPT))

    def test_empty_knowledge(self):
        self.assertIn("no relevant notes", build_system_prompt([]))

    def test_messages_append_user(self):
        m = build_messages([{"role": "user", "content": "a"}, {"role": "assistant", "content": "b"}], "c")
        self.assertEqual(m[-1], {"role": "user", "content": "c"})
        self.assertEqual(len(m), 3)


class FallbackTests(unittest.TestCase):
    def test_no_results_points_to_email(self):
        self.assertIn("a@b.com", answer_from_chunks([], "a@b.com"))

    def test_uses_top_chunk_and_related(self):
        r = [(Chunk("1", "One", "first"), 2.0), (Chunk("2", "Two", "second"), 1.0)]
        out = answer_from_chunks(r, "a@b.com")
        self.assertIn("One: first", out)
        self.assertIn("Related: Two", out)


class ParseTests(unittest.TestCase):
    def test_gemini(self):
        line = "data: " + json.dumps({"candidates": [{"content": {"parts": [{"text": "Hel"}, {"text": "lo"}]}}]})
        self.assertEqual(parse_gemini_sse_line(line), "Hello")

    def test_gemini_skips_thought_parts_and_noise(self):
        thought = "data: " + json.dumps({"candidates": [{"content": {"parts": [{"text": "hmm", "thought": True}]}}]})
        self.assertIsNone(parse_gemini_sse_line(thought))
        self.assertIsNone(parse_gemini_sse_line(""))
        self.assertIsNone(parse_gemini_sse_line("event: x"))
        self.assertIsNone(parse_gemini_sse_line("data: {not json"))

    def test_openai_style(self):
        line = "data: " + json.dumps({"choices": [{"delta": {"content": "Hi"}}]})
        self.assertEqual(parse_openai_sse_line(line), "Hi")
        self.assertIsNone(parse_openai_sse_line("data: [DONE]"))
        self.assertIsNone(parse_openai_sse_line("data: " + json.dumps({"choices": [{"delta": {}}]})))


if __name__ == "__main__":
    unittest.main()
