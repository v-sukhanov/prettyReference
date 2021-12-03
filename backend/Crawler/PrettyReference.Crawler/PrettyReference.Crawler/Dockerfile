FROM mcr.microsoft.com/dotnet/runtime:5.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["PrettyReference.Crawler/PrettyReference.Crawler.csproj", "PrettyReference.Crawler/"]
RUN dotnet restore "PrettyReference.Crawler/PrettyReference.Crawler.csproj"
COPY . .
WORKDIR "/src/PrettyReference.Crawler"
RUN dotnet build "PrettyReference.Crawler.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PrettyReference.Crawler.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PrettyReference.Crawler.dll"]
