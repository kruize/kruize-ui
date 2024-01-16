#!/bin/bash

# Set the number of experiment names to generate
num_experiments=10000

# Generate experiment names
experiment_names=()
for ((i=1; i<=$num_experiments; i++)); do
    experiment_names+=("\"exp-$i\"")
done

# Create the JSON structure
json_output='{
    "experimentNames": {
        '"${experiment_names[@]}"'
    },
    "count": '"$num_experiments"'
}'

# Print the JSON output
echo "$json_output"
