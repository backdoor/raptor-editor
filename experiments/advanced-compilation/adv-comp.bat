closure --externs jquery.ui.extern.js --externs jquery.extern.js --compilation_level ADVANCED_OPTIMIZATIONS --js raptor.js --js_output_file raptor.min.js 
cat raptor.min.js | gzip -9 > raptor.min.js.gz