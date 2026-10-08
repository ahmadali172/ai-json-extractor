# AI JSON Extractor (Ollama)

Turns messy text into clean structured data using a local AI model (llama3.2 via Ollama).

## Example
Input: "Ali from Lahore wants 3 red shirts delivered by Friday, phone 0300-1234567"

Output: name, city, item, quantity, deadline, phone as JSON.

## Files
- extractor.mjs: the extractor function

## Run
1. Install Ollama and Node.js
2. ollama pull llama3.2
3. node extractor.mjs

## Features
- Forces JSON output (format: "json", temperature 0)
- Checks the answer is valid JSON
- Checks all required keys are present