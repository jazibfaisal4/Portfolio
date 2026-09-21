import unittest

from app.cleaner import StreamCleaner, repair


def run(pieces):
    c = StreamCleaner()
    out = "".join(c.feed(p) for p in pieces)
    return out + c.flush()


class CleanerTests(unittest.TestCase):
    def test_repairs_split_name(self):
        self.assertEqual(repair("built by Jaz ib Faisal"), "built by Jazib Faisal")

    def test_repairs_name_split_across_chunks(self):
        pieces = ["The app was built by Jaz", " ib", " Faisal for the library and it uses MySQL."]
        self.assertEqual(run(pieces), "The app was built by Jazib Faisal for the library and it uses MySQL.")

    def test_repairs_at_the_very_end(self):
        self.assertEqual(run(["He is Jaz", " ib"]), "He is Jazib")

    def test_short_text_is_flushed(self):
        self.assertEqual(run(["Hi"]), "Hi")

    def test_leaves_normal_text_alone(self):
        text = "It ran from January 2026 to August 2026, using Node.js + Express and Jazib's notes."
        self.assertEqual(run([text[i : i + 4] for i in range(0, len(text), 4)]), text)

    def test_joins_split_tech_names(self):
        self.assertEqual(repair("uses Live Kit and Post gre SQL"), "uses LiveKit and PostgreSQL")

    def test_does_not_merge_neighbouring_words(self):
        self.assertEqual(repair("Jazib is here"), "Jazib is here")
        self.assertEqual(repair("the Jazibs"), "the Jazibs")

    def test_chunking_does_not_change_the_result(self):
        text = "Jaz ib built it. Faisal used Live Kit, Whisper and Eleven Labs for the voice agent."
        expected = repair(text)
        for size in (1, 2, 3, 5, 7, 11):
            pieces = [text[i : i + size] for i in range(0, len(text), size)]
            self.assertEqual(run(pieces), expected, f"chunk size {size}")


if __name__ == "__main__":
    unittest.main()
