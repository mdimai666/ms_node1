$host.UI.RawUI.BackgroundColor = "Blue"
$host.UI.RawUI.ForegroundColor = "Red"
Write-Output 'RUN CONTAINER node1'
# docker rm mdimai666/node1:latest -f
docker run --rm -d -p 3001:3001/tcp --name node1 mdimai666/node1:latest
[Console]::ResetColor()
Write-Output ' '