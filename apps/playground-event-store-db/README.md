Ensure you are using WSL 2 by running wsl --list --verbose in PowerShell.

Then from a WSL2 Ubuntu bash shell...

1. Completely uninstall Docker: https://askubuntu.com/q/935569
2. Install docker using the repository https://docs.docker.com/engine/install/ubuntu/
3. Start the daemon sudo service docker start.
4. Test that docker works sudo docker run hello-world.

From Ubuntu bash, start EventStoreDb like this:

    sudo docker run --name esdb-node -it -p 2113:2113 -p 1113:1113     eventstore/eventstore:latest --insecure --run-projections=All

Then from either Ubuntu bash or Windows Powershell, run `node index.js`.

To connect from a browser see https://github.com/grpc/grpc-web/.
