import json
import os
from pydub import AudioSegment
from nemo.collections.asr.parts.utils.nemo_forced_aligner import NemoForcedAligner

# Paths and configurations
audio_file_path = '/home/george/CAST/LibriSpeech/concatenated_audio.wav'  # Path to the input audio file
manifest_file_path = '/home/george/CAST/LibriSpeech/concated.json'  # Path to the JSON manifest
output_directory = '/home/george/CAST/LibriSpeech/'  # Directory where the outputs will be stored
model_name_or_path = 'stt_en_fastconformer_hybrid_large_pc'  # Pretrained NeMo model name or path

# Ensure output directory exists
os.makedirs(output_directory, exist_ok=True)

# Read the transcript from manifest
with open(manifest_file_path, 'r') as file:
    data = json.load(file)
    transcript = data['text']

# Initialize NeMo Forced Aligner
aligner = NemoForcedAligner(model=model_name_or_path, device='cuda')

# Perform forced alignment
alignment_result = aligner.align(audio_file_path, transcript)

# Function to split audio at alignment timestamps
def split_audio(audio_path, alignment, output_dir):
    audio = AudioSegment.from_file(audio_path)
    parts = []
    for i, (start, end, _) in enumerate(alignment):
        segment = audio[start:end]
        segment_file_name = f"audio_part_{i}.wav"
        segment_path = os.path.join(output_dir, segment_file_name)
        segment.export(segment_path, format="wav")

        parts.append({
            "audio_filepath": segment_path,
            "duration": float(segment.duration_seconds),
            "text": transcript,  # Modify as needed
            "offset": start / 1000  # Offset in seconds
        })
    return parts

# Split the audio and generate manifest
manifest = split_audio(audio_file_path, alignment_result, output_directory)

# Save the updated manifest
updated_manifest_file_path = os.path.join(output_directory, 'updated_manifest.jsonl')
with open(updated_manifest_file_path, 'w') as file:
    for entry in manifest:
        json.dump(entry, file)
        file.write('\n')

print(f"Processed audio and manifest saved in {output_directory}")






# import os
# import librosa
# import soundfile as sf
# from nemo.collections.asr.parts.utils.speaker_utils import audio_rttm_manifests_generation
# def split_audio(file_path, output_dir, max_duration=15.0):
#     # Load audio file
#     audio, sr = librosa.load(file_path, sr=None)

#     # Calculate the number of samples per max_duration
#     max_samples = int(max_duration * sr)

#     # Create output directory if it doesn't exist
#     os.makedirs(output_dir, exist_ok=True)

#     # Split and save audio
#     start = 0
#     end = max_samples
#     part = 1
#     while start < len(audio):
#         # Calculate end of segment
#         end = min(start + max_samples, len(audio))

#         # Extract segment
#         segment = audio[start:end]

#         # Save segment
#         output_file = os.path.join(output_dir, f"{os.path.basename(file_path).split('.')[0]}_part{part}.wav")
#         sf.write(output_file, segment, sr)

#         # Update start and part counter for next segment
#         start += max_samples
#         part += 1

#print(f"Audio split into {part-1} parts in '{output_dir}'")
# file_path = "/home/george/CAST/LibriSpeech/concatenated_audio.wav"  # path/to/your/long/audio.wav
# output_dir = "/home/george/CAST/LibriSpeech/cutted/"    # path/to/output/directory

#split_audio(file_path, output_dir)


# import json
# import os
# import subprocess
# from pydub import AudioSegment
# from pathlib import Path

# # Set your configurations here
# #audio_file_path = 'path/to/your/audio_file.wav'  # Path to the input audio file
# transcript_file_path = 'path/to/your/transcript.txt'  # Path to the transcript file
# audio_file_path = "/home/george/CAST/LibriSpeech/concatenated_audio.wav"  # path/to/your/long/audio.wav
# output_directory = "/home/george/CAST/LibriSpeech/cutted/"    # path/to/output/directory
# max_duration_ms = 15000  # Maximum duration of each audio segment in milliseconds

# # Function to split audio
# def split_audio(audio_path, transcript, output_dir, max_duration):
#     audio = AudioSegment.from_file(audio_path)
#     start_time = 0
#     part = 1
#     manifest = []

#     while start_time < len(audio):
#         end_time = min(start_time + max_duration, len(audio))
#         segment = audio[start_time:end_time]
#         segment_file_name = f"audio_part_{part}.wav"
#         segment_path = os.path.join(output_dir, segment_file_name)
#         segment.export(segment_path, format="wav")

#         manifest_entry = {
#             "audio_filepath": segment_path,
#             "duration": float(segment.duration_seconds),
#             "text": transcript,  # Assuming entire transcript for each segment; modify as needed
#             "offset": start_time / 1000  # Offset in seconds
#         }
#         manifest.append(manifest_entry)

#         start_time += max_duration
#         part += 1

#     return manifest

# # Ensure output directory exists
# os.makedirs(output_directory, exist_ok=True)

# # Read the transcript
# with open(transcript_file_path, 'r') as file:
#     transcript = file.read()

# # Split the audio and generate manifest
# manifest = split_audio(audio_file_path, transcript, output_directory, max_duration_ms)

# # Save the manifest
# manifest_file_path = os.path.join(output_directory, 'manifest_of_audioparts.jsonl')
# with open(manifest_file_path, 'w') as file:
#     for entry in manifest:
#         json.dump(entry, file)
#         file.write('\n')

# print(f"Processed audio and manifest saved in {output_directory}")




