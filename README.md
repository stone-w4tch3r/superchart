[![Deploy web to Github Pages](https://github.com/stone-w4tch3r/superchart/actions/workflows/deploy_pages.yml/badge.svg)](https://github.com/stone-w4tch3r/superchart/actions/workflows/deploy_pages.yml)
[![Publish backend Docker image](https://github.com/stone-w4tch3r/superchart/actions/workflows/publish_backend.yml/badge.svg)](https://github.com/stone-w4tch3r/superchart/actions/workflows/publish_backend.yml)
[![Deploy backend to Render](https://github.com/stone-w4tch3r/superchart/actions/workflows/trigger_render.yml/badge.svg)](https://github.com/stone-w4tch3r/superchart/actions/workflows/trigger_render.yml)


# SuperChart

## Demo

[https://stone-w4tch3r.github.io/superchart/](https://stone-w4tch3r.github.io/superchart/)

## Description

This is a simple webpage that displays a height chart of a route.
To get one, you need to provide the number of points. Than backend will generate a random route for you.
<br/>Colors on chart represent additional data. You can hover with mouse over the chart to see the exact values.

## Note

Backend is hosted on free Render tier, so first response may take time. Container is put in sleep when there are no requests

## Powered by

- [React](https://reactjs.org/) - frontend
- [Vite](https://vitejs.dev/) - frontend bundler
- [MUI](https://mui.com/) - frontend UI library
- [Github Pages](https://pages.github.com/) - frontend hosting
- [ASP.NET Core](https://dotnet.microsoft.com/apps/aspnet) - backend
- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/) - backend ORM
- [Github Actions](https://github.com/features/actions) - CI/CD
- [Github Packages](https://github.com/features/packages) - Docker image registry
- [Docker](https://www.docker.com/) - containerization
- [Render](https://render.com/) - backend docker hosting
