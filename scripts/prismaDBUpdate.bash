#!/bin/bash

# npx prisma migrate reset
npx prisma generate
npx prisma db push