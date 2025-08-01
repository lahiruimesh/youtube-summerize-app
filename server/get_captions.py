import sys
import json
import re
from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled, NoTranscriptFound

raw_input = sys.argv[1]

# Extract video ID from full URL or use as is
match = re.search(r"(?:v=|youtu\.be/)([a-zA-Z0-9_-]{11})", raw_input)
video_id = match.group(1) if match else raw_input

try:
    transcripts = YouTubeTranscriptApi().list(video_id)
    transcript = transcripts.find_transcript(['en'])  # You can include fallback langs too: ['en', 'si', 'en-US']
    # Convert FetchedTranscriptSnippet objects to dictionaries for JSON serialization
    transcript_data = transcript.fetch()
    serializable_data = [
        {
            'text': snippet.text,
            'start': snippet.start,
            'duration': snippet.duration
        }
        for snippet in transcript_data
    ]
    print(json.dumps(serializable_data))
except TranscriptsDisabled:
    print(json.dumps({"error": "Transcripts are disabled for this video."}))
except NoTranscriptFound:
    print(json.dumps({"error": "No transcript found in the requested language."}))
except Exception as e:
    print(json.dumps({"error": str(e)}))
