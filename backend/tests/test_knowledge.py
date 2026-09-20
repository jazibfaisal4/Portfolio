import re
import unittest

from app.knowledge import load_chunks

# Things the site must NOT claim unless Jazib confirms them.
UNVERIFIED = ["langgraph", "crewai", "mcp", "cartesia", "topskills", "bootcamp", "nemo", "qdrant",
              "faiss", "chroma", "pytorch", "gpt-4o", "sub-second", "deployed", "present"]


class KnowledgeTests(unittest.TestCase):
    def setUp(self):
        self.chunks = load_chunks()

    def test_ids_unique_and_fields_present(self):
        ids = [c.id for c in self.chunks]
        self.assertEqual(len(ids), len(set(ids)))
        for c in self.chunks:
            self.assertTrue(c.title.strip() and c.text.strip(), c.id)

    def test_no_unverified_claims(self):
        blob = " ".join(f"{c.title} {c.text}" for c in self.chunks).lower()
        for word in UNVERIFIED:
            pattern = r"(?<![a-z0-9])" + re.escape(word) + r"(?![a-z0-9])"
            self.assertIsNone(re.search(pattern, blob), f"unverified claim in knowledge: {word}")

    def test_chunks_are_short(self):
        for c in self.chunks:
            self.assertLess(len(c.text), 700, c.id)


if __name__ == "__main__":
    unittest.main()
