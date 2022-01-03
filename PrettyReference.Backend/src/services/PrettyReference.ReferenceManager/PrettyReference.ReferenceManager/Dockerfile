FROM mcr.microsoft.com/dotnet/runtime:5.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["PrettyReference.ReferenceManager/PrettyReference.ReferenceManager/PrettyReference.ReferenceManager.csproj", "PrettyReference.ReferenceManager/PrettyReference.ReferenceManager/"]
COPY ["PrettyReference.ReferenceManager/PrettyReference.ReferenceManager.Interface/PrettyReference.ReferenceManager.Interface.csproj", "PrettyReference.ReferenceManager/PrettyReference.ReferenceManager.Interface/"]
COPY ["PrettyReference.Crawler/PrettyReference.Crawler.Interface/PrettyReference.Crawler.Interface.csproj", "PrettyReference.Crawler/PrettyReference.Crawler.Interface/"]
RUN dotnet restore "PrettyReference.ReferenceManager/PrettyReference.ReferenceManager/PrettyReference.ReferenceManager.csproj"
COPY . .
WORKDIR "/src/PrettyReference.ReferenceManager"
RUN dotnet build "PrettyReference.ReferenceManager/PrettyReference.ReferenceManager.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PrettyReference.ReferenceManager/PrettyReference.ReferenceManager.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PrettyReference.ReferenceManager.dll"]
