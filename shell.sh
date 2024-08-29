# npm run build

currentVersion=`grep -E -o "\d{2}\.\d{2}\.\d{2}\.\d{1,}" ./docs/.vitepress/config.mts`

echo $currentVersion

git add .

git commit -m "`echo $currentVersion`"

git push origin master

git push github master

