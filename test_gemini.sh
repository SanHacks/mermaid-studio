#!/bin/bash
MODEL_ID="gemini-robotics-er-1.5-preview"
# MODEL_ID="gemini-1.5-flash" # Fallback

echo "Using Model: $MODEL_ID"

curl "https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent?key=${GEMINI_API_KEY}" \
    -H 'Content-Type: application/json' \
    -X POST \
    -d '{
      "contents": [{
        "parts": [{ "text": "Generate a simple Mermaid graph diagram code" }]
      }],
      "generationConfig": {
        "thinkingConfig": { "thinkingBudget": -1 }
      },
      "tools": [{ "googleSearch": {} }]
    }'
