#!/bin/bash
FILE_PATH=$5
DOES_FILE_EXIST="NO"

if [ -f "$FILE_PATH" ]; then
   DOES_FILE_EXIST="YES"
fi

echo "$FILE_PATH ::: $DOES_FILE_EXIST ::: $@"
