cd IndentAttributor
npm run build
cd ..
rm ComponentPlugin_Rich_Text_*.zip
sail-tools zip
zip --delete ComponentPlugin_Rich_Text_*.zip "IndentAttributor/*"
zip --delete ComponentPlugin_Rich_Text_*.zip "*.sh"
zip --delete ComponentPlugin_Rich_Text_*.zip "**/.DS_Store"

unzip -l ComponentPlugin_Rich_Text_*.zip | more