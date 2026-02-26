npm run build -- --configuration=production --output-path=./deploy/src

git add -A
git commit -m "Commit"
git push origin main

read -p "Press enter to continue"
