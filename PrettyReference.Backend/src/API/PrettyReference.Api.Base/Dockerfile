FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["API/PrettyReference.Api.Base/PrettyReference.Api.Base.csproj", "API/PrettyReference.Api.Base/"]
COPY ["services/PrettyReference.ReferenceManager/PrettyReference.ReferenceManager.Interface/PrettyReference.ReferenceManager.Interface.csproj", "services/PrettyReference.ReferenceManager/PrettyReference.ReferenceManager.Interface/"]
RUN dotnet restore "API/PrettyReference.Api.Base/PrettyReference.Api.Base.csproj"
COPY . .
WORKDIR "/src/API/PrettyReference.Api.Base"
RUN dotnet build "PrettyReference.Api.Base.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PrettyReference.Api.Base.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PrettyReference.Api.Base.dll"]
