import unittest

from app.knowledge import load_chunks
from app.retrieve import Index, expand_query


class RetrieveTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.index = Index(load_chunks())

    def top_ids(self, query, k=3):
        return [c.id for c, _ in self.index.search(query, k=k)]

    def test_speech_to_text_question(self):
        self.assertEqual(self.top_ids("What speech to text do you use?")[0], "stt-tts")

    def test_library_system(self):
        self.assertEqual(self.top_ids("Tell me about the library management system")[0], "library-system")

    def test_hiring(self):
        self.assertIn("contact", self.top_ids("How can I hire you?", k=2))

    def test_barge_in(self):
        self.assertEqual(self.top_ids("Does the voice interview support barge-in?")[0], "voice-pipeline")

    def test_database(self):
        self.assertIn("persistence", self.top_ids("Which database and migrations?", k=2))

    def test_who(self):
        self.assertEqual(self.top_ids("Who is Jazib?")[0], "about")

    def test_experience(self):
        self.assertEqual(self.top_ids("Where did he do his internship?")[0], "experience-purelogics")

    def test_off_topic_returns_nothing(self):
        self.assertEqual(self.index.search("write me a poem about the ocean"), [])

    def test_filler_only_query_has_no_terms(self):
        self.assertEqual(expand_query("hi"), ["hi"])  # main.py handles truly empty queries
        self.assertEqual(expand_query("the of and"), [])

    def test_get_by_id(self):
        self.assertEqual([c.id for c in self.index.get(["about", "nope", "contact"])], ["about", "contact"])


if __name__ == "__main__":
    unittest.main()
