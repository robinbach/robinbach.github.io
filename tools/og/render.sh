#!/bin/sh
# Renders the share cards in this folder to og/*.png with headless Edge.
# Start the local preview first (npm --prefix tools/local-preview start), then run from the repo root:
#   sh tools/og/render.sh
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
# A throwaway profile keeps headless Edge separate from any Edge window that is already open.
PROFILE="$(mktemp -d)"
win() { cygpath -w "$1" 2>/dev/null || echo "$1"; }
for card in home presto; do
  out="$PWD/og/$card.png"
  rm -f "$out"
  "$EDGE" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --window-size=1200,630 --virtual-time-budget=4000 --user-data-dir="$(win "$PROFILE")" \
    --screenshot="$(win "$out")" \
    "http://localhost:4173/tools/og/$card.html"
  # The Edge launcher can return before the screenshot is written; wait up to 30 s for it.
  i=0; while [ ! -s "$out" ] && [ $i -lt 30 ]; do sleep 1; i=$((i + 1)); done
  [ -s "$out" ] && echo "wrote og/$card.png" || echo "no output for $card" >&2
  sleep 2
done
rm -rf "$PROFILE"
