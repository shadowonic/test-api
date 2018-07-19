#!/bin/bash

if [ "$NODE_ENV" = "development" ]; then
  npm run dev
elif [ "$NODE_ENV" = "debug" ]; then
  npm run debug
elif [ "$NODE_ENV" = "production" ]; then
  npm start
 elif [ "$NODE_ENV" = "test" ]; then
  npm run test
else
  # Remove it later
  npm start
fi