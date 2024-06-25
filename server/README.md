### Trust certs:

```bash
dotnet tool update -g linux-dev-certs
dotnet linux-dev-certs install
dotnet-linux-dev-certs
```

### Build and run:

```bash
dotnet build
dotnet run --project ./SuperchartBackend/SuperchartBackend.csproj
```

### Docker build and run:

```bash
docker build -t superchart-backend ./SuperchartBackend
podman run -d -p 5001:8080 --name backend superchart-backend
```

To override env vars, run `podman run -d -p 5001:8080 -e VARNAME=value --name backend superchart-backend`

### Default user and password:

**admin:admin**
See `EnvVars.cs` to override