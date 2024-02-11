#!/usr/bin/env bash
set -o pipefail
mkdir -p reports

pa11y-ci -j --config ".pa11yci" $@ > gl-accessibility.json

for url in $@
do
	filename="$(echo $url | sed -E 's/^https?:\/\///' | sed -E 's/\//-/g')-accessibility.html"
	pa11y --config "pa11y.json" $url | tee $filename > /dev/null
done
